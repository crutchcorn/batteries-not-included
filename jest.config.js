module.exports = {
  preset: 'ts-jest',
  transform: {
    "^.+\\.[t|j]sx?$": "babel-jest"
  },
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/config/jest/setup.ts'],
  watchPlugins: [
    "jest-watch-typeahead/filename",
    "jest-watch-typeahead/testname"
  ]
};
