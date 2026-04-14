"use client";

import { Card } from "@/components/card";
import { Button } from "@/components/ui/button";
import { Loader2, Flame } from "lucide-react";
import { useTransition } from "react";
import { loadMore } from "./actions";
import { useState } from "react";

type Drama = {
  id: string;
  title: string;
  image: string;
  status?: string;
};

export function PopularGrid({ initial }: { initial: Drama[] }) {
  const [dramas, setDramas] = useState(initial);
  const [page, setPage] = useState(1);
  const [isPending, startTransition] = useTransition();
  const [hasMore, setHasMore] = useState(true);

  const handleLoadMore = () => {
    startTransition(async () => {
      const nextPage = page + 1;
      const more = await loadMore(nextPage);
      if (!more || more.length === 0) {
        setHasMore(false);
      } else {
        setDramas((prev) => [...prev, ...more]);
        setPage(nextPage);
      }
    });
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-3">
        {dramas.map((drama, i) => (
          <Card
            key={`${drama.id}-${i}`}
            data={{
              title: drama.title,
              image: drama.image,
              description: drama.status ?? "",
              slug: drama.id.replace("drama-detail/", ""),
            }}
            aspectRatio="portrait"
            width={160}
            height={220}
            className="w-full"
          />
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center">
          <Button
            onClick={handleLoadMore}
            disabled={isPending}
            variant="outline"
            size="lg"
            className="min-w-[200px]"
          >
            {isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Summoning…
              </>
            ) : (
              <>
                <Flame className="w-4 h-4" strokeWidth={1.5} />
                Load More
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
