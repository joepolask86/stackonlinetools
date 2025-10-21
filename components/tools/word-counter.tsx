"use client";

import { useState, useMemo, useCallback } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

export default function WordCounter() {
  const [text, setText] = useState("");
  const [keywordTab, setKeywordTab] = useState("TOP");

  const stats = useMemo(() => {
    const characters = text.length;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const sentences = text.split(/[.!?]+/).filter((s) => s.trim()).length;
    const paragraphs = text.split(/\n+/).filter((p) => p.trim()).length;
    
    // Pages calculation: approximately 500 words per page
    const pages = words > 0 ? (words / 500).toFixed(1) : "0.0";
    
    // Reading time: average 200 words per minute
    const readingTime = words > 0 ? (words / 200).toFixed(2) : "0.00";
    
    // Speaking time: average 150 words per minute  
    const speakingTime = words > 0 ? (words / 150).toFixed(2) : "0.00";

    return {
      characters,
      words,
      sentences,
      paragraphs,
      pages,
      readingTime,
      speakingTime,
    };
  }, [text]);

// Count syllables in a word (improved algorithm)
const countSyllables = useCallback((word: string): number => {
  word = word.toLowerCase().trim();
  if (word.length <= 3) return 1;
  
  // Remove non-letters
  word = word.replace(/[^a-z]/g, '');
  
  const vowels = 'aeiouy';
  let count = 0;
  let previousWasVowel = false;
  
  for (let i = 0; i < word.length; i++) {
    const isVowel = vowels.includes(word[i]);
    if (isVowel && !previousWasVowel) {
      count++;
    }
    previousWasVowel = isVowel;
  }
  
  // Handle silent 'e' at the end
  if (word.endsWith('e') && count > 1) {
    count--;
  }
  
  // Handle special endings that add syllables
  if (word.endsWith('le') && word.length > 2 && !vowels.includes(word[word.length - 3])) {
    count++;
  }
  
  // Handle 'ed' ending
  if (word.endsWith('ed') && count > 1 && !vowels.includes(word[word.length - 3])) {
    count--;
  }
  
  // Handle 'es' or 'e' at the end more accurately
  if (word.match(/[^aeiou]es$/) && count > 1) {
    count--;
  }
  
  return Math.max(1, count);
}, []);

// Calculate average syllables per word
const calculateAvgSyllables = useCallback((text: string): number => {
  const words = text.toLowerCase().match(/\b[a-z]+\b/g) || [];
  if (words.length === 0) return 0;
  
  const totalSyllables = words.reduce((total, word) => {
    return total + countSyllables(word);
  }, 0);
  
  return totalSyllables / words.length;
}, [countSyllables]);

  // Calculate reading level using Flesch Reading Ease formula
const readingLevel = useMemo(() => {
  if (stats.words === 0 || stats.sentences === 0) return {
    ease: "Not available",
    score: 0,
    grade: "N/A",
    gradeLevel: 0
  };
  
  const avgWordsPerSentence = stats.words / stats.sentences;
  const avgSyllablesPerWord = calculateAvgSyllables(text);
  
  // Flesch Reading Ease formula
  const score = Math.round(206.835 - (1.015 * avgWordsPerSentence) - (84.6 * avgSyllablesPerWord));
  
  // Flesch-Kincaid Grade Level formula
  const gradeLevel = Math.round((0.39 * avgWordsPerSentence) + (11.8 * avgSyllablesPerWord) - 15.59);
  
  let ease = "Very Difficult";
  let grade = "College graduate";
  
  if (score >= 90) {
    ease = "Very Easy";
    grade = "5th grade";
  } else if (score >= 80) {
    ease = "Easy";
    grade = "6th grade";
  } else if (score >= 70) {
    ease = "Fairly Easy";
    grade = "7th grade";
  } else if (score >= 60) {
    ease = "Standard";
    grade = "8th-9th grade";
  } else if (score >= 50) {
    ease = "Fairly Difficult";
    grade = "10th-12th grade";
  } else if (score >= 30) {
    ease = "Difficult";
    grade = "College";
  }
  
  return { ease, score, grade, gradeLevel };
}, [text, stats.words, stats.sentences, calculateAvgSyllables]);

  // Common stop words to filter out
  const stopWords = useMemo(() => new Set([
    'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'from', 'up', 'about', 'into', 'through', 'during', 'before', 'after', 'above', 'below', 'between', 'among', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might', 'must', 'can', 'this', 'that', 'these', 'those', 'i', 'you', 'he', 'she', 'it', 'we', 'they', 'me', 'him', 'her', 'us', 'them', 'my', 'your', 'his', 'her', 'its', 'our', 'their', 'mine', 'yours', 'hers', 'ours', 'theirs', 'myself', 'yourself', 'himself', 'herself', 'itself', 'ourselves', 'yourselves', 'themselves', 'what', 'which', 'who', 'whom', 'whose', 'where', 'when', 'why', 'how', 'all', 'any', 'both', 'each', 'few', 'more', 'most', 'other', 'some', 'such', 'no', 'nor', 'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very', 'just', 'now','keep'
  ]), []);

  // Generate keyword analysis
  const keywordAnalysis = useMemo(() => {
    if (!text.trim()) return { top: [], oneX: [], twoX: [], threeX: [] };
    
    // Normalize text once
    const normalized = text.toLowerCase().replace(/[^\w\s]/g, ' ');
    const tokens = normalized.split(/\s+/).filter(word => word.length > 0);
    
    // Helper to check if all words in phrase are valid
    const isValidPhrase = (phrase: string): boolean => {
      const words = phrase.split(' ');
      return words.every(word => word.length > 2 && !stopWords.has(word));
    };
    
    // Extract single words
    const words = tokens.filter(word => word.length > 2 && !stopWords.has(word));
    
    // Extract n-word phrases with single loop
    const twoWordPhrases: string[] = [];
    const threeWordPhrases: string[] = [];
    
    for (let i = 0; i < tokens.length; i++) {
      if (i < tokens.length - 1) {
        const phrase = `${tokens[i]} ${tokens[i + 1]}`;
        if (isValidPhrase(phrase)) {
          twoWordPhrases.push(phrase);
        }
      }
      
      if (i < tokens.length - 2) {
        const phrase = `${tokens[i]} ${tokens[i + 1]} ${tokens[i + 2]}`;
        if (isValidPhrase(phrase)) {
          threeWordPhrases.push(phrase);
        }
      }
    }
    
    // Count occurrences
    const wordCount: { [key: string]: number } = {};
    [...words, ...twoWordPhrases, ...threeWordPhrases].forEach(term => {
      wordCount[term] = (wordCount[term] || 0) + 1;
    });
    
    const totalWords = words.length + twoWordPhrases.length + threeWordPhrases.length;
    
    // Helper to format entries
    const formatEntries = (entries: [string, number][]) => 
      entries.map(([word, count]) => ({
        word,
        count,
        percentage: ((count / totalWords) * 100).toFixed(1)
      }));
    
    // Sort entries once
    const sortedEntries = Object.entries(wordCount).sort(([,a], [,b]) => (b as number) - (a as number));
    
    const top = formatEntries(sortedEntries.slice(0, 10));
    
    const oneX = formatEntries(
      sortedEntries
        .filter(([word]) => !word.includes(' '))
        .slice(0, 10)
    );
    
    const twoX = formatEntries(
      sortedEntries
        .filter(([word]) => word.split(' ').length === 2)
        .slice(0, 10)
    );
    
    const threeX = formatEntries(
      sortedEntries
        .filter(([word]) => word.split(' ').length >= 3)
        .slice(0, 10)
    );
    
    return { top, oneX, twoX, threeX };
  }, [text, stopWords]);
  
  const getCurrentKeywords = () => {
    switch (keywordTab) {
      case "1X": return keywordAnalysis.oneX;
      case "2X": return keywordAnalysis.twoX;
      case "3X": return keywordAnalysis.threeX;
      default: return keywordAnalysis.top;
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Left Column - Main Content */}
      <div className="flex-1 space-y-6">

        <div className="space-y-2 bg-white border border-gray-300/50 p-4 pt-2 rounded-md shadow-sm shadow-gray-200/50">
            {/* Top Statistics Bar */}
              <div className="flex flex-wrap justify-start gap-4 md:gap-12 py-4 pt-2 px-0 bg-white border-b border-gray-200">
                <div className="stats-item">
                  <h3 className="text-[14px] font-normal text-gray-500 uppercase mb-0.5">Words</h3>
                  <span className="text-2xl font-semibold text-gray-800">{stats.words}</span>
                </div>
                <div className="stats-item">
                  <h3 className="text-[14px] font-normal text-gray-500 uppercase mb-0.5">Characters</h3>
                  <span className="text-2xl font-semibold text-gray-800">{stats.characters}</span>
                </div>
                <div className="stats-item">
                  <h3 className="text-[14px] font-normal text-gray-500 uppercase mb-0.5">Sentences</h3>
                  <span className="text-2xl font-semibold text-gray-800">{stats.sentences}</span>
                </div>
                <div className="stats-item">
                  <h3 className="text-[14px] font-normal text-gray-500 uppercase mb-0.5">Paragraphs</h3>
                  <span className="text-2xl font-semibold text-gray-800">{stats.paragraphs}</span>
                </div>
                <div className="stats-item">
                  <h3 className="text-[14px] font-normal text-gray-500 uppercase mb-0.5">Pages</h3>
                  <span className="text-2xl font-semibold text-gray-800">{stats.pages}</span>
                </div>
              </div>

            {/* Text Input Area */}
            <div className="space-y-2">
              <Textarea
                id="text-input"
                placeholder="Start typing or paste your text here..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="min-h-[400px] lg:min-h-[500px] text-gray-800 bg-transparent border-none p-0 pt-2 pr-4 text-md md:text-[17px] shadow-none rounded-none focus-visible:ring-0 focus-visible:ring-transparent"
              />
            </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-full lg:w-80 space-y-4">
        {/* Reading Analysis Card */}
        <Card className="bg-white border border-gray-300/50 p-2 rounded-md shadow-sm shadow-gray-200/50">
          <CardContent className="p-2 py-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-800 font-medium">Reading Level:</span>
                <span className="text-sm text-white bg-blue-500 px-1.5 py-1 rounded-lg font-medium">{readingLevel.grade}</span>
              </div>
              <div className="border-t border-gray-200"></div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-800 font-medium">Reading Time:</span>
                <span className="text-sm text-gray-800 bg-gray-300 px-1.5 py-0.5 rounded-lg font-medium">{stats.readingTime} min</span>
              </div>
              <div className="border-t border-gray-200"></div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-800 font-medium">Speaking Time:</span>
                <span className="text-sm text-gray-800 bg-gray-300 px-1.5 py-0.5 rounded-lg font-medium">{stats.speakingTime} min</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Keywords Card */}
        <Card className="border border-gray-200">
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-base font-medium text-gray-800">Keyword Density</h3>
              
              {/* Keyword Tabs */}
              <div className="flex gap-1 bg-gray-100 rounded-md overflow-hidden">
                {["TOP", "1X", "2X", "3X"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setKeywordTab(tab)}
                    className={`px-2 py-1 text-xs font-medium rounded-none shadow-none ${
                      keywordTab === tab
                        ? "bg-gray-300 border-none border-gray-200 text-gray-800 "
                        : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Keyword List */}
            <div className="space-y-1">
              {getCurrentKeywords().map((item, index) => (
                <div key={index} className={`flex justify-between items-center text-sm p-2 py-1.5 rounded ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
                  <span className="text-gray-800">{item.word}</span>
                  <div className="text-right flex gap-2">
                    <span className="font-semibold text-gray-800">{item.count}</span>
                    <span className="text-neutral-600 w-[55px]">({item.percentage}%)</span>
                  </div>
                </div>
              ))}
              {getCurrentKeywords().length === 0 && (
                <div className="text-sm text-gray-500 text-center py-4">
                  No keywords found
                </div>
              )}
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}

