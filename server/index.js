const { createServer } = require("node:http");

const PORT = Number(process.env.PORT || 3001);
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-3.5-flash-lite";
const MAX_BODY_BYTES = 32 * 1024;

if (!GEMINI_API_KEY) {
    console.error("GEMINI_API_KEY is required. Add it to server/.env.");
    process.exit(1);
}

function sendJson(response, status, data) {
    response.writeHead(status, {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
        "Content-Type": "application/json; charset=utf-8",
    });
    response.end(JSON.stringify(data));
}

async function readJson(request) {
    const chunks = [];
    let bodyBytes = 0;

    for await (const chunk of request) {
        bodyBytes += chunk.length;
        if (bodyBytes > MAX_BODY_BYTES) {
            const error = new Error("Request body is too large.");
            error.status = 413;
            throw error;
        }
        chunks.push(chunk);
    }

    try {
        return JSON.parse(Buffer.concat(chunks).toString("utf8"));
    } catch {
        const error = new Error("Request body must be valid JSON.");
        error.status = 400;
        throw error;
    }
}

function validateChatRequest(payload) {
    if (typeof payload?.message !== "string" || !payload.message.trim()) {
        return "message must be a non-empty string.";
    }
    if (payload.message.length > 4000) {
        return "message must be 4000 characters or fewer.";
    }
    if (payload.history !== undefined && !Array.isArray(payload.history)) {
        return "history must be an array.";
    }
    if ((payload.history || []).length > 40) {
        return "history must contain 40 messages or fewer.";
    }

    for (const item of payload.history || []) {
        if (
            !["user", "assistant"].includes(item?.role) ||
            typeof item.text !== "string" ||
            item.text.length > 4000
        ) {
            return "Each history item must have a valid role and text.";
        }
    }

    return null;
}

const server = createServer(async (request, response) => {
    if (request.method === "OPTIONS") {
        sendJson(response, 204, {});
        return;
    }

    if (request.url !== "/api/bloomy/chat") {
        sendJson(response, 404, { error: "Not found." });
        return;
    }
    if (request.method !== "POST") {
        sendJson(response, 405, { error: "Method not allowed." });
        return;
    }

    try {
        const payload = await readJson(request);
        const validationError = validateChatRequest(payload);
        if (validationError) {
            sendJson(response, 400, { error: validationError });
            return;
        }

        const contents = [
            ...(payload.history || []).map(({ role, text }) => ({
                role: role === "assistant" ? "model" : "user",
                parts: [{ text }],
            })),
            { role: "user", parts: [{ text: payload.message.trim() }] },
        ];
        const geminiResponse = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(GEMINI_MODEL)}:generateContent`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-goog-api-key": GEMINI_API_KEY,
                },
                body: JSON.stringify({
                    systemInstruction: {
                        parts: [{
                            text: "You are Bloomy, a warm and supportive companion for people navigating PMDD. Listen with empathy, offer practical emotional support, and do not diagnose or replace professional medical care.",
                        }],
                    },
                    contents,
                }),
                signal: AbortSignal.timeout(30000),
            }
        );

        if (!geminiResponse.ok) {
            console.error(`Gemini request failed with status ${geminiResponse.status}.`);
            sendJson(response, 502, { error: "Bloomy could not respond right now." });
            return;
        }

        const result = await geminiResponse.json();
        const reply = result.candidates?.[0]?.content?.parts
            ?.map((part) => part.text || "")
            .join("")
            .trim();

        if (!reply) {
            sendJson(response, 502, { error: "Bloomy returned an empty response." });
            return;
        }

        sendJson(response, 200, { reply });
    } catch (error) {
        if (response.headersSent) return;
        const status = error.status || (error.name === "TimeoutError" ? 504 : 500);
        sendJson(response, status, {
            error: status === 504 ? "Bloomy took too long to respond." : error.message,
        });
    }
});

server.listen(PORT, "0.0.0.0", () => {
    console.log(`Bloomy API listening on http://0.0.0.0:${PORT}`);
});