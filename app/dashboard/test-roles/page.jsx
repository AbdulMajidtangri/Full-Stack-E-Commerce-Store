// app/test-roles/page.js
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function TestRoles() {
  const { getRoles, getUser } = getKindeServerSession();
  const roles = await getRoles();
  const user = await getUser();

  return (
    <div className="p-8 bg-white min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Role Test</h1>
      <div className="space-y-4">
        <div>
          <strong>User:</strong> {user?.email}
        </div>
        <div>
          <strong>Raw roles object:</strong>
          <pre className="bg-gray-100 p-4 rounded mt-2">
            {JSON.stringify(roles, null, 2)}
          </pre>
        </div>
        <div>
          <strong>Roles array:</strong>
          <pre className="bg-gray-100 p-4 rounded mt-2">
            {JSON.stringify(roles?.roles, null, 2)}
          </pre>
        </div>
        <div>
          <strong>First role character codes:</strong>
          <pre className="bg-gray-100 p-4 rounded mt-2">
            {roles?.roles?.[0]?.split('').map(char => 
              `${char} (${char.charCodeAt(0)})`
            ).join(', ')}
          </pre>
        </div>
      </div>
    </div>
  );
}