import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeHighlight from "rehype-highlight";
import "katex/dist/katex.min.css";
import "highlight.js/styles/github-dark.css";

export interface MarkdownMesssageProps {
  content: string;
}

const MarkdownMessage = ({ content }: MarkdownMesssageProps) => {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, remarkMath]}
      rehypePlugins={[rehypeKatex, rehypeHighlight]}
      components={{
        //@ts-expect-error
        code({ className, children, inline, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          //const codeText = String(children).trim();
          const codeText = String(children).replace(/\n$/, "");
          const codeId = `${className}-${codeText.length}`; // Unique ID
          return !inline && match ? (
            <div className="code-block">
              <button
                className="copy-btn"
                onClick={() => copyToClipboard(codeText, codeId)}
              >
                {copied === codeId ? "✅ Copied!" : "📋 Copy"}
              </button>
              <pre className="hljs">
                <code className={className} {...props}>
                  {children}
                </code>
              </pre>
            </div>
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export default MarkdownMessage;
