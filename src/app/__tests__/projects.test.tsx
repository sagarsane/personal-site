import { render, screen } from "@testing-library/react";
import ProjectsPage from "../projects/page";
import { client } from "@/lib/sanity/client";

// Mock the Sanity client
jest.mock("@/lib/sanity/client", () => ({
  client: {
    fetch: jest.fn(),
  },
}));

describe("ProjectsPage", () => {
  const mockProjectsData = [
    {
      title: "AEM Cloud Service Implementation",
      slug: { current: "aem-cloud-implementation" },
      description: [
        {
          _type: "block",
          children: [
            { _type: "span", text: "Test description for AEM project" },
          ],
        },
      ],
      technologies: ["AEM Cloud Service", "Adobe IO Runtime"],
      projectUrl: "https://example.com/aem",
      githubUrl: "https://github.com/example/aem",
      featured: true,
      order: 1,
    },
    {
      title: "Adobe Commerce Integration",
      slug: { current: "adobe-commerce-integration" },
      description: [
        {
          _type: "block",
          children: [
            { _type: "span", text: "Test description for Commerce project" },
          ],
        },
      ],
      technologies: ["Adobe Commerce", "GraphQL"],
      projectUrl: "https://example.com/commerce",
      githubUrl: "https://github.com/example/commerce",
      featured: true,
      order: 2,
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders error state when fetch fails", async () => {
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();
    (client.fetch as jest.Mock).mockRejectedValueOnce(
      new Error("Failed to fetch")
    );

    const page = await ProjectsPage();
    const { container } = render(page);

    // Check for the error message
    expect(screen.getByText("Content is being updated...")).toBeInTheDocument();

    // Check for the Projects heading
    const heading = screen.getByRole("heading", { name: /projects/i });
    expect(heading).toBeInTheDocument();

    // Check for min-h-screen class
    const outerDiv = container.querySelector("div.min-h-screen");
    expect(outerDiv).toHaveClass("min-h-screen");

    consoleErrorSpy.mockRestore();
  });

  it("renders project cards when data is fetched successfully", async () => {
    (client.fetch as jest.Mock).mockResolvedValue(mockProjectsData);
    const page = await ProjectsPage();
    render(page);

    // Check if project titles are rendered
    expect(
      screen.getByText("AEM Cloud Service Implementation")
    ).toBeInTheDocument();
    expect(screen.getByText("Adobe Commerce Integration")).toBeInTheDocument();

    // Check if descriptions are rendered
    expect(
      screen.getByText("Test description for AEM project")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Test description for Commerce project")
    ).toBeInTheDocument();

    // Check if technologies are rendered
    expect(screen.getByText("AEM Cloud Service")).toBeInTheDocument();
    expect(screen.getByText("Adobe Commerce")).toBeInTheDocument();

    // Check if links are rendered
    const links = screen.getAllByRole("link");
    expect(
      links.some(
        (link) => link.getAttribute("href") === "https://example.com/aem"
      )
    ).toBe(true);
    expect(
      links.some(
        (link) => link.getAttribute("href") === "https://github.com/example/aem"
      )
    ).toBe(true);
  });

  it("sorts projects by order", async () => {
    (client.fetch as jest.Mock).mockResolvedValue(mockProjectsData);
    const page = await ProjectsPage();
    render(page);

    const titles = screen.getAllByRole("heading", { level: 3 });
    expect(titles[0].textContent).toBe("AEM Cloud Service Implementation");
    expect(titles[1].textContent).toBe("Adobe Commerce Integration");
  });

  it("renders project links correctly", async () => {
    (client.fetch as jest.Mock).mockResolvedValue(mockProjectsData);
    const page = await ProjectsPage();
    render(page);

    // Check if "View Project" and "View Code" buttons are rendered
    const viewProjectLinks = screen.getAllByText("View Project");
    const viewCodeLinks = screen.getAllByText("View Code");

    expect(viewProjectLinks).toHaveLength(2);
    expect(viewCodeLinks).toHaveLength(2);

    // Check if links have correct attributes
    expect(viewProjectLinks[0]).toHaveAttribute(
      "href",
      "https://example.com/aem"
    );
    expect(viewCodeLinks[0]).toHaveAttribute(
      "href",
      "https://github.com/example/aem"
    );
  });
});
