const getChatResponse = async (req, res) => {
    try {
        const { messages } = req.body;
        console.log("Messages:", messages);

        if (!messages || !Array.isArray(messages)) {
            return res.status(400).json({ message: "Messages are required and must be an array" });
        }

        const systemPrompt = {
            role: "system",
            content: "You are an AI assistant for the Multi-Vendor Marketplace. It was built as a modern e-commerce platform by Muhammad Zeeshan. Your goal is to help users understand the platform features like vendor dashboards, product search, and secure checkout. Keep your answers concise and professional."
        };

        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
                "Content-Type": "application/json",
                "HTTP-Referer": "http://localhost:5173", // Optional, for OpenRouter rankings
                "X-Title": "Multi-Vendor Marketplace", // Optional, for OpenRouter rankings
            },
            body: JSON.stringify({
                model: "openrouter/auto", // Using a free model for demonstration
                messages: [systemPrompt, ...messages],
            })
        });

        const data = await response.json();

        if (data.error) {
            console.error("OpenRouter Error:", data.error);
            return res.status(500).json({ message: "Failed to get response from AI" });
        }
        console.log("OpenRouter Response:", data.choices[0].message);
        res.status(200).json(data.choices[0].message);
    } catch (error) {
        console.error("Chatbot Controller Error:", error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getChatResponse };
