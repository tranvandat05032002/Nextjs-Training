export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main>
            <div>This is main register</div>
            <section>{children}</section>
        </main>
    );
}