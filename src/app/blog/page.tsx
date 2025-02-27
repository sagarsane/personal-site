import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { client } from "@/lib/sanity/client";
import { urlFor } from "@/lib/sanity/image";
import { Post } from "@/types/sanity";

export const metadata: Metadata = {
  title: "Blog - Sagar Sane",
  description: "Thoughts, insights, and technical articles by Sagar Sane.",
};

async function getBlogPosts(): Promise<Post[]> {
  return client.fetch(`
    *[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      "slug": slug.current,
      excerpt,
      mainImage,
      publishedAt,
      categories[]->{
        title,
        description
      },
      author->{
        name,
        image
      }
    }
  `);
}

export default async function BlogPage() {
  const posts = await getBlogPosts();

  if (!posts || posts.length === 0) {
    return (
      <div className="min-h-screen py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl">
            Blog
          </h1>
          <p className="mt-6 text-lg text-gray-500 dark:text-gray-400">
            No posts available yet. Check back soon!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl">
          Blog
        </h1>
        <p className="mt-4 text-xl text-gray-500 dark:text-gray-400">
          Thoughts, insights, and technical articles
        </p>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post._id}
              href={`/blog/${post.slug}`}
              className="group relative bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              {post.mainImage && (
                <div className="aspect-w-16 aspect-h-9">
                  <Image
                    src={urlFor(post.mainImage).url()}
                    alt={post.title}
                    width={600}
                    height={338}
                    className="object-cover"
                  />
                </div>
              )}
              <div className="p-6">
                {post.categories && post.categories.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.categories.map((category) => (
                      <span
                        key={category.title}
                        className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200"
                      >
                        {category.title}
                      </span>
                    ))}
                  </div>
                )}
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                  {post.title}
                </h2>
                {post.excerpt && (
                  <p className="mt-3 text-base text-gray-500 dark:text-gray-400 line-clamp-3">
                    {post.excerpt}
                  </p>
                )}
                <div className="mt-6 flex items-center">
                  {post.author?.image && (
                    <div className="flex-shrink-0">
                      <Image
                        src={urlFor(post.author.image).url()}
                        alt={post.author.name}
                        width={40}
                        height={40}
                        className="h-10 w-10 rounded-full"
                      />
                    </div>
                  )}
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {post.author?.name}
                    </p>
                    <div className="flex space-x-1 text-sm text-gray-500 dark:text-gray-400">
                      <time dateTime={post.publishedAt}>
                        {new Date(post.publishedAt).toLocaleDateString(
                          "en-US",
                          {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          }
                        )}
                      </time>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
