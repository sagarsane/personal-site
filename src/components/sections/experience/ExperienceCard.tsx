import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { urlFor } from "@/lib/sanity/image";
import { Experience } from "@/types/sanity";

interface ExperienceCardProps {
  experience: Experience;
}

export default function ExperienceCard({ experience }: ExperienceCardProps) {
  return (
    <div className="lg:grid lg:grid-cols-12 lg:gap-8">
      {/* Company Info */}
      <div className="lg:col-span-4">
        <div className="flex items-center space-x-4">
          {experience.logo && (
            <div className="flex-shrink-0">
              <Image
                src={urlFor(experience.logo).url()}
                alt={experience.company}
                width={64}
                height={64}
                className="h-16 w-16 rounded-full object-contain"
              />
            </div>
          )}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {experience.company}
            </h2>
            <p className="text-lg font-medium text-gray-600 dark:text-gray-300">
              {experience.position}
            </p>
            <div className="mt-1 flex flex-col text-sm text-gray-500 dark:text-gray-400">
              <span>
                {new Date(experience.startDate).toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}{" "}
                -{" "}
                {experience.current
                  ? "Present"
                  : experience.endDate &&
                    new Date(experience.endDate).toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                    })}
              </span>
              {experience.location && <span>{experience.location}</span>}
            </div>
          </div>
        </div>
      </div>

      {/* Description and Details */}
      <div className="mt-6 lg:mt-0 lg:col-span-8">
        <div className="prose dark:prose-invert">
          <PortableText value={experience.description} />
        </div>

        {/* Technologies */}
        {experience.technologies && experience.technologies.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Technologies
            </h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {experience.technologies.map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Key Achievements */}
        {experience.achievements && experience.achievements.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Key Achievements
            </h3>
            <ul className="mt-4 list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
              {experience.achievements.map((achievement, i) => (
                <li key={i}>{achievement}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
