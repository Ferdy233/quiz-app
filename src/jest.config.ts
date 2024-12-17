import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest", // Use ts-jest preset for TypeScript support
  testEnvironment: "jsdom", // Use jsdom for testing React components
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"], // Setup file for additional configurations
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "\\.(css|less|scss)$": "identity-obj-proxy", // Mock CSS imports
    "\\.(gif|jpg|jpeg|png|svg)$": "<rootDir>/__mocks__/fileMock.ts",
    // Mock CSS imports
  },
  transform: {
    "^.+\\.tsx?$": "babel-jest", // Use babel-jest for transforming TypeScript files
  },
};

export default config;
