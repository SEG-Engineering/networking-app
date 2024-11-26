"use client";

import React, { useState, useEffect, useRef } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { Button } from "@/components/ui/button";
import { Camera, X } from "lucide-react";

interface ScannerProps {
  onSuccess: (decodedText: string) => void;
  onError: (error: string) => void;
}

const Scanner: React.FC<ScannerProps> = ({ onSuccess, onError }) => {
  const scannerRef = useRef<any>(null);

  useEffect(() => {
    // Initialize scanner
    scannerRef.current = new Html5QrcodeScanner(
      "qr-reader",
      {
        fps: 10,
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1,
      },
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

    // Cleanup scanner
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
  const [scannedData, setScannedData] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleScanSuccess = (decodedText: string) => {
    setScanning(false);
    setScannedData(decodedText);
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

  // Function to call the Puppeteer API
  const testBlinqScraping = async () => {
    const cardUrl = "https://blinq.me/YrPFyZHnBAMMAXe9JNhz?bs=db"; // Example URL
    try {
      const response = await fetch("/api/scrape/puppeteer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: cardUrl }),
      });

      const result = await response.json();
      if (result.success) {
        console.log("Scraped Data:", result.data);
        setScannedData(JSON.stringify(result.data, null, 2));
      } else {
        throw new Error(result.error || "Failed to scrape data");
      }
    } catch (error) {
      console.error("Error scraping Blinq card:", error);
      setError("Failed to scrape Blinq card.");
    }
  };

  return (
    <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-md">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Scan QR Code</h2>
      </div>
      <div className="space-y-4">
        {scanning ? (
          <Scanner onSuccess={handleScanSuccess} onError={handleScanError} />
        ) : (
          <>
            <Button onClick={startScanning} className="w-full">
              <Camera className="mr-2 h-4 w-4" />
              Start Scanning
            </Button>
            <Button onClick={testBlinqScraping} className="w-full mt-4">
              Test Puppeteer Scraping
            </Button>
          </>
        )}

        {error && (
          <div className="bg-red-50 text-red-500 p-4 rounded-md flex items-center gap-2">
            <X className="h-4 w-4" />
            {error}
          </div>
        )}

        {scannedData && (
          <pre className="border rounded-md p-4 bg-gray-50 text-sm">
            {scannedData}
          </pre>
        )}
      </div>
    </div>
  );
};

export default QRScanner;
