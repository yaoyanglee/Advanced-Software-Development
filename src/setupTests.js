// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";
// jest.setup.js
import { TextDecoder, TextEncoder } from "util";

// Polyfill for TextDecoder
global.TextDecoder = TextDecoder;

// Polyfill for TextEncoder
global.TextEncoder = TextEncoder;