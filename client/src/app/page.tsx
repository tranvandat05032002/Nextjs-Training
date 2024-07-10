import { redirect } from "next/navigation";
const isAuth = false;
export default function Home() {
  if (!isAuth) {
    redirect("/login");
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      xin chào
    </main >
  );
}
