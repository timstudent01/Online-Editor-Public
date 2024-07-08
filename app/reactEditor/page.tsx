"use client";

import React, { useState, useEffect } from "react";
import Editor, { OnChange } from "@monaco-editor/react";
import useDebounceValue from "../hook/useDebounceValue";

const defaultCode = `

  const App = () => {
    const { useState } = React;
    

    const [count, setCount] = useState(0);
    
    return (
        <div>
          <p>
            {count}
          </p>
          <button className="px-4 py-2 flex justify-center items-center bg-blue-500 rounded-lg text-white" onClick={()=>setCount(prev=>prev+1)}>
            Count +1
          </button>
        </div>
    );
  };





  

  `;

const Preview = ({ code }: { code: string }) => {
  const srcDoc = `
      <html>
        <head>
          <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
        </head>
        <body>
          <div id="root"></div>
          <script type="text/javascript" src="https://unpkg.com/babel-standalone@6/babel.js"></script>
           <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
            <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
           <script type="text/babel">
            const { createRoot } = ReactDOM;

            ${code}
            const root = createRoot(document.getElementById('root'));
            root.render(<App />);
          </script>
          </body>
      </html>
    `;

  return (
    <iframe
      title="preview"
      srcDoc={srcDoc}
      className="w-full h-full border-none"
      sandbox="allow-scripts"
      //   style={{ width: "100%", height: "300px", border: "none" }}
    />
  );
};

type EditorProps = {
  value: string;
  onChange: (value: string) => void;
  height?: string;
};

const ReactEditorComponent: React.FC<EditorProps> = ({
  value,
  onChange,
  height = "500",
}) => {
  const handleChange: OnChange = (value) => {
    onChange(value || "");
  };

  return (
    <Editor
      height={`${height}px`}
      defaultLanguage="javascript"
      value={value}
      onChange={handleChange}
      options={{
        minimap: { enabled: false },
        fontSize: 14,
      }}
    />
  );
};

const ReactEditor: React.FC = () => {
  const [code, setCode] = useState<string>(defaultCode);
  const [preCode, setPreCode] = useState<string>(defaultCode);
  const [editorHeight, setEditorHeight] = useState<string>("500");
  const debounceValue = useDebounceValue(editorHeight, 1000);

  const runCode = () => {
    localStorage.setItem("code", preCode);
    if (localStorage.getItem("code")) {
      setPreCode(localStorage.getItem("code") || "");
      setCode(localStorage.getItem("code") || "");
    }
  };

  const resetCode = () => {
    if (localStorage.getItem("code")) {
      localStorage.removeItem("code");
      setCode(defaultCode);
      setPreCode(defaultCode);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("code")) {
      setCode(localStorage.getItem("code") || "");
      setPreCode(localStorage.getItem("code") || "");
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow rounded p-4 mb-4 h-96">
        <Preview code={code} />
      </div>
      <div className="p-4 bg-gray-800 text-white flex justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={runCode}
        >
          Run Code
        </button>
        <button
          className="bg-red-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={resetCode}
        >
          Reset Code
        </button>
      </div>
      <div className="bg-white shadow rounded p-4">
        <div className="flex justify-between mb-4">
          <div className="flex space-x-4">
            <div
              className={`cursor-pointer p-2 border-b-2 border-blue-500 text-blue-500`}
            >
              React
            </div>
            <div className="ml-4 flex items-center">
              <p className="px-2">調整編輯器高度</p>
              <input
                type="number"
                className="rounded-lg border border-gray-300 px-2"
                value={editorHeight}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setEditorHeight(e.target.value);
                }}
              />
              <p className="px-2">px</p>
            </div>
          </div>
        </div>

        <div>
          <div className="mt-4">
            <ReactEditorComponent
              value={preCode}
              onChange={setPreCode}
              height={debounceValue}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReactEditor;
