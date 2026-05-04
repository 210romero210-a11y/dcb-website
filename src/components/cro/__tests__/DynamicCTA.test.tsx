import { render, screen, fireEvent } from '@testing-library/react';
import { DynamicCTA } from '../DynamicCTA';

// Mock the hooks
let trackEventMock: jest.Mock;
const mockSessionId = 'test-session-id';

beforeEach(() => {
  trackEventMock = jest.fn();
  jest.clearAllMocks();
});

jest.mock('@/lib/analytics/useTrackEvent', () => ({
  useTrackEvent: () => ({
    trackEvent: trackEventMock,
    sessionId: mockSessionId,
  }),
}));

jest.mock('@/lib/cro/useExperimentVariant');

const baseProps = {
  productId: 'test-product-123',
  baseText: 'Buy Now →',
  experimentName: 'product_page_cta_test',
};

describe('DynamicCTA', () => {
  describe('CTA text based on variant', () => {
    it('renders control variant text', () => {
      const useExperimentVariantMock = require('@/lib/cro/useExperimentVariant');
      (useExperimentVariantMock.useExperimentVariant as jest.Mock).mockReturnValue('control');
      render(<DynamicCTA {...baseProps} />);
      expect(screen.getByRole('button', { name: /Buy Now →/i })).toBeInTheDocument();
    });

    it('renders urgency variant text', () => {
      const useExperimentVariantMock = require('@/lib/cro/useExperimentVariant');
      (useExperimentVariantMock.useExperimentVariant as jest.Mock).mockReturnValue('urgency');
      render(<DynamicCTA {...baseProps} />);
      expect(screen.getByRole('button', { name: /Hurry! Buy Now →/i })).toBeInTheDocument();
    });

    it('renders social_proof variant text', () => {
      const useExperimentVariantMock = require('@/lib/cro/useExperimentVariant');
      (useExperimentVariantMock.useExperimentVariant as jest.Mock).mockReturnValue('social_proof');
      render(<DynamicCTA {...baseProps} />);
      expect(screen.getByRole('button', { name: /Join 1,234\+ buy now →/i })).toBeInTheDocument();
    });

    it('renders base text for unknown variant', () => {
      const useExperimentVariantMock = require('@/lib/cro/useExperimentVariant');
      (useExperimentVariantMock.useExperimentVariant as jest.Mock).mockReturnValue('unknown_variant');
      render(<DynamicCTA {...baseProps} />);
      expect(screen.getByRole('button', { name: /Buy Now →/i })).toBeInTheDocument();
    });
  });

  describe('click handling', () => {
    it('calls trackEvent with correct arguments on click', async () => {
      const useExperimentVariantMock = require('@/lib/cro/useExperimentVariant');
      (useExperimentVariantMock.useExperimentVariant as jest.Mock).mockReturnValue('control');
      render(<DynamicCTA {...baseProps} />);

      const button = screen.getByRole('button', { name: /Buy Now →/i });
      await fireEvent.click(button);

      expect(trackEventMock).toHaveBeenCalledWith('click_buy', {
        productId: 'test-product-123',
        experiment: 'product_page_cta_test',
        variant: 'control',
        ctaText: 'Buy Now →',
      });
    });

    it('disables button after click and shows processing text', async () => {
      const useExperimentVariantMock = require('@/lib/cro/useExperimentVariant');
      (useExperimentVariantMock.useExperimentVariant as jest.Mock).mockReturnValue('control');
      render(<DynamicCTA {...baseProps} />);

      const button = screen.getByRole('button', { name: /Buy Now →/i });
      expect(button).not.toBeDisabled();
      expect(button).toHaveTextContent('Buy Now →');

      await fireEvent.click(button);

      // After click, the button should be disabled and show processing text
      expect(button).toBeDisabled();
      expect(button).toHaveTextContent('Processing...');
    });

    it('does not call trackEvent more than once on multiple clicks', async () => {
      const useExperimentVariantMock = require('@/lib/cro/useExperimentVariant');
      (useExperimentVariantMock.useExperimentVariant as jest.Mock).mockReturnValue('control');
      render(<DynamicCTA {...baseProps} />);

      const button = screen.getByRole('button', { name: /Buy Now →/i });
      await fireEvent.click(button);
      await fireEvent.click(button); // Second click should be ignored due to disabled state
      await fireEvent.click(button); // Third click

      expect(trackEventMock).toHaveBeenCalledTimes(1);
    });
  });
});
