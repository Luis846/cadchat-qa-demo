# CADchat QA Demo Suite

A QA automation suite built to demonstrate the tools and approach i would bring to cadchat

## Stack

- cypress with typescript for e2e browser testing
- postman and newman for api testing
- github actions for CI/CD pipeline integration

## test coverage
- user authentication (success and failure scenarios)
- shopping cart workflows (add, remove, checkout)
- API endpoint validation (status, resonse structure, performance)

## CI/CD
Tests run automatically on every push and pull request via Github Actions. Cypress and postman tests run in parallel
failing tests block merging

## Key Patterns
- custom loginBYUI command for fast reusable authentication
- typescript for type-safe test code matching the codebase
- case insensitive assertions where appropriate
- API tests separate from UI tests for faster feedback
