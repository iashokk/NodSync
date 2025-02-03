export async function GET(request: Request) {
  return new Response("Hello, Next.js!");
}
export async function POST(request: Request) {
  const data = await request.json(); // Parse the incoming JSON body

  // Process the data if needed, for now, we'll just return it
  return new Response(JSON.stringify({ message: "Data received successfully", data }), {
    headers: { "Content-Type": "application/json" },
  });
}
