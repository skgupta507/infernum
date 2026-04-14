import { Card as DramaCard } from "@/components/card";
import { FallBackCard as FallBack } from "@/components/fallbacks/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getFeatured, getRecent, getTrending } from "@/lib/dramacool";
import { getWatchLists } from "@/lib/helpers/server";
import { generateMetadata } from "@/lib/utils";
import { Flame, Play, Info } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

const title = "Home";
const description = "Born in darkness. Stream the fire. Enter the realm of Korean drama obsession.";
export const metadata = generateMetadata({ title, description });

const DARK_SLOGANS = [
  { section: "Trending Now", slogan: "The realm burns brightest here" },
  { section: "Recently Aired", slogan: "Fresh from the shadow forge" },
  { section: "My Watchlist", slogan: "Your ritual, your obsession" },
];

export default function Page() {
  return (
    <div className="relative">
      {/* HERO */}
      <section className="w-full">
        <Suspense
          fallback={
            <AspectRatio ratio={16 / 6} className="relative">
              <Skeleton className="size-full bg-crimson-950/20" />
            </AspectRatio>
          }
        >
          <HeroBanner />
        </Suspense>
      </section>

      {/* CONTENT SECTIONS */}
      <div className="mx-auto w-screen px-4 py-8 lg:container lg:py-12 space-y-12">

        {/* Watchlist */}
        <section>
          <SectionHeading
            title="My Watchlist"
            subtitle="Your saved dramas await in the abyss"
            slogan="Your ritual, your obsession"
          />
          <ScrollArea>
            <div className="flex gap-3 pb-4">
              <Suspense fallback={<FallBack />}>
                <WatchList />
              </Suspense>
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </section>

        <div className="infernal-divider" />

        {/* Recent */}
        <section>
          <SectionHeading
            title="Recently Aired"
            subtitle="Freshly emerged from the darkness — new episodes this week"
            slogan="Fresh from the shadow forge"
          />
          <ScrollArea>
            <div className="flex gap-3 pb-4">
              <Suspense fallback={<FallBack />}>
                <Recent />
              </Suspense>
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </section>

        <div className="infernal-divider" />

        {/* Trending */}
        <section>
          <SectionHeading
            title="Trending Now"
            subtitle="The most watched dramas in the realm right now"
            slogan="The realm burns brightest here"
          />
          <ScrollArea>
            <div className="flex gap-3 pb-4">
              <Suspense fallback={<FallBack />}>
                <Trending />
              </Suspense>
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </section>

        <div className="infernal-divider" />

        {/* Dark Picks CTA */}
        <section className="relative overflow-hidden rounded-sm border border-crimson-900/40 p-8 bg-gradient-to-br from-crimson-950/30 via-black to-black">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_0%_50%,rgba(139,0,0,0.15)_0%,transparent_70%)]" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-crimson-500 animate-flicker" strokeWidth={1.5} />
                <span className="font-cinzel text-xs tracking-[0.3em] text-crimson-500 uppercase">Dark Picks</span>
              </div>
              <h3 className="font-cinzel text-2xl font-bold text-white glow-text-subtle">
                Enter the Realm of Obsession
              </h3>
              <p className="text-muted-foreground font-crimson text-base max-w-md">
                Hand-selected dramas that dwell in the shadows — revenge, betrayal, supernatural terror. Only for those who dare.
              </p>
            </div>
            <Link href="/popular">
              <Button variant="ember" size="lg" className="min-w-[200px]">
                <Flame className="w-4 h-4" />
                Explore All Dramas
              </Button>
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}

async function HeroBanner() {
  const featured = await getFeatured();
  const GENRES = ["Romance", "Thriller", "Revenge", "Fantasy"];

  return (
    <Carousel className="w-full overflow-hidden" opts={{ loop: true }}>
      <CarouselContent>
        {featured?.map((item, i) => (
          <CarouselItem key={item.id} className="basis-full">
            <div className="relative w-full" style={{ aspectRatio: "16/6" }}>
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover brightness-50"
                priority={i === 0}
              />
              {/* Multi-layer gradients */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050000] via-[#050000]/40 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#050000]/70 via-transparent to-[#050000]/30" />
              <div className="absolute inset-0 vignette" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 p-6 lg:p-12 max-w-2xl">
                <div className="flex gap-2 mb-3 flex-wrap">
                  {GENRES.slice(0, 3).map((g) => (
                    <Badge key={g} variant="genre">{g}</Badge>
                  ))}
                </div>
                <h1 className="font-cinzel font-black text-2xl lg:text-4xl text-white mb-3 glow-text-subtle leading-tight">
                  {item.title}
                </h1>
                <p className="text-white/60 font-crimson text-sm mb-5 hidden lg:block">
                  Unleash the drama within. Born in darkness, streaming the fire.
                </p>
                <div className="flex items-center gap-3 flex-wrap">
                  <Link href={`/drama/${item.id.replace("drama-detail/", "")}`}>
                    <Button variant="ember" size="sm" className="gap-2">
                      <Play className="w-3.5 h-3.5 fill-white" />
                      Watch Now
                    </Button>
                  </Link>
                  <Link href={`/drama/${item.id.replace("drama-detail/", "")}`}>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Info className="w-3.5 h-3.5" />
                      Details
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-4 border-crimson-900/50 bg-black/60 text-white hover:bg-crimson-900/60 hover:border-crimson-700" />
      <CarouselNext className="right-4 border-crimson-900/50 bg-black/60 text-white hover:bg-crimson-900/60 hover:border-crimson-700" />
    </Carousel>
  );
}

async function Recent() {
  const recentEpisodes = await getRecent();
  return (
    <>
      {recentEpisodes?.results?.map((ep, index) => (
        <DramaCard
          key={index}
          prefetch={false}
          data={{
            title: ep.title,
            image: ep.image,
            description: `Episode ${ep.number}`,
            link: `watch/${ep.id}`,
          }}
          className="w-28 shrink-0 lg:w-[180px]"
          aspectRatio="portrait"
          width={180}
          height={260}
        />
      ))}
    </>
  );
}

async function Trending() {
  const topAiring = await getTrending();
  return (
    <>
      {topAiring?.results?.map((drama, index) => (
        <DramaCard
          key={index}
          data={{
            title: drama.title,
            image: drama.image,
            description: "",
            slug: drama.id.replace("drama-detail/", ""),
          }}
          className="w-28 shrink-0 lg:w-[180px]"
          aspectRatio="portrait"
          width={180}
          height={260}
        />
      ))}
    </>
  );
}

async function WatchList() {
  const watchlists = await getWatchLists();
  const filteredList = watchlists.filter((l) =>
    [null, "watching", "plan_to_watch"].includes(l.status),
  );
  if (filteredList.length === 0) {
    return (
      <div className="flex items-center gap-3 py-6 px-4 border border-crimson-950/40 rounded-sm bg-crimson-950/10">
        <Flame className="w-4 h-4 text-crimson-700 shrink-0" strokeWidth={1.5} />
        <p className="text-muted-foreground text-sm font-crimson">
          Your watchlist is empty. Venture into a drama series and add it to begin your ritual.
        </p>
      </div>
    );
  }
  return (
    <>
      {filteredList.map(({ series: drama }, index) => {
        if (!drama) return null;
        return (
          <DramaCard
            key={index}
            data={{
              title: drama.title,
              image: drama.coverImage,
              description: "",
              slug: drama.slug.replace("drama-detail/", ""),
            }}
            className="w-28 shrink-0 lg:w-[180px]"
            aspectRatio="portrait"
            width={180}
            height={260}
          />
        );
      })}
    </>
  );
}
