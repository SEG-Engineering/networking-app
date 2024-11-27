"use client"; // Add this directive at the top

import { useState } from "react";
import QRScanner from "@/components/QRScanner";
import DigitalCardImport from "@/components/DigitalCardImport";
import ContactDisplay, { ExtendedFields } from "@/components/ContactDisplay";

export default function Home() {
  const initialContactData = {
    name: "Anthony Estreet, Ph.D., MBA, LCSW-C",
    jobTitle: "Chief Executive Officer",
    company: "National Association of Social Workers",
    email: "naswceo@socialworkers.org",
    phoneNumbers: { cell: "+1 2027407234", work: "+1 2023368200" },
    socialProfiles: {
      linkedin: "http://linkedin.com/in/anthonyestreetphd",
      instagram: "http://instagram.com/streetz_06",
    },
  };

  const handleSave = (updatedData: typeof initialContactData & ExtendedFields) => {
    console.log("Updated Data:", updatedData);
    // Add logic to save the updated contact information
  };

  const handleCancel = () => {
    console.log("Edit canceled");
  };

  return (
    <main className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto space-y-8">
        <QRScanner />
        <DigitalCardImport />
        <ContactDisplay
          initialData={initialContactData}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      </div>
    </main>
  );
}
