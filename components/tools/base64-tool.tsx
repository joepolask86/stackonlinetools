"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronRight, Copy, RotateCcw, Paintbrush } from "lucide-react";
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
    // if (success) {
    //   toast({
    //     title: "Copied!",
    //     description: "Output copied to clipboard.",
    //   });
    // }
  };

  const handleReset = () => {
    setInput("");
    setOutput("");
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="encode" className="w-full">
        <TabsList className="grid max-w-md mx-auto grid-cols-2 bg-blue-200/50 rounded-lg p-1 px-2 h-12">
          <TabsTrigger value="encode" className="text-lg text-gray-500 data-[state=active]:bg-blue-600 data-[state=active]:text-white shadow-none">Encode</TabsTrigger>
          <TabsTrigger value="decode" className="text-lg text-gray-500 data-[state=active]:bg-blue-600 data-[state=active]:text-white shadow-none">Decode</TabsTrigger>
        </TabsList>

        <TabsContent value="encode" className="space-y-4 mt-8">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Input Section */}
            <div className="flex-1 space-y-4">
              <div className="space-y-2">
                <Textarea
                  id="encode-input"
                  placeholder="Enter text to encode..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="min-h-[300px] font-mono bg-white border border-gray-300/50 rounded-lg p-4 text-md md:text-[17px]"
                />
              </div>
            </div>

            {/* Output Section */}
            <div className="flex-1 space-y-4">
              {/* Output Section */}
              <div className="space-y-2">
                <Textarea
                  id="output"
                  value={output}
                  readOnly
                  placeholder="Encoded output will appear here..."
                  className="min-h-[300px] font-mono bg-white border border-gray-300/50 rounded-lg p-4 text-md md:text-[17px] focus-visible:ring-0 focus-visible:ring-transparent"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">

              <Button 
                 onClick={handleEncode} 
                 disabled={!input.trim()}
                 className="h-11 gap-0 space-x-0 px-6 rounded-full text-md font-medium bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:-translate-y-0">
                Encode
                <ChevronRight className="h-2 w-2" />
              </Button>
              
              <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <Button 
                       variant="outline"
                       disabled={!input.trim()}
                       className="w-auto h-11 gap-0 space-x-0 px-6 text-md font-medium text-neutral-600 bg-white border border-gray-400 hover:border-gray-300 hover:text-neutral-700 hover:bg-white rounded-full transition-colors hover:-translate-y-0" 
                       onClick={handleReset}>
                        <Paintbrush className="mr-2 h-4 w-4" /> Reset
                     </Button>

                    <Button 
                      onClick={handleCopy} 
                      disabled={!output} className="w-auto h-11 gap-0 space-x-0 px-6 rounded-full font-medium text-center text-md bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-primary-foreground hover:-translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-blue-600 disabled:hover:to-indigo-600">
                      <Copy className="mr-2 h-4 w-4" />
                      Copy
                    </Button>
                  </div>
                </div>
          </div>
        </TabsContent>
        
        <TabsContent value="decode" className="space-y-4 mt-8">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Input Section */}
            <div className="flex-1 space-y-4">
              <div className="space-y-2">
                <Textarea
                  id="decode-input"
                  placeholder="Enter text to decode..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="min-h-[300px] font-mono bg-white border border-gray-300/50 rounded-lg p-4 text-md md:text-[17px]"
                />
              </div>
            </div>

            {/* Output Section */}
            <div className="flex-1 space-y-4">
              {/* Output Section */}
              <div className="space-y-2">
                <Textarea
                  id="output"
                  value={output}
                  readOnly
                  placeholder="Decoded output will appear here..."
                  className="min-h-[300px] font-mono bg-white border border-gray-300/50 rounded-lg p-4 text-md md:text-[17px] focus-visible:ring-0 focus-visible:ring-transparent"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">

              <Button 
                 onClick={handleDecode} 
                 disabled={!input.trim()}
                 className="h-11 gap-0 space-x-0 px-6 rounded-full text-md font-medium bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:-translate-y-0">
                Decode
                <ChevronRight className="h-2 w-2" />
              </Button>
              
              <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <Button 
                       variant="outline"
                       disabled={!input.trim()}
                       className="w-auto h-11 gap-0 space-x-0 px-6 text-md font-medium text-neutral-600 bg-white border border-gray-400 hover:border-gray-300 hover:text-neutral-700 hover:bg-white rounded-full transition-colors hover:-translate-y-0" 
                       onClick={handleReset}>
                        <Paintbrush className="mr-2 h-4 w-4" /> Reset
                     </Button>

                    <Button 
                      onClick={handleCopy} 
                      disabled={!output} className="w-auto h-11 gap-0 space-x-0 px-6 rounded-full font-medium text-center text-md bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-primary-foreground hover:-translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-blue-600 disabled:hover:to-indigo-600">
                      <Copy className="mr-2 h-4 w-4" />
                      Copy
                    </Button>
                  </div>
                </div>
          </div>
        </TabsContent>
        
      </Tabs>
    </div>
  );
}

