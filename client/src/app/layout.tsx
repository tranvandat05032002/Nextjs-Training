import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";
import { Toaster } from "@/components/ui/toaster"
import AppProvider from "./AppProvider";
import { cookies } from "next/headers";
import SlideSession from "@/components/slide-session";
import { AccountResType } from "@/schemaValidations/account.schema";
import accountApiRequest from "@/apiRequest/account";
import { openGraphImage } from "./shared-metadata";

const inter = Inter({
  subsets: ["vietnamese"],
})


// export const metadata: Metadata = {
//   title: 'Meteor',
//   description: 'Một trang web thương mại điện tử từ Trần Văn Đạt',
// };

//template SEO
export const metadata: Metadata = {
  title: {
    template: '%s | Meteor',
    default: 'Meteor'
  },
  ...openGraphImage,
  description: 'Một trang web thương mại điện tử từ Trần Văn Đạt',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookiesStore = cookies()
  const initialSession = cookiesStore.get('sessionToken');
  let user: AccountResType['data'] | null = null
  if (initialSession) {
    const data = await accountApiRequest.me(initialSession.value)
    user = data.payload.data
  }
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning={true} className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster />
          <AppProvider initialSession={initialSession?.value as string} user={user}>
            <Header user={user} />
            {children}
            <SlideSession />
          </AppProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
