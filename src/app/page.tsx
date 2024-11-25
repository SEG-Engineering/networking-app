import ContactForm from '@/components/ContactForm'
import DigitalCardImport from '@/components/DigitalCardImport'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-4 p-4">
      <DigitalCardImport />
      <ContactForm />
    </main>
  )
}