import Navbar from "./Navbar";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function NavbarWrapper() {
  // Ensure this stays server-side
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return <Navbar user={user} />;
}
