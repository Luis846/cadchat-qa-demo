import { defineConfig } from 'cypress'

export default defineConfig({
  e2e:{
    baseUrl: 'https://www.saucedemo.com',
    viewportWidth: 1200,
    viewportHeight: 720,
    defaultCommandTimeout: 8000,
  }
})