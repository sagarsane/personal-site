import { Metadata } from "next";
import Link from "next/link";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import ContactForm from "@/components/forms/ContactForm";

export const metadata: Metadata = {
  title: "Contact - Sagar Sane",
  description:
    "Get in touch with Sagar Sane. Connect with me on social media or send me a message.",
};

const socialLinks = [
  {
    name: "GitHub",
    url: "https://github.com/sagarsane",
    icon: FaGithub,
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/sagarsane",
    icon: FaLinkedin,
  },
  {
    name: "Twitter",
    url: "https://twitter.com/sagarsane",
    icon: FaTwitter,
  },
  {
    name: "Email",
    url: "mailto:sagar2217@gmail.com",
    icon: MdEmail,
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl">
            Get in Touch
          </h1>
          <p className="mt-4 text-xl text-gray-500 dark:text-gray-400">
            Have a question or want to work together? Feel free to reach out!
          </p>

          {/* Social Links */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Connect With Me
            </h2>
            <div className="mt-4 flex space-x-6">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                  >
                    <Icon className="h-8 w-8" />
                    <span className="sr-only">{link.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Contact Form */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Send a Message
            </h2>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
