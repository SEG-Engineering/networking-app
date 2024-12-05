// src/app/dashboard/page.tsx
import { FC } from 'react'
import ContactDisplay from '@/components/ContactDisplay'   // Note the curly braces if it's a named export

const Dashboard: FC = () => {
    const initialData = {
        name: '',
        jobTitle: '',
        company: '',
        email: '',
        phoneNumbers: {
            cell: '',
            work: ''
        },
        socialProfiles: {
            linkedin: '',
            instagram: ''
        }
    }

    const handleSave = (data: any) => {
        console.log('Saving:', data)
    }

    const handleCancel = () => {
        console.log('Cancelled')
    }

    return (
        <div>
            <ContactDisplay
                initialData={initialData}
                onSave={handleSave}
                onCancel={handleCancel}
            />
        </div>
    )
}

export default Dashboard