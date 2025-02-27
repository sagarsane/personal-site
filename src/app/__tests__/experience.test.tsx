import { render, screen } from "@testing-library/react";
import ExperiencePage from "../experience/page";
import { client } from "@/lib/sanity/client";

// Mock the Sanity client
jest.mock("@/lib/sanity/client", () => ({
  client: {
    fetch: jest.fn(),
  },
}));

describe("ExperiencePage", () => {
  const mockExperienceData = [
    {
      company: "Adobe",
      position: "Principal Technical Architect",
      startDate: "2021-08-09",
      current: true,
      location: "Holly Springs, NC",
      description: [
        {
          _type: "block",
          children: [
            { _type: "span", text: "Test description for Adobe position" },
          ],
        },
      ],
      technologies: ["AEM", "Adobe IO", "Cloud Architecture"],
      achievements: ["Achievement 1", "Achievement 2"],
    },
    {
      company: "Blue Acorn iCi",
      position: "Vice President",
      startDate: "2021-01-03",
      endDate: "2021-08-06",
      current: false,
      location: "Raleigh, NC",
      description: [
        {
          _type: "block",
          children: [
            { _type: "span", text: "Test description for BAI position" },
          ],
        },
      ],
      technologies: ["Adobe Experience Cloud", "Technical Leadership"],
      achievements: ["Achievement 3", "Achievement 4"],
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

    const page = await ExperiencePage();
    const { container } = render(page);

    const errorHeading = screen.getByRole("heading", {
      name: /error loading experience data/i,
    });
    expect(errorHeading).toBeInTheDocument();

    const errorMessage = screen.getByText(/unable to load experience data/i);
    expect(errorMessage).toBeInTheDocument();

    // Find the outermost div with min-h-screen class
    const outerDiv = container.querySelector("div.min-h-screen");
    expect(outerDiv).toHaveClass("min-h-screen");

    // Verify error was logged
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Error fetching experience data:",
      expect.any(Error)
    );

    consoleErrorSpy.mockRestore();
  });

  it("renders experience entries when data is fetched successfully", async () => {
    (client.fetch as jest.Mock).mockResolvedValue(mockExperienceData);
    const page = await ExperiencePage();
    render(page);

    // Check if company names are rendered
    expect(screen.getByText("Adobe")).toBeInTheDocument();
    expect(screen.getByText("Blue Acorn iCi")).toBeInTheDocument();

    // Check if positions are rendered
    expect(
      screen.getByText("Principal Technical Architect")
    ).toBeInTheDocument();
    expect(screen.getByText("Vice President")).toBeInTheDocument();

    // Check if descriptions are rendered
    expect(
      screen.getByText("Test description for Adobe position")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Test description for BAI position")
    ).toBeInTheDocument();

    // Check if technologies are rendered
    expect(screen.getByText("AEM")).toBeInTheDocument();
    expect(screen.getByText("Adobe Experience Cloud")).toBeInTheDocument();

    // Check if achievements are rendered
    expect(screen.getByText("Achievement 1")).toBeInTheDocument();
    expect(screen.getByText("Achievement 3")).toBeInTheDocument();
  });

  it("displays current position indicator for current role", async () => {
    (client.fetch as jest.Mock).mockResolvedValue(mockExperienceData);
    const page = await ExperiencePage();
    render(page);

    // Check if current position is indicated
    expect(screen.getByText(/Present/)).toBeInTheDocument();
  });

  it("sorts experiences by start date in descending order", async () => {
    (client.fetch as jest.Mock).mockResolvedValue(mockExperienceData);
    const page = await ExperiencePage();
    render(page);

    const companies = screen.getAllByRole("heading", { level: 2 });
    expect(companies[0].textContent).toBe("Adobe");
    expect(companies[1].textContent).toBe("Blue Acorn iCi");
  });
});
