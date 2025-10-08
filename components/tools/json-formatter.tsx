"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy, Download, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { copyToClipboard, downloadAsFile } from "@/lib/utils";

export default function JsonFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const { toast } = useToast();

  const handleFormat = (spaces: number = 2) => {
    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, spaces);
      setOutput(formatted);
      setError("");
      toast({
        title: "Success!",
        description: "JSON formatted successfully.",
      });
    } catch (err) {
      setError((err as Error).message);
      toast({
        title: "Invalid JSON",
        description: "Please check your JSON syntax.",
        variant: "destructive",
      });
    }
  };

  const handleMinify = () => {
    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
      setError("");
      toast({
        title: "Success!",
        description: "JSON minified successfully.",
      });
    } catch (err) {
      setError((err as Error).message);
      toast({
        title: "Invalid JSON",
        description: "Please check your JSON syntax.",
        variant: "destructive",
      });
    }
  };

  const handleCopy = async () => {
    const success = await copyToClipboard(output);
    if (success) {
      toast({
        title: "Copied!",
        description: "JSON copied to clipboard.",
      });
    }
  };

  const handleDownload = () => {
    downloadAsFile(output, "formatted.json", "application/json");
    toast({
      title: "Downloaded!",
      description: "File saved as formatted.json",
    });
  };

  const handleReset = () => {
    setInput("");
    setOutput("");
    setError("");
  };

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <div className="space-y-2">
        <Label htmlFor="json-input">JSON Input</Label>
        <Textarea
          id="json-input"
          placeholder='{"key": "value"}'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="min-h-[200px] font-mono"
        />
        {error && (
          <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
            <strong>Error:</strong> {error}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2">
        <Button onClick={() => handleFormat(2)}>Format (2 spaces)</Button>
        <Button onClick={() => handleFormat(4)} variant="outline">
          Format (4 spaces)
        </Button>
        <Button onClick={handleMinify} variant="outline">
          Minify
        </Button>
        <Button onClick={handleReset} variant="ghost">
          <RotateCcw className="mr-2 h-4 w-4" />
          Reset
        </Button>
      </div>

      {/* Output Section */}
      {output && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="json-output">Formatted JSON</Label>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" onClick={handleCopy}>
                <Copy className="mr-2 h-4 w-4" />
                Copy
              </Button>
              <Button variant="ghost" size="sm" onClick={handleDownload}>
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            </div>
          </div>
          <Textarea
            id="json-output"
            value={output}
            readOnly
            className="min-h-[200px] font-mono bg-muted"
          />
          <div className="text-sm text-muted-foreground">
            {output.length} characters
          </div>
        </div>
      )}
    </div>
  );
}

