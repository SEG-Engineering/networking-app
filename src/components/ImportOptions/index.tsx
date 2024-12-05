"use client"

import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Upload, Linkedin, PenTool, ScanLine } from 'lucide-react'

const ImportOptions = () => {
  const handleDigitalCardImport = () => {
    // Digital card import logic
  }

  const handleLinkedInImport = () => {
    // LinkedIn import logic
  }

  const handleQRCodeScan = () => {
    // QR code scanning logic
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="hover:border-blue-500 cursor-pointer transition-all">
        <CardContent className="p-6">
          <div className="flex flex-col items-center space-y-4">
            <Upload className="h-8 w-8 text-blue-500" />
            <CardTitle className="text-center">Digital Card</CardTitle>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={handleDigitalCardImport}
            >
              Import Card
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="hover:border-blue-500 cursor-pointer transition-all">
        <CardContent className="p-6">
          <div className="flex flex-col items-center space-y-4">
            <Linkedin className="h-8 w-8 text-blue-500" />
            <CardTitle className="text-center">LinkedIn</CardTitle>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={handleLinkedInImport}
            >
              Import Profile
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="hover:border-blue-500 cursor-pointer transition-all">
        <CardContent className="p-6">
          <div className="flex flex-col items-center space-y-4">
            <ScanLine className="h-8 w-8 text-blue-500" />
            <CardTitle className="text-center">QR Code</CardTitle>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={handleQRCodeScan}
            >
              Scan Code
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="hover:border-blue-500 cursor-pointer transition-all">
        <CardContent className="p-6">
          <div className="flex flex-col items-center space-y-4">
            <PenTool className="h-8 w-8 text-blue-500" />
            <CardTitle className="text-center">Manual Entry</CardTitle>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Add Manually
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ImportOptions