"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { copyToClipboard } from "@/lib/utils";

export default function Base64Tool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const { toast } = useToast();

  const handleEncode = () => {
    try {
      const encoded = btoa(input);
      setOutput(encoded);
    } catch {
      toast({
        title: "Error",
        description: "Failed to encode. Please check your input.",
        variant: "destructive",
      });
    }
  };

  const handleDecode = () => {
    try {
      const decoded = atob(input);
      setOutput(decoded);
    } catch {
      toast({
        title: "Error",
        description: "Invalid Base64 string. Please check your input.",
        variant: "destructive",
      });
    }
  };

  const handleCopy = async () => {
    const success = await copyToClipboard(output);
    if (success) {
      toast({
        title: "Copied!",
        description: "Output copied to clipboard.",
      });
    }
  };

  const handleReset = () => {
    setInput("");
    setOutput("");
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="encode" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="encode">Encode</TabsTrigger>
          <TabsTrigger value="decode">Decode</TabsTrigger>
        </TabsList>

        <TabsContent value="encode" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="encode-input">Text to Encode</Label>
            <Textarea
              id="encode-input"
              placeholder="Enter text to encode..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="min-h-[150px] font-mono"
            />
          </div>
          <Button onClick={handleEncode} className="w-full">
            Encode to Base64
          </Button>
        </TabsContent>

        <TabsContent value="decode" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="decode-input">Base64 to Decode</Label>
            <Textarea
              id="decode-input"
              placeholder="Enter Base64 string to decode..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="min-h-[150px] font-mono"
            />
          </div>
          <Button onClick={handleDecode} className="w-full">
            Decode from Base64
          </Button>
        </TabsContent>
      </Tabs>

      {/* Output Section */}
      {output && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="output">Output</Label>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" onClick={handleCopy}>
                <Copy className="mr-2 h-4 w-4" />
                Copy
              </Button>
              <Button variant="ghost" size="sm" onClick={handleReset}>
                <RotateCcw className="mr-2 h-4 w-4" />
                Reset
              </Button>
            </div>
          </div>
          <Textarea
            id="output"
            value={output}
            readOnly
            className="min-h-[150px] font-mono bg-muted"
          />
        </div>
      )}
    </div>
  );
}

