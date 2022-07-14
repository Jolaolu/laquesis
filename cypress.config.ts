import { defineConfig } from 'cypress'

export default defineConfig({
    chromeWebSecurity: false,
    video: false,
    retries: {
        // Configure retry attempts for `cypress run`
        // Default is 0
        "runMode": 2,
        // Configure retry attempts for `cypress open`
        // Default is 0
        "openMode": 0
    },
    e2e: {
        baseUrl: 'http://localhost:8080',
        "supportFile": "./tests/e2e/plugins/index.ts",
    }
})
