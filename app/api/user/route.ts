let currentUser: string | null = null;

export async function POST(request: Request) {
  const { username } = await request.json();
  currentUser = username;
  return Response.json({ username });
}

export async function GET() {
  return Response.json({ username: currentUser });
}
