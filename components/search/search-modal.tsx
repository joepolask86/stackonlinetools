"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import Fuse from "fuse.js";
import { Search } from "lucide-react";
import { toolsMetadata } from "@/lib/tool-registry";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import * as Icons from "lucide-react";
import { LucideIcon } from "lucide-react";

interface SearchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SearchModal({ open, onOpenChange }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(toolsMetadata.slice(0, 8));
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
        setResults(toolsMetadata.slice(0, 8));
        return;
      }

      const searchResults = fuse.search(searchQuery);
      setResults(searchResults.map((result) => result.item).slice(0, 8));
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
      <DialogContent className="max-w-2xl p-0 gap-0">
        <div className="flex items-center border-b px-4">
          <Search className="h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search for tools..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 h-12 text-base"
            autoFocus
          />
          <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
            <span className="text-xs">ESC</span>
          </kbd>
        </div>

        <div className="max-h-[400px] overflow-y-auto p-2">
          {results.length === 0 ? (
            <div className="py-12 text-center text-sm text-muted-foreground">
              No tools found. Try a different search term.
            </div>
          ) : (
            <div className="space-y-1">
              {results.map((tool) => {
                const Icon = getIcon(tool.icon);
                return (
                  <button
                    key={tool.id}
                    onClick={() => handleSelect(tool.slug)}
                    className="w-full flex items-start gap-3 rounded-lg p-3 text-left hover:bg-accent transition-colors"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm">{tool.name}</div>
                      <div className="text-xs text-muted-foreground line-clamp-1">
                        {tool.description}
                      </div>
                      <div className="flex gap-1 mt-1">
                        {tool.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-1.5 py-0.5 rounded bg-muted text-muted-foreground"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div className="border-t p-3 text-xs text-muted-foreground flex items-center justify-between">
          <div className="flex items-center gap-2">
            <kbd className="inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px]">
              ↑↓
            </kbd>
            <span>Navigate</span>
          </div>
          <div className="flex items-center gap-2">
            <kbd className="inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px]">
              ↵
            </kbd>
            <span>Select</span>
          </div>
        </div>
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

