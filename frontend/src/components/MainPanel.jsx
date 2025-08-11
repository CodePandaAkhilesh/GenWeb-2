import { useState } from "react";
import DarkModeToggle from "./DarkModeToggle";
import { useNavigate } from "react-router-dom";
import { handleSuccess } from "../utils";
import "../styles/MainPanel.css";
import axios from "axios";

/**
 * MainPanel Component
 * -------------------
 * This is the core component of the application where:
 * - Users input prompts to generate web applications.
 * - The backend returns HTML, CSS, JS which are extracted and rendered.
 * - Code can be viewed in tabs (HTML, CSS, JS, Preview).
 * - Includes dark mode toggle and logout functionality.
 */

const MainPanel = ({ loggedInUser }) => {
  // State management
  const [prompt, setPrompt] = useState("");
  const [lastPrompt, setLastPrompt] = useState(""); // Stores last submitted prompt
  const [code, setCode] = useState({ html: "", css: "", js: "" }); // Stores generated code blocks
  const [activeTab, setActiveTab] = useState("Website"); // Controls selected tab
  const [showSplitLayout, setShowSplitLayout] = useState(false); // Toggles layout after first submission
  const [copied, setCopied] = useState(false); // Copy feedback
  const [loading, setLoading] = useState(false); // Submission loading state

  const navigate = useNavigate();

  /**
   * Extracts HTML, CSS, and JS code blocks from the LLM's response string.
   * Uses RegEx to isolate code blocks from markdown format.
   */
  const extractCodeBlocks = (text) => {
    const html = text.match(/```html\n([\s\S]*?)```/)?.[1] || "";
    const css = text.match(/```css\n([\s\S]*?)```/)?.[1] || "";
    const js = text.match(/```js\n([\s\S]*?)```/)?.[1] || "";
    return { html, css, js };
  };

  /**
   * Sends the user's prompt to the backend API to generate code.
   * Sets loading state, extracts code blocks, and updates the UI accordingly.
   */
  const handleSubmit = async () => {
    if (!prompt.trim() || loading) return;
    setShowSplitLayout(true);
    setLoading(true);
    setLastPrompt(prompt);

    try {
      const res = await axios.post(
        "http://localhost:8080/api/openai/generate",
        { prompt }
      );
      const codeBlocks = extractCodeBlocks(res.data.code);
      setCode(codeBlocks);
    } catch (error) {
      console.error("Failed to generate code.");
    }

    setLoading(false);
    setPrompt("");
  };

  /**
   * Renders either HTML, CSS, JS code or the live website preview.
   * Preview uses iframe with injected CSS/JS for safe live rendering.
   */
  const renderPreview = () => {
    if (["HTML", "CSS", "JS"].includes(activeTab)) {
      return (
        <div className="code-scroll">
          <pre>{code[activeTab.toLowerCase()]}</pre>
        </div>
      );
    }

    if (activeTab === "Preview") {
      // Add script to prevent links from opening in same tab
      const linkScript = `
        <script>
          window.onload = function () {
            const anchors = document.querySelectorAll('a');
            anchors.forEach(a => {
              a.setAttribute('target', '_blank');
              a.setAttribute('rel', 'noopener noreferrer');
            });
          }
        </script>
      `;

      return (
        <iframe
          title="preview"
          className="website-preview"
          style={{ width: "100%", height: "100%", border: "none" }}
          srcDoc={`<!DOCTYPE html>
            <html>
              <head>
                <meta charset="UTF-8" />
                <style>${code.css}</style>
              </head>
              <body>
                ${code.html}
                <script>${code.js}</script>
                ${linkScript}
              </body>
            </html>`}
        />
      );
    }
  };

  /**
   * Copies currently active code block to clipboard.
   * Shows temporary feedback on successful copy.
   */
  const handleCopy = () => {
    const textToCopy = code[activeTab.toLowerCase()];
    if (textToCopy) {
      navigator.clipboard.writeText(textToCopy).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  /**
   * Logs out the current user and navigates to login screen.
   */
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    handleSuccess("User Logged out");
    setTimeout(() => navigate("/login"), 1000);
  };

  return (
    <div className="main-panel">
      {/* Top controls: theme toggle and logout */}
      <div className="top-controls">
        <DarkModeToggle />
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>

      {/* Initial prompt input layout */}
      {!showSplitLayout ? (
        <div className="panel-container">
          <h1 className="main-heading">Build, Any Web Application</h1>
          <p className="sub-heading">With Your 24/7 MyGen</p>
          {loggedInUser && (
            <p className="welcome-text">
              Welcome, <span className="username">{loggedInUser}</span>
            </p>
          )}
          <div className="input-section">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              placeholder="What do you want to build? (e.g., Swiggy clone)"
              className="prompt-input"
              disabled={loading}
            />
            <button
              onClick={handleSubmit}
              className="generate-button"
              disabled={!prompt.trim() || loading}
            >
              {loading ? "Generating..." : "➤ Generate"}
            </button>
          </div>
        </div>
      ) : (
        // Split layout after code generation
        <div className="split-layout">
          <div className="left-split">
            <div className="status-message">
              {loading && lastPrompt && (
                <p className="status-text">
                  Creating your Web Application ...
                </p>
              )}
              {!loading && lastPrompt && (
                <p className="status-text">
                  Your Website is Ready ✅
                </p>
              )}
            </div>

            {/* Prompt input section at bottom of left panel */}
            <div className="input-section bottom">
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                placeholder="What do you want to build?"
                className="prompt-input"
                disabled={loading}
              />
              <button
                onClick={handleSubmit}
                className="generate-button"
                disabled={!prompt.trim() || loading}
              >
                {loading ? "Generating..." : "➤ Generate"}
              </button>
            </div>
          </div>

          {/* Code/Preview section */}
          <div className="right-split">
            <div className="top-buttons">
              {["HTML", "CSS", "JS", "Preview"].map((tab) => (
                <button
                  key={tab}
                  className={`code-tab ${activeTab === tab ? "active" : ""}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}

              {/* Copy button only shown on code tabs */}
              {["HTML", "CSS", "JS"].includes(activeTab) && (
                <button
                  className={`copy-button ${copied ? "copied" : ""}`}
                  onClick={handleCopy}
                >
                  {copied ? "✓ Copied!" : "📋 Copy"}
                </button>
              )}
            </div>

            {/* Code or Preview rendering */}
            <div
              className="preview-box"
              style={{ flex: 1, height: "100%", overflow: "hidden" }}
            >
              {renderPreview()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainPanel;
