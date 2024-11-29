"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { Camera, Upload, X } from 'lucide-react';

interface ImportContactProps {
  onImportSuccess: (contactData: any) => void;
  onError: (error: string) => void;
}

const ImportContact: React.FC<ImportContactProps> = ({ onImportSuccess, onError }) => {
  const [scanning, setScanning] = useState(false);
  const [cardUrl, setCardUrl] = useState('');
  const [error, setError] = useState<string | null>(null);
  const scannerRef = useRef<any>(null);

  // QR Scanner setup
  useEffect(() => {
    if (scanning) {
      scannerRef.current = new Html5QrcodeScanner(
        "qr-reader",
        { fps: 10, qrbox: { width: 250, height: 250 }, aspectRatio: 1 },
        false
      );

      scannerRef.current.render(
        (decodedText: string) => {
          handleQRSuccess(decodedText);
          scannerRef.current?.clear();
        },
        (error: Error) => {
          handleError(error.message);
        }
      );

      return () => {
        scannerRef.current?.clear().catch(console.error);
        scannerRef.current = null;
      };
    }
  }, [scanning]);

  const handleQRSuccess = async (decodedText: string) => {
    setScanning(false);
    try {
      // Here you would process the QR code data
      const contactData = { url: decodedText };
      await processContactImport(contactData);
    } catch (error) {
      handleError('Failed to process QR code data');
    }
  };

  const handleUrlImport = async () => {
    if (!cardUrl.trim()) {
      handleError('Please enter a valid URL');
      return;
    }

    try {
      const contactData = { url: cardUrl };
      await processContactImport(contactData);
    } catch (error) {
      handleError('Failed to import contact from URL');
    }
  };

  const processContactImport = async (contactData: { url: string }) => {
    try {
      const response = await fetch('/api/scrape/blinq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactData),
      });

      const result = await response.json();

      if (result.success) {
        onImportSuccess(result.contact);
        setCardUrl('');
        setError(null);
      } else {
        throw new Error(result.error || 'Failed to import contact');
      }
    } catch (error) {
      throw new Error('Failed to process contact import');
    }
  };

  const handleError = (message: string) => {
    setError(message);
    onError(message);
  };

  const toggleScanner = () => {
    setScanning(!scanning);
    setError(null);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Import Contact</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* QR Scanner Section */}
        <div>
          {scanning ? (
            <div className="space-y-4">
              <div id="qr-reader" className="max-w-md mx-auto" />
              <Button 
                onClick={toggleScanner}
                variant="outline"
                className="w-full"
              >
                <X className="mr-2 h-4 w-4" />
                Cancel Scanning
              </Button>
            </div>
          ) : (
            <Button 
              onClick={toggleScanner}
              className="w-full bg-black text-white hover:bg-gray-800"
            >
              <Camera className="mr-2 h-4 w-4" />
              Scan Business Card
            </Button>
          )}
        </div>

        {/* URL Import Section */}
        <div className="space-y-2">
          <div className="flex gap-2">
            <Input
              placeholder="Paste digital card URL..."
              value={cardUrl}
              onChange={(e) => setCardUrl(e.target.value)}
              className="flex-1"
            />
            <Button 
              onClick={handleUrlImport}
              className="bg-black text-white hover:bg-gray-800"
            >
              <Upload className="mr-2 h-4 w-4" />
              Import
            </Button>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 text-red-500 p-4 rounded-md flex items-center gap-2">
            <X className="h-4 w-4" />
            {error}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ImportContact;