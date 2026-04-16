import { Card } from "@/components/card";
import { Loading } from "@/components/fallbacks/loading";
import { Icons } from "@/components/icons";
import { Typography } from "@/components/typography";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { db } from "@/db";
import { episode, series, watchList } from "@/db/schema/main";
import { auth } from "@/lib/auth";
import { getDramaInfo } from "@/lib/dramacool";
import { toSlug } from "@/lib/slug";
import {
  existingFromDatabase,
  getWatchLists,
  popFromWatchList,
  pushToWatchList,
} from "@/lib/helpers/server";
import { cn } from "@/lib/utils";
import { and, asc, eq } from "drizzle-orm";
import { Flame, Play, BookmarkPlus, BookmarkMinus, Calendar, Film } from "lucide-react";
import type { Metadata, ResolvingMetadata } from "next";
import { revalidatePath } from "next/cache";
import Image from "next/image";
import Link from "next/link";
import { Suspense, cache } from "react";
import { SubmitButton } from "./client";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata(
  { params }: PageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  try {
    const { slug } = await params;
    const drama = await getDramaInfo(toSlug(decodeURIComponent(slug)));
    if (!drama) throw new Error("Not found");
    return {
      title: drama.title,
      description: drama.description,
      openGraph: { images: [drama.image] },
    };
  } catch {
    const { title, description } = await parent;
    return { title, description };
  }
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const drama = await getDramaInfo(toSlug(decodeURIComponent(slug)));
  if (!drama) throw new Error("Drama not found");

  const { description, episodes, id, image, otherNames, releaseDate, title, genres, status } = drama;

  return (
    <section className="relative">
      {/* Backdrop */}
      <div className="absolute inset-x-0 top-0 h-[400px] overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover object-top brightness-25 blur-sm scale-105"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0f1117]/70 to-[#0f1117]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f1117]/50 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto w-screen px-4 pt-8 pb-12 lg:container lg:pt-16">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6 text-xs text-muted-foreground font-heading tracking-wider">
          <Link href="/home" className="hover:text-brand-400 transition-colors">HOME</Link>
          <span className="text-brand-700">/</span>
          <span className="text-white/70">{title.slice(0, 40)}{title.length > 40 ? "…" : ""}</span>
        </div>

        {/* Main content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Poster */}
          <div className="shrink-0">
            <div className="w-48 lg:w-56 mx-auto lg:mx-0 rounded-sm overflow-hidden border border-brand-900/40 shadow-glow glow-border">
              <Image
                src={image}
                alt={title}
                width={224}
                height={320}
                className="w-full object-cover aspect-[3/4]"
              />
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 space-y-4">
            <h1 className="font-heading font-black text-3xl lg:text-5xl text-white glow-text-subtle leading-tight">
              {title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground font-sans">
              {releaseDate && (
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-brand-600" />
                  {releaseDate}
                </span>
              )}
              {episodes && (
                <span className="flex items-center gap-1">
                  <Film className="w-3 h-3 text-brand-600" />
                  {episodes.length} Episodes
                </span>
              )}
              {status && (
                <Badge variant="genre" className="capitalize">{status}</Badge>
              )}
            </div>

            {/* Genres */}
            <div className="flex flex-wrap gap-1.5">
              {genres?.map((genre, i) => (
                <Badge key={i} variant="genre">{genre}</Badge>
              ))}
            </div>

            {/* Other names */}
            {otherNames && otherNames.length > 0 && (
              <p className="text-sm text-muted-foreground font-sans">
                <span className="text-white/60 font-heading text-xs tracking-wider">AKA: </span>
                {otherNames.join(" • ")}
              </p>
            )}

            {/* Description */}
            <p className="font-sans text-base text-white/70 leading-relaxed max-w-2xl">
              {description || "No description available."}
            </p>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              {!!episodes && episodes.length > 0 && (
                <Suspense fallback={<Button disabled><Loading /></Button>}>
                  <LastPlayedEpisode slug={slug} />
                </Suspense>
              )}
              <Suspense fallback={<Button variant="outline" disabled><Loading /></Button>}>
                <WatchListed dramaId={id} />
              </Suspense>
              <Suspense>
                <AdminAction slug={slug} drama={drama} />
              </Suspense>
            </div>
          </div>
        </div>

        {/* Episodes */}
        <div className="mt-12">
          <div className="flex items-center gap-2 mb-4">
            <Flame className="w-4 h-4 text-brand-600" strokeWidth={1.5} />
            <h2 className="font-heading text-lg font-bold text-white tracking-wide">Episodes</h2>
            {episodes && (
              <span className="text-xs text-muted-foreground font-sans">({episodes.length} total)</span>
            )}
          </div>

          <ScrollArea>
            <div className="flex gap-3 pb-4">
              {(!episodes || episodes.length === 0) && (
                <div className="flex items-center gap-2 text-muted-foreground text-sm border border-brand-950/40 rounded-sm px-4 py-3 bg-brand-950/10">
                  <Icons.info className="w-4 h-4 text-brand-600" />
                  No episodes available yet. Check back soon.
                </div>
              )}
              {episodes?.map((ep, index) => (
                <Card
                  key={index}
                  prefetch={false}
                  data={{
                    title: ep.title,
                    image: image,
                    description: `${ep.subType} • ${
                      ep.releaseDate
                        ? ep.releaseDate.includes("ago")
                          ? ep.releaseDate
                          : new Date(ep.releaseDate).toLocaleDateString()
                        : `Episode ${ep.episode}`
                    }`,
                    link: `/watch/${ep.id}`,
                  }}
                  className="w-28 shrink-0 lg:w-[160px]"
                  aspectRatio="square"
                  width={160}
                  height={160}
                />
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      </div>
    </section>
  );
}

async function WatchListed({ dramaId }: { dramaId: string }) {
  const watchLists = await getWatchLists();
  const slug = dramaId.startsWith("drama-detail/") ? dramaId : `drama-detail/${dramaId.replace("drama-detail/", "")}`;
  const [_, existsInDb] = await existingFromDatabase(slug);

  if (!existsInDb)
    return (
      <p className="text-right text-destructive text-xs font-sans max-w-xs border border-destructive/20 rounded-sm px-3 py-2 bg-destructive/5">
        This drama cannot be added to watchlist yet.
      </p>
    );

  const found = watchLists.find((l) => l.dramaId === slug);
  const isWatchlisted = found?.dramaId === slug;
  const isCompleted = found?.status === "finished";

  if (isCompleted)
    return (
      <Button variant="secondary" disabled>
        <Icons.check className="size-4" />
        Completed
      </Button>
    );

  return (
    <form
      action={async () => {
        "use server";
        if (isWatchlisted) {
          await popFromWatchList({ slug });
        } else {
          await pushToWatchList({ slug });
        }
        revalidatePath(`/drama/${slug.replace("drama-detail/", "")}`);
      }}
    >
      <SubmitButton variant={isWatchlisted ? "outline" : "default"} className="min-w-[180px]">
        {isWatchlisted ? (
          <><BookmarkMinus className="size-4" /> Remove from Watchlist</>
        ) : (
          <><BookmarkPlus className="size-4" /> Add to Watchlist</>
        )}
      </SubmitButton>
    </form>
  );
}

async function AdminAction({
  slug,
  drama,
}: {
  slug: string;
  drama: NonNullable<Awaited<ReturnType<typeof getDramaInfo>>>;
}) {
  const dbSlug = `drama-detail/${slug}`;
  const sess = await userSession();
  const [results, existsInDb] = await existingFromDatabase(dbSlug);
  if (sess?.user.email !== "noelrohi59@gmail.com") return null;

  const seriesStatus =
    existsInDb && !results?.description
      ? "not_upserted"
      : results?.description
        ? "upserted"
        : "not_exists";

  return (
    <form
      className="inline-flex"
      action={async (_: FormData) => {
        "use server";
        try {
          const values: typeof series.$inferInsert = {
            coverImage: drama.image,
            slug: dbSlug,
            title: drama.title,
            description: drama.description,
            releaseDate: String(drama.releaseDate ?? ""),
            status: drama.status,
            genres: drama.genres,
            otherNames: drama.otherNames,
          };

          const episodeCount = drama.episodes?.length ?? 0;
          const episodes: (typeof episode.$inferInsert)[] =
            drama.episodes?.map((ep) => ({
              dramaId: dbSlug,
              episodeSlug: ep.id,
              number: ep.episode,
              title: ep.title,
              isLast: ep.episode === episodeCount && drama.status === "completed",
              subType: ep.subType,
            })) ?? [];

          await db
            .insert(series)
            .values(values)
            .onConflictDoUpdate({ target: [series.slug], set: { ...values } });

          if (episodes.length > 0) {
            await db.delete(episode).where(eq(episode.dramaId, dbSlug));
            await db.insert(episode).values(episodes);
          }
          revalidatePath(`/drama/${slug}`);
        } catch (err) {
          console.error(err);
        }
      }}
    >
      <SubmitButton
        variant={seriesStatus === "upserted" ? "destructive" : "secondary"}
        size="sm"
      >
        {seriesStatus === "not_upserted"
          ? "Upsert"
          : seriesStatus === "upserted"
            ? "Re-sync"
            : <><Icons.plus className="size-3" /> Add to DB</>}
      </SubmitButton>
    </form>
  );
}

async function LastPlayedEpisode({ slug }: { slug: string }) {
  const authSession = await userSession();
  if (!authSession) return null;

  const dbSlug = `drama-detail/${slug}`;
  const watchlistData = await db.query.watchList.findFirst({
    where: and(
      eq(watchList.dramaId, dbSlug),
      eq(watchList.userId, authSession.user.id),
    ),
    with: {
      series: {
        columns: { id: true },
        with: {
          episodes: {
            columns: { episodeSlug: true, number: true },
            orderBy: [asc(episode.number)],
          },
        },
      },
    },
  });

  if (!watchlistData || watchlistData.status === "finished") return null;
  const eps = watchlistData.series?.episodes ?? [];
  const idx = eps.findIndex((e) => e.number === watchlistData.episode);
  const next = eps[idx + 1];
  const epNumber = next?.number ?? 1;

  return (
    <Link
      href={next ? `/watch/${next.episodeSlug}` : "#"}
      className={cn(buttonVariants({ variant: "ember" }), "gap-2")}
    >
      <Play className="w-4 h-4 fill-white" />
      {epNumber === 1 ? "Start Watching" : `Continue · Ep ${epNumber}`}
    </Link>
  );
}

const userSession = cache(async () => await auth());
