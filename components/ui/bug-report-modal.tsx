"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Bug, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface BugReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  toolName: string;
  toolId: string;
}

export function BugReportModal({ isOpen, onClose, toolName, toolId }: BugReportModalProps) {
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!description.trim()) return;
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch("/api/bug-reports", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          toolId: toolId,
          title: `Bug Report: ${toolName}`,
          description: description.trim(),
        }),
      });

      if (response.ok) {
        // Reset form and close modal
        setDescription("");
        setIsSubmitting(false);
        onClose();
        
        // Dispatch event to refresh user bug reports
        window.dispatchEvent(new CustomEvent('userBugReportsUpdated'));
        
        // Show success message
        toast({
          title: "Bug Report Submitted",
          description: "Thank you for your feedback! We'll review your report and take action if needed.",
        });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to submit bug report");
      }
    } catch (error) {
      console.error("Error submitting bug report:", error);
      toast({
        title: "Error",
        description: "Failed to submit bug report. Please try again.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg border-none p-6 top-[50%] !left-[50%] !translate-x-[-50%] !translate-y-[-50%] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 duration-300 ease-out [&_button[class*='closeBtn']]:hidden [&[data-state=closed]]:!slide-out-to-left-1/2 [&[data-state=closed]]:!slide-out-to-top-[48%] [&[data-state=open]]:!slide-in-from-left-1/2 [&[data-state=open]]:!slide-in-from-top-[48%]">
        <DialogHeader>
          <DialogTitle className="flex items-center text-2xl font-semibold text-gray-900">
            <Bug className="h-6 w-6 mr-2 text-gray-700" />
            Bug Report
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Tool Information */}
          <div className="text-md text-gray-700">
            Tool: <span className="font-medium text-blue-700">{toolName}</span>
          </div>
          
          {/* Instructions */}
          <div className="text-md text-gray-700">
            Please describe the issue. <span className="text-red-500">*</span>
          </div>
          
          {/* Description Input */}
          <div className="space-y-2">
            <Textarea
              placeholder="Description*"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[180px] resize-none border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          
          {/* Submit Button */}
          <div className="flex justify-end">
            <Button
              onClick={handleSubmit}
              disabled={!description.trim() || isSubmitting}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-lg px-6 py-6 rounded-full flex items-center space-x-0"
            >
              <Send className="h-5 w-5" />
              <span>{isSubmitting ? "Submitting..." : "Submit"}</span>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
