"use client";

import { useState, useRef } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Paintbrush, Copy, Download, Check } from "lucide-react";
import { copyToClipboard, downloadAsFile } from "@/lib/utils";

export default function CaseConverter() {
  const [input, setInput] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [hasBlurred, setHasBlurred] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Calculate text statistics
  const getTextStats = (text: string) => {
    const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
    const sentenceCount = text.trim() ? text.split(/[.!?]+/).filter(s => s.trim().length > 0).length : 0;
    const lineCount = text ? text.split('\n').length : 0;
    return { wordCount, sentenceCount, lineCount };
  };

  const stats = getTextStats(input);

  // Case conversion functions
  const convertToSentenceCase = (text: string) => {
    return text.toLowerCase().replace(/(^\w|\.\s+\w)/g, (match) => match.toUpperCase());
  };

  const convertToLowerCase = (text: string) => {
    return text.toLowerCase();
  };

  const convertToUpperCase = (text: string) => {
    return text.toUpperCase();
  };

  const convertToCapitalizeCase = (text: string) => {
    return text.replace(/\b\w/g, (match) => match.toUpperCase());
  };

  const convertToAlternatingCase = (text: string) => {
    return text.split('').map((char, index) => 
      index % 2 === 0 ? char.toLowerCase() : char.toUpperCase()
    ).join('');
  };

  const convertToTitleCase = (text: string) => {
    const smallWords = ['a', 'an', 'and', 'as', 'at', 'but', 'by', 'for', 'if', 'in', 'of', 'on', 'or', 'the', 'to', 'up', 'yet'];
    return text.replace(/\w\S*/g, (word, index) => {
      if (index === 0 || !smallWords.includes(word.toLowerCase())) {
        return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
      }
      return word.toLowerCase();
    });
  };

  const convertToInverseCase = (text: string) => {
    return text.split('').map(char => {
      if (char === char.toUpperCase()) {
        return char.toLowerCase();
      } else {
        return char.toUpperCase();
      }
    }).join('');
  };

  // Handle case conversion
  const handleCaseConversion = (converter: (text: string) => string) => {
    if (!input.trim()) {
      return;
    }
    
    const convertedText = converter(input);
    setInput(convertedText);
    setIsCopied(false); // Reset copied state when text changes
  };

  // Handle copy to clipboard
  const handleCopy = async () => {
    if (!input.trim()) {
      return;
    }

    const success = await copyToClipboard(input);
    if (success) {
      setIsCopied(true);
      
      // Reset the checkmark after 2 seconds
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }
  };

  // Handle download
  const handleDownload = () => {
    if (!input.trim()) {
      return;
    }

    downloadAsFile(input, "converted-text.txt", "text/plain");
  };

  // Handle reset
  const handleReset = () => {
    setInput("");
    setHasBlurred(false);
  };

  // Handle focus events
  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setHasBlurred(true);
  };

  // Check if textarea should show error state
  const showError = hasBlurred && !isFocused && !input.trim();

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <div className="space-y-2">
        <Label htmlFor="input-text" className="hidden">Input Text</Label>
        <Textarea
          ref={textareaRef}
          id="input-text"
          placeholder="Enter your text here..."
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setIsCopied(false); // Reset copied state when user types
          }}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={`min-h-[300px] textarea-content md:leading-7 ${
            showError ? 'border-red-500 focus:border-red-500' : ''
          }`}
        />
        <div className="flex items-center text-md text-muted-foreground">
          Character Count: <span className="font-medium text-neutral-700 px-2">{input.length}</span> | Word Count: <span className="font-medium text-neutral-700 px-2">{stats.wordCount}</span> | Sentence Count: <span className="font-medium text-neutral-700 px-2">{stats.sentenceCount}</span> | Line Count: <span className="font-medium text-neutral-700 px-2">{stats.lineCount}</span>
        </div>
      </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Left Column - Case Conversion Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <Button 
              onClick={() => handleCaseConversion(convertToSentenceCase)}
              className="w-full h-auto py-2 rounded-full text-center text-md font-medium text-indigo-700 bg-white hover:bg-white border border-indigo-700 hover:border-indigo-700 hover:text-indigo-700 hover:shadow-none rounded-full transition-colors hover:-translate-y-0"
            >
              Sentence case
            </Button>
            <Button 
              onClick={() => handleCaseConversion(convertToLowerCase)}
              className="w-full h-auto py-2 rounded-full text-center text-md font-medium text-indigo-700 bg-white hover:bg-white border border-indigo-700 hover:border-indigo-700 hover:text-indigo-700 hover:shadow-none rounded-full transition-colors hover:-translate-y-0"
            >
              lower case
            </Button>
            <Button 
              onClick={() => handleCaseConversion(convertToUpperCase)}
              className="w-full h-auto py-2 rounded-full text-center text-md font-medium text-indigo-700 bg-white hover:bg-white border border-indigo-700 hover:border-indigo-700 hover:text-indigo-700 hover:shadow-none rounded-full transition-colors hover:-translate-y-0"
            >
              UPPER CASE
            </Button>
            <Button 
              onClick={() => handleCaseConversion(convertToCapitalizeCase)}
              className="w-full h-auto py-2 rounded-full text-center text-md font-medium text-indigo-700 bg-white hover:bg-white border border-indigo-700 hover:border-indigo-700 hover:text-indigo-700 hover:shadow-none rounded-full transition-colors hover:-translate-y-0"
            >
              Capitalize Case
            </Button>
            <Button 
              onClick={() => handleCaseConversion(convertToAlternatingCase)}
              className="w-full h-auto py-2 rounded-full text-center text-md font-medium text-indigo-700 bg-white hover:bg-white border border-indigo-700 hover:border-indigo-700 hover:text-indigo-700 hover:shadow-none rounded-full transition-colors hover:-translate-y-0"
            >
              aLtErNaTiNg cAsE
            </Button>
            <Button 
              onClick={() => handleCaseConversion(convertToTitleCase)}
              className="w-full h-auto py-2 rounded-full text-center text-md font-medium text-indigo-700 bg-white hover:bg-white border border-indigo-700 hover:border-indigo-700 hover:text-indigo-700 hover:shadow-none rounded-full transition-colors hover:-translate-y-0"
            >
              Title Case
            </Button>
            <Button 
              onClick={() => handleCaseConversion(convertToInverseCase)}
              className="w-full h-auto py-2 rounded-full text-center text-md font-medium text-indigo-700 bg-white hover:bg-white border border-indigo-700 hover:border-indigo-700 hover:text-indigo-700 hover:shadow-none rounded-full transition-colors hover:-translate-y-0"
            >
              InVeRsE CaSe
            </Button>
          </div>

          {/* Right Column - Action Buttons */}
          <div className="space-x-2 flex justify-start md:justify-end">
            <Button 
              className="w-auto h-11 gap-0 space-x-0 px-6 text-md font-medium text-neutral-600 bg-white border border-gray-400 hover:border-gray-300 hover:text-neutral-700 hover:bg-white rounded-full transition-colors hover:-translate-y-0"
              variant="outline"
              onClick={handleReset}
              disabled={!input.trim()}
            >
              <Paintbrush className="mr-2 h-4 w-4" /> Reset
            </Button>
            <Button 
              onClick={handleDownload}
              disabled={!input.trim()}
              className="w-auto h-11 gap-0 space-x-0 px-6 rounded-full font-medium text-center text-md bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-primary-foreground hover:-translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-blue-600 disabled:hover:to-indigo-600"
            >
              <Download className="h-4 w-4 mr-2" /> Download
            </Button>
            <Button 
              onClick={handleCopy}
              disabled={!input.trim()}
              className="w-auto h-11 gap-0 space-x-0 px-6 rounded-full font-medium text-center text-md bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-primary-foreground hover:-translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-blue-600 disabled:hover:to-indigo-600"
            >
              {isCopied ? (
                <Check className="h-4 w-4 mr-2" />
              ) : (
                <Copy className="h-4 w-4 mr-2" />
              )}
              {isCopied ? "Copied!" : "Copy"}
            </Button>
          </div>
        </div>

    </div>
  );
}

