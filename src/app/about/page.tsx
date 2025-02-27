import { Metadata } from "next";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { client } from "@/lib/sanity/client";
import { urlFor } from "@/lib/sanity/image";
import { AboutData, SkillCategory, TimelineItem } from "@/types/sanity";

export const metadata: Metadata = {
  title: "About - Sagar Sane",
  description:
    "Learn more about Sagar Sane - my background, skills, and interests.",
};

async function getAboutData(): Promise<AboutData | null> {
  try {
    console.log("Fetching about data...");
    const data = await client.fetch(`
      *[_type == "about"][0] {
        bio,
        skills,
        interests,
        timeline
      }
    `);
    console.log("About data:", JSON.stringify(data, null, 2));
    return data;
  } catch (error) {
    console.error("Error fetching about data:", error);
    return null;
  }
}

export default async function AboutPage() {
  const aboutData = await getAboutData();

  if (!aboutData) {
    return (
      <div className="min-h-screen py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl">
            Error loading about data
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Bio Section */}
        <div className="prose dark:prose-invert lg:prose-lg max-w-none">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl mb-8">
            About Me
          </h1>
          <div className="text-gray-500 dark:text-gray-400">
            <PortableText value={aboutData.bio} />
          </div>
        </div>

        {/* Skills Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Skills & Expertise
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {aboutData.skills.map((category) => (
              <div
                key={category.category}
                className="bg-white dark:bg-gray-800 shadow rounded-lg p-6"
              >
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  {category.category}
                </h3>
                <ul className="mt-4 space-y-2">
                  {category.items.map((skill) => (
                    <li
                      key={skill}
                      className="text-gray-500 dark:text-gray-400"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Interests Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Interests
          </h2>
          <div className="mt-6 flex flex-wrap gap-4">
            {aboutData.interests.map((interest) => (
              <span
                key={interest}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>

        {/* Timeline Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Timeline
          </h2>
          <div className="mt-6 space-y-8">
            {aboutData.timeline.map((item) => (
              <div
                key={item.year}
                className="relative pl-8 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0.5 before:bg-indigo-600 dark:before:bg-indigo-400"
              >
                <div className="absolute left-0 top-0 -translate-x-1/2 w-4 h-4 rounded-full bg-indigo-600 dark:bg-indigo-400" />
                <div className="text-sm text-indigo-600 dark:text-indigo-400 font-semibold">
                  {item.year}
                </div>
                <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-gray-500 dark:text-gray-400">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
