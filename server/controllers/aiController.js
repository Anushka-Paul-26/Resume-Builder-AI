import Resume from "../models/Resume.js";
import groq from "../configs/ai.js";

export const enhanceProfessionalSummary = async (req, res) => {
  try {
    const { userContent } = req.body;

    if (!userContent || !userContent.trim()) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const prompt = `
You are an expert resume writer.
Enhance the following professional summary in 1–2 ATS-friendly sentences.
Return ONLY the improved text.

Summary:
${userContent}
`;

    const response = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [{ role: "user", content: prompt }],
    });

    const text = response.choices[0]?.message?.content || "";

    if (!text) {
      return res.status(500).json({ message: "AI did not return text" });
    }

    res.status(200).json({ enhanceContent: text });

  } catch (error) {
    console.error("AI Enhance Error:", error);
    res.status(500).json({ message: "AI enhancement failed" });
  }
};

export const enhanceJobDescription = async (req, res) => {
  try {
    const { userContent } = req.body;

    if (!userContent || !userContent.trim()) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const prompt = `
You are an expert resume writer.
Enhance the following job description in 1–2 ATS-friendly sentences.
Return ONLY the improved text.

Description:
${userContent}
`;

    const response = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [{ role: "user", content: prompt }],
    });

    const text = response.choices[0]?.message?.content || "";

    if (!text) {
      return res.status(500).json({ message: "AI did not return text" });
    }

    res.status(200).json({ enhanceContent: text });

  } catch (error) {
    console.error("AI Enhance Error:", error);
    res.status(500).json({ message: "AI enhancement failed" });
  }
};
export const uploadResume = async (req, res) => {
  try {
    const { resumeText, title } = req.body;
    const userId = req.userId;

    if (!resumeText || !resumeText.trim()) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const prompt = `
Extract resume data and return ONLY valid JSON in this format:

{
  "professional_summary": "",
  "skills": [],
  "personal_info": {
    "full_name": "",
    "profession": "",
    "email": "",
    "phone": "",
    "location": "",
    "linkedin": "",
    "website": ""
  },
  "experience": [],
  "project": [],
  "education": []
}

Resume text:
${resumeText}
`;

    const response = await groq.chat.completions.create({
      model: "llama3-70b-8192",
      messages: [{ role: "user", content: prompt }],
    });

    let rawText = response.choices[0]?.message?.content || "";

    // Clean possible markdown formatting
    rawText = rawText.replace(/```json|```/g, "").trim();

    const parsedData = JSON.parse(rawText);

    const newResume = await Resume.create({
      userId,
      title,
      ...parsedData,
    });

    res.json({ resumeId: newResume._id });

  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ message: "Resume parsing failed" });
  }
};