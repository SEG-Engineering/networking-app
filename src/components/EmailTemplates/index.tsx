"use client"

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Mail, Send } from 'lucide-react';

const EmailTemplates = () => {
  const [emailData, setEmailData] = useState({
    subject: '',
    body: '',
    followUpDate: ''
  });

  const templates = {
    initial: {
      subject: "Following up on our conversation",
      body: "Dear [Name],\n\nIt was great meeting you at [Event]. I enjoyed our discussion about [Topic].\n\nBest regards,\n[Your Name]"
    },
    followUp: {
      subject: "Checking in",
      body: "Dear [Name],\n\nI hope you're doing well. I wanted to follow up on our previous conversation.\n\nBest regards,\n[Your Name]"
    }
  };

  const handleTemplateSelect = (type: 'initial' | 'followUp') => {
    setEmailData({
      ...emailData,
      subject: templates[type].subject,
      body: templates[type].body
    });
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mail className="h-5 w-5" />
          Email Templates
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Button onClick={() => handleTemplateSelect('initial')} variant="outline">
            Initial Contact
          </Button>
          <Button onClick={() => handleTemplateSelect('followUp')} variant="outline">
            Follow-up
          </Button>
        </div>
        
        <Input
          placeholder="Subject"
          value={emailData.subject}
          onChange={(e) => setEmailData({ ...emailData, subject: e.target.value })}
        />
        
        <textarea
          className="w-full h-48 p-2 border rounded-md"
          placeholder="Email body"
          value={emailData.body}
          onChange={(e) => setEmailData({ ...emailData, body: e.target.value })}
        />
        
        <Input
          type="date"
          value={emailData.followUpDate}
          onChange={(e) => setEmailData({ ...emailData, followUpDate: e.target.value })}
        />
        
        <Button className="w-full flex items-center justify-center gap-2">
          <Send className="h-4 w-4" />
          Send Email
        </Button>
      </CardContent>
    </Card>
  );
};

export default EmailTemplates;