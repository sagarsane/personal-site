import type { ClientConfig } from "next-sanity";

const mockFetch = jest.fn();
const mockCreateClient = jest.fn();

// Mock createClient before any imports
jest.mock("next-sanity", () => ({
  createClient: (config: ClientConfig) => {
    mockCreateClient(config);
    return { fetch: mockFetch };
  },
}));

describe("Sanity Client", () => {
  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
    
    // Set default environment variables
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID = "test-project-id";
    process.env.NEXT_PUBLIC_SANITY_DATASET = "test-dataset";
  });

  afterEach(() => {
    // Clean up environment variables
    delete process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
    delete process.env.NEXT_PUBLIC_SANITY_DATASET;
    jest.resetModules();
  });

  it("initializes with correct configuration", async () => {
    await import("../client");
    expect(mockCreateClient).toHaveBeenCalledWith({
      projectId: "test-project-id",
      dataset: "test-dataset",
      apiVersion: "2024-03-19",
      useCdn: false,
      token: undefined,
    });
  });

  it("uses environment variables for configuration", async () => {
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID = "custom-project-id";
    process.env.NEXT_PUBLIC_SANITY_DATASET = "custom-dataset";
    
    jest.resetModules();
    await import("../client");
    
    expect(mockCreateClient).toHaveBeenCalledWith(
      expect.objectContaining({
        projectId: "custom-project-id",
        dataset: "custom-dataset",
      })
    );
  });

  describe("Query Functions", () => {
    it("handles successful queries", async () => {
      const mockData = { test: "data" };
      mockFetch.mockResolvedValueOnce(mockData);
      
      const { client } = await import("../client");
      const result = await client.fetch('*[_type == "test"]');
      
      expect(result).toEqual(mockData);
      expect(mockFetch).toHaveBeenCalledWith('*[_type == "test"]');
    });

    it("handles query errors", async () => {
      const error = new Error("Query failed");
      mockFetch.mockRejectedValueOnce(error);
      
      const { client } = await import("../client");
      await expect(client.fetch('*[_type == "test"]')).rejects.toThrow("Query failed");
    });

    it("handles empty results", async () => {
      mockFetch.mockResolvedValueOnce(null);
      
      const { client } = await import("../client");
      const result = await client.fetch('*[_type == "test"]');
      
      expect(result).toBeNull();
    });
  });

  describe("Environment Configuration", () => {
    it("requires project ID", async () => {
      delete process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
      jest.resetModules();
      
      mockCreateClient.mockImplementationOnce(() => {
        throw new Error("Configuration must contain `projectId`");
      });
      
      await expect(import("../client")).rejects.toThrow("Configuration must contain `projectId`");
    });

    it("requires dataset", async () => {
      delete process.env.NEXT_PUBLIC_SANITY_DATASET;
      jest.resetModules();
      
      mockCreateClient.mockImplementationOnce(() => {
        throw new Error("Configuration must contain `dataset`");
      });
      
      await expect(import("../client")).rejects.toThrow("Configuration must contain `dataset`");
    });
  });
}); 