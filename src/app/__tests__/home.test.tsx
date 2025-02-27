import { render, screen } from "@testing-library/react";
import HomePage from "../page";

describe("HomePage", () => {
  it("renders hero section with correct content", () => {
    render(<HomePage />);

    // Check hero section content
    expect(screen.getByText("Hi, I'm Sagar Sane")).toBeInTheDocument();
    expect(screen.getByText("Software Engineer")).toBeInTheDocument();
    expect(screen.getByText("& Tech Enthusiast")).toBeInTheDocument();

    // Check hero section description
    expect(
      screen.getByText(/Passionate about building innovative solutions/)
    ).toBeInTheDocument();
  });

  it("renders navigation buttons in hero section", () => {
    render(<HomePage />);

    // Check navigation buttons
    const aboutButton = screen.getByRole("link", { name: "More about me" });
    const experienceButton = screen.getByRole("link", {
      name: "My Experience",
    });

    expect(aboutButton).toBeInTheDocument();
    expect(experienceButton).toBeInTheDocument();

    expect(aboutButton).toHaveAttribute("href", "/about");
    expect(experienceButton).toHaveAttribute("href", "/experience");
  });

  it("renders featured sections", () => {
    render(<HomePage />);

    // Check featured sections
    expect(screen.getByText("Featured Projects")).toBeInTheDocument();
    expect(screen.getByText("Latest Blog Posts")).toBeInTheDocument();
    expect(screen.getByText("Get in Touch")).toBeInTheDocument();

    // Check featured section descriptions
    expect(
      screen.getByText(/Check out some of my recent work/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Read my thoughts on technology/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Interested in working together/)
    ).toBeInTheDocument();
  });

  it("renders featured section links correctly", () => {
    render(<HomePage />);

    // Check featured section links
    const projectsLink = screen.getByRole("link", { name: /View Projects/ });
    const blogLink = screen.getByRole("link", { name: /Read Blog/ });
    const contactLink = screen.getByRole("link", { name: /Contact Me/ });

    expect(projectsLink).toHaveAttribute("href", "/projects");
    expect(blogLink).toHaveAttribute("href", "/blog");
    expect(contactLink).toHaveAttribute("href", "/contact");
  });

  it("renders profile image", () => {
    render(<HomePage />);

    const profileImage = screen.getByAltText("Sagar Sane");
    expect(profileImage).toBeInTheDocument();
    expect(profileImage).toHaveAttribute(
      "src",
      expect.stringContaining("placeholder-profile.jpg")
    );
  });
});
