import QRScanner from '@/components/QRScanner';
import DigitalCardImport from '@/components/DigitalCardImport';

export default function Home() {
  return (
    <main className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto space-y-8">
        <QRScanner />
        <DigitalCardImport />
      </div>
    </main>
  );
}

// import ImportOptions from '@/components/ImportOptions'
// import ContactForm from '@/components/ContactForm'
// import QRScanner from '@/components/QRScanner';
// import DigitalCardImport from '@/components/DigitalCardImport';

// export default function Home() {
  // return (
    // <main className="min-h-screen p-4">
      // <div className="max-w-6xl mx-auto space-y-8">
        // <ImportOptions />
        // <ContactForm />
      // </div>
    // </main>
  // )
// }