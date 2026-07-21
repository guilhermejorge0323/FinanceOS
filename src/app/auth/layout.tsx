export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className=' min-h-screen'>
      <main className='min-h-screen flex'>{children}</main>
    </div>
  );
}
