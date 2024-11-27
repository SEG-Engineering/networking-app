"use client";

import React, { useState, useEffect, useRef } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Camera, X } from "lucide-react";
import { ContactFormData, ScrapedContact } from "@/types/contact";
import ContactDisplay from "@/components/ContactDisplay";

interface ScannerProps {
  onSuccess: (decodedText: string) => void;
  onError: (error: string) => void;
}

const Scanner: React.FC<ScannerProps> = ({ onSuccess, onError }) => {
  const scannerRef = useRef<any>(null);

  useEffect(() => {
    scannerRef.current = new Html5QrcodeScanner(
      "qr-reader",
      { fps: 10, qrbox: { width: 250, height: 250 }, aspectRatio: 1 },
      false
    );

    scannerRef.current.render(
      (decodedText: string) => {
        onSuccess(decodedText);
        scannerRef.current?.clear();
      },
      (error: Error) => {
        onError(error.message || "An error occurred");
      }
    );

    return () => {
      scannerRef.current?.clear().catch(console.error);
      scannerRef.current = null;
    };
  }, [onSuccess, onError]);

  return (
    <div id="qr-reader" style={{ width: "100%", maxWidth: "500px", margin: "0 auto" }} />
  );
};

const QRScanner: React.FC = () => {
  const [scanning, setScanning] = useState(false);
  const [scannedData, setScannedData] = useState<ScrapedContact | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [blinqUrl, setBlinqUrl] = useState<string>("");

  const handleScanSuccess = (decodedText: string) => {
    setScanning(false);
    setScannedData(null); // Clear previous scanned data
    console.log("Scanned QR Code:", decodedText);
  };

  const handleScanError = (errorMessage: string) => {
    setError(errorMessage);
    setScanning(false);
  };

  const startScanning = () => {
    setScanning(true);
    setError(null);
    setScannedData(null);
  };

  const testBlinqScraping = async () => {
    if (!blinqUrl.trim()) {
      setError("Please enter a Blinq URL.");
      return;
    }

    try {
      const response = await fetch("/api/scrape/blinq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: blinqUrl }),
      });

      const result = await response.json();

      if (result.success) {
        setScannedData(result.contact);
      } else {
        throw new Error(result.error || "Failed to scrape data.");
      }
    } catch (error) {
      console.error("Error scraping Blinq card:", error);
      setError("Failed to scrape Blinq card.");
    }
  };

  return (
    <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Contact Manager</h2>

      <div className="space-y-4">
        {scanning ? (
          <Scanner onSuccess={handleScanSuccess} onError={handleScanError} />
        ) : (
          <Button onClick={startScanning} className="w-full">
            <Camera className="mr-2 h-4 w-4" />
            Start Scanning
          </Button>
        )}

        <div className="mt-6">
          <h3 className="text-lg font-semibold">Import Digital Business Card</h3>
          <div className="flex gap-2 mt-4">
            <Input
              type="text"
              placeholder="Paste digital card URL..."
              value={blinqUrl}
              onChange={(e) => setBlinqUrl(e.target.value)}
              className="flex-grow"
            />
            <Button onClick={testBlinqScraping}>
              <Camera className="mr-2 h-4 w-4" />
              Import
            </Button>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 text-red-500 p-4 rounded-md flex items-center gap-2">
            <X className="h-4 w-4" />
            {error}
          </div>
        )}

        {scannedData && (
          <div className="mt-6">
            <ContactDisplay
              initialData={{
                name: scannedData.name || "",
                jobTitle: scannedData.jobTitle || "",
                company: scannedData.company || "",
                email: scannedData.email || "",
                phoneNumbers: {
                  cell: scannedData.phoneNumbers.cell || "",
                  work: scannedData.phoneNumbers.work || "",
                },
                socialProfiles: {
                  linkedin: scannedData.socialProfiles.linkedin || "",
                  instagram: scannedData.socialProfiles.instagram || "",
                },
              }}
              onSave={(data) => console.log("Saved contact:", data)}
              onCancel={() => setScannedData(null)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default QRScanner;
