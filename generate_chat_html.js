import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const transcriptPath = "C:\\Users\\Jyoti Kumari\\.gemini\\antigravity-ide\\brain\\364cd528-0634-4965-8ebf-f1495421474e\\.system_generated\\logs\\transcript_full.jsonl";

const lines = fs.readFileSync(transcriptPath, "utf-8").split("\n").filter(Boolean);

const messages = [];

for (const line of lines) {
  try {
    const item = JSON.parse(line);
    if (item.type === "USER_INPUT") {
      let content = item.content || "";
      // Extract user request if enclosed in tags
      const match = content.match(/<USER_REQUEST>([\s\S]*?)<\/USER_REQUEST>/);
      if (match) {
        content = match[1].trim();
      }
      if (content && !content.startsWith("Show the contents of file")) {
        messages.push({ role: "User", text: content, time: item.timestamp || "" });
      }
    } else if (item.type === "PLANNER_RESPONSE") {
      let content = item.content || "";
      if (content.trim()) {
        messages.push({ role: "Assistant", text: content.trim(), time: item.timestamp || "" });
      }
    }
  } catch (e) {
    // Ignore JSON parse errors for non-JSON lines
  }
}

// Simple markdown formatter for HTML
function formatMarkdown(md) {
  let html = md
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Code blocks
  html = html.replace(/```([a-z]*)\n([\s\S]*?)```/g, (match, lang, code) => {
    return `<pre><code>${code}</code></pre>`;
  });

  // Inline code
  html = html.replace(/`([^`]+)`/g, "<code>$1</code>");

  // Headers
  html = html.replace(/^### (.*$)/gim, "<h3>$1</h3>");
  html = html.replace(/^## (.*$)/gim, "<h2>$1</h2>");
  html = html.replace(/^# (.*$)/gim, "<h1>$1</h1>");

  // Bold & Italic
  html = html.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*([^*]+)\*/g, "<em>$1</em>");

  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

  // Tables
  html = html.replace(/\|(.+)\|/g, (match) => {
    const cells = match.split("|").filter((c, i, a) => i > 0 && i < a.length - 1);
    if (cells.some(c => c.trim().startsWith("---") || c.trim().startsWith(":---"))) {
      return ""; // Table delimiter row
    }
    const tdHtml = cells.map(c => `<td>${c.trim()}</td>`).join("");
    return `<tr>${tdHtml}</tr>`;
  });

  // Paragraphs / linebreaks
  html = html.split("\n\n").map(block => {
    if (block.startsWith("<h") || block.startsWith("<pre") || block.startsWith("<table") || block.startsWith("<tr>")) {
      if (block.startsWith("<tr>")) {
        return `<table><tbody>${block}</tbody></table>`;
      }
      return block;
    }
    return `<p>${block.replace(/\n/g, "<br>")}</p>`;
  }).join("\n");

  return html;
}

const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Chat Conversation & Technical Guide - LeadDesk Mini</title>
  <style>
    @page {
      size: A4;
      margin: 16mm 14mm 16mm 14mm;
    }
    body {
      font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif;
      color: #1e293b;
      background-color: #ffffff;
      line-height: 1.6;
      font-size: 13px;
      margin: 0;
      padding: 0;
    }
    .header {
      background: linear-gradient(135deg, #1e40af 0%, #2563eb 100%);
      color: white;
      padding: 22px 26px;
      border-radius: 8px;
      margin-bottom: 24px;
    }
    .header h1 {
      margin: 0 0 6px 0;
      font-size: 22px;
      color: white;
    }
    .header p {
      margin: 0;
      font-size: 12.5px;
      color: #dbeafe;
    }
    .chat-container {
      display: flex;
      flex-direction: column;
      gap: 18px;
    }
    .message-block {
      border-radius: 8px;
      padding: 14px 18px;
      page-break-inside: avoid;
      margin-bottom: 16px;
    }
    .message-user {
      background: #eff6ff;
      border: 1px solid #bfdbfe;
      border-left: 5px solid #2563eb;
    }
    .message-assistant {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-left: 5px solid #10b981;
      box-shadow: 0 1px 3px rgba(0,0,0,0.05);
    }
    .msg-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .user-tag { color: #1e40af; }
    .assistant-tag { color: #047857; }
    
    h1, h2, h3 {
      color: #0f172a;
      margin-top: 14px;
      margin-bottom: 6px;
    }
    h2 { font-size: 16px; border-bottom: 1px solid #e2e8f0; padding-bottom: 4px; }
    h3 { font-size: 14px; color: #1e40af; }
    p { margin: 6px 0; }
    code {
      font-family: Consolas, Monaco, monospace;
      background: #f1f5f9;
      padding: 2px 5px;
      border-radius: 4px;
      font-size: 11.5px;
      color: #0f172a;
    }
    pre {
      background: #0f172a;
      color: #f8fafc;
      padding: 10px 12px;
      border-radius: 6px;
      font-size: 11px;
      overflow-x: hidden;
      white-space: pre-wrap;
      word-wrap: break-word;
      page-break-inside: avoid;
    }
    pre code {
      background: transparent;
      color: inherit;
      padding: 0;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 10px 0;
      font-size: 12px;
    }
    th, td {
      border: 1px solid #cbd5e1;
      padding: 6px 8px;
      text-align: left;
    }
    th {
      background-color: #f1f5f9;
      color: #0f172a;
    }
    .footer {
      text-align: center;
      margin-top: 30px;
      font-size: 11px;
      color: #94a3b8;
      border-top: 1px solid #e2e8f0;
      padding-top: 10px;
    }
  </style>
</head>
<body>

  <div class="header">
    <h1>LeadDesk Mini - Chat & Discussion History</h1>
    <p>Complete transcript of questions, answers, architecture reviews, and deployment instructions</p>
  </div>

  <div class="chat-container">
    ${messages.map((m, idx) => `
      <div class="message-block ${m.role === 'User' ? 'message-user' : 'message-assistant'}">
        <div class="msg-header">
          <span class="${m.role === 'User' ? 'user-tag' : 'assistant-tag'}">
            ${m.role === 'User' ? '👤 User Question / Prompt' : '🤖 Assistant Solution & Guide'} #${idx + 1}
          </span>
        </div>
        <div class="msg-body">
          ${m.role === 'User' ? `<p style="font-weight:600;font-size:13.5px;color:#1e3a8a;">${m.text}</p>` : formatMarkdown(m.text)}
        </div>
      </div>
    `).join("")}
  </div>

  <div class="footer">
    LeadDesk Mini &bull; Complete Chat Transcript & Reference Guide &bull; Generated for Jyoti Kumari
  </div>

</body>
</html>
`;

fs.writeFileSync("c:\\Users\\Jyoti Kumari\\Desktop\\LeadDesk-Mini\\chat_history.html", htmlContent);
console.log("HTML created successfully");
