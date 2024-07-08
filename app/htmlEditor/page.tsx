"use client";
// src/EditorPage.tsx
import React, { useEffect, useState } from "react";
import Editor, { OnChange } from "@monaco-editor/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

type EditorProps = {
  value: string;
  onChange: (value: string) => void;
};

const EDITOR_HEIGHT = "300px";

const HtmlEditor: React.FC<EditorProps> = ({ value, onChange }) => {
  const handleChange: OnChange = (value) => {
    onChange(value || "");
  };

  return (
    <Editor
      height={EDITOR_HEIGHT}
      language="html"
      value={value}
      onChange={handleChange}
      options={{ minimap: { enabled: false } }}
    />
  );
};

const CssEditor: React.FC<EditorProps> = ({ value, onChange }) => {
  const handleChange: OnChange = (value) => {
    onChange(value || "");
  };

  return (
    <Editor
      height={EDITOR_HEIGHT}
      language="css"
      value={value}
      onChange={handleChange}
      options={{ minimap: { enabled: false } }}
    />
  );
};

const JsEditor: React.FC<EditorProps> = ({ value, onChange }) => {
  const handleChange: OnChange = (value) => {
    onChange(value || "");
  };

  return (
    <Editor
      height={EDITOR_HEIGHT}
      language="javascript"
      value={value}
      onChange={handleChange}
      options={{ minimap: { enabled: false } }}
    />
  );
};

type PreviewProps = {
  html: string;
  css: string;
  js: string;
};

const Preview: React.FC<PreviewProps> = ({ html, css, js }) => {
  const srcDoc = `
    <html>
      <style>${css}</style>
      <body>
        ${html}
        <script>${js}</script>
      </body>
    </html>
  `;
  return (
    <iframe
      srcDoc={srcDoc}
      title="preview"
      className="w-full h-full border-none"
    />
  );
};

const EditorPage: React.FC = () => {
  const [html, setHtml] = useState<string>("");
  const [css, setCss] = useState<string>("");
  const [js, setJs] = useState<string>("");
  const [previewHtml, setPreviewHtml] = useState<string>("");
  const [previewCss, setPreviewCss] = useState<string>("");
  const [previewJs, setPreviewJs] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"html" | "css" | "js">("html");

  const updatePreview = () => {
    localStorage.setItem("html", html);
    localStorage.setItem("css", css);
    localStorage.setItem("js", js);
    if (localStorage.getItem("html")) {
      setPreviewHtml(localStorage.getItem("html") || "");
    }
    if (localStorage.getItem("css")) {
      setPreviewCss(localStorage.getItem("css") || "");
    }
    if (localStorage.getItem("js")) {
      setPreviewJs(localStorage.getItem("js") || "");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("html")) {
      setHtml(localStorage.getItem("html") || "");
      setPreviewHtml(localStorage.getItem("html") || "");
    }
    if (localStorage.getItem("css")) {
      setCss(localStorage.getItem("css") || "");
      setPreviewCss(localStorage.getItem("css") || "");
    }
    if (localStorage.getItem("js")) {
      setJs(localStorage.getItem("js") || "");
      setPreviewJs(localStorage.getItem("js") || "");
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow rounded p-4 mb-4 h-96">
        <Preview html={previewHtml} css={previewCss} js={previewJs} />
      </div>
      <button
        onClick={updatePreview}
        className="bg-blue-500 text-white p-2 rounded mb-4"
      >
        更新
      </button>
      <div className="bg-white shadow rounded p-4">
        <div className="flex justify-between mb-4">
          <div className="flex space-x-4">
            <div
              onClick={() => setActiveTab("html")}
              className={`cursor-pointer p-2 border-b-2 ${
                activeTab === "html"
                  ? "border-blue-500 text-blue-500"
                  : "border-transparent"
              }`}
            >
              HTML
            </div>
            <div
              onClick={() => setActiveTab("css")}
              className={`cursor-pointer p-2 border-b-2 ${
                activeTab === "css"
                  ? "border-blue-500 text-blue-500"
                  : "border-transparent"
              }`}
            >
              CSS
            </div>
            <div
              onClick={() => setActiveTab("js")}
              className={`cursor-pointer p-2 border-b-2 ${
                activeTab === "js"
                  ? "border-blue-500 text-blue-500"
                  : "border-transparent"
              }`}
            >
              JavaScript
            </div>
          </div>
          <button className="text-gray-500 hover:text-gray-700 focus:outline-none">
            <FontAwesomeIcon icon={faBars} size="lg" />
          </button>
        </div>
        <div>
          {activeTab === "html" && (
            <HtmlEditor value={html} onChange={setHtml} />
          )}
          {activeTab === "css" && <CssEditor value={css} onChange={setCss} />}
          {activeTab === "js" && <JsEditor value={js} onChange={setJs} />}
        </div>
      </div>
    </div>
  );
};

export default EditorPage;
