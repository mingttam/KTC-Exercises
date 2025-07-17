import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const response = await fetch(`${baseUrl}/workspaces/tasks`, {
      headers: {
        Authorization: `Bearer ${session.user.accessToken}`,
      },
    });

    if (!response.ok) {
      console.error(`External API error: ${response.status}`);
      return NextResponse.json(
        { error: "Failed to fetch tasks from external API" },
        { status: response.status }
      );
    }

    const tasks = await response.json();
    return NextResponse.json(tasks);
  } catch (error) {
    console.error("API route error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
