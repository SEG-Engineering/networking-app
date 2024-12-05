// src/app/settings/page.tsx
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import SettingsForm from '@/components/settings/SettingsForm';

export default function SettingsPage() {
  return (
    <ProtectedRoute>
      <SettingsForm />
    </ProtectedRoute>
  );
}