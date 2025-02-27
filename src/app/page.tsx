import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
              <h1>
                <span className="block text-base font-semibold text-indigo-600 dark:text-indigo-400">
                  Hi, I'm Sagar Sane
                </span>
                <span className="mt-1 block text-4xl tracking-tight font-extrabold sm:text-5xl xl:text-6xl">
                  <span className="block text-gray-900 dark:text-white">
                    Software Engineer
                  </span>
                  <span className="block text-indigo-600 dark:text-indigo-400">
                    & Tech Enthusiast
                  </span>
                </span>
              </h1>
              <p className="mt-3 text-base text-gray-500 dark:text-gray-400 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                Passionate about building innovative solutions and sharing
                insights on the latest technologies. I specialize in full-stack
                development, cloud architecture, and creating scalable
                applications.
              </p>
              <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left">
                <div className="grid grid-cols-2 gap-4">
                  <Link
                    href="/about"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                  >
                    More about me
                  </Link>
                  <Link
                    href="/experience"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 dark:text-indigo-100 dark:bg-indigo-900 dark:hover:bg-indigo-800 md:py-4 md:text-lg md:px-10"
                  >
                    My Experience
                  </Link>
                </div>
              </div>
            </div>
            <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
              <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
                <div className="relative block w-full bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
                  <Image
                    src="/placeholder-profile.jpg"
                    alt="Sagar Sane"
                    width={400}
                    height={400}
                    className="w-full rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Featured Projects */}
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Featured Projects
              </h3>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Check out some of my recent work and personal projects.
              </p>
              <Link
                href="/projects"
                className="mt-4 inline-flex items-center text-sm font-medium text-indigo-600 dark:text-indigo-400"
              >
                View Projects
                <svg
                  className="ml-2 w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>

            {/* Latest Blog Posts */}
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Latest Blog Posts
              </h3>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Read my thoughts on technology, development, and industry
                trends.
              </p>
              <Link
                href="/blog"
                className="mt-4 inline-flex items-center text-sm font-medium text-indigo-600 dark:text-indigo-400"
              >
                Read Blog
                <svg
                  className="ml-2 w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>

            {/* Get in Touch */}
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Get in Touch
              </h3>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Interested in working together? Let's discuss your next project.
              </p>
              <Link
                href="/contact"
                className="mt-4 inline-flex items-center text-sm font-medium text-indigo-600 dark:text-indigo-400"
              >
                Contact Me
                <svg
                  className="ml-2 w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
