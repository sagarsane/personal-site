import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { client } from "@/lib/sanity/client";
import { urlFor } from "@/lib/sanity/image";
import { Post } from "@/types/sanity";

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost(params.slug);

  if (!post) {
    return {
      title: "Post Not Found - Sagar Sane",
    };
  }

  return {
    title: `${post.title} - Sagar Sane`,
    description: post.excerpt,
  };
}

async function getPost(slug: string): Promise<Post | null> {
  return client.fetch(
    `*[_type == "post" && slug.current == $slug][0]{
      _id,
      title,
      "slug": slug.current,
      excerpt,
      mainImage,
      body,
      publishedAt,
      categories[]->{
        title,
        description
      },
      author->{
        name,
        image,
        bio
      }
    }`,
    { slug }
  );
}

export default async function BlogPostPage({ params }: Props) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="min-h-screen py-32">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header>
          {post.categories && post.categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
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
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl">
            {post.title}
          </h1>
          {post.excerpt && (
            <p className="mt-4 text-xl text-gray-500 dark:text-gray-400">
              {post.excerpt}
            </p>
          )}

          {/* Author and Date */}
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
                  {new Date(post.publishedAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </time>
              </div>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        {post.mainImage && (
          <div className="mt-8 aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
            <Image
              src={urlFor(post.mainImage).url()}
              alt={post.title}
              width={1200}
              height={675}
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Article Content */}
        <div className="mt-8 prose prose-lg dark:prose-invert max-w-none">
          <PortableText value={post.body} />
        </div>

        {/* Author Bio */}
        {post.author?.bio && (
          <div className="mt-16 border-t border-gray-200 dark:border-gray-700 pt-8">
            <div className="flex items-start">
              {post.author.image && (
                <div className="flex-shrink-0">
                  <Image
                    src={urlFor(post.author.image).url()}
                    alt={post.author.name}
                    width={64}
                    height={64}
                    className="h-16 w-16 rounded-full"
                  />
                </div>
              )}
              <div className="ml-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  About {post.author.name}
                </h3>
                <div className="mt-2 prose dark:prose-invert">
                  <PortableText value={post.author.bio} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
