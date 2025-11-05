import { requireAuth } from "../../../lib/auth";

export default async function ProfilePage() {
  const session = await requireAuth();

  return (
    <div>
      <h1>Profile</h1>
      <p>Email: {session.user?.email}</p>
    </div>
  );
}
