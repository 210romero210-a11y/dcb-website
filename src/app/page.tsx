import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { NewsletterSignup } from '@/components/newsletter-signup';

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-primary/5 dark:bg-primary/10 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-primary-foreground sm:text-5xl">
              Understanding and Overcoming Gaslighting &amp; Emotional Abuse
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
              A comprehensive course and e-book designed to help you recognize, 
              resist, and recover from manipulation and emotional abuse.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/products/understanding-and-overcoming-gaslighting-emotional-abuse"
                className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-md text-center font-medium transition-colors"
              >
                Get the Course &amp; E-book
              </Link>
              <Button variant="outline" size="lg">
                Get Free Chapter
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features / Value Proposition */}
      <section className="py-16 bg-background dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center mb-12">What You'll Gain</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-4">Recognize Manipulation</h3>
              <p className="text-muted-foreground">
                Learn the subtle signs of gaslighting and emotional abuse in relationships, 
                work, and family settings.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-4">Rebuild Your Confidence</h3>
              <p className="text-muted-foreground">
                Practical exercises to restore self-trust, set boundaries, and heal from psychological trauma.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-4">Create Lasting Change</h3>
              <p className="text-muted-foreground">
                Develop long-term strategies for healthy relationships and emotional resilience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Course Overview */}
      <section className="py-16 bg-muted dark:bg-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8 text-center">Course Structure</h2>
          <div className="space-y-6">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((num) => (
              <div key={num} className="flex items-start space-x-4">
                <div className="flex-shrink-0 bg-primary/10 dark:bg-primary/5 text-primary rounded-full w-10 h-10 flex items-center justify-center text-sm font-medium">
                  {num}
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Module {num}</h3>
                  <p className="text-muted-foreground">
                    Placeholder for module title and brief description.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials / Social Proof (placeholder) */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8 text-center">What Others Are Saying</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Placeholder for testimonial cards */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
              <p className="italic text-muted-foreground mb-4">
                \"This course changed my life. I finally understood what was happening to me and how to break free.\"
              </p>
              <p className="text-sm font-medium text-primary-foreground"> — Sarah K.</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
              <p className="italic text-muted-foreground mb-4">
                \"The tools and techniques provided are practical and easy to apply. I feel empowered again.\"
              </p>
              <p className="text-sm font-medium text-primary-foreground"> — Michael T.</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
              <p className="italic text-muted-foreground mb-4">
                \"I recommend this to anyone dealing with manipulation. The safety-first approach is crucial.\"
              </p>
              <p className="text-sm font-medium text-primary-foreground"> — Elena R.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-primary/5 dark:bg-primary/10 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Take Control?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join hundreds of others who have started their journey to healing and empowerment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products/understanding-and-overcoming-gaslighting-emotional-abuse"
              className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-md text-center font-medium transition-colors"
            >
              Start Now
            </Link>
            <NewsletterSignup className="w-full sm:w-auto" />
          </div>
        </div>
      </section>
    </>
  );
}