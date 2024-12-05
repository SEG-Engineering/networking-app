import NewPasswordForm from '@/components/auth/NewPasswordForm';

export default function ResetPasswordTokenPage({ params }: { params: { token: string } }) {
  return <NewPasswordForm token={params.token} />;
}
