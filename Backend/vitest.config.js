import { defineConfig } from 'vitest/config';
import dotenv from 'dotenv';

// Load test-specific .env file
dotenv.config({ path: '.env' });

export default defineConfig({
  test: {
    environment: 'node', 
    globals: true,      
    
  },
});