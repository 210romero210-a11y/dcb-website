import { getProductBySlug } from '../products';

// Mock the query function from ../server
jest.mock('../server', () => ({
  query: jest.fn(),
}));

import { query } from '../server';

describe('getProductBySlug', () => {
  const mockSlug = 'test-slug';
  const mockProduct = {
    id: 'test-id',
    slug: mockSlug,
    title: 'Test Product',
    description: 'A test product',
    price: 29.99,
    currency: 'USD',
    imageUrl: '/test.jpg',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call query with correct path and args', async () => {
    (query as jest.Mock).mockResolvedValue(mockProduct);

    const result = await getProductBySlug(mockSlug);

    expect(query).toHaveBeenCalledWith('products:getBySlug', { slug: mockSlug });
    expect(result).toEqual(mockProduct);
  });

  it('should return null if product not found', async () => {
    (query as jest.Mock).mockResolvedValue(null);

    const result = await getProductBySlug(mockSlug);

    expect(query).toHaveBeenCalledWith('products:getBySlug', { slug: mockSlug });
    expect(result).toBeNull();
  });

  it('should handle errors from query', async () => {
    (query as jest.Mock).mockRejectedValue(new Error('Convex error'));

    await expect(getProductBySlug(mockSlug)).rejects.toThrow('Convex error');
  });
});
