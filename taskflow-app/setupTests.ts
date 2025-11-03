import '@testing-library/jest-dom'

// Глобальные моки, если нужны
global.IS_REACT_ACT_ENVIRONMENT = true

// Мок для window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // устаревшее
    removeListener: vi.fn(), // устаревшее
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})