const { GoogleGenerativeAI } = require("@google/generative-ai");
const express = require("express");
const app = express();

app.use(express.json());

app.post("/", async (req, res) => {
    const { prompt } = req.body;
    const genAI = new GoogleGenerativeAI(process.env.API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    try {
        const result = await model.generateContent("أنت مساعد ذكي متخصص في العلوم الإسلامية. أجب بدقة: " + prompt);
        res.json({ reply: result.response.text() });
    } catch (error) {
        res.status(500).json({ error: "خطأ في السيرفر" });
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));

