"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Edit2, Save, X } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ContactFormData } from "@/types/contact";

// Exporting ExtendedFields for reuse
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
    const fullData = { ...formData, ...extendedFields };
    onSave(fullData);
    setIsEditing(false);
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
        <Input
          value={nestedField ? (formData[field] as any)[nestedField] : (formData[field] as string)}
          onChange={(e) => handleInputChange(field, e.target.value, nestedField)}
          className="w-full border rounded-md px-4 py-2"
        />
      ) : nestedField ? (
        <p className="text-gray-900">{(formData[field] as any)[nestedField]}</p>
      ) : (
        <p className="text-gray-900">{value}</p>
      )}
    </div>
  );

  return (
    <div className="w-full min-h-screen bg-gray-50 p-8">
      {/* Header Section */}
      <div className="max-w-4xl mx-auto mb-8">
        <h1 className="text-2xl font-bold">Contact Manager</h1>
      </div>

      {/* Contact Information */}
      <Card className="max-w-4xl mx-auto bg-white shadow-sm rounded-lg">
        <CardHeader className="border-b p-6">
          <CardTitle className="text-xl font-semibold">Contact Information</CardTitle>
        </CardHeader>
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
                  className="w-full border rounded-md px-4 py-2"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-600">Date of First Meeting</label>
                <DatePicker
                  selected={extendedFields.dateOfFirstMeeting}
                  onChange={(date) => handleExtendedChange("dateOfFirstMeeting", date)}
                  className="w-full border rounded-md px-4 py-2"
                  placeholderText="Select Date"
                  highlightDates={[new Date()]}
                />
              </div>
              {/* Additional extended fields */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-600">Location of First Meeting</label>
                <Input
                  value={extendedFields.locationOfFirstMeeting}
                  onChange={(e) => handleExtendedChange("locationOfFirstMeeting", e.target.value)}
                  className="w-full border rounded-md px-4 py-2"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-600">Relationship Type</label>
                <Input
                  value={extendedFields.relationshipType}
                  onChange={(e) => handleExtendedChange("relationshipType", e.target.value)}
                  className="w-full border rounded-md px-4 py-2"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-600">Contact Frequency</label>
                <Input
                  value={extendedFields.contactFrequency}
                  onChange={(e) => handleExtendedChange("contactFrequency", e.target.value)}
                  className="w-full border rounded-md px-4 py-2"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-600">Network Purpose</label>
                <Input
                  value={extendedFields.networkPurpose}
                  onChange={(e) => handleExtendedChange("networkPurpose", e.target.value)}
                  className="w-full border rounded-md px-4 py-2"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-600">Follow-Up Purpose</label>
                <Input
                  value={extendedFields.followUpPurpose}
                  onChange={(e) => handleExtendedChange("followUpPurpose", e.target.value)}
                  className="w-full border rounded-md px-4 py-2"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-600">Initial Follow-Up Method</label>
                <Input
                  value={extendedFields.initialFollowUpMethod}
                  onChange={(e) => handleExtendedChange("initialFollowUpMethod", e.target.value)}
                  className="w-full border rounded-md px-4 py-2"
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
