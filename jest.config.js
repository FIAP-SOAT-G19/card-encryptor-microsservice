module.exports = {
  collectCoverage: false,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/application/interfaces/**/*',
    '!<rootDir>/src/infra/factories/**/*',
    '!<rootDir>/src/infra/shared/config/**/*',
    '!<rootDir>/src/infra/http/**/*',
    '!<rootDir>/src/adapters/gateways/**/*',
    '!<rootDir>/src/adapters/middlewares/**/*',
    '!<rootDir>/src/adapters/tools/**/*',
    '!<rootDir>/src/main/**/*',
    '!<rootDir>/src/shared/**/*',
  ],
  coverageDirectory: 'coverage',
  coverageProvider: 'babel',
  moduleNameMapper: {
    '@/(.+)': '<rootDir>/src/$1'
  },
  testMatch: ['**/*.spec.ts'],
  roots: [
    '<rootDir>/src',
  ],
  transform: {
    '\\.ts$': 'ts-jest'
  },
  clearMocks: true,
}
