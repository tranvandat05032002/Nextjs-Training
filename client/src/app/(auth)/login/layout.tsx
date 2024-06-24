export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <main>
        <div>This is main login</div>
        <section>{children}</section>
      </main>
    );
  }