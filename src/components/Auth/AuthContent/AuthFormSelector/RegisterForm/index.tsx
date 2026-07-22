import { useAuth } from "../../AuthContext";

export function RegisterForm() {
  const { activeTab } = useAuth();

  if (activeTab !== 'register') return null;

  return (
    <form>
        <h1>Register</h1>
    </form>
  )
}
