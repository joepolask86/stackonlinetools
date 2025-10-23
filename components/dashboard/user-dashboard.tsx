"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Bookmark, MessageSquare, Lightbulb, Bug, Plus, Search, Home, ChevronRight, Heart, ArrowRight, Type, FileText, Code, Dot } from "lucide-react";
import { LucideIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useFavorites } from "@/hooks/use-favorites";
import { useUserComments } from "@/hooks/use-user-comments";
import { useUserToolRequests } from "@/hooks/use-user-tool-requests";
import { useUserBugReports } from "@/hooks/use-user-bug-reports";
import { getToolBySlug } from "@/lib/tool-registry";
import { ToolCategory } from "@/types/tool";

interface User {
  id: string;
  email: string;
  name: string;
  image?: string;
  provider?: 'google' | 'github' | 'twitter' | 'facebook' | 'email';
  providerId?: string;
}

// Helper function to get icon component
const getIcon = (iconName: string): LucideIcon => {
  const iconMap: Record<string, LucideIcon> = {
    Type,
    FileText,
    Code,
  };
  return iconMap[iconName] || Type;
};

interface UserDashboardProps {
  user: User;
}

export function UserDashboard({ user }: UserDashboardProps) {
  const [activeTab, setActiveTab] = useState("favorites");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Real favorites data
  const { favorites, removeFavorite, isLoading: favoritesLoading } = useFavorites();
  
  // Real user comments data
  const { comments: userComments, isLoading: commentsLoading } = useUserComments({ userId: user.id });
  
  // Real user tool requests data
  const { requests: userToolRequests, isLoading: requestsLoading } = useUserToolRequests({ userId: user.id });
  
  // Real user bug reports data
  const { bugReports: userBugReports, isLoading: bugReportsLoading } = useUserBugReports({ userId: user.id });
  
  // Get tool metadata for favorites
  const allFavoriteTools = (favorites || [])
    .map(toolId => {
      // Find tool by ID in the registry
      const tool = getToolBySlug(toolId);
      if (tool) {
        return {
          id: tool.id,
          name: tool.name,
          category: tool.category,
          url: `/tool/${tool.slug}`,
          description: tool.description,
          icon: tool.icon,
        };
      }
      return null;
    })
    .filter((tool): tool is {
      id: string;
      name: string;
      category: ToolCategory;
      url: string;
      description: string;
      icon: string;
    } => tool !== null);

  // Filter favorite tools based on search query
  const favoriteTools = allFavoriteTools.filter(tool => {
    if (!searchQuery.trim()) return true;
    
    const query = searchQuery.toLowerCase();
    return (
      tool.name.toLowerCase().includes(query) ||
      tool.description.toLowerCase().includes(query) ||
      tool.category.toLowerCase().includes(query)
    );
  });

  // Process user comments with tool information
  const commentsWithToolInfo = (userComments || []).map(comment => {
    const tool = getToolBySlug(comment.toolId);
    return {
      id: comment.id,
      toolName: tool?.name || comment.toolId,
      toolSlug: comment.toolId,
      content: comment.content,
      date: new Date(comment.createdAt).toLocaleDateString(),
    };
  });

  // Process user tool requests with formatted data
  const requestsWithFormattedData = (userToolRequests || []).map(request => ({
    id: request.id,
    toolName: request.toolName,
    description: request.description,
    category: request.category,
    status: request.status,
    date: new Date(request.createdAt).toLocaleDateString(),
  }));

  // Process user bug reports with tool information
  const bugReportsWithToolInfo = (userBugReports || []).map(bugReport => {
    const tool = getToolBySlug(bugReport.toolId);
    return {
      id: bugReport.id,
      toolName: tool?.name || bugReport.toolId,
      toolSlug: bugReport.toolId,
      title: bugReport.title,
      description: bugReport.description,
      severity: bugReport.severity,
      status: bugReport.status,
      date: new Date(bugReport.createdAt).toLocaleDateString(),
    };
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "in-progress": return "bg-blue-100 text-blue-800";
      case "completed": return "bg-green-100 text-green-800";
      case "open": return "bg-red-100 text-red-800";
      case "resolved": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "low": return "bg-green-100 text-green-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "high": return "bg-orange-100 text-orange-800";
      case "critical": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="container max-w-7xl mx-auto px-6 lg:px-12 py-20 pt-8">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center space-x-2 text-md text-muted-foreground mb-6" aria-label="Breadcrumb">
        <Link href="/" className="flex items-center hover:text-foreground transition-colors">
          <Home className="h-4 w-4 mr-1" />
          Home
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground">Profile</span>
      </nav>

      {/* Structured Data for Breadcrumbs */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://stackonlinetools.com"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Profile",
                "item": "https://stackonlinetools.com/profile"
              }
            ]
          })
        }}
      />

      {/* User Profile Card */}
      <Card className="mb-8 border-none shadow-md shadow-gray-200/50">
        <CardHeader>
          <div className="flex items-center space-x-4">
            <Avatar 
              src={user.image} 
              name={user.name} 
              size="xl"
              alt={`${user.name}'s avatar`}
            />
            <div>
              <CardTitle className="text-2xl">Welcome back, {user.name}!</CardTitle>
              <p className="text-muted-foreground">Manage your tools, comments, and requests</p>
              {user.provider && (
                <p className="text-md text-blue-600">
                  {user.email}
                </p>
              )}
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Profile Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-transparent h-13 border-b border-gray-200 rounded-none p-0">
          {[
            { value: "favorites", icon: Bookmark, label: "Favorites" },
            { value: "comments", icon: MessageSquare, label: "Comments" },
            { value: "requests", icon: Lightbulb, label: "Requests" },
            { value: "bugs", icon: Bug, label: "Bugs" },
          ].map(({ value, icon: Icon, label }) => (
            <TabsTrigger
              key={value}
              value={value}
              className="flex rounded-none items-center gap-2 px-4 py-3 text-[17px] font-medium text-gray-500 transition-all bg-transparent hover:bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-blue-700 data-[state=active]:border-b-2 data-[state=active]:border-blue-700"
            >
              <Icon className="h-5 w-5" />
              {label}
            </TabsTrigger>
          ))}
      </TabsList>
        

        {/* Favorites Tab */}
        <TabsContent value="favorites" className="space-y-4">
          <div className="flex items-center justify-end">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search favorites..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 w-64 bg-white"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {favoriteTools.length > 0 ? (
              favoriteTools.map((tool) => {
                const ToolIcon = getIcon(tool.icon);
                return (
                  <Link key={tool.id} href={tool.url} className="group">
                    <Card className="h-full transition-all duration-300 shadow-md shadow-gray-200/50 hover:shadow-lg hover:shadow-gray-500/10 border-none hover:-translate-y-1 bg-white">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-100 to-indigo-100 text-blue-600 transition-all duration-300 group-hover:from-blue-600 group-hover:to-indigo-600 group-hover:text-white group-hover:scale-110 group-hover:rotate-3 mb-3">
                            <ToolIcon className="h-5 w-5" />
                          </div>
                          <button
                            className="p-1.5 text-red-500 hover:text-red-600 transition-all duration-200 group/favorite"
                            aria-label="Remove from favorites"
                            title="Remove from favorites"
                            disabled={favoritesLoading}
                            onClick={async (e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              await removeFavorite(tool.id);
                            }}
                          >
                            <Heart className="h-5 w-5 fill-current" />
                          </button>
                        </div>
                        <CardTitle className="text-base mt-3 group-hover:text-blue-600 transition-colors">{tool.name}</CardTitle>
                        <CardDescription className="line-clamp-2 text-sm text-gray-600">
                          {tool.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="flex items-center justify-between">
                          <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-sm font-medium text-blue-800">{tool.category.charAt(0).toUpperCase() + tool.category.slice(1).replace('-', ' ')}</span>
                          <div className="flex items-center text-blue-600 group-hover:text-blue-700 transition-colors">
                            <span className="text-sm font-medium">Open</span>
                            <ArrowRight className="ml-1 h-4 w-4" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })
            ) : allFavoriteTools.length > 0 ? (
              // Show "no search results" when there are favorites but search doesn't match
              <Card className="col-span-full">
                <CardContent className="flex flex-col items-center justify-center py-12 border-none shadow-md shadow-gray-200/50">
                  <Search className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No results found</h3>
                  <p className="text-muted-foreground text-center mb-4">
                    No favorites match your search for &quot;{searchQuery}&quot;. Try a different search term.
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={() => setSearchQuery("")}
                    className="rounded-full"
                  >
                    Clear Search
                  </Button>
                </CardContent>
              </Card>
            ) : (
              // Show "no favorites" when there are no favorites at all
              <Card className="col-span-full">
                <CardContent className="flex flex-col items-center justify-center py-12 border-none shadow-md shadow-gray-200/50">
                  <Heart className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No favorite tools yet</h3>
                  <p className="text-muted-foreground text-center mb-4">
                    Start exploring tools and add them to your favorites for quick access.
                  </p>
                  <Button asChild className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-full">
                    <Link href="/tools">Explore Tools</Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        {/* Comments Tab */}
        <TabsContent value="comments" className="space-y-4">
          <div className="space-y-4">
            {commentsLoading ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
                  <p className="text-muted-foreground">Loading your comments...</p>
                </CardContent>
              </Card>
            ) : commentsWithToolInfo.length > 0 ? (
              commentsWithToolInfo.map((comment) => (
                <Card key={comment.id} className="border-none shadow-md shadow-gray-200/50">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium mb-2">{comment.toolName}</h4>
                        <p className="text-muted-foreground mb-3">{comment.content}</p>
                        <p className="text-sm text-muted-foreground">{comment.date}</p>
                      </div>
                      <Button variant="outline" size="sm" className="text-sm rounded-full" asChild>
                        <Link href={`/tool/${comment.toolSlug}`}>
                          View Tool
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No comments yet</h3>
                  <p className="text-muted-foreground text-center mb-4">
                    Share your thoughts and help other users by commenting on tools.
                  </p>
                  <Button asChild className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-full">
                    <Link href="/tools">Explore Tools</Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        {/* Tool Requests Tab */}
        <TabsContent value="requests" className="space-y-4">
          <div className="flex items-center justify-end">
            <Link href="/suggest">
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-md rounded-full hover:-translate-y-0">
                <Plus className="h-4 w-4" />
                New Request
              </Button>
            </Link>
          </div>

          <div className="space-y-4">
            {requestsLoading ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12 border-none shadow-md shadow-gray-200/50">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
                  <p className="text-muted-foreground">Loading your requests...</p>
                </CardContent>
              </Card>
            ) : requestsWithFormattedData.length > 0 ? (
              requestsWithFormattedData.map((request) => (
                <Card key={request.id} className="border-none shadow-md shadow-gray-200/50">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium text-lg mb-2">{request.toolName}</h3>
                        <p className="text-md text-muted-foreground mb-2 line-clamp-2">{request.description}</p>
                        <div className="flex items-center gap-0 mb-3">
                          <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-sm font-medium text-blue-800">
                            {request.category.charAt(0).toUpperCase() + request.category.slice(1).replace('-', ' ')}
                          </span>
                          <Dot className="h-8 w-8 text-gray-400" />
                          <p className="text-sm text-muted-foreground">{request.date}</p>
                        </div>
                      </div>
                      <div className="requestStatus">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium  capitalize ${getStatusColor(request.status)}`}>
                            {request.status.replace('-', ' ')}
                          </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Lightbulb className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No tool requests yet</h3>
                  <p className="text-muted-foreground text-center mb-4">
                    Have an idea for a new tool? Submit a request and we&apos;ll consider adding it.
                  </p>
                  <Button asChild className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-full">
                    <Link href="/suggest">Submit Request</Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        {/* Bug Reports Tab */}
        <TabsContent value="bugs" className="space-y-4">
          <div className="space-y-4">
            {bugReportsLoading ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12 border-none shadow-md shadow-gray-200/50">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
                  <p className="text-muted-foreground">Loading your bug reports...</p>
                </CardContent>
              </Card>
            ) : bugReportsWithToolInfo.length > 0 ? (
              bugReportsWithToolInfo.map((bug) => (
                <Card key={bug.id} className="border-none shadow-md shadow-gray-200/50">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium text-lg mb-2">{bug.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{bug.description}</p>
                        <div className="flex items-center gap-0 mb-3">
                          <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-sm font-medium text-blue-800">
                            {bug.toolName}
                          </span>
                          <Dot className="h-8 w-8 text-gray-400" />
                          <p className="text-sm text-muted-foreground">{bug.date}</p>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 items-end">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium capitalize ${getSeverityColor(bug.severity)}`}>
                          {bug.severity}
                        </span>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium capitalize ${getStatusColor(bug.status)}`}>
                          {bug.status}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12 border-none shadow-md shadow-gray-200/50">
                  <Bug className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No bug reports yet</h3>
                  <p className="text-muted-foreground text-center mb-4">
                    Found a bug? Help us improve by reporting issues you encounter. Open a tool to report a bug.
                  </p>
                  <Button asChild className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-full">
                    <Link href="/tools">Explore Tools</Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
