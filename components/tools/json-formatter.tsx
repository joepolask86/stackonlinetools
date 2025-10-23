"use client";

import { useState, useEffect, useCallback } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Copy, Download, Paintbrush } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { copyToClipboard, downloadAsFile } from "@/lib/utils";

export default function JsonFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [indentType, setIndentType] = useState("space");
  const [indentSize, setIndentSize] = useState(2);
  const { toast } = useToast();

  // Load from localStorage on component mount
  useEffect(() => {
    const savedInput = localStorage.getItem("json-formatter-input");
    const savedIndentType = localStorage.getItem("json-formatter-indent-type");
    const savedIndentSize = localStorage.getItem("json-formatter-indent-size");
    
    if (savedInput) {
      setInput(savedInput);
    }
    if (savedIndentType) {
      setIndentType(savedIndentType);
    }
    if (savedIndentSize) {
      setIndentSize(parseInt(savedIndentSize) || 2);
    }
  }, []);

  const handleMinify = () => {
    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
      setError("");
      // toast({
      //   title: "Success!",
      //   description: "JSON minified successfully.",
      // });
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
      // toast({
      //   title: "Copied!",
      //   description: "JSON copied to clipboard.",
      // });
    }
  };

  const handleDownload = () => {
    downloadAsFile(output, "formatted.json", "application/json");
    // toast({
    //   title: "Downloaded!",
    //   description: "File saved as formatted.json",
    // });
  };

  const handleReset = () => {
    setInput("");
    setOutput("");
    setError("");
    // Clear localStorage when reset is clicked
    localStorage.removeItem("json-formatter-input");
    localStorage.removeItem("json-formatter-indent-type");
    localStorage.removeItem("json-formatter-indent-size");
  };

  // Validate JSON on input change and auto-format
  const validateJSON = useCallback((jsonString: string) => {
    if (!jsonString.trim()) {
      setError("");
      setOutput("");
      return;
    }
    
    try {
      const parsed = JSON.parse(jsonString);
      setError("");
      
      // Auto-format valid JSON
      const indent = indentType === "tab" ? "\t" : " ".repeat(indentSize);
      const formatted = JSON.stringify(parsed, null, indent);
      setOutput(formatted);
    } catch (err) {
      setError((err as Error).message);
      setOutput("");
    }
  }, [indentType, indentSize]);

  // Auto-format when indent type or size changes
  useEffect(() => {
    if (input.trim()) {
      validateJSON(input);
    }
  }, [indentType, indentSize, input, validateJSON]);

  // Save to localStorage when input changes
  useEffect(() => {
    localStorage.setItem("json-formatter-input", input);
  }, [input]);

  // Save indent settings to localStorage
  useEffect(() => {
    localStorage.setItem("json-formatter-indent-type", indentType);
  }, [indentType]);

  useEffect(() => {
    localStorage.setItem("json-formatter-indent-size", indentSize.toString());
  }, [indentSize]);

  // Validate JSON when input changes
  useEffect(() => {
    validateJSON(input);
  }, [input, validateJSON]);

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <div className="space-y-2">
        <Textarea
          id="json-input"
          placeholder='{"key": "value"}'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="min-h-[350px] textarea-content md:leading-7 focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
        {error && (
          <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
            <strong>Error:</strong> {error}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2">
         <Select value={indentType} onValueChange={setIndentType}>
           <SelectTrigger className="w-[150px] h-11 focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0">
             <SelectValue placeholder="Indent Type" />
           </SelectTrigger>
          <SelectContent className="text-lg">
            <SelectItem value="space">Space</SelectItem>
            <SelectItem value="tab">Tab</SelectItem>
          </SelectContent>
        </Select>
        <Input 
          type="number" 
          step="1" 
          min="1" 
          max="10" 
          value={indentSize} 
          onChange={(e) => setIndentSize(parseInt(e.target.value) || 2)}
          className="w-[100px] h-11 text-md bg-white focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0" 
        />
         <Button 
          variant="outline"
          onClick={handleReset}
          disabled={!input.trim()}
          className="w-auto h-11 gap-0 space-x-0 px-6 text-md font-medium text-neutral-600 bg-white border border-gray-400 hover:border-gray-300 hover:text-neutral-700 hover:bg-white rounded-full transition-colors hover:-translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed"
           >
          <Paintbrush className="mr-2 h-4 w-4" />
          Reset
        </Button>
        <Button 
           onClick={handleMinify}
           disabled={!input.trim()}
           className="w-auto h-11 gap-0 space-x-0 px-6 rounded-full font-medium text-center text-md bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-primary-foreground hover:-translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-blue-600 disabled:hover:to-indigo-600"
           >
          Minify
        </Button>
      </div>

      {/* Output Section */}
      {output && (
        <div className="space-y-2">
          <div className="flex items-center justify-end">
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" onClick={handleCopy} className="w-auto h-11 gap-0 space-x-0 px-6 rounded-full font-medium text-center text-md bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white hover:text-white hover:-translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-blue-600 disabled:hover:to-indigo-600">
                <Copy className="mr-2 h-4 w-4" />
                Copy
              </Button>
              <Button 
                 variant="outline" 
                 onClick={handleDownload} className="h-11 space-x-0 px-6 text-md font-medium text-neutral-600 bg-white border border-gray-400 hover:border-gray-300 hover:text-neutral-700 hover:bg-white rounded-full transition-colors hover:-translate-y-0">
                <Download className="h-4 w-4" />
                Download
              </Button>
            </div>
          </div>
          <Textarea
            id="json-output"
            value={output}
            readOnly
            className="min-h-[300px] textarea-content md:leading-7 focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
          <div className="text-sm text-muted-foreground">
            {output.length} characters
          </div>
        </div>
      )}
    </div>
  );
}

