export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Metodo non permesso" });
  }

  const { category, description } = req.body || {};
  if (!description || typeof description !== "string") {
    return res.status(400).json({ error: "Descrizione mancante" });
  }

  const prompt = `Sei un copywriter esperto in social media per creative che vendono lavori all'uncinetto fatti a mano.
Categoria del prodotto: ${category}
Descrizione del prodotto scritta dall'utente: "${description.trim()}"

Genera:
1. Un HOOK (prima riga di un reel/post, massimo 15 parole, deve fermare lo scroll, tono caldo e diretto, in italiano, niente punti esclamativi eccessivi, niente frasi fatte)
2. Una CTA (call to action breve, massimo 20 parole, che spinge a scrivere in DM o a comprare, tono amichevole non pushy)

Rispondi SOLO con un oggetto JSON valido, senza markdown, senza backtick, in questo formato esatto:
{"hook": "...", "cta": "..."}`;

  try {
    const apiRes = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: "claude-sonnet-5",
        max_tokens: 500,
        messages: [{ role: "user", content: prompt }]
      })
    });

    const data = await apiRes.json();
    const textBlock = data.content?.find((b) => b.type === "text");
    const raw = textBlock?.text || "";
    const clean = raw.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(clean);

    return res.status(200).json(parsed);
  } catch (err) {
    return res.status(500).json({ error: "Errore nella generazione" });
  }
}
