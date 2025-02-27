import { Metadata } from "next";
import { client } from "@/lib/sanity/client";
import { Experience } from "@/types/sanity";
import ExperienceCard from "@/components/sections/experience/ExperienceCard";

export const metadata: Metadata = {
  title: "Experience - Sagar Sane",
  description: "Professional experience and career journey of Sagar Sane.",
};

async function getExperienceData(): Promise<Experience[] | null> {
  try {
    return await client.fetch(`
      *[_type == "experience"] | order(startDate desc) {
        company,
        position,
        logo,
        startDate,
        endDate,
        current,
        location,
        description,
        technologies,
        achievements
      }
    `);
  } catch (error) {
    console.error("Error fetching experience data:", error);
    return null;
  }
}

export default async function ExperiencePage() {
  try {
    const experiences = await getExperienceData();

    if (!experiences || experiences.length === 0) {
      return (
        <div className="min-h-screen py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl">
              Error loading experience data
            </h1>
            <p className="mt-6 text-lg text-gray-500 dark:text-gray-400">
              Unable to load experience data. Please try again later.
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl">
            Experience
          </h1>
          <div className="mt-12 space-y-16">
            {experiences.map((experience, index) => (
              <ExperienceCard
                key={`${experience.company}-${index}`}
                experience={experience}
              />
            ))}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error rendering experience page:", error);
    return (
      <div className="min-h-screen py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl">
            Error loading experience data
          </h1>
          <p className="mt-6 text-lg text-gray-500 dark:text-gray-400">
            An unexpected error occurred. Please try again later.
          </p>
        </div>
      </div>
    );
  }
}
