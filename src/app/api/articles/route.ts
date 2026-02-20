import { fetchTopHeadlines } from "@/lib/gnews";
import { TOPICS, Topic } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const topic = (searchParams.get("topic") || "general") as Topic;

  const validTopics = TOPICS.map((t) => t.value);
  if (!validTopics.includes(topic)) {
    return NextResponse.json(
      { error: "Invalid topic" },
      { status: 400 }
    );
  }

  const data = await fetchTopHeadlines(topic, 10);

  return NextResponse.json(data);
}
