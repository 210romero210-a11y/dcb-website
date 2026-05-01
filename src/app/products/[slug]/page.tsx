import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProductBySlug } from '@/lib/convex/products';
import { Image } from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

export const generateMetadata = async ({ params }: { params: { slug: string } }): Promise<Metadata> => {
  const product = await getProductBySlug(params.slug);
  if (!product) {
    notFound();
  }

  return {
    title: `${product.title} - DCB`,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      url: `https://dcb.com/products/${product.slug}`,
      images: [
        {
          url: product.imageUrl,
          width: 1200,
          height: 630,
          alt: product.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: product.title,
      description: product.description,
      images: [product.imageUrl],
    },
    alternates: {
      canonical: `https://dcb.com/products/${product.slug}`,
    },
  };
};

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  return (
    <>
      <div className="mb-12">
        <div className="grid md:grid-cols-[25%_1fr] gap-8 items-start">
          <Image
            src={product.imageUrl}
            alt={product.title}
            width={400}
            height={400}
            className="rounded-lg shadow-md object-cover"
          />
          <div>
            <h1 className="text-3xl font-bold mb-4 text-primary">{product.title}</h1>
            <p className="text-lg text-muted-foreground mb-6">
              {product.description}
            </p>
            {product.price > 0 && (
              <div className="flex items-baseline gap-4 mb-6">
                <span className="text-2xl font-semibold text-primary">
                  ${product.price}{product.currency === 'USD' ? '' : ` ${product.currency}`}
                </span>
                {product.originalPrice && (
                  <span className="text-sm line-through text-muted-foreground">
                    ${product.originalPrice}
                  </span>
                )}
              </div>
            )}
            <div className="mb-6 flex flex-wrap gap-2">
              {product.isFeatured && (
                <Badge variant="primary">Featured</Badge>
              )}
              {product.category && (
                <Badge variant="secondary">{product.category}</Badge>
              )}
            </div>
            <Button
              asChild
              href={product.purchaseUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full md:w-auto bg-primary hover:bg-primary/90"
            >
              Buy Now →
            </Button>
            <p className="text-xs text-muted-foreground mt-2">
              Secure checkout via Gumroad. Instant access after purchase.
            </p>
          </div>
        </div>
      </div>

      <Separator className="my-12" />

      {product.modules && product.modules.length > 0 && (
        <>
          <h2 className="text-2xl font-bold mb-6 text-primary">What You'll Learn</h2>
          <div className="space-y-4">
            {product.modules.map((module, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow border border-muted">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">{module.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                  <CardDescription>{module.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}

      {product.longDescription && (
        <>
          <Separator className="my-12" />
          <div className="prose lg:prose-xl mx-auto">
            {product.longDescription}
          </div>
        </>
      )}
    </>
  );
}