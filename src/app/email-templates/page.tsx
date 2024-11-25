"use client"

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

type Template = {
  id: number
  name: string
  subject: string
  body: string
  relationshipTypes: string[]
  followUpTypes: string[]
}

type RelationType = 'client' | 'mentor' | 'partner' | 'industry_expert'
type FollowUpType = 'initial' | 'weekly' | 'monthly' | 'quarterly'

export default function EmailTemplatesPage() {
  const [templates, setTemplates] = useState<Template[]>([
    {
      id: 1,
      name: "Initial Client Meeting",
      subject: "Following up on our conversation",
      body: "Dear [Name],\n\nIt was great meeting you...",
      relationshipTypes: ['client'],
      followUpTypes: ['initial']
    },
    {
      id: 2,
      name: "Mentor Check-in",
      subject: "Monthly check-in",
      body: "Dear [Name],\n\nI wanted to follow up...",
      relationshipTypes: ['mentor'],
      followUpTypes: ['monthly']
    }
  ])

  const [editingTemplate, setEditingTemplate] = useState<Template | null>(null)

  const relationshipTypes = {
    client: 'Client',
    mentor: 'Mentor',
    partner: 'Partner',
    industry_expert: 'Industry Expert'
  }

  const followUpTypes = {
    initial: 'Initial Contact',
    weekly: 'Weekly',
    monthly: 'Monthly',
    quarterly: 'Quarterly'
  }

  const handleEdit = (template: Template) => {
    setEditingTemplate(template)
  }

  return (
    <main className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Email Templates</h1>
          <Button onClick={() => setEditingTemplate({
            id: Date.now(),
            name: '',
            subject: '',
            body: '',
            relationshipTypes: [],
            followUpTypes: []
          })}>
            Create New Template
          </Button>
        </div>

        {editingTemplate && (
          <Card className="bg-gray-50">
            <CardHeader>
              <CardTitle>
                {editingTemplate.id ? 'Edit Template' : 'New Template'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Input 
                  placeholder="Template Name"
                  value={editingTemplate.name}
                  onChange={(e) => setEditingTemplate({
                    ...editingTemplate,
                    name: e.target.value
                  })}
                />
                <Input 
                  placeholder="Subject Line"
                  value={editingTemplate.subject}
                  onChange={(e) => setEditingTemplate({
                    ...editingTemplate,
                    subject: e.target.value
                  })}
                />
                <textarea 
                  className="w-full h-48 p-2 border rounded-md"
                  placeholder="Email Body"
                  value={editingTemplate.body}
                  onChange={(e) => setEditingTemplate({
                    ...editingTemplate,
                    body: e.target.value
                  })}
                />
                <div className="space-y-2">
                  <h3 className="font-medium">Assign to Relationship Types</h3>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(relationshipTypes).map(([value, label]) => (
                      <Button
                        key={value}
                        variant={editingTemplate.relationshipTypes.includes(value) ? "default" : "outline"}
                        onClick={() => {
                          const types = editingTemplate.relationshipTypes.includes(value)
                            ? editingTemplate.relationshipTypes.filter(t => t !== value)
                            : [...editingTemplate.relationshipTypes, value]
                          setEditingTemplate({
                            ...editingTemplate,
                            relationshipTypes: types
                          })
                        }}
                      >
                        {label}
                      </Button>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">Assign to Follow-up Types</h3>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(followUpTypes).map(([value, label]) => (
                      <Button
                        key={value}
                        variant={editingTemplate.followUpTypes.includes(value) ? "default" : "outline"}
                        onClick={() => {
                          const types = editingTemplate.followUpTypes.includes(value)
                            ? editingTemplate.followUpTypes.filter(t => t !== value)
                            : [...editingTemplate.followUpTypes, value]
                          setEditingTemplate({
                            ...editingTemplate,
                            followUpTypes: types
                          })
                        }}
                      >
                        {label}
                      </Button>
                    ))}
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setEditingTemplate(null)}>
                    Cancel
                  </Button>
                  <Button>Save Template</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        
        <div className="grid gap-4">
          {templates.map(template => (
            <Card key={template.id}>
              <CardHeader>
                <CardTitle>{template.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Subject</p>
                    <p>{template.subject}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Body</p>
                    <p className="whitespace-pre-wrap">{template.body}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Relationship Types</p>
                    <div className="flex gap-2 mt-1">
                      {template.relationshipTypes.map(type => (
                        <span key={type} className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                          {relationshipTypes[type as RelationType]}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Follow-up Types</p>
                    <div className="flex gap-2 mt-1">
                      {template.followUpTypes.map(type => (
                        <span key={type} className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                          {followUpTypes[type as FollowUpType]}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => handleEdit(template)}>Edit</Button>
                    <Button variant="destructive">Delete</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  )
}