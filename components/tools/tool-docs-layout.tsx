"use client";

import React, { useState } from "react";
import { ToolMetadata, ToolCategory } from "@/types/tool";
import { Header } from "@/components/layout/header";
import { MinimalFooter } from "@/components/layout/minimal-footer";
import { categories, getImplementedToolsByCategory } from "@/lib/tool-registry";
import * as Icons from "lucide-react";
import { LucideIcon, Share2, Heart, Bug, ChevronDown, ChevronRight, Menu, X } from "lucide-react";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ShareModal } from "@/components/ui/share-modal";
import { BugReportModal } from "@/components/ui/bug-report-modal";
import { useFavorites } from "@/hooks/use-favorites";
import { useAuthStore } from "@/lib/store/auth";
import { useComments } from "@/hooks/use-comments";
import { UserAvatar } from "@/components/ui/user-avatar";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

interface ToolDocsLayoutProps {
  metadata: ToolMetadata;
  children: React.ReactNode;
}

export function ToolDocsLayout({ metadata, children }: ToolDocsLayoutProps) {
  const [expandedCategories, setExpandedCategories] = useState<Set<ToolCategory>>(
    new Set([metadata.category]) // Expand the current tool's category by default
  );
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isBugReportModalOpen, setIsBugReportModalOpen] = useState(false);
  
  // Favorites and auth
  const { isFavorite, toggleFavorite, isLoading: favoritesLoading } = useFavorites();
  const { isAuthenticated, user } = useAuthStore();
  
  // Comments
  const { 
    comments, 
    isLoading: commentsLoading, 
    isSubmitting: commentSubmitting, 
    error: commentError,
    pagination,
    addComment, 
    loadMore 
  } = useComments({ toolId: metadata.id });
  
  // Comment state
  const [commentText, setCommentText] = useState('');

  const getIcon = (iconName: string): LucideIcon => {
    return (Icons[iconName as keyof typeof Icons] as LucideIcon) || Icons.Grid3x3;
  };

  const toggleCategory = (categoryId: ToolCategory) => {
    // Close all categories first, then open the clicked one if it wasn't already open
    if (expandedCategories.has(categoryId)) {
      setExpandedCategories(new Set());
    } else {
      setExpandedCategories(new Set([categoryId]));
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleShareClick = () => {
    setIsShareModalOpen(true);
  };

  const handleShareModalClose = () => {
    setIsShareModalOpen(false);
  };

  const handleBugReportClick = () => {
    setIsBugReportModalOpen(true);
  };

  const handleBugReportModalClose = () => {
    setIsBugReportModalOpen(false);
  };

  const handleFavoriteClick = async () => {
    if (!isAuthenticated) {
      // Redirect to login with current page as redirect
      const currentUrl = typeof window !== 'undefined' ? window.location.pathname : '';
      window.location.href = `/login?redirect=${encodeURIComponent(currentUrl)}`;
      return;
    }
    
    await toggleFavorite(metadata.id);
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim() || commentSubmitting) return;
    
    const success = await addComment(commentText);
    if (success) {
      setCommentText('');
    }
  };

  const handleCommentInputClick = () => {
    if (!isAuthenticated) {
      const currentUrl = typeof window !== 'undefined' ? window.location.pathname : '';
      window.location.href = `/login?redirect=${encodeURIComponent(currentUrl)}`;
    }
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - new Date(date).getTime()) / 1000);
    
    if (diffInSeconds < 60) return 'just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} days ago`;
    if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)} months ago`;
    return `${Math.floor(diffInSeconds / 31536000)} years ago`;
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Fixed Header */}
      <Header />
      
      {/* Main Layout Container */}
      <div className="flex-1 flex">
        {/* Mobile Overlay */}
        <div 
          className={`
            fixed inset-0 bg-black z-40 lg:hidden transition-opacity duration-300 ease-in-out
            ${isMobileMenuOpen ? 'opacity-50' : 'opacity-0 pointer-events-none'}
          `}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Fixed Sidebar */}
        <aside className={`
          w-72 lg:w-80 bg-background border-r border-border flex-shrink-0 fixed left-0 top-16 h-[calc(100vh-4rem)] overflow-y-auto z-50
          lg:block lg:translate-x-0 lg:transition-none
          transform transition-transform duration-500 ease-out
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <div className="p-0">

              {/* Navigation */}
              <nav className="space-y-0">
                <div className="flex items-center justify-between px-3 py-4 text-sm font-semibold text-foreground rounded-none transition-colors bg-gray-100">
                  <div className="flex items-center text-[16px] font-normal uppercase text-neutral-700 space-x-2 pl-2">
                    <span>Tool Categories</span>
                  </div>
                  {/* Close button for mobile */}
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="lg:hidden p-1 hover:bg-gray-200 rounded"
                  >
                    <X className="h-5 w-5 text-gray-600" />
                  </button>
                </div>
                {categories.map((category) => {
                  const tools = getImplementedToolsByCategory(category.id);
                  const isExpanded = expandedCategories.has(category.id);
                  const hasTools = tools.length > 0;
                  const Icon = getIcon(category.icon);

                  return (
                    <div key={category.id} className="space-y-0">
                      {/* Category Header */}
                        <button
                          onClick={() => toggleCategory(category.id)}
                          className="w-full flex items-center justify-between px-3 py-3 text-foreground rounded-none transition-colors border-b border-gray-100"
                          disabled={!hasTools}
                        >
                          <div className={`flex items-center text-[16px] font-medium space-x-2 pl-2 ${
                            isExpanded ? "text-blue-700" : "text-neutral-700"
                          }`}>
                            <Icon className="h-4 w-4" />
                            <span>{category.name}</span>
                        </div>
                        {hasTools && (
                          <svg
                            className={`h-4 w-4 transition-transform ${
                              isExpanded ? "rotate-90 text-blue-700" : "text-neutral-700"
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        )}
                      </button>

                      {/* Tools List */}
                      {hasTools && isExpanded && (
                        <div className="space-y-0 py-2 relative bg-white before:absolute before:inset-x-0 before:top-0 before:h-2 before:bg-gradient-to-b before:from-gray-100 before:to-transparent before:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-2 after:bg-gradient-to-t after:from-gray-100 after:to-transparent after:pointer-events-none">
                          {tools.map((tool) => (
                            <a
                              key={tool.id}
                              href={`/tool/${tool.slug}`}
                              className={`block pl-12 py-2 text-[16px] transition-colors ${
                                tool.slug === metadata.slug
                                  ? "text-neutral-700 font-medium"
                                  : "text-muted-foreground hover:text-neutral-700 hover:bg-transparent"
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span>{tool.name}</span>
                              </div>
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </nav>
            </div>
        </aside>

         {/* Scrollable Main Content */}
         <main className="flex-1 overflow-y-auto lg:ml-80 bg-gray-100">
            <div className="flex-1 max-w-6xl mx-auto px-6 py-8 mb-8 text-md">
             {/* Breadcrumb */}
             <Breadcrumb 
               items={[
                 { label: "Home", href: "/" },
                 { 
                   label: categories.find(cat => cat.id === metadata.category)?.name || "Tools", 
                   href: `/${metadata.category}-tools` 
                 },
                 { label: metadata.name }
               ]} 
             />
             
             {/* Content */}
             {/* Tool Header */}
             <div className="mb-8">
               <div className="md:flex items-start justify-between">
                 <h1 className="text-3xl text-blue-900 mb-2">
                   {metadata.name}
                 </h1>
                 
                 {/* Action Buttons */}
                 <div className="flex items-center space-x-2">
                   <button
                     onClick={handleShareClick}
                     className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-neutral-600 bg-white border border-gray-400 hover:border-gray-300 hover:text-neutral-700 hover:bg-white rounded-full transition-colors"
                     title="Share this tool"
                   >
                     <Share2 className="h-4 w-4" />
                     <span>Share</span>
                   </button>
                   
                   <button
                     onClick={handleFavoriteClick}
                     disabled={favoritesLoading}
                     className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                       isFavorite(metadata.id)
                         ? "text-blue-600 bg-blue-50 border border-blue-500 hover:bg-blue-100"
                         : "text-neutral-600 bg-white border border-gray-400 hover:border-gray-300 hover:text-neutral-700"
                     } ${favoritesLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                     title={isFavorite(metadata.id) ? "Remove from favorites" : "Add to favorites"}
                   >
                     <Heart className={`h-4 w-4 ${isFavorite(metadata.id) ? "fill-current" : ""}`} />
                     <span>{isFavorite(metadata.id) ? "Added" : "Favorite"}</span>
                   </button>
                   
                   <button
                     onClick={handleBugReportClick}
                     className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-neutral-600 bg-white border border-gray-400 hover:border-gray-300 hover:text-neutral-700 hover:bg-white rounded-full transition-colors"
                     title="Report a bug"
                   >
                     <Bug className="h-4 w-4" />
                     <span>Report Bug</span>
                   </button>
                 </div>
               </div>
               
            </div>

            {/* Tool Content */}
            <div className="prose prose-slate dark:prose-invert max-w-none">
              {children}
            </div>

             {/* Tool Comments */}
             <h2 className="text-2xl font-semibold text-neutral-800 mt-12 mb-2">Comments</h2>

             <div className="p-6 bg-white rounded-lg shadow-sm shadow-gray-200/50">
               {/* Comment Input */}
               <div 
                 className={`flex userComment items-start space-x-3 mb-6 ${
                   !isAuthenticated ? 'cursor-pointer opacity-60' : ''
                 }`}
                 onClick={handleCommentInputClick}
               >
                 <UserAvatar 
                   user={{ 
                     name: user?.name || null, 
                     image: user?.image || null 
                   }} 
                   size="lg"
                 />
                 <div className="flex-1">
                   <form onSubmit={handleCommentSubmit}>
                     <textarea
                       placeholder={isAuthenticated ? "Write a comment..." : "Please log in to comment"}
                       value={commentText}
                       onChange={(e) => setCommentText(e.target.value)}
                       disabled={!isAuthenticated || commentSubmitting}
                       className={`w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                         !isAuthenticated ? 'cursor-pointer' : ''
                       } ${commentSubmitting ? 'opacity-50' : ''}`}
                       rows={3}
                     />
                     {isAuthenticated && (
                       <div className="flex justify-end mt-2">
                         <button
                           type="submit"
                           disabled={!commentText.trim() || commentSubmitting}
                           className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
                         >
                           {commentSubmitting ? (
                             <>
                               <LoadingSpinner size="sm" />
                               <span>Posting...</span>
                             </>
                           ) : (
                             <span>Post Comment</span>
                           )}
                         </button>
                       </div>
                     )}
                   </form>
                 </div>
               </div>

               {/* Error Message */}
               {commentError && (
                 <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                   {commentError}
                 </div>
               )}

               {/* Comments List */}
               <div className="space-y-6 ml-2">
                 {commentsLoading ? (
                   <div className="flex justify-center py-8">
                     <LoadingSpinner size="lg" />
                   </div>
                 ) : comments.length === 0 ? (
                   <div className="text-center py-8 text-gray-500">
                     No comments yet. Be the first to comment!
                   </div>
                 ) : (
                   comments.map((comment) => (
                     <div key={comment.id} className="flex items-start space-x-3">
                       <UserAvatar 
                         user={comment.user} 
                         size="md"
                       />
                       <div className="flex-1">
                         <div className="flex items-center space-x-2 mb-0">
                           <span className="font-medium text-lg text-gray-900">
                             {comment.user.name || 'Anonymous'}
                           </span>
                           <span className="text-md text-gray-500 flex items-center space-x-2">
                             <svg fill="#686868ff" width="8px" height="8px" className="mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 18a6 6 0 100-12 6 6 0 000 12z"/></svg> {formatDate(comment.createdAt)}
                             
                           </span>
                         </div>
                         <p className="text-gray-700 text-lg whitespace-pre-wrap">{comment.content}</p>
                       </div>
                     </div>
                   ))
                 )}
               </div>

               {/* Load More Button */}
               {pagination.hasMore && (
                 <div className="flex justify-center mt-6">
                   <button 
                     onClick={loadMore}
                     disabled={commentsLoading}
                     className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                   >
                     {commentsLoading ? (
                       <>
                         <LoadingSpinner size="sm" />
                         <span>Loading...</span>
                       </>
                     ) : (
                       <>
                         <span>Load more</span>
                         <ChevronDown className="h-4 w-4" />
                       </>
                     )}
                   </button>
                 </div>
               )}
             </div>

             {/* Tool Related Tools */}
             <div className="mt-10">
               <div className="flex items-center justify-between mb-6">
                 <h2 className="text-2xl font-semibold text-neutral-800">Similar {categories.find(cat => cat.id === metadata.category)?.name || 'Tools'}</h2>
                 <a href={`/${metadata.category}-tools`} className="text-md font-medium text-blue-600 hover:text-blue-900 transition-colors flex items-center">
                   <span>See All</span>
                   <ChevronRight className="h-3 w-3" />
                 </a>
               </div>

               {/* Similar Tools Grid */}
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 {getImplementedToolsByCategory(metadata.category)
                   .filter(tool => tool.slug !== metadata.slug)
                   .slice(0, 3)
                   .map((tool) => {
                     const ToolIcon = getIcon(tool.icon);
                     return (
                       <Card key={tool.id} className="h-full shadow-[rgba(48, 48, 48, 0.07) 0px 2px 3px] transition-all duration-300 hover:shadow-lg hover:shadow-[rgba(48, 48, 48, 0.075) 0px 4px 8px;] border-none hover:-translate-y-1 bg-white group">
                         <CardHeader className="pb-4">
                           <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100 text-blue-600 transition-all duration-300 group-hover:from-blue-600 group-hover:to-indigo-600 group-hover:text-white group-hover:scale-110 group-hover:rotate-3 mb-3">
                             <ToolIcon className="h-8 w-8" />
                           </div>
                           <h3 className="font-semibold text-gray-900 mb-2">{tool.name}</h3>
                           <p className="text-sm text-gray-600 mb-4 line-clamp-2">{tool.description}</p>
                         </CardHeader>
                         <CardContent className="pt-0">
                           <div className="flex items-center justify-between w-full">
                             <a 
                               href={`/tool/${tool.slug}`}
                               className="text-blue-600 hover:text-blue-900 transition-colors text-sm font-medium flex items-center"
                             >
                               <span>Open</span>
                               <ChevronRight className="h-4 w-4" />
                             </a>
                             <button
                                  className={`p-1.5 transition-all duration-200 group/favorite ${
                                    isFavorite(tool.id)
                                      ? "text-red-500"
                                      : "text-gray-300 hover:text-red-500"
                                  }`}
                                  aria-label={isFavorite(tool.id) ? "Remove from favorites" : "Add to favorites"}
                                  title={isFavorite(tool.id) ? "Remove from favorites" : "Add to favorites"}
                                  onClick={async (e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    
                                    if (!isAuthenticated) {
                                      const currentUrl = typeof window !== 'undefined' ? window.location.pathname : '';
                                      window.location.href = `/login?redirect=${encodeURIComponent(currentUrl)}`;
                                      return;
                                    }
                                    
                                    await toggleFavorite(tool.id);
                                  }}
                                >
                                  <Heart className={`h-5 w-5 ${isFavorite(tool.id) ? "fill-current" : "group-hover/favorite:fill-current"}`} />
                                </button>
                           </div>
                         </CardContent>
                       </Card>
                     );
                   })}
               </div>
             </div>

              {/* Tool Content - Full HTML */}
              {metadata.contentHtml && (
                <div className="mt-12">
                  <Card className="bg-white border-none rounded-lg shadow-sm shadow-gray-200/50">
                    <CardContent className="p-8 tool-content">
                      <div 
                        className="prose prose-slate dark:prose-invert max-w-none"
                        dangerouslySetInnerHTML={{ __html: metadata.contentHtml }}
                      />
                    </CardContent>
                  </Card>
                </div>
              )}

            </div>

           {/* Footer - Sticky to bottom */}
           <div className="mt-auto">
             <MinimalFooter />
            </div>
         </main>
      </div>

      {/* Floating Menu Button */}
      <button
        onClick={toggleMobileMenu}
        className="fixed bottom-6 right-6 lg:hidden bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white p-3 rounded-full shadow-lg z-48 transition-all duration-200 hover:scale-105"
        aria-label="Open menu"
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Share Modal */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={handleShareModalClose}
        title={`${metadata.name} - Stack Online Tools`}
        url={`${typeof window !== 'undefined' ? window.location.origin : ''}/tool/${metadata.slug}`}
        description={metadata.description}
        categoryName={metadata.name}
        modalTitle="Share this Tool"
      />

      {/* Bug Report Modal */}
      <BugReportModal
        isOpen={isBugReportModalOpen}
        onClose={handleBugReportModalClose}
        toolName={metadata.name}
        toolId={metadata.id}
      />
    </div>
  );
}
