import { Icons } from "@/components/icons";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button, buttonVariants } from "@/components/ui/button";
import { db } from "@/db";
import { auth } from "@/lib/auth";
import {
  getEpisodeInfo as getEpInfo,
  getEpisodeSources,
} from "@/lib/dramacool";
import { episodeSourceSchema } from "@/lib/validations";
import { notify } from "@/lib/webhooks/slack";
import { ChevronLeft, ChevronRight, Tv2, Download, Flame } from "lucide-react";
import type { Metadata, ResolvingMetadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Suspense, cache } from "react";
import UpdateWatchlistButton from "./update-progress";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata(
  { params }: PageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  try {
    const { slug } = await params;
    const episodeInfo = await getEpisodeInfo(slug);
    if (!episodeInfo) throw new Error("Episode info not found!");
    const title = `${episodeInfo.title} | Episode ${episodeInfo.number}`;
    const ogImage = `https://og.rohi.dev/general?title=${title}&textColor=fff&backgroundColorHex=000`;
    return {
      title,
      description: `Watch episode ${episodeInfo.number} of ${episodeInfo.title}. ${(await parent).description}`,
      openGraph: { images: [ogImage] },
    };
  } catch {
    const { title, description } = await parent;
    return { title, description };
  }
}

const VideoPlayer = dynamic(() => import("@/components/react-player"), {
  ssr: false,
});

const getEpisodeInfo = cache(async (episodeSlug: string) => {
  const episodeInfo = await getEpInfo(episodeSlug);
  if (!episodeInfo) throw new Error("Episode info not found!");
  return episodeInfo;
});

const cachedAuth = cache(async () => await auth());

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const { dramaId, title, number } = await getEpisodeInfo(slug);
  const text = `Someone is watching ${title} episode ${number}`;
  notify(text);

  return (
    <section className="relative min-h-screen">
      {/* Top ambient */}
      <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-crimson-950/10 to-transparent pointer-events-none" />

      <div className="relative z-10 mx-auto w-screen px-4 py-6 lg:container lg:py-10 space-y-4">
        {/* Breadcrumb / back */}
        <div className="flex items-center justify-between">
          <Link
            href={`/drama/${dramaId.split("/")[1]}`}
            className={buttonVariants({ variant: "outline", size: "sm" })}
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            Drama Series
          </Link>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-cinzel tracking-wider">
            <Flame className="w-3 h-3 text-crimson-700 animate-flicker" strokeWidth={1.5} />
            INFERNUM
          </div>
        </div>

        {/* Video player */}
        <div className="rounded-sm overflow-hidden border border-crimson-900/30 shadow-glow bg-black">
          <Suspense
            fallback={
              <AspectRatio ratio={16 / 9}>
                <div className="size-full bg-black flex items-center justify-center">
                  <div className="text-center space-y-3">
                    <Flame className="w-8 h-8 text-crimson-700 animate-flicker mx-auto" strokeWidth={1.5} />
                    <p className="font-cinzel text-xs text-muted-foreground tracking-wider">SUMMONING THE STREAM…</p>
                  </div>
                </div>
              </AspectRatio>
            }
          >
            <Vid episodeSlug={slug} number={number} dramaId={dramaId} />
          </Suspense>
        </div>

        {/* Episode title */}
        <div className="space-y-1">
          <h1 className="font-cinzel text-xl lg:text-2xl font-bold text-white glow-text-subtle">
            {title}
          </h1>
          <p className="text-muted-foreground text-sm font-crimson">
            Episode {number}
          </p>
        </div>

        {/* Controls */}
        <Suspense fallback={null}>
          <ControlButtons episodeSlug={slug} />
        </Suspense>

        {/* Divider */}
        <div className="infernal-divider" />
      </div>
    </section>
  );
}

async function ControlButtons({ episodeSlug }: { episodeSlug: string }) {
  const { episodes, number, downloadLink, dramaId } = await getEpisodeInfo(episodeSlug);
  const session = await cachedAuth();
  let watched = false;
  if (session) {
    const watchListData = await db.query.watchList.findFirst({
      where: (table, { eq, and, gte }) =>
        and(
          gte(table.episode, number),
          eq(table.dramaId, dramaId),
          eq(table.userId, session?.user.id),
        ),
    });
    watched = !!watchListData;
  }
  const dramaInfo = await db.query.series.findFirst({
    where: (table, { eq }) => eq(table.slug, dramaId),
  });

  return (
    <div className="flex flex-wrap gap-2 items-center">
      <Button size="sm" variant="outline" disabled={!episodes.previous} asChild={!!episodes.previous}>
        {episodes.previous ? (
          <Link href={`/watch/${episodes.previous}`} scroll={false} className="flex items-center gap-1.5">
            <ChevronLeft className="w-3.5 h-3.5" /> Previous
          </Link>
        ) : (
          <span className="flex items-center gap-1.5"><ChevronLeft className="w-3.5 h-3.5" /> Previous</span>
        )}
      </Button>

      <Button size="sm" variant="secondary" className="gap-1.5 pointer-events-none">
        <Tv2 className="w-3.5 h-3.5 text-crimson-600" />
        <span className="font-cinzel text-xs">EP {number}</span>
      </Button>

      <Button size="sm" variant="outline" disabled={!episodes.next} asChild={!!episodes.next}>
        {episodes.next ? (
          <Link href={`/watch/${episodes.next}`} scroll={false} className="flex items-center gap-1.5">
            Next <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        ) : (
          <span className="flex items-center gap-1.5">Next <ChevronRight className="w-3.5 h-3.5" /></span>
        )}
      </Button>

      <Button size="sm" variant="ghost" asChild>
        <Link href={downloadLink} download className="flex items-center gap-1.5">
          <Download className="w-3.5 h-3.5" />
          Download
        </Link>
      </Button>

      {!!session && !!dramaInfo && (
        <UpdateWatchlistButton
          size="sm"
          episode={number}
          slug={dramaId}
          watched={watched}
        />
      )}
    </div>
  );
}

type Props = { episodeSlug: string; number: number; dramaId: string };

async function Vid({ episodeSlug, dramaId, number }: Props) {
  const episodeSources = await getEpisodeSources(episodeSlug);
  const session = await cachedAuth();
  let seekTo: number | undefined;
  if (session) {
    const progress = await db.query.progress.findFirst({
      where: (table, { eq, and }) =>
        and(eq(table.episodeSlug, episodeSlug), eq(table.userId, session.user.id)),
    });
    seekTo = progress ? Number(progress.seconds) : undefined;
  }
  const parsed = episodeSourceSchema.parse(episodeSources);
  return (
    <AspectRatio ratio={16 / 9}>
      <VideoPlayer
        slug={episodeSlug}
        dramaId={dramaId}
        number={number}
        seekTo={seekTo}
        url={parsed.sources[0].url}
      />
    </AspectRatio>
  );
}
