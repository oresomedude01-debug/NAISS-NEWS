/**
 * Portable Text Renderer
 * Renders Sanity's portable text (rich text content)
 */

import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';

interface PortableTextBlock {
  _type: string;
  _key: string;
  style?: string;
  text?: string;
  level?: number;
  children?: any[];
  asset?: any;
  url?: string;
  alt?: string;
  [key: string]: any;
}

interface PortableTextRendererProps {
  blocks: PortableTextBlock[];
}

/**
 * Custom renderers for different block types
 */
const serializers = {
  block: (block: PortableTextBlock): ReactNode => {
    const { style = 'normal', children } = block;

    switch (style) {
      case 'h1':
        return (
          <h1 className="text-4xl font-bold mt-8 mb-4 first:mt-0">
            {renderChildren(children)}
          </h1>
        );
      case 'h2':
        return (
          <h2 className="text-3xl font-bold mt-6 mb-3">
            {renderChildren(children)}
          </h2>
        );
      case 'h3':
        return (
          <h3 className="text-2xl font-bold mt-5 mb-2">
            {renderChildren(children)}
          </h3>
        );
      case 'blockquote':
        return (
          <blockquote className="border-l-4 border-blue-500 pl-4 italic my-6 text-gray-700 dark:text-gray-300">
            {renderChildren(children)}
          </blockquote>
        );
      default:
        return (
          <p className="mb-4 leading-relaxed text-gray-800 dark:text-gray-200">
            {renderChildren(children)}
          </p>
        );
    }
  },

  list: (list: PortableTextBlock): ReactNode => {
    const listType = list._type === 'bullet' ? 'ul' : 'ol';
    const listClass =
      listType === 'ul' ? 'list-disc list-inside pl-4' : 'list-decimal list-inside pl-4';

    return (
      <div className={`my-4 ${listClass}`}>
        {list.children?.map((item: any) => (
          <li key={item._key} className="mb-2">
            {renderChildren(item.children)}
          </li>
        ))}
      </div>
    );
  },

  image: (image: PortableTextBlock): ReactNode => {
    if (!image.asset?.url) return null;

    return (
      <figure className="my-6">
        <Image
          src={image.asset.url}
          alt={image.alt || 'Post image'}
          width={800}
          height={600}
          className="w-full rounded-lg"
        />
        {image.alt && <figcaption className="text-sm text-gray-600 mt-2">{image.alt}</figcaption>}
      </figure>
    );
  },

  code: (code: PortableTextBlock): ReactNode => {
    return (
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-6">
        <code className="text-sm font-mono">{code.text}</code>
      </pre>
    );
  },
};

function renderChildren(children: any[]): ReactNode {
  return children?.map((child) => {
    if (typeof child === 'string') return child;

    if (child._type === 'link') {
      return (
        <Link
          key={child._key}
          href={child.href || '#'}
          target={child.blank ? '_blank' : undefined}
          rel={child.blank ? 'noopener noreferrer' : undefined}
          className="text-blue-600 hover:underline dark:text-blue-400"
        >
          {renderChildren(child.children)}
        </Link>
      );
    }

    if (child._type === 'strong') {
      return <strong key={child._key}>{renderChildren(child.children)}</strong>;
    }

    if (child._type === 'em') {
      return <em key={child._key}>{renderChildren(child.children)}</em>;
    }

    if (child._type === 'code') {
      return (
        <code key={child._key} className="bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded">
          {child.text}
        </code>
      );
    }

    return null;
  });
}

/**
 * Main Portable Text Renderer
 */
export function PortableText({ blocks }: PortableTextRendererProps) {
  if (!blocks || !Array.isArray(blocks)) {
    return null;
  }

  return (
    <div className="prose prose-sm sm:prose lg:prose-lg dark:prose-invert max-w-none">
      {blocks.map((block) => {
        if (block._type === 'block') {
          return <div key={block._key}>{serializers.block(block)}</div>;
        }

        if (block._type === 'image') {
          return <div key={block._key}>{serializers.image(block)}</div>;
        }

        if (block._type === 'code') {
          return <div key={block._key}>{serializers.code(block)}</div>;
        }

        return null;
      })}
    </div>
  );
}
