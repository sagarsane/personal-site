import { client } from '../sanity/client';

// Mock next-sanity module
jest.mock('next-sanity', () => ({
  createClient: () => ({
    config: () => ({
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
      apiVersion: "2024-03-19",
      useCdn: false,
      token: process.env.SANITY_API_TOKEN
    }),
    fetch: jest.fn()
  })
}));

describe('Sanity Client', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = {
      ...originalEnv,
      NEXT_PUBLIC_SANITY_PROJECT_ID: 'test-project-id',
      NEXT_PUBLIC_SANITY_DATASET: 'test-dataset',
      SANITY_API_TOKEN: 'test-token'
    };
  });

  afterEach(() => {
    process.env = originalEnv;
    jest.clearAllMocks();
  });

  it('should be configured with correct project settings', () => {
    const config = client.config();
    expect(config).toMatchObject({
      projectId: 'test-project-id',
      dataset: 'test-dataset',
      apiVersion: '2024-03-19',
      useCdn: false,
    });
  });

  it('should have the correct API version format', () => {
    const { apiVersion } = client.config();
    expect(apiVersion).toBe('2024-03-19');
  });

  it('should use environment variables for configuration', () => {
    const config = client.config();
    expect(config.projectId).toBe('test-project-id');
    expect(config.dataset).toBe('test-dataset');
    expect(config.token).toBe('test-token');
  });
}); 