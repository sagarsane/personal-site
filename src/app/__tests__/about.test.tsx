import { render, screen } from "@testing-library/react";
import AboutPage from "../about/page";
import { client } from "@/lib/sanity/client";

// Mock the Sanity client
jest.mock("@/lib/sanity/client", () => ({
  client: {
    fetch: jest.fn(),
  },
}));

describe("AboutPage", () => {
  const mockAboutData = {
    bio: [
      {
        _type: "block",
        children: [{ _type: "span", text: "Test bio content" }],
      },
    ],
    skills: [
      {
        category: "Test Category",
        items: ["Skill 1", "Skill 2"],
      },
    ],
    interests: ["Interest 1", "Interest 2"],
    timeline: [
      {
        year: "2024",
        title: "Test Event",
        description: "Test description",
      },
    ],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders error state when fetch fails", async () => {
    (client.fetch as jest.Mock).mockRejectedValue(new Error("Failed to fetch"));
    const page = await AboutPage();
    const { container } = render(page);

    const errorHeading = screen.getByRole("heading", {
      name: /error loading about data/i,
    });
    expect(errorHeading).toBeInTheDocument();

    // Find the outermost div with min-h-screen class
    const outerDiv = container.querySelector("div.min-h-screen");
    expect(outerDiv).toHaveClass("min-h-screen");
  });

  it("renders about page content when data is fetched successfully", async () => {
    (client.fetch as jest.Mock).mockResolvedValue(mockAboutData);
    const page = await AboutPage();
    render(page);

    // Check main structure
    expect(
      screen.getByRole("heading", { name: /about me/i })
    ).toBeInTheDocument();

    // Check bio content
    expect(screen.getByText("Test bio content")).toBeInTheDocument();

    // Check skills section
    const skillsHeading = screen.getByRole("heading", {
      name: /skills & expertise/i,
    });
    expect(skillsHeading).toBeInTheDocument();
    expect(screen.getByText("Test Category")).toBeInTheDocument();
    expect(screen.getByText("Skill 1")).toBeInTheDocument();
    expect(screen.getByText("Skill 2")).toBeInTheDocument();

    // Check interests section
    const interestsHeading = screen.getByRole("heading", {
      name: /interests/i,
    });
    expect(interestsHeading).toBeInTheDocument();
    const interests = screen.getAllByText(/interest [12]/i);
    expect(interests).toHaveLength(2);
    interests.forEach((interest) => {
      expect(interest).toHaveClass("text-indigo-800", "dark:text-indigo-200");
    });

    // Check timeline section
    const timelineHeading = screen.getByRole("heading", { name: /timeline/i });
    expect(timelineHeading).toBeInTheDocument();

    const timelineEvent = screen.getByText("Test Event");
    expect(timelineEvent).toBeInTheDocument();

    const timelineYear = screen.getByText("2024");
    expect(timelineYear).toHaveClass("text-indigo-600", "dark:text-indigo-400");

    const timelineDescription = screen.getByText("Test description");
    expect(timelineDescription).toHaveClass(
      "text-gray-500",
      "dark:text-gray-400"
    );
  });

  it("logs errors when fetch fails", async () => {
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();
    const error = new Error("Failed to fetch");
    (client.fetch as jest.Mock).mockRejectedValue(error);

    await AboutPage();

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Error fetching about data:",
      error
    );
    consoleErrorSpy.mockRestore();
  });

  it("logs fetched data in development", async () => {
    const consoleLogSpy = jest.spyOn(console, "log").mockImplementation();
    (client.fetch as jest.Mock).mockResolvedValue(mockAboutData);

    await AboutPage();

    expect(consoleLogSpy).toHaveBeenCalledWith("Fetching about data...");
    expect(consoleLogSpy).toHaveBeenCalledWith(
      "About data:",
      JSON.stringify(mockAboutData, null, 2)
    );
    consoleLogSpy.mockRestore();
  });
});
