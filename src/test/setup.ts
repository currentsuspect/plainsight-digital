// Test setup
import "@testing-library/jest-dom";

// Mock crypto.randomUUID for tests
Object.defineProperty(global, "crypto", {
  value: {
    randomUUID: () => "test-uuid-1234",
  },
});

// Mock fetch for tests
global.fetch = vi.fn();

// Clean up after each test
import { cleanup } from "@testing-library/react";
import { vi } from "vitest";

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});
