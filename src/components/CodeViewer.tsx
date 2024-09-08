import React, { useContext } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark as dark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Button } from "./ui/button";
import { Check, ClipboardIcon } from "lucide-react";
import { useClipboard } from "@frontend-opensource/use-react-hooks";

import reactElementToJSXString from "react-element-to-jsx-string";
import { VictoryBar } from "victory";
import { ChartContext } from "@/context";

const CodeViewer = () => {
  const { formData } = useContext(ChartContext)!;
  const codeString = reactElementToJSXString(
    <VictoryBar
      // @ts-ignore
      data="data"
      style={{
        data: {
          fill: formData?.chartStyle?.fillColor.value,
          stroke: formData?.chartStyle?.stroke?.color.value,
          strokeWidth: formData?.chartStyle?.stroke?.width.value,
        },
      }}
      labels={({ datum }) => `(${datum.x},${datum.y})`}
    />,
    {
      showFunctions: true,
      showDefaultProps: false,
    }
  );

  const { copied, copyText } = useClipboard({ resetTime: 1000 });

  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>React Code</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-0 z-10 right-0 m-2 shadow-md bg-[#ffc107] hover:bg-[#c89706]"
            onClick={() => copyText(codeString)}
          >
            {copied ? <Check size={16} /> : <ClipboardIcon size={16} />}
          </Button>

          <SyntaxHighlighter language="jsx" style={dark} className="rounded-md">
            {codeString}
          </SyntaxHighlighter>
        </div>
      </CardContent>
    </Card>
  );
};

export default CodeViewer;
