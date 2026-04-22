/**
 * Premium Portable Text Renderer
 * Beautiful typography for article content with the editorial design system
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

const serializers = {
  block: (block: PortableTextBlock): ReactNode => {
    const { style = 'normal', children } = block;

    switch (style) {
      case 'h1':
        return (
          <h1 className="text-3xl md:text-4xl font-display font-bold text-surface-900 dark:text-white mt-12 mb-5 first:mt-0">
            {renderChildren(children)}
          </h1>
        );
      case 'h2':
        return (
          <h2 className="text-2xl md:text-3xl font-display font-bold text-surface-900 dark:text-white mt-10 mb-4">
            {renderChildren(children)}
          </h2>
        );
      case 'h3':
        return (
          <h3 className="text-xl md:text-2xl font-display font-semibold text-surface-900 dark:text-white mt-8 mb-3">
            {renderChildren(children)}
          </h3>
        );
      case 'h4':
        return (
          <h4 className="text-lg font-display font-semibold text-surface-900 dark:text-white mt-6 mb-2">
            {renderChildren(children)}
          </h4>
        );
      case 'blockquote':
        return (
          <blockquote className="relative my-8 pl-6 py-4 border-l-[3px] border-brand-400 dark:border-brand-500 bg-brand-50/50 dark:bg-brand-950/20 rounded-r-xl">
            <div className="italic text-surface-600 dark:text-surface-300 text-lg leading-relaxed">
              {renderChildren(children)}
            </div>
          </blockquote>
        );
      default:
        return (
          <p className="mb-5 leading-[1.8] text-surface-600 dark:text-surface-300 text-[1.0625rem]">
            {renderChildren(children)}
          </p>
        );
    }
  },

  list: (list: PortableTextBlock): ReactNode => {
    const listType = list._type === 'bullet' ? 'ul' : 'ol';
    const listClass =
      listType === 'ul'
        ? 'list-none space-y-2 my-6 pl-0'
        : 'list-decimal list-inside pl-4 space-y-2 my-6';

    return (
      <div className={listClass}>
        {list.children?.map((item: any) => (
          <li key={item._key} className="flex items-start gap-3 text-surface-600 dark:text-surface-300">
            {listType === 'ul' && (
              <span className="w-1.5 h-1.5 rounded-full bg-brand-500 mt-2.5 shrink-0" />
            )}
            <span className="leading-relaxed">{renderChildren(item.children)}</span>
          </li>
        ))}
      </div>
    );
  },

  image: (image: PortableTextBlock): ReactNode => {
    if (!image.asset?.url) return null;

    return (
      <figure className="my-10">
        <div className="rounded-2xl overflow-hidden">
          <Image
            src={image.asset.url}
            alt={image.alt || 'Article image'}
            width={800}
            height={600}
            className="w-full h-auto"
          />
        </div>
        {image.alt && (
          <figcaption className="text-center text-sm text-surface-400 dark:text-surface-500 mt-3 italic">
            {image.alt}
          </figcaption>
        )}
      </figure>
    );
  },

  code: (code: PortableTextBlock): ReactNode => {
    return (
      <div className="my-8 rounded-2xl overflow-hidden border border-surface-200 dark:border-surface-800">
        <div className="flex items-center gap-2 px-4 py-3 bg-surface-100 dark:bg-surface-800 border-b border-surface-200 dark:border-surface-700">
          <span className="w-3 h-3 rounded-full bg-red-400/80" />
          <span className="w-3 h-3 rounded-full bg-yellow-400/80" />
          <span className="w-3 h-3 rounded-full bg-green-400/80" />
        </div>
        <pre className="bg-surface-50 dark:bg-surface-900 p-5 overflow-x-auto scrollbar-thin">
          <code className="text-sm font-mono text-surface-800 dark:text-surface-200 leading-relaxed">
            {code.text}
          </code>
        </pre>
      </div>
    );
  },
};

function renderChildren(children?: any[]): ReactNode {
  return children?.map((child) => {
    if (typeof child === 'string') return child;

    if (child._type === 'link') {
      return (
        <Link
          key={child._key}
          href={child.href || '#'}
          target={child.blank ? '_blank' : undefined}
          rel={child.blank ? 'noopener noreferrer' : undefined}
          className="text-brand-600 dark:text-brand-400 font-medium border-b border-brand-300/50 dark:border-brand-700/50 hover:border-brand-500 dark:hover:border-brand-400 transition-colors"
        >
          {renderChildren(child.children)}
        </Link>
      );
    }

    if (child._type === 'strong') {
      return (
        <strong key={child._key} className="font-semibold text-surface-900 dark:text-white">
          {renderChildren(child.children)}
        </strong>
      );
    }

    if (child._type === 'em') {
      return <em key={child._key}>{renderChildren(child.children)}</em>;
    }

    if (child._type === 'code') {
      return (
        <code key={child._key} className="px-1.5 py-0.5 rounded-md bg-surface-100 dark:bg-surface-800 text-brand-600 dark:text-brand-400 text-sm font-mono font-medium">
          {child.text}
        </code>
      );
    }

    return null;
  });
}

export function PortableText({ blocks }: PortableTextRendererProps) {
  if (!blocks || !Array.isArray(blocks)) {
    return null;
  }

  return (
    <div className="prose-custom">
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
