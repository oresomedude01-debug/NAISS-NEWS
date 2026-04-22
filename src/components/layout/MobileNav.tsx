/**
 * Mobile Bottom Navigation
 * Thumb-friendly bottom bar visible only on mobile
 */

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  BookOpen,
  Grid3X3,
  User,
} from 'lucide-react';

const mobileLinks = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/blog', label: 'Blog', icon: BookOpen },
  { href: '/categories', label: 'Topics', icon: Grid3X3 },
  { href: '/about', label: 'About', icon: User },
];

export function MobileNav() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 glass-strong border-t border-surface-200/50 dark:border-surface-800/50 safe-area-pb" id="mobile-nav">
      <div className="flex items-stretch justify-around px-2 py-1">
        {mobileLinks.map(({ href, label, icon: Icon }) => {
          const active = isActive(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center gap-0.5 py-2 px-3 rounded-xl transition-all duration-200 min-w-[60px] ${
                active
                  ? 'text-brand-600 dark:text-brand-400'
                  : 'text-surface-400 dark:text-surface-500 hover:text-surface-600 dark:hover:text-surface-300'
              }`}
              id={`mobile-nav-${label.toLowerCase()}`}
            >
              <div className={`relative ${active ? 'scale-110' : ''} transition-transform duration-200`}>
                <Icon className="w-5 h-5" strokeWidth={active ? 2.5 : 1.8} />
                {active && (
                  <span className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-brand-500 rounded-full" />
                )}
              </div>
              <span className={`text-2xs font-medium ${active ? 'font-semibold' : ''}`}>
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
