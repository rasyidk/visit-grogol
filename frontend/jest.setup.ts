import '@testing-library/jest-dom';

// jsdom lacks these; stub for framer-motion / sonner.
if (typeof window !== 'undefined') {
  window.matchMedia =
    window.matchMedia ||
    ((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));

  // @ts-expect-error jsdom missing
  window.IntersectionObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() {
      return [];
    }
  };

  window.HTMLElement.prototype.scrollIntoView = jest.fn();
  // Avoid noisy URL.createObjectURL errors in MediaUpload tests
  if (!URL.createObjectURL) {
    URL.createObjectURL = jest.fn(() => 'blob:mock') as typeof URL.createObjectURL;
  }
}
