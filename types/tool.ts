import { ReactNode } from "react";

/**
 * Tool categories available in the platform
 */
export type ToolCategory =
  | "text"
  | "encoding"
  | "json"
  | "code"
  | "markdown"
  | "seo"
  | "image"
  | "pdf"
  | "math"
  | "privacy"
  | "misc";

/**
 * Tool metadata
 */
export interface ToolMetadata {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: ToolCategory;
  subcategory?: string;
  tags: string[];
  icon: string;
  isPremium?: boolean;
  isNew?: boolean;
  isTrending?: boolean;
}

/**
 * Tool action result
 */
export interface ToolActionResult<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * Base tool interface
 */
export interface OnlineTool {
  metadata: ToolMetadata;
  component: React.ComponentType;
  clientAction?: (input: unknown) => ToolActionResult | Promise<ToolActionResult>;
  serverAction?: (input: unknown) => Promise<ToolActionResult>;
}

/**
 * Tool registry entry
 */
export interface ToolRegistryEntry {
  tool: OnlineTool;
  loadComponent: () => Promise<React.ComponentType>;
}

/**
 * Category information
 */
export interface CategoryInfo {
  id: ToolCategory;
  name: string;
  description: string;
  icon: string;
  toolCount: number;
}

