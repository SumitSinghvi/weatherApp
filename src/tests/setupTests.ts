import "@testing-library/jest-dom/vitest"
import { afterEach} from 'vitest'
import { cleanup } from '@testing-library/react'
import * as matchers from '@testing-library/jest-dom/matchers';
import { expect } from 'vitest';

// runs a clean after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup();
})


expect.extend(matchers);