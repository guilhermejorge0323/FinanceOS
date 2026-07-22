import { useAuth } from '../AuthContext';

export function LoginForm() {
  const { activeTab } = useAuth();

  if (activeTab !== 'login') return null;

  return (
    <form>
        <h1>Login</h1>
    </form>
  )
}
