export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Replace with your actual API endpoint and authentication
    const response = await fetch("YOUR_EXTERNAL_API_ENDPOINT", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer YOUR_API_KEY", // Replace with actual API key
      },
      body: JSON.stringify({
        businessName: body.businessName,
        ownerName: body.ownerName,
        email: body.email,
        timestamp: new Date().toISOString(),
      }),
    })

    if (!response.ok) {
      throw new Error("Failed to submit lead")
    }

    return Response.json({ success: true })
  } catch (error) {
    console.error("Lead submission error:", error)
    return Response.json({ error: "Failed to submit lead" }, { status: 500 })
  }
}
