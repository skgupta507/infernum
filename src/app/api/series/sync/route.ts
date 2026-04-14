import { db } from "@/db";
import { series } from "@/db/schema/main";
import { getTrending } from "@/lib/dramacool";
import { sql } from "drizzle-orm";
import { NextResponse, type NextRequest } from "next/server";

export const dynamic = "force-dynamic";

/**
 * Protected sync route — requires Bearer token matching API_SECRET_KEY env var.
 * POST /api/series/sync
 */
export async function POST(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  const apiKey = process.env.API_SECRET_KEY;

  if (!apiKey || authHeader !== `Bearer ${apiKey}`) {
    return new NextResponse("unauthorized", { status: 403 });
  }

  try {
    const trends = await getTrending();
    if (!trends) throw new Error("Trending failed to fetch.");

    const valuesToInsert: (typeof series.$inferInsert)[] = trends.results.map(
      (d) => ({
        coverImage: d.image,
        slug: d.id,
        title: d.title,
      }),
    );

    await db
      .insert(series)
      .values(valuesToInsert)
      .onConflictDoUpdate({
        target: [series.slug],
        set: { id: sql`${series.id}`, updatedAt: new Date() },
      });

    return NextResponse.json({ success: true, synced: valuesToInsert.length }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
