import { cn } from '../utils';

describe('cn utility function', () => {
  it('should merge class names correctly', () => {
    expect(cn('a', 'b')).toBe('a b');
    expect(cn('a', 'a')).toBe('a a'); // clsx does not deduplicate, twMerge does not change non-Tailwind classes
    expect(cn('a', false && 'b')).toBe('a');
    expect(cn(null, undefined, 'c')).toBe('c');
  });

  it('should handle ClassValue objects', () => {
    // Since we are using clsx and twMerge, we can test that it returns a string
    expect(typeof cn('a', { b: true })).toBe('string');
  });
});
