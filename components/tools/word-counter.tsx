"use client";

import { useState, useMemo } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

export default function WordCounter() {
  const [text, setText] = useState("");

  const stats = useMemo(() => {
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, "").length;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const sentences = text.split(/[.!?]+/).filter((s) => s.trim()).length;
    const paragraphs = text.split(/\n+/).filter((p) => p.trim()).length;
    const lines = text.split(/\n/).length;
    
    // Reading time: average 200 words per minute
    const readingTime = Math.ceil(words / 200);
    
    // Speaking time: average 150 words per minute
    const speakingTime = Math.ceil(words / 150);

    return {
      characters,
      charactersNoSpaces,
      words,
      sentences,
      paragraphs,
      lines,
      readingTime,
      speakingTime,
    };
  }, [text]);

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <div className="space-y-2">
        <Label htmlFor="text-input">Enter Your Text</Label>
        <Textarea
          id="text-input"
          placeholder="Start typing or paste your text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="min-h-[300px] font-mono"
        />
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-3xl font-bold text-primary">
              {stats.characters.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">Characters</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-3xl font-bold text-primary">
              {stats.charactersNoSpaces.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">
              Characters (no spaces)
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-3xl font-bold text-primary">
              {stats.words.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">Words</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-3xl font-bold text-primary">
              {stats.sentences.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">Sentences</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-3xl font-bold text-primary">
              {stats.paragraphs.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">Paragraphs</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-3xl font-bold text-primary">
              {stats.lines.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">Lines</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-3xl font-bold text-primary">
              {stats.readingTime}
            </div>
            <div className="text-sm text-muted-foreground">
              Min(s) to Read
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-3xl font-bold text-primary">
              {stats.speakingTime}
            </div>
            <div className="text-sm text-muted-foreground">
              Min(s) to Speak
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Info */}
      <div className="rounded-lg border bg-muted/50 p-4">
        <h3 className="mb-2 font-semibold">Analysis Details</h3>
        <div className="grid gap-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Average word length:</span>
            <span className="font-medium">
              {stats.words > 0
                ? (stats.charactersNoSpaces / stats.words).toFixed(1)
                : 0}{" "}
              characters
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">
              Average sentence length:
            </span>
            <span className="font-medium">
              {stats.sentences > 0
                ? (stats.words / stats.sentences).toFixed(1)
                : 0}{" "}
              words
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

