# CADchat QA Demo Suite

A professional QA automation suite demonstrating the tools and approach I bring

## Stack
- Cypress with TypeScript for end-to-end browser testing
- Page Object Model for maintainable test architecture
- Postman and Newman for API testing
- GitHub Actions for CI/CD pipeline integration
- GitHub Secrets for secure credential management

## Test Structure

### Functional Tests
- smoke/ — critical path tests that run on every pull request
- regression/ — comprehensive workflow tests before deployment

### Compliance Tests
- compliance/soc2-access-control.cy.ts — SOC 2 Security criteria (AC-1 through AC-5)
- compliance/soc2-availability.cy.ts — SOC 2 Availability criteria (AV-1 through AV-4)
- compliance/soc2-processing-integrity.cy.ts — SOC 2 Processing Integrity (PI-1 through PI-5)
- compliance/fedramp-account-management.cy.ts — FedRAMP NIST 800-53 AC-2 (AM-1 through AM-7)

## CI/CD Pipeline

Five jobs run automatically on every push and pull request.

- Smoke Tests — runs first, gates everything downstream
- Regression Tests — runs after smoke passes
- Compliance Tests — runs after smoke passes in parallel with regression
- Postman API Tests — runs in parallel covering full CRUD operations
- Production Smoke — runs only on push to main after all other jobs pass

## Environment Configuration

Tests can be run against any environment using npm scripts.

- npm run test:dev — runs against development environment
- npm run test:staging — runs against staging environment
- npm run test:production — runs against production environment
- npm run test:compliance — runs compliance tests only

## GitHub Secrets Required
- CYPRESS_USERNAME
- CYPRESS_PASSWORD

## How QA Supports SOC 2

The automated test suite generates timestamped compliance evidence on every run.

- Access Control tests validate authentication and authorization controls
- Availability tests validate system performance and uptime
- Processing Integrity tests validate accurate data handling
- FedRAMP tests validate NIST 800-53 AC-2 account management controls

Every CI/CD run produces an audit trail showing which controls were tested,
when they ran, and whether they passed. This evidence maps directly to what
SOC 2 auditors request during a Type II assessment.