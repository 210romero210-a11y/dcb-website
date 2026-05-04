import { render, screen, fireEvent } from '@testing-library/react';
import { Metadata } from 'next';
import { MockedProvider } from '@testing-library/react';

// Mock next/image and next/navigation
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, width, height, ...rest }: { src: string; alt: string; width?: number; height?: number; [key: string]: any }) => (
    <img 
      data-testid="next-image"
      src={src}
      alt={alt}
      width={width || 400}
      height={height || 400}
      {...rest}
    />
  ),
}));
jest.mock('next/navigation', () => ({
  __esModule: true,
  ...jest.requireActual('next/navigation'),
  notFound: jest.fn()
});

// Mock the Convex functions and hooks
jest.mock('@/lib/convex/products');
jest.mock('@/lib/analytics/useTrackEvent');
jest.mock('@/lib/cro/useExperimentVariant');

import { getProductBySlug } from '@/lib/convex/products';
import { useTrackEvent } from '@/lib/analytics/useTrackEvent';
import { useExperimentVariant } from '@/lib/cro/useExperimentVariant';
import ProductPage from '../page';

// Mock the product data
const mockProduct = {
  id: 'test-product-id',
  slug: 'understanding-overcoming-gaslighting-emotional-abuse',
  title: 'Understanding & Overcoming Gaslighting & Emotional Abuse',
  description: 'A comprehensive guide to recognizing, healing, and building resilience against manipulation.',
  price: 49.99,
  currency: 'USD',
  originalPrice: 69.99,
  isFeatured: true,
  category: 'Mental Health',
  imageUrl: '/test-image.jpg',
  modules: [
    { title: 'Introduction', description: 'Overview of gaslighting' },
    { title: 'Recognizing Tactics', description: 'Learn to identify manipulation' },
  ],
  longDescription: '<p>This is a long description.</p>',
};

describe('ProductPage Integration', () => {
  const mockParams = { slug: mockProduct.slug };

  beforeEach(() => {
    jest.clearAllMocks();
    (getProductBySlug as jest.Mock).mockResolvedValue(mockProduct);
    (useTrackEvent as jest.Mock).mockReturnValue({
      trackEvent: jest.fn(),
      sessionId: 'test-session-id',
    });
    (useExperimentVariant as jest.Mock).mockReturnValue('control');
  });

  it('should be defined', () => {
    expect(ProductPage).toBeDefined();
  });

  it('fetches product data and renders correctly', async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <MockedProvider>{children}</MockedProvider>
    );
    const { findByTitle, findByText } = await render(<ProductPage params={mockParams} />, { wrapper });

    // Check that the product title is rendered
    expect(await findByTitle(mockProduct.title)).toBeInTheDocument();
    // Check that the product description is rendered
    await expect(findByText(mockProduct.description)).toBeInTheDocument();
    // Check that the price is rendered
    expect(await findByText(`$${mockProduct.price}`)).toBeInTheDocument();
    // Check that the original price is rendered (strikethrough)
    expect(await findByText(`$${mockProduct.originalPrice}`)).toHaveClass('line-through');
    // Check that the badges are rendered
    expect(await findByText('Featured')).toBeInTheDocument();
    expect(await findByText(mockProduct.category)).toBeInTheDocument();
    // Check that the image is rendered (using the data-testid we set in the mock)
    expect(await screen.findByTestId('next-image')).toHaveAttribute('src', mockProduct.imageUrl);
    // Check that the modules are rendered
    expect(await findByText('Introduction')).toBeInTheDocument();
    expect(await findByText('Overview of gaslighting')).toBeInTheDocument();
    expect(await findByText('Recognizing Tactics')).toBeInTheDocument();
    // Check that the long description is rendered
    expect(await findByText('This is a long description.')).toBeInTheDocument();
  });

  it('tracks event when CTA is clicked', async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <MockedProvider>{children}</MockedProvider>
    );
    const { findByRole } = await render(<ProductPage params={mockParams} />, { wrapper });

    const ctaButton = await findByRole('button', { name: /Buy Now →/i });
    const mockTrackEvent = (useTrackEvent as jest.Mock).mock.results[0].value.trackEvent;

    // Click the button
    await fireEvent.click(ctaButton);

    // Check that trackEvent was called with the expected arguments
    expect(mockTrackEvent).toHaveBeenCalledWith('click_buy', {
      productId: mockProduct.id,
      experiment: 'product_page_cta_test',
      variant: 'control',
      ctaText: 'Buy Now →',
    });
  });

  it('handles product not found by calling notFound', async () => {
    (getProductBySlug as jest.Mock).mockResolvedValue(null);

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <MockedProvider>{children}</MockedProvider>
    );
    // We expect the component to throw or call notFound, but we can't easily catch the throw in testing-library.
    // Instead, we mock notFound and check that it was called.
    const { notFound } = require('next/navigation');
    const { container } = render(<ProductPage params={{ slug: 'non-existent-slug' }} />, { wrapper });

    // If notFound is called, the component will have thrown and the container might be empty.
    // We'll just check that notFound was called.
    expect(notFound).toHaveBeenCalled();
  });
});