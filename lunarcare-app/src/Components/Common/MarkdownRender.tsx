import { marked } from "marked";
import React, { useState } from "react";

const MarkdownRenderer: React.FC<{ tip: string }> = ({ tip }) => {
  const [htmlContent, setHtmlContent] = useState("");

  React.useEffect(() => {
    const convertMarkdown = async () => {
      const html = await marked(tip);
      setHtmlContent(html);
    };
    convertMarkdown();
  }, [tip]);

  return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
};

export default MarkdownRenderer;
