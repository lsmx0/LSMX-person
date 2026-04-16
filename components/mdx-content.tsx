"use client";

import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { HandDrawnCard } from "./hand-drawn";

const mdxComponents = {
  pre: ({ children, ...props }: any) => (
    <HandDrawnCard seed={200} hoverEffect={false} className="my-6 overflow-x-auto">
      <pre {...props} className="text-sm">
        {children}
      </pre>
    </HandDrawnCard>
  ),
  blockquote: ({ children, ...props }: any) => (
    <blockquote
      {...props}
      className="border-l-4 border-sketch-accent1 pl-4 italic my-4 text-[var(--muted)]"
    >
      {children}
    </blockquote>
  ),
  h1: ({ children, ...props }: any) => (
    <h1 {...props} className="text-4xl font-bold mt-8 mb-4">
      {children}
    </h1>
  ),
  h2: ({ children, ...props }: any) => (
    <h2 {...props} className="text-2xl font-bold mt-6 mb-3">
      {children}
    </h2>
  ),
  p: ({ children, ...props }: any) => (
    <p {...props} className="my-3 leading-relaxed">
      {children}
    </p>
  ),
  ul: ({ children, ...props }: any) => (
    <ul {...props} className="list-disc pl-6 my-3 space-y-1">
      {children}
    </ul>
  ),
  code: ({ children, ...props }: any) => (
    <code
      {...props}
      className="bg-sketch-fill/50 px-1.5 py-0.5 rounded text-sm"
    >
      {children}
    </code>
  ),
};

export default function MdxContent({
  source,
}: {
  source: MDXRemoteSerializeResult;
}) {
  return <MDXRemote {...source} components={mdxComponents} />;
}
