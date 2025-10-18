import { ReactNode } from "react";

/**
 * Tool categories available in the platform
 */
export type ToolCategory =
  | "text"
  | "string-list"
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
 * Tool implementation status
 */
export type ToolStatus = "implemented" | "planned" | "in-development";

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
  icon: string;
  status: ToolStatus;
  isPremium?: boolean;
  isNew?: boolean;
  isTrending?: boolean;
  contentHtml?: string; // Add this field for full HTML content
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
  longDescription: string;
  icon: string;
  toolCount: number;
}

