"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Edit2, Save, X } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ContactFormData } from "@/types/contact";

interface ContactDisplayProps {
  initialData: ContactFormData;
  onSave: (data: ContactFormData & ExtendedFields) => void;
  onCancel: () => void;
}

interface ExtendedFields {
  industry: string;
  dateOfFirstMeeting: Date | null;
  locationOfFirstMeeting: string;
  relationshipType: string;
  contactFrequency: string;
  networkPurpose: string;
  followUpPurpose: string;
  initialFollowUpMethod: string;
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

  const renderField = (label: string, value: string, fieldName: keyof ContactFormData) => (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      {isEditing ? (
        <Input
          value={value}
          onChange={(e) => handleInputChange(fieldName, e.target.value)}
          className="w-full border rounded-md"
          placeholder={`Enter ${label}`}
        />
      ) : (
        <p className="text-gray-900">{value}</p>
      )}
    </div>
  );

  return (
    <div className="w-full min-h-screen bg-gray-50 p-4">
      <Card className="w-full max-w-4xl mx-auto p-6 shadow-md rounded-lg bg-white">
        <CardHeader className="mb-4 border-b">
          <CardTitle className="text-lg font-semibold">Contact Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {renderField("Name", formData.name, "name")}
            {renderField("Job Title", formData.jobTitle, "jobTitle")}
            {renderField("Company", formData.company, "company")}
            {renderField("Email", formData.email, "email")}
            {renderField("Cell Phone", formData.phoneNumbers.cell, "phoneNumbers")}
            {renderField("Work Phone", formData.phoneNumbers.work, "phoneNumbers")}
            {renderField("LinkedIn", formData.socialProfiles.linkedin, "socialProfiles")}
            {renderField("Instagram", formData.socialProfiles.instagram, "socialProfiles")}
          </div>

          {/* Extended Fields */}
          <div className="mt-6">
            <h3 className="text-md font-semibold text-gray-800">Extended Information</h3>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Industry</label>
                {isEditing ? (
                  <Input
                    value={extendedFields.industry}
                    onChange={(e) => handleExtendedChange("industry", e.target.value)}
                    placeholder="Enter Industry"
                  />
                ) : (
                  <p className="text-gray-900">{extendedFields.industry}</p>
                )}
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Date of First Meeting</label>
                {isEditing ? (
                  <DatePicker
                    selected={extendedFields.dateOfFirstMeeting}
                    onChange={(date) => handleExtendedChange("dateOfFirstMeeting", date)}
                    className="w-full rounded-md border-gray-300 shadow-sm"
                    placeholderText="Select Date"
                    highlightDates={[new Date()]}
                  />
                ) : (
                  <p className="text-gray-900">
                    {extendedFields.dateOfFirstMeeting?.toLocaleDateString() || "Not set"}
                  </p>
                )}
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Location of First Meeting</label>
                {isEditing ? (
                  <Input
                    value={extendedFields.locationOfFirstMeeting}
                    onChange={(e) => handleExtendedChange("locationOfFirstMeeting", e.target.value)}
                    placeholder="Enter Location"
                  />
                ) : (
                  <p className="text-gray-900">{extendedFields.locationOfFirstMeeting}</p>
                )}
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Relationship Type</label>
                {isEditing ? (
                  <Input
                    value={extendedFields.relationshipType}
                    onChange={(e) => handleExtendedChange("relationshipType", e.target.value)}
                    placeholder="Enter Relationship Type"
                  />
                ) : (
                  <p className="text-gray-900">{extendedFields.relationshipType}</p>
                )}
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Contact Frequency</label>
                {isEditing ? (
                  <Input
                    value={extendedFields.contactFrequency}
                    onChange={(e) => handleExtendedChange("contactFrequency", e.target.value)}
                    placeholder="Enter Frequency"
                  />
                ) : (
                  <p className="text-gray-900">{extendedFields.contactFrequency}</p>
                )}
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Network Purpose</label>
                {isEditing ? (
                  <Input
                    value={extendedFields.networkPurpose}
                    onChange={(e) => handleExtendedChange("networkPurpose", e.target.value)}
                    placeholder="Enter Purpose"
                  />
                ) : (
                  <p className="text-gray-900">{extendedFields.networkPurpose}</p>
                )}
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Follow-Up Purpose</label>
                {isEditing ? (
                  <Input
                    value={extendedFields.followUpPurpose}
                    onChange={(e) => handleExtendedChange("followUpPurpose", e.target.value)}
                    placeholder="Enter Follow-Up Purpose"
                  />
                ) : (
                  <p className="text-gray-900">{extendedFields.followUpPurpose}</p>
                )}
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Initial Follow-Up Method</label>
                {isEditing ? (
                  <Input
                    value={extendedFields.initialFollowUpMethod}
                    onChange={(e) => handleExtendedChange("initialFollowUpMethod", e.target.value)}
                    placeholder="Enter Follow-Up Method"
                  />
                ) : (
                  <p className="text-gray-900">{extendedFields.initialFollowUpMethod}</p>
                )}
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2 mt-4">
          {isEditing ? (
            <>
              <Button
                variant="outline"
                onClick={() => {
                  setFormData(initialData);
                  setExtendedFields({
                    industry: "",
                    dateOfFirstMeeting: null,
                    locationOfFirstMeeting: "",
                    relationshipType: "",
                    contactFrequency: "",
                    networkPurpose: "",
                    followUpPurpose: "",
                    initialFollowUpMethod: "",
                  });
                  setIsEditing(false);
                }}
              >
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </>
          ) : (
            <Button
              variant="outline"
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2"
            >
              <Edit2 className="h-4 w-4" />
              Edit
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default ContactDisplay;
