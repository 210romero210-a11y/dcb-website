import Link from 'next/link';
import { Button } from '@/components/ui/button';
import NewsletterSignup from '@/components/newsletter-signup';

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8">
      {/* Hero Section */}
      <section className="w-full max-w-4xl space-y-8">
        <h1 className="text-4xl font-bold text-center text-primary">
          Understanding & Overcoming Gaslighting & Emotional Abuse
        </h1>
        <p className="text-lg text-center text-muted-foreground">
          A comprehensive guide to recognizing, healing, and building resilience against manipulation.
        </p>
        <div className="flex justify-center space-x-4">
          <Button
            asChild
            href="/products/understanding-overcoming-gaslighting-emotional-abuse"
            variant="default"
          >
            Get the Course
          </Button>
          <Button
            asChild
            href="/resources"
            variant="outline"
          >
            Free Resources
          </Button>
        </div>
      </section>

      {/* Features */}
      <section className="w-full max-w-4xl space-y-6">
        <h2 className="text-2xl font-bold text-primary">What You'll Learn</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Recognize Manipulation Tactics</h3>
            <p className="text-sm text-muted-foreground">
              Learn to identify gaslighting patterns in relationships, work, and family dynamics.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Heal & Rebuild Self-Esteem</h3>
            <p className="text-sm text-muted-foreground">
              Practical exercises and strategies for recovery and rebuilding confidence.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Set Healthy Boundaries</h3>
            <p className="text-sm text-muted-foreground">
              Develop assertiveness skills and learn to protect your emotional space.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Evidence Collection & Safety Planning</h3>
            <p className="text-sm text-muted-foreground">
              Document abuse safely and create a plan for protection and recovery.
            </p>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="w-full max-w-4xl py-8 bg-muted">
        <h2 className="text-2xl font-bold text-center text-primary mb-6">
          Start Your Healing Journey
        </h2>
        <p className="text-center text-muted-foreground mb-6">
          Get our free introductory chapter and begin understanding gaslighting today.
        </p>
        <NewsletterSignup />
      </section>
    </main>
  );
}