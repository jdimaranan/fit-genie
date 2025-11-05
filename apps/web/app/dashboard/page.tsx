import { requireAuth } from "../../lib/auth";

export default async function DashboardPage() {
  const session = await requireAuth();

  return (
    <div>
      <h1>Welcome, {session.user?.name}</h1>
      <p>This is your dashboard.</p>
    </div>
  );
}
