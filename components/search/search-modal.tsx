"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import Fuse from "fuse.js";
import { Search } from "lucide-react";
import { toolsMetadata } from "@/lib/tool-registry";
import { ToolMetadata } from "@/types/tool";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import * as Icons from "lucide-react";
import { LucideIcon } from "lucide-react";

interface SearchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SearchModal({ open, onOpenChange }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<{ item: ToolMetadata; refIndex: number; score?: number }[]>([]);
  const router = useRouter();

  // Initialize Fuse.js for fuzzy search (memoized to prevent recreating on every render)
  const fuse = useMemo(
    () =>
      new Fuse(toolsMetadata, {
        keys: ["name", "description", "tags", "category"],
        threshold: 0.3,
        includeScore: true,
      }),
    []
  );

  // Search handler
  const handleSearch = useCallback(
    (searchQuery: string) => {
      if (!searchQuery.trim()) {
        setResults([]);
        return;
      }

      const searchResults = fuse.search(searchQuery);
      setResults(searchResults.slice(0, 8));
    },
    [fuse]
  );

  useEffect(() => {
    handleSearch(query);
  }, [query, handleSearch]);

  const handleSelect = (slug: string) => {
    router.push(`/tool/${slug}`);
    onOpenChange(false);
    setQuery("");
  };

  const getIcon = (iconName: string): LucideIcon => {
    return (Icons[iconName as keyof typeof Icons] as LucideIcon) || Icons.Box;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg w-[90%] sm:w-full p-0 gap-0 !top-20 !left-[50%] !translate-x-[-50%] !translate-y-0 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 duration-300 ease-out [&[data-state=closed]]:!slide-out-to-left-1/2 [&[data-state=closed]]:!slide-out-to-top-[48%] [&[data-state=open]]:!slide-in-from-left-1/2 [&[data-state=open]]:!slide-in-from-top-[48%]">
        <DialogTitle className="sr-only">Search Tools</DialogTitle>
        <DialogDescription className="sr-only">
          Search for tools by name, description, or category
        </DialogDescription>
        <div className="flex items-center px-4">
          <Search className="h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search for tools..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none h-12 md:text-md"
            autoFocus
          />
          <kbd className="hidden sm:inline-flex select-none items-center gap-1 px-1.5 font-mono text-[20px] font-medium text-muted-foreground">
            <span className="hidden text-xs">ESC</span>
          </kbd>
        </div>

        {query.trim() !== "" && (
          <div className="max-h-[380px] overflow-y-auto p-0">
            {results.length === 0 ? (
              <div className="py-12 text-center text-lg text-muted-foreground">
                No tools found. Try a different search term.
              </div>
            ) : (
              <div className="space-y-0">
                {results.map((result) => {
                  const tool = result.item;
                  const Icon = getIcon(tool.icon);
                  return (
                    <button
                      key={tool.id}
                      onClick={() => handleSelect(tool.slug)}
                      className="w-full flex items-start gap-3 items-center border-t border-gray-100 p-3 py-2 text-left hover:bg-accent transition-colors"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-md text-gray-600 hover:text-blue-600">{tool.name}</div>
                        <div className="text-xs text-gray-500">{tool.description}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

// Global keyboard shortcut hook
export function useSearchModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return { open, setOpen };
}

