"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Edit2, Save, X } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { z } from "zod";

// Form Validation Schema
const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  jobTitle: z.string().min(1, "Job title is required"),
  company: z.string().min(1, "Company is required"),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  phoneNumbers: z.object({
    cell: z.string().optional(),
    work: z.string().optional(),
  }),
  socialProfiles: z.object({
    linkedin: z.string().url("Invalid LinkedIn URL").optional(),
    instagram: z.string().url("Invalid Instagram URL").optional(),
  }),
  industry: z.string().optional(),
  dateOfFirstMeeting: z.date().nullable(),
  locationOfFirstMeeting: z.string().optional(),
  relationshipType: z.string().min(1, "Relationship type is required"),
  contactFrequency: z.string().min(1, "Contact frequency is required"),
  networkPurpose: z.string().optional(),
  followUpPurpose: z.string().optional(),
  initialFollowUpMethod: z.string().min(1, "Follow-up method is required"),
});

// Define all available options
const RELATIONSHIP_TYPES = [
  'Professional Contact',
  'Industry Expert',
  'Potential Client',
  'Mentor',
  'Peer',
  'Other'
] as const;

const CONTACT_FREQUENCIES = [
  'Weekly',
  'Monthly',
  'Quarterly',
  'Bi-annually',
  'Annually',
  'As needed'
] as const;

const FOLLOW_UP_METHODS = [
  'Email',
  'Phone',
  'LinkedIn Message',
  'Coffee Meeting',
  'Video Call',
  'Other'
] as const;

export interface ContactFormData {
  name: string;
  jobTitle: string;
  company: string;
  email: string;
  phoneNumbers: {
    cell: string;
    work: string;
  };
  socialProfiles: {
    linkedin: string;
    instagram: string;
  };
}

export interface ExtendedFields {
  industry: string;
  dateOfFirstMeeting: Date | null;
  locationOfFirstMeeting: string;
  relationshipType: string;
  contactFrequency: string;
  networkPurpose: string;
  followUpPurpose: string;
  initialFollowUpMethod: string;
}

interface ContactDisplayProps {
  initialData: ContactFormData;
  onSave: (data: ContactFormData & ExtendedFields) => void;
  onCancel: () => void;
}

const ContactDisplay: React.FC<ContactDisplayProps> = ({
  initialData,
  onSave,
  onCancel,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>(initialData);
  const [extendedFields, setExtendedFields] = useState<ExtendedFields>({
    industry: "",
    dateOfFirstMeeting: null,
    locationOfFirstMeeting: "",
    relationshipType: "",
    contactFrequency: "",
    networkPurpose: "",
    followUpPurpose: "",
    initialFollowUpMethod: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    try {
      contactFormSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          newErrors[err.path.join('.')] = err.message;
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleInputChange = (
    field: keyof ContactFormData,
    value: string,
    nestedField?: keyof ContactFormData["phoneNumbers"] | keyof ContactFormData["socialProfiles"]
  ) => {
    if (nestedField) {
      setFormData((prev) => ({
        ...prev,
        [field]: {
          ...(prev[field] as Record<string, string>),
          [nestedField]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const handleExtendedChange = (field: keyof ExtendedFields, value: string | Date | null) => {
    setExtendedFields((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (validateForm()) {
      const fullData = { ...formData, ...extendedFields };
      onSave(fullData);
      setIsEditing(false);
    }
  };

  const handleSubmit = async (data: ContactFormData & ExtendedFields) => {
    try {
      // Validate form data
      const validationResult = contactFormSchema.safeParse(data);
      
      if (!validationResult.success) {
        // Handle validation errors
        const errorMessages: Record<string, string> = {};
        validationResult.error.errors.forEach((error) => {
          const field = error.path.join('.');
          errorMessages[field] = error.message;
        });
        setErrors(errorMessages);
        return;
      }
  
      // Clear any previous errors
      setErrors({});
  
      // Attempt to save the data
      await onSave(data);
      
      // If save is successful, exit edit mode
      setIsEditing(false);
      
    } catch (error) {
      // Handle any unexpected errors
      setErrors({
        submit: 'Failed to save contact. Please try again.'
      });
      console.error('Error saving contact:', error);
    }
  };

  const renderField = (
    label: string,
    value: string,
    field: keyof ContactFormData,
    nestedField?: keyof ContactFormData["phoneNumbers"] | keyof ContactFormData["socialProfiles"]
  ) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-600">{label}</label>
      {isEditing ? (
        <>
          <Input
            value={nestedField ? (formData[field] as any)[nestedField] : (formData[field] as string)}
            onChange={(e) => handleInputChange(field, e.target.value, nestedField)}
            className={`w-full border rounded-md px-4 py-2 ${
              errors[field] ? 'border-red-500' : ''
            }`}
          />
          {errors[field] && (
            <p className="text-red-500 text-sm mt-1">{errors[field]}</p>
          )}
        </>
      ) : nestedField ? (
        <p className="text-gray-900">{(formData[field] as any)[nestedField]}</p>
      ) : (
        <p className="text-gray-900">{value}</p>
      )}
    </div>
  );

  const renderSelect = (
    label: string,
    field: keyof ExtendedFields,
    options: readonly string[],
    value: string
  ) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-600">{label}</label>
      <Select
        value={value}
        onValueChange={(value) => handleExtendedChange(field, value)}
      >
        <SelectTrigger className="w-full h-10">
          <SelectValue placeholder={`Select ${label.toLowerCase()}`} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );

  const renderFieldWithError = (
    label: string,
    value: string,
    field: keyof ContactFormData,
    nestedField?: keyof ContactFormData["phoneNumbers"] | keyof ContactFormData["socialProfiles"]
  ) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-600">{label}</label>
      {isEditing ? (
        <div>
          <Input
            value={nestedField ? (formData[field] as any)[nestedField] : (formData[field] as string)}
            onChange={(e) => handleInputChange(field, e.target.value, nestedField)}
            className={`w-full border rounded-md px-4 py-2 ${
              errors[nestedField ? `${field}.${nestedField}` : field] ? 'border-red-500' : ''
            }`}
          />
          {errors[nestedField ? `${field}.${nestedField}` : field] && (
            <p className="mt-1 text-sm text-red-500">
              {errors[nestedField ? `${field}.${nestedField}` : field]}
            </p>
          )}
        </div>
      ) : nestedField ? (
        <p className="text-gray-900">{(formData[field] as any)[nestedField]}</p>
      ) : (
        <p className="text-gray-900">{value}</p>
      )}
    </div>
  );

  return (
    
    <div className="w-full min-h-screen bg-gray-50 p-8">
      <Card className="max-w-4xl mx-auto bg-white shadow-sm rounded-lg">
        <CardHeader className="border-b p-6">
          <CardTitle className="text-xl font-semibold">Contact Information</CardTitle>
        </CardHeader>
        {errors.submit && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600">{errors.submit}</p>
          </div>
        )}
        <CardContent className="p-6">
          <div className="grid grid-cols-2 gap-6">
            {renderField("Name", formData.name, "name")}
            {renderField("Job Title", formData.jobTitle, "jobTitle")}
            {renderField("Company", formData.company, "company")}
            {renderField("Email", formData.email, "email")}
            {renderField("Cell Phone", formData.phoneNumbers.cell, "phoneNumbers", "cell")}
            {renderField("Work Phone", formData.phoneNumbers.work, "phoneNumbers", "work")}
            {renderField("LinkedIn", formData.socialProfiles.linkedin, "socialProfiles", "linkedin")}
            {renderField("Instagram", formData.socialProfiles.instagram, "socialProfiles", "instagram")}
          </div>

          {/* Extended Information Section */}
          {isEditing && (
            <div className="mt-6 grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-600">Industry</label>
                <Input
                  value={extendedFields.industry}
                  onChange={(e) => handleExtendedChange("industry", e.target.value)}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-600">Date of First Meeting</label>
                <div className="relative">
                  <DatePicker
                    selected={extendedFields.dateOfFirstMeeting}
                    onChange={(date) => handleExtendedChange("dateOfFirstMeeting", date)}
                    className="w-full h-10 px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholderText="Select Date"
                    dateFormat="MMM d, yyyy"
                    isClearable
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-600">Location of First Meeting</label>
                <Input
                  value={extendedFields.locationOfFirstMeeting}
                  onChange={(e) => handleExtendedChange("locationOfFirstMeeting", e.target.value)}
                  className="w-full"
                />
              </div>

              {renderSelect("Relationship Type", "relationshipType", RELATIONSHIP_TYPES, extendedFields.relationshipType)}
              {renderSelect("Contact Frequency", "contactFrequency", CONTACT_FREQUENCIES, extendedFields.contactFrequency)}
              {renderSelect("Initial Follow-Up Method", "initialFollowUpMethod", FOLLOW_UP_METHODS, extendedFields.initialFollowUpMethod)}

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-600">Network Purpose</label>
                <Input
                  value={extendedFields.networkPurpose}
                  onChange={(e) => handleExtendedChange("networkPurpose", e.target.value)}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-600">Follow-Up Purpose</label>
                <Input
                  value={extendedFields.followUpPurpose}
                  onChange={(e) => handleExtendedChange("followUpPurpose", e.target.value)}
                  className="w-full"
                />
              </div>
            </div>
          )}
        </CardContent>

        <CardFooter className="border-t p-6 flex justify-end gap-4">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={() => setIsEditing(false)} className="px-6 py-2">
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button onClick={handleSave} className="px-6 py-2 bg-black text-white">
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
              <Button onClick={() => handleSubmit({ ...formData, ...extendedFields })} className="px-6 py-2 bg-black text-white" >
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)} className="px-6 py-2 bg-black text-white">
              <Edit2 className="h-4 w-4 mr-2" />
              Edit
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default ContactDisplay;