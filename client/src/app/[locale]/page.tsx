import { redirect } from "next/navigation";
import { useTranslations } from 'next-intl'
const isAuth = false;
export default function Home() {
  const t = useTranslations('HomePage')
  console.log(t)
  if (!isAuth) {
    redirect("/login");
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      xin chào
    </main >
  ); t
}
