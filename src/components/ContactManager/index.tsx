"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import ImportContact from "@/components/ImportContact";
import ContactDisplay from "@/components/ContactDisplay";

interface ContactFormData {
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

const ContactManager = () => {
  const [activeView, setActiveView] = useState<'form' | 'import'>('form');
  const [importedData, setImportedData] = useState<ContactFormData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleImportSuccess = (data: ContactFormData) => {
    setImportedData(data);
    setActiveView('form');
    setError(null);
  };

  const handleImportError = (errorMessage: string) => {
    setError(errorMessage);
  };

  const handleSave = (data: ContactFormData) => {
    console.log('Saving contact:', data);
    // Add your save logic here
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-xl font-semibold text-gray-800">Contact Manager</h1>
            <div className="flex gap-4">
              <Button
                variant="ghost"
                onClick={() => setActiveView('import')}
                className={activeView === 'import' ? 'bg-gray-100' : ''}
              >
                Import Contact
              </Button>
              <Button
                variant="ghost"
                onClick={() => setActiveView('form')}
                className={activeView === 'form' ? 'bg-gray-100' : ''}
              >
                Add Contact
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {activeView === 'import' ? (
          <ImportContact 
            onImportSuccess={handleImportSuccess}
            onError={handleImportError}
          />
        ) : (
          <ContactDisplay
            initialData={importedData || {
              name: '',
              jobTitle: '',
              company: '',
              email: '',
              phoneNumbers: { cell: '', work: '' },
              socialProfiles: { linkedin: '', instagram: '' }
            }}
            onSave={handleSave}
            onCancel={() => setImportedData(null)}
          />
        )}

        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md text-red-600">
            {error}
          </div>
        )}
      </main>
    </div>
  );
};

export default ContactManager;