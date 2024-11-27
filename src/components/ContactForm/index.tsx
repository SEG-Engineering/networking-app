"use client";

import QRScanner from "@/components/QRScanner";
import DigitalCardImport from "@/components/DigitalCardImport";
import ContactDisplay from "@/components/ContactDisplay";

export default function Home() {
  const initialData = {
    name: "Anthony Estreet, Ph.D., MBA, LCSW-C",
    jobTitle: "Chief Executive Officer",
    company: "National Association of Social Workers",
    email: "naswceo@socialworkers.org",
    phoneNumbers: { cell: "+1 2027407234", work: "+1 2023368200" },
    socialProfiles: {
      linkedin: "http://linkedin.com/in/anthonyestreetphd",
      instagram: "https://instagram.com/streetz_06",
    },
  };

  const handleSave = (data: any) => {
    console.log("Saved Data:", data);
  };

  const handleCancel = () => {
    console.log("Edit Cancelled");
  };

  return (
    <main className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto space-y-8">
        <QRScanner />
        <DigitalCardImport />
        <ContactDisplay
          initialData={initialData}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      </div>
    </main>
  );
}
