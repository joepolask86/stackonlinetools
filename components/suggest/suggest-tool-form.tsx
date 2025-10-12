"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import ReCAPTCHA from "react-google-recaptcha";
import { Send, CheckCircle, AlertCircle } from "lucide-react";

interface FormData {
  name: string;
  email: string;
  toolName: string;
  description: string;
  useCase: string;
  category: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  toolName?: string;
  description?: string;
  useCase?: string;
  category?: string;
  recaptcha?: string;
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
    name: "",
    email: "",
    toolName: "",
    description: "",
    useCase: "",
    category: ""
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const { toast } = useToast();

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.toolName.trim()) {
      newErrors.toolName = "Tool name is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Tool description is required";
    } else if (formData.description.trim().length < 50) {
      newErrors.description = "Please provide a more detailed description (at least 50 characters)";
    }

    if (!formData.useCase.trim()) {
      newErrors.useCase = "Use case is required";
    }

    if (!formData.category) {
      newErrors.category = "Please select a category";
    }

    if (!recaptchaToken) {
      newErrors.recaptcha = "Please complete the reCAPTCHA verification";
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

  const handleRecaptchaChange = (token: string | null) => {
    setRecaptchaToken(token);
    if (errors.recaptcha) {
      setErrors(prev => ({ ...prev, recaptcha: undefined }));
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
          recaptchaToken,
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
        name: "",
        email: "",
        toolName: "",
        description: "",
        useCase: "",
        category: ""
      });
      setRecaptchaToken(null);
      recaptchaRef.current?.reset();

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
      <Card className="text-center">
        <CardContent className="pt-8">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Suggestion Submitted!
          </h3>
          <p className="text-gray-600 mb-6">
            Thank you for your suggestion. We'll review it and get back to you if we decide to implement it.
          </p>
          <Button 
            onClick={() => setIsSubmitted(false)}
            variant="outline"
          >
            Submit Another Suggestion
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name Field */}
        <div className="space-y-2">
          <Label htmlFor="name" className="text-md font-medium">
            Your Name *
          </Label>
          <Input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            placeholder="Enter your full name"
            className={`text-base md:text-base ${errors.name ? "border-red-500" : ""}`}
          />
          {errors.name && (
            <p className="text-sm text-red-600 flex items-center gap-1">
              <AlertCircle className="h-4 w-4" />
              {errors.name}
            </p>
          )}
        </div>

        {/* Email Field */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-md font-medium">
            Email Address *
          </Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            placeholder="your.email@example.com"
            className={`text-base md:text-base ${errors.email ? "border-red-500" : ""}`}
          />
          {errors.email && (
            <p className="text-sm text-red-600 flex items-center gap-1">
              <AlertCircle className="h-4 w-4" />
              {errors.email}
            </p>
          )}
        </div>
      </div>

      {/* Tool Name Field */}
      <div className="space-y-2">
        <Label htmlFor="toolName" className="text-md font-medium">
          Tool Name *
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
          Category *
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
          Tool Description *
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

      {/* reCAPTCHA */}
      <div className="space-y-2">
        <div className="flex justify-center">
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"}
            onChange={handleRecaptchaChange}
            theme="light"
          />
        </div>
        {errors.recaptcha && (
          <p className="text-sm text-red-600 flex items-center justify-center gap-1">
            <AlertCircle className="h-4 w-4" />
            {errors.recaptcha}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <div className="pt-4 text-center">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="px-8 py-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-lg font-medium"
        >
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              Submitting...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Send className="h-5 w-5" />
              Submit Suggestion
            </div>
          )}
        </Button>
      </div>

      <p className="text-xs text-gray-500 text-center">
        By submitting this form, you agree to our <a href="/terms" className="text-blue-600 dark:text-blue-400 hover:underline">Terms of Service</a> and <a href="/privacy" className="text-blue-600 dark:text-blue-400 hover:underline">Privacy Policy</a>.
      </p>
    </form>
  );
}
