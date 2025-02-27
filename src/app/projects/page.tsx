import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { client } from "@/lib/sanity/client";
import { urlFor } from "@/lib/sanity/image";
import { Project } from "@/types/sanity";

export const metadata: Metadata = {
  title: "Projects - Sagar Sane",
  description: "Featured projects and work by Sagar Sane.",
};

async function getProjectsData(): Promise<Project[] | null> {
  try {
    return await client.fetch(`
      *[_type == "project"] | order(order asc) {
        title,
        slug,
        description,
        mainImage,
        projectUrl,
        githubUrl,
        technologies,
        featured,
        order
      }
    `);
  } catch (error) {
    console.error("Error fetching projects data:", error);
    return null;
  }
}

export default async function ProjectsPage() {
  try {
    const projects = await getProjectsData();

    if (!projects || projects.length === 0) {
      return (
        <div className="min-h-screen py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl">
              Projects
            </h1>
            <p className="mt-6 text-lg text-gray-500 dark:text-gray-400">
              Content is being updated...
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl">
            Projects
          </h1>
          <p className="mt-6 text-xl text-gray-500 dark:text-gray-400">
            A selection of projects I've worked on, from web applications to
            open-source contributions.
          </p>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <div
                key={project.slug.current}
                className="flex flex-col bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-[1.02]"
              >
                {project.mainImage && (
                  <div className="relative h-48">
                    <Image
                      src={urlFor(project.mainImage).url()}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="flex-1 p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {project.title}
                  </h3>
                  <div className="mt-3 text-base text-gray-500 dark:text-gray-400">
                    <PortableText value={project.description} />
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.technologies?.map((tech) => (
                      <span
                        key={tech}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="mt-6 flex gap-4">
                    {project.projectUrl && (
                      <Link
                        href={project.projectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        View Project
                      </Link>
                    )}
                    {project.githubUrl && (
                      <Link
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        View Code
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error rendering projects page:", error);
    return (
      <div className="min-h-screen py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl">
            Projects
          </h1>
          <p className="mt-6 text-lg text-gray-500 dark:text-gray-400">
            Content is being updated...
          </p>
        </div>
      </div>
    );
  }
}
