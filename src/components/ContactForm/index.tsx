"use client"

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

interface FormData {
  name: string;
  email: string;
  phoneNumber: string;
  jobTitle: string;
  company: string;
  industry: string;
  linkedinUrl: string;
}

const ContactForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phoneNumber: '',
    jobTitle: '',
    company: '',
    industry: '',
    linkedinUrl: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        // Clear form
        setFormData({
          name: '',
          email: '',
          phoneNumber: '',
          jobTitle: '',
          company: '',
          industry: '',
          linkedinUrl: ''
        });
        
        // Redirect to dashboard
        router.push('/dashboard');
      } else {
        setError(data.error || 'Failed to save contact');
      }
    } catch (err) {
      setError('Failed to save contact');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Add New Contact</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <Input
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            <Input
              name="phoneNumber"
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
            <Input
              name="jobTitle"
              placeholder="Job Title"
              value={formData.jobTitle}
              onChange={handleChange}
            />
            <Input
              name="company"
              placeholder="Company"
              value={formData.company}
              onChange={handleChange}
            />
            <Input
              name="industry"
              placeholder="Industry"
              value={formData.industry}
              onChange={handleChange}
            />
            <Input
              name="linkedinUrl"
              placeholder="LinkedIn URL"
              value={formData.linkedinUrl}
              onChange={handleChange}
              className="col-span-2"
            />
          </div>
          
          {error && (
            <div className="text-red-500 text-sm">{error}</div>
          )}
          
          <Button 
            type="submit" 
            className="w-full"
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save Contact'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ContactForm;