"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import Link from "next/link";

interface FormData {
  toolName: string;
  description: string;
  category: string;
  similarToolURL: string;
}

interface FormErrors {
  toolName?: string;
  description?: string;
  category?: string;
  similarToolURL?: string;
}

const categories = [
  "Text Tools",
  "String & List Tools", 
  "Encoding Tools",
  "JSON Tools",
  "Code Tools",
  "Markdown Tools",
  "SEO Tools",
  "Image Tools",
  "PDF Tools",
  "Math Tools",
  "Privacy Tools",
  "Miscellaneous Tools"
];

export function SuggestToolForm() {
  const [formData, setFormData] = useState<FormData>({
    toolName: "",
    description: "",
    category: "",
    similarToolURL: ""
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.toolName.trim()) {
      newErrors.toolName = "Tool name is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Tool description is required";
    } else if (formData.description.trim().length < 50) {
      newErrors.description = "Please provide a more detailed description (at least 50 characters)";
    }


    if (!formData.category) {
      newErrors.category = "Please select a category";
    }

    if (!/^https?:\/\/.+/.test(formData.similarToolURL)) {
      newErrors.similarToolURL = "Please enter a valid URL (starting with http:// or https://)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Please fix the errors below",
        description: "Some required fields are missing or invalid.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/suggest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Submission failed');
      }
      
      setIsSubmitted(true);
      toast({
        title: "Thank you for your suggestion!",
        description: "We've received your tool suggestion and will review it soon.",
      });

      // Reset form
      setFormData({
        toolName: "",
        description: "",
        category: "",
        similarToolURL: ""
      });

    } catch (error) {
      toast({
        title: "Submission failed",
        description: error instanceof Error ? error.message : "There was an error submitting your suggestion. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <Card className="text-center border-none shadow-none">
        <CardContent className="py-4">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Suggestion Submitted!
          </h3>
          <p className="text-neutral-600 mb-6">
            Thank you for your suggestion. We&apos;ll review it and get back to you if we decide to implement it.
          </p>
          <Button 
            onClick={() => setIsSubmitted(false)}
            variant="outline"
            className="px-8 py-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white hover:text-white text-md font-medium rounded-full hover:-translate-y-0" 
          >
            Submit Another Suggestion
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      {/* Tool Name Field */}
      <div className="space-y-2">
        <Label htmlFor="toolName" className="text-md font-medium">
          Tool Name <span className="text-red-500">*</span>
        </Label>
        <Input
          id="toolName"
          type="text"
          value={formData.toolName}
          onChange={(e) => handleInputChange("toolName", e.target.value)}
          placeholder="e.g., URL Shortener, Password Generator"
          className={`text-base md:text-base ${errors.toolName ? "border-red-500" : ""}`}
        />
        {errors.toolName && (
          <p className="text-sm text-red-600 flex items-center gap-1">
            <AlertCircle className="h-4 w-4" />
            {errors.toolName}
          </p>
        )}
      </div>

      {/* Category Field */}
      <div className="space-y-2">
        <Label htmlFor="category" className="text-md font-medium">
          Category <span className="text-red-500">*</span>
        </Label>
        <select
          id="category"
          value={formData.category}
          onChange={(e) => handleInputChange("category", e.target.value)}
          className={`w-full px-3 py-2 border rounded-md text-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.category ? "border-red-500" : "border-gray-300"
          }`}
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className="text-md text-red-600 flex items-center gap-1">
            <AlertCircle className="h-4 w-4" />
            {errors.category}
          </p>
        )}
      </div>

      {/* Description Field */}
      <div className="space-y-2">
        <Label htmlFor="description" className="text-md font-medium">
          Tool Description <span className="text-red-500">*</span>
        </Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleInputChange("description", e.target.value)}
          placeholder="Describe what the tool should do, its main features, and how it would work..."
          rows={5}
          className={`w-full px-3 py-2 border rounded-md text-base md:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.description ? "border-red-500" : "border-gray-300"
          }`}
        />
        <p className="text-sm text-gray-500">
          {formData.description.length}/500 characters (minimum 50)
        </p>
        {errors.description && (
          <p className="text-xs text-red-600 flex items-center gap-1">
            <AlertCircle className="h-4 w-4" />
            {errors.description}
          </p>
        )}
      </div>

      {/* Similar Tool URL Field */}
      <div className="space-y-2">
        <Label htmlFor="similarToolURL" className="text-md font-medium">
           Enter the URL of a similar tool (optional)
        </Label>
        <Input
          id="similarToolURL"
          type="url"
          value={formData.similarToolURL}
          onChange={(e) => handleInputChange("similarToolURL", e.target.value)}
          placeholder="Similar Tool URL"
          className={`text-base md:text-base ${errors.similarToolURL ? "border-red-500" : ""}`}
        />
        {errors.similarToolURL && (
          <p className="text-sm text-red-600 flex items-center gap-1">
            <AlertCircle className="h-4 w-4" />
            {errors.similarToolURL}
          </p>
        )}
      </div>


      {/* Submit Button */}
      <div className="pt-4 text-center">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="px-8 py-6 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-lg font-medium hover:-translate-y-0" 
        >
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              Submitting...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Send className="h-5 w-5" />
              Submit
            </div>
          )}
        </Button>
      </div>
    
      <p className="text-xs text-gray-500 text-center">
        By submitting this form, you agree to our <Link href="/terms" className="text-blue-600 dark:text-blue-400 hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-blue-600 dark:text-blue-400 hover:underline">Privacy Policy</Link>.
      </p>
    </form>
  );
}
