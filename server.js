import express from "express";

const app = express();
app.use(express.json());

// 🔥 Your Supabase Edge Function URL
const SUPABASE_URL =
  "https://lgacksuuyiftgampihpc.supabase.co/functions/v1/ingest";

app.post("/tracker", async (req, res) => {
  try {
    const response = await fetch(SUPABASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    });

    const text = await response.text();
    res.status(response.status).send(text);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => {
  console.log("✅ Relay running on http://localhost:3000/tracker");
});