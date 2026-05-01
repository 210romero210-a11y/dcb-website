import './globals.css';
import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import { Suspense } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: {
    default: 'DCB Website',
    template: '%s | DCB Website',
  },
  description: 'DCB Website - Professional and modern web application',
  // openGraph and twitter can be added in individual pages or here
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <html lang="en">
        <body className="transition-colors duration-200">
          {/* Header */}
          <header className="bg-white dark:bg-gray-900 border-b">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex flex-wrap items-center justify-between py-4">
                <div className="flex items-center space-x-4">
                  <Link href="/" className="flex items-center">
                    <span className="text-xl font-bold text-primary">DCB</span>
                  </Link>
                  <nav className="hidden md:flex md:items-center md:space-x-8">
                    <Link href="/" className="text-muted-foreground hover:text-primary">
                      Home
                    </Link>
                    <Link href="/products" className="text-muted-foreground hover:text-primary">
                      Products
                    </Link>
                    <Link href="/blog" className="text-muted-foreground hover:text-primary">
                      Blog
                    </Link>
                    <Link href="/resources" className="text-muted-foreground hover:text-primary">
                      Resources
                    </Link>
                    <Link href="/contact" className="text-muted-foreground hover:text-primary">
                      Contact
                    </Link>
                  </nav>
                </div>
                <div className="flex items-center space-x-4">
                  <Button variant="outline" size="sm">
                    Get Free Guide
                  </Button>
                </div>
              </div>
            </div>
          </header>

          <main className="pb-16">{children}</main>

          {/* Footer */}
          <footer className="border-t bg-muted dark:bg-gray-800">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-primary">DCB</h3>
                  <p className="text-sm text-muted-foreground">
                    Professional psychology courses and resources for personal growth
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold mb-2 text-primary">Products</h4>
                  <nav className="space-y-2 text-sm">
                    <Link href="/" className="text-muted-foreground hover:text-primary">
                      Courses
                    </Link>
                    <Link href="/" className="text-muted-foreground hover:text-primary">
                      E-books
                    </Link>
                    <Link href="/" className="text-muted-foreground hover:text-primary">
                      Workshops
                    </Link>
                  </nav>
                </div>
                <div>
                  <h4 className="text-sm font-semibold mb-2 text-primary">Resources</h4>
                  <nav className="space-y-2 text-sm">
                    <Link href="/blog" className="text-muted-foreground hover:text-primary">
                      Blog
                    </Link>
                    <Link href="/resources" className="text-muted-foreground hover:text-primary">
                      Guides & Checklists
                    </Link>
                    <Link href="/contact" className="text-muted-foreground hover:text-primary">
                      Contact
                    </Link>
                  </nav>
                </div>
                <div>
                  <h4 className="text-sm font-semibold mb-2 text-primary">Legal</h4>
                  <nav className="space-y-2 text-sm">
                    <Link href="/" className="text-muted-foreground hover:text-primary">
                      Privacy Policy
                    </Link>
                    <Link href="/" className="text-muted-foreground hover:text-primary">
                      Terms of Service
                    </Link>
                    <Link href="/" className="text-muted-foreground hover:text-primary">
                      Disclaimer
                    </Link>
                  </nav>
                </div>
              </div>
              <div className="mt-10 border-t pt-8 text-center text-xs text-muted-foreground">
                &copy; {new Date().getFullYear()} DCB. All rights reserved.
              </div>
            </div>
          </footer>
        </body>
      </html>
    </ThemeProvider>
  );
}