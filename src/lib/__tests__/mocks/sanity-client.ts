export const mockSanityClient = {
  fetch: jest.fn(),
  config: () => ({
    projectId: 'test-project-id',
    dataset: 'test-dataset',
    apiVersion: '2024-03-19',
    useCdn: false,
    token: 'test-token'
  })
}; 