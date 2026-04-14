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
import {
  existingFromDatabase,
  getWatchLists,
  popFromWatchList,
  pushToWatchList,
} from "@/lib/helpers/server";
import { cn } from "@/lib/utils";
import { infoSchema } from "@/lib/validations";
import { and, asc, eq } from "drizzle-orm";
import { Flame, Play, BookmarkPlus, BookmarkMinus, Calendar, Film } from "lucide-react";
import type { Metadata, ResolvingMetadata } from "next";
import { revalidatePath } from "next/cache";
import Image from "next/image";
import Link from "next/link";
import { Suspense, cache } from "react";
import type { z } from "zod";
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
    const dramaInfo = await getDramaInfo(slug);
    if (!dramaInfo) throw new Error("Episode info not found!");
    const { description, title, image } = infoSchema.parse(dramaInfo);
    return {
      title,
      description,
      openGraph: { images: [image] },
    };
  } catch {
    const { title, description } = await parent;
    return { title, description };
  }
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const data = await getDramaInfo(slug);
  const parse = infoSchema.safeParse(data);
  if (!parse.success) throw new Error("failed to parse drama info");
  const parsed = parse.data;
  const { description, episodes, id, image, otherNames, releaseDate, title, genres } = parse.data;

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
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050000]/70 to-[#050000]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050000]/50 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto w-screen px-4 pt-8 pb-12 lg:container lg:pt-16">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6 text-xs text-muted-foreground font-cinzel tracking-wider">
          <Link href="/home" className="hover:text-crimson-400 transition-colors">HOME</Link>
          <span className="text-crimson-800">/</span>
          <span className="text-white/70">{title.slice(0, 40)}{title.length > 40 ? "…" : ""}</span>
        </div>

        {/* Main content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Poster */}
          <div className="shrink-0">
            <div className="w-48 lg:w-56 mx-auto lg:mx-0 rounded-sm overflow-hidden border border-crimson-900/40 shadow-glow glow-border">
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
            {/* Title */}
            <h1 className="font-cinzel font-black text-3xl lg:text-5xl text-white glow-text-subtle leading-tight">
              {title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground font-crimson">
              {releaseDate && (
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-crimson-700" />
                  {releaseDate}
                </span>
              )}
              {episodes && (
                <span className="flex items-center gap-1">
                  <Film className="w-3 h-3 text-crimson-700" />
                  {episodes.length} Episodes
                </span>
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
              <p className="text-sm text-muted-foreground font-crimson">
                <span className="text-white/60 font-cinzel text-xs tracking-wider">AKA: </span>
                {otherNames.join(" • ")}
              </p>
            )}

            {/* Description */}
            <p className="font-crimson text-base text-white/70 leading-relaxed max-w-2xl">
              {description}
            </p>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              {!!episodes && episodes.length > 0 && (
                <Suspense fallback={<Button disabled><Loading /></Button>}>
                  <LastPlayedEpisode slug={slug} />
                </Suspense>
              )}
              <Suspense
                fallback={
                  <Button variant="outline" disabled><Loading /></Button>
                }
              >
                <WatchListed dramaSeries={parsed} />
              </Suspense>
              <Suspense>
                <AdminAction slug={slug} />
              </Suspense>
            </div>
          </div>
        </div>

        {/* Episodes */}
        <div className="mt-12">
          <div className="flex items-center gap-2 mb-4">
            <Flame className="w-4 h-4 text-crimson-600" strokeWidth={1.5} />
            <h2 className="font-cinzel text-lg font-bold text-white tracking-wide">Episodes</h2>
            {episodes && (
              <span className="text-xs text-muted-foreground font-crimson">({episodes.length} total)</span>
            )}
          </div>

          <div className="relative">
            <ScrollArea>
              <div className="flex gap-3 pb-4">
                {episodes?.length === 0 && (
                  <div className="flex items-center gap-2 text-muted-foreground text-sm border border-crimson-950/40 rounded-sm px-4 py-3 bg-crimson-950/10">
                    <Icons.info className="w-4 h-4 text-crimson-700" />
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
                        ep.releaseDate.includes("ago")
                          ? ep.releaseDate
                          : new Date(ep.releaseDate).toLocaleDateString()
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
      </div>
    </section>
  );
}

async function WatchListed({ dramaSeries }: { dramaSeries: z.infer<typeof infoSchema> }) {
  const watchLists = await getWatchLists();
  const slug = dramaSeries.id;
  const [_, existsInDb] = await existingFromDatabase(slug);
  if (!existsInDb)
    return (
      <p className="text-right text-destructive text-xs font-crimson max-w-xs border border-destructive/20 rounded-sm px-3 py-2 bg-destructive/5">
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
        revalidatePath(`/drama/${slug}`);
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

async function AdminAction(props: { slug: string }) {
  const slug = `drama-detail/${props.slug}`;
  const sess = await userSession();
  const [results, existsInDb] = await existingFromDatabase(slug);
  if (sess?.user.email !== "noelrohi59@gmail.com") return null;
  const seriesStatus: "not_upserted" | "upserted" | "not_exists" =
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
          const res = await getDramaInfo(props.slug);
          const parse = infoSchema.safeParse(res);
          if (!parse.success) throw new Error("Schema doesn't match drama info.");
          const { data } = parse;
          const genres = data.genres?.map((g) => g);
          const otherNames = data.otherNames?.map((n) => n);
          const values: typeof series.$inferInsert = {
            coverImage: data.image,
            slug,
            title: data.title,
            description: data.description,
            releaseDate: String(data.releaseDate),
            status: data._status,
            genres,
            otherNames,
          };
          const episodeCount = data.episodes?.length ?? 0;
          const episodes: (typeof episode.$inferInsert)[] =
            data.episodes?.map((ep) => ({
              dramaId: slug,
              episodeSlug: ep.id,
              number: ep.episode,
              title: ep.title,
              isLast: ep.episode === episodeCount && values.status === "completed",
              subType: ep.subType,
            })) ?? [];
          await db.insert(series).values(values).onConflictDoUpdate({
            target: [series.slug],
            set: { ...values },
          });
          if (episodes.length > 0) {
            await db.delete(episode).where(eq(episode.dramaId, slug));
            await db.insert(episode).values(episodes);
          }
          revalidatePath(`/drama/${props.slug}`);
        } catch (error) {
          console.error(error);
        }
      }}
    >
      <SubmitButton
        variant={seriesStatus === "upserted" ? "destructive" : "secondary"}
        size="sm"
      >
        {seriesStatus === "not_upserted" ? "Upsert" : seriesStatus === "upserted" ? "Re-sync" : (
          <><Icons.plus className="size-3" /> Add to DB</>
        )}
      </SubmitButton>
    </form>
  );
}

async function LastPlayedEpisode({ slug }: { slug: string }) {
  const authSession = await userSession();
  if (!authSession) return null;
  const watchlistData = await db.query.watchList.findFirst({
    where: and(
      eq(watchList.dramaId, `drama-detail/${slug}`),
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
  const episodes = watchlistData.series?.episodes || [];
  const episodeIndex = episodes.findIndex((e) => e.number === watchlistData.episode);
  const episodeData = episodes.find((_, index) => index === episodeIndex + 1);
  const episodeNumber = episodeData?.number ?? 1;
  return (
    <Link
      href={episodeData ? `/watch/${episodeData?.episodeSlug}` : "#"}
      className={cn(buttonVariants({ variant: "ember" }), "gap-2")}
    >
      <Play className="w-4 h-4 fill-white" />
      {episodeNumber === 1 ? "Start Watching" : `Continue · Ep ${episodeNumber}`}
    </Link>
  );
}

const userSession = cache(async () => await auth());
