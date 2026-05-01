import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Home page',
};

export default function Page() {
  return (
    <main className="min-h-screen bg-background text-foreground p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome to DCB Website</h1>
      <p className="mb-4">This is the home page.</p>
    </main>
  );
}