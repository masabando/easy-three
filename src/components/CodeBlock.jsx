"use client";
import { BsCopy } from "react-icons/bs";
import SyntaxHighlighter from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { useState, useRef } from "react";

export default function CodeBlock({
  language = "javascript",
  filename,
  className = "",
  style = {},
  showLineNumbers = false,
  children,
}) {
  const [msg, setMsg] = useState("");
  const ref = useRef();
  return (
    <div className={`my-6 max-w-full ${className}`} style={style}>
      {filename && (
        <div className="flex justify-between bg-gray-500 text-white px-3 py-2 rounded-t-lg text-sm max-w-full">
          {filename}
          <div className="flex items-center gap-2">
            <div className="font-bold">{msg}</div>
            <BsCopy
              className="ms-auto cursor-pointer"
              onClick={() => {
                navigator.clipboard.writeText(children);
                setMsg("copied!");
                if (ref.current) {
                  clearTimeout(ref.current);
                }
                ref.current = setTimeout(() => setMsg(""), 1000);
              }}
            />
          </div>
        </div>
      )}
      <SyntaxHighlighter
        showLineNumbers={showLineNumbers}
        language={language}
        style={a11yDark}
        className={`${filename ? "rounded-b-lg" : "rounded-lg"} p-3! text-sm max-w-full!`}
      >
        {children}
      </SyntaxHighlighter>
    </div>
  );
}
