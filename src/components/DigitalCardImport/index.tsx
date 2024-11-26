"use client"

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Upload } from 'lucide-react';

interface DigitalCardImportProps {} // Add props if needed

const DigitalCardImport: React.FC<DigitalCardImportProps> = () => {
  const [cardUrl, setCardUrl] = useState('');

  const handleImport = async () => {
    // Import logic here
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Import Digital Business Card</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="Paste digital card URL..."
            value={cardUrl}
            onChange={(e) => setCardUrl(e.target.value)}
            className="flex-1"
          />
          <Button 
            onClick={handleImport}
            className="flex items-center gap-2"
          >
            <Upload className="h-4 w-4" />
            Import
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DigitalCardImport;