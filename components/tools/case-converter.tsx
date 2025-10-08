"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy, Download, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { copyToClipboard, downloadAsFile } from "@/lib/utils";

export default function CaseConverter() {
  const [input, setInput] = useState("");
  const { toast } = useToast();

  const convertCase = (type: string) => {
    switch (type) {
      case "uppercase":
        return input.toUpperCase();
      case "lowercase":
        return input.toLowerCase();
      case "titlecase":
        return input.replace(/\w\S*/g, (txt) => 
          txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
        );
      case "sentencecase":
        return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
      case "camelcase":
        return input
          .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
            index === 0 ? word.toLowerCase() : word.toUpperCase()
          )
          .replace(/\s+/g, "");
      case "snakecase":
        return input.toLowerCase().replace(/\s+/g, "_");
      case "kebabcase":
        return input.toLowerCase().replace(/\s+/g, "-");
      default:
        return input;
    }
  };

  const handleConvert = async (type: string) => {
    const result = convertCase(type);
    await copyToClipboard(result);
    toast({
      title: "Copied!",
      description: `${type} text copied to clipboard.`,
    });
  };

  const handleDownload = (type: string) => {
    const result = convertCase(type);
    downloadAsFile(result, `${type}.txt`);
    toast({
      title: "Downloaded!",
      description: `File saved as ${type}.txt`,
    });
  };

  const handleReset = () => {
    setInput("");
  };

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <div className="space-y-2">
        <Label htmlFor="input-text">Input Text</Label>
        <Textarea
          id="input-text"
          placeholder="Enter your text here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="min-h-[200px] font-mono"
        />
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>{input.length} characters</span>
          <Button variant="ghost" size="sm" onClick={handleReset}>
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset
          </Button>
        </div>
      </div>

      {/* Conversion Buttons */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { type: "uppercase", label: "UPPERCASE" },
          { type: "lowercase", label: "lowercase" },
          { type: "titlecase", label: "Title Case" },
          { type: "sentencecase", label: "Sentence case" },
          { type: "camelcase", label: "camelCase" },
          { type: "snakecase", label: "snake_case" },
          { type: "kebabcase", label: "kebab-case" },
        ].map(({ type, label }) => (
          <div key={type} className="space-y-2">
            <div className="rounded-lg border bg-muted/50 p-4">
              <div className="mb-2 text-sm font-medium">{label}</div>
              <div className="mb-3 min-h-[60px] break-words rounded bg-background p-2 text-sm font-mono">
                {input ? convertCase(type) : "Preview will appear here..."}
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  className="flex-1"
                  onClick={() => handleConvert(type)}
                  disabled={!input}
                >
                  <Copy className="mr-2 h-3 w-3" />
                  Copy
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDownload(type)}
                  disabled={!input}
                >
                  <Download className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

