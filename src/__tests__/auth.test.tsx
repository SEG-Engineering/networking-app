// src/__tests__/auth.test.tsx
import { render, fireEvent, waitFor } from '@testing-library/react';
import LoginForm from '@/components/auth/LoginForm';
import { useAuth } from '@/hooks/useAuth';

jest.mock('@/hooks/useAuth');

describe('LoginForm', () => {
  beforeEach(() => {
    (useAuth as jest.Mock).mockReturnValue({
      setSession: jest.fn(),
      isAuthenticated: false,
    });
  });

  it('handles login submission', async () => {
    const { getByLabelText, getByRole } = render(<LoginForm />);
    
    fireEvent.change(getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    
    fireEvent.change(getByLabelText(/password/i), {
      target: { value: 'password123' },
    });
    
    fireEvent.click(getByRole('button', { name: /sign in/i }));
    
    await waitFor(() => {
      expect(useAuth().setSession).toHaveBeenCalled();
    });
  });
});