// Vercel serverless function: POST /api/chat
// Uses Ollama Cloud. Needs env var OLLAMA_API_KEY (Vercel -> Project -> Settings -> Environment Variables).
// Optional env var OLLAMA_MODEL overrides the default model below.

const SYSTEM = `You are the assistant on Abrar Muhtasim Pathan's portfolio website. Answer visitors' questions about Abrar in the third person, briefly and warmly (2-5 sentences). Use ONLY the facts below. If something is not covered, say you don't have that detail and point to the contact section or the CV (assets/Abrar_Muhtasim_Pathan_CV.pdf). Never invent publications, dates, employers or contact details. If the user writes in Bangla or Banglish, reply in the same style.

FACTS
- Urban and Rural Planning graduate, Khulna University (B.Sc., Jan 2022 - Dec 2025), CGPA 3.52/4.00. Specialises in GIS and Remote Sensing. IELTS 7.5. Based in Dhaka, Bangladesh.
- Focus: multi-hazard mapping, susceptibility modelling, vulnerability assessment; combines satellite data, GIS, machine learning and deep learning. Has worked on cyclone, flood, landslide and earthquake hazards in Bangladesh.
- Projects: (1) Landslide susceptibility and road vulnerability, Chittagong Hill Tracts - ensemble of DNN, CNN, LSTM; ensemble beat individual models. (2) Flood susceptibility, Teesta Basin - SAR data + ensemble ML, before/after upstream dam opening, evacuation routes (bachelor's thesis). (3) Cyclone vulnerability, Chittagong City Corporation - GIS MCDA with AHP; low-lying coastal wards most vulnerable. (4) Seasonal surface water extent - pre-monsoon, monsoon, post-monsoon.
- Publications: landslide/road vulnerability paper (co-author, Q1 journal); cyclone vulnerability MCDA-AHP paper (primary author); Teesta flood susceptibility with advanced ensemble ML (bachelor's dissertation, primary author); H2O AutoML flash-flood susceptibility in the transboundary Teesta Basin (primary author).
- Experience: Intern at SPARRSO (Kaptai Lake boundary delineation with Sentinel-1/2, ArcGIS processing, reporting); coastal vulnerability assessment in Satkhira (200 households, SPSS and Excel).
- Activities: champion of a real-estate idea generation competition; Academic Excellence Award at Khulna University; Sergeant at Arms, Rotaract Club of Khulna University; Program Coordinator, Student Square (NGO).
- Links: GitHub abrar-muhtasim-pathan, ResearchGate, LinkedIn, Scholar and ORCID are in the Contact section. CV is downloadable from the site.`;

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });

  const { messages } = req.body || {};
  if (!Array.isArray(messages) || !messages.length) {
    return res.status(400).json({ error: 'No messages' });
  }

  // Keep it cheap and safe: last 10 turns, 1000 chars each, valid roles only
  const clean = messages
    .slice(-10)
    .filter(m => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
    .map(m => ({ role: m.role, content: m.content.slice(0, 1000) }));
  if (!clean.length || clean[0].role !== 'user') {
    return res.status(400).json({ error: 'Bad messages' });
  }

  try {
    const r = await fetch('https://ollama.com/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + process.env.OLLAMA_API_KEY
      },
      body: JSON.stringify({
        model: process.env.OLLAMA_MODEL || 'gemma4:31b',
        stream: false,
        options: { num_predict: 400 },
        messages: [{ role: 'system', content: SYSTEM }].concat(clean)
      })
    });
    const data = await r.json();
    if (!r.ok) return res.status(502).json({ error: 'Upstream error' });
    const reply = ((data.message && data.message.content) || '').trim();
    return res.status(200).json({ reply });
  } catch (e) {
    return res.status(500).json({ error: 'Server error' });
  }
}
