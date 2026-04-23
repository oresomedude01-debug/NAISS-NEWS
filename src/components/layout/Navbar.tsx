'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { usePathname } from 'next/navigation';
import { SITE_CONFIG } from '@/lib/constants';
import {
  Search,
  Sun,
  Moon,
  Menu,
  X,
  ChevronRight,
  Newspaper,
  Clock,
} from 'lucide-react';

interface SearchResult {
  _id: string;
  title: string;
  slug: { current: string } | string;
  excerpt?: string;
  category: { title: string; slug: { current: string } | string };
  image?: { asset: { url: string } };
}

function getSlug(slug: { current: string } | string): string {
  return typeof slug === 'string' ? slug : slug.current;
}

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [searching, setSearching] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
    setQuery('');
    setResults([]);
  }, [pathname]);

  // Debounced search
  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }
    const timer = setTimeout(async () => {
      setSearching(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(data.results ?? []);
      } catch {
        setResults([]);
      } finally {
        setSearching(false);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  // Close search on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setResults([]);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  const openSearch = () => {
    setSearchOpen(true);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled ? 'glass-strong shadow-sm' : 'bg-white/0 dark:bg-surface-950/0'
        }`}
      >
        <div className="container-page">
          <div className="flex items-center justify-between h-16 md:h-[4.5rem]">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group shrink-0" id="nav-logo">
              <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center shadow-md group-hover:shadow-glow-brand transition-shadow duration-300">
                <Newspaper className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-display font-bold text-surface-900 dark:text-white leading-tight tracking-tight">NAISS</span>
                <span className="text-2xs font-semibold uppercase tracking-[0.15em] text-brand-600 dark:text-brand-400 leading-none">News</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {SITE_CONFIG.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  id={`nav-${link.label.toLowerCase()}`}
                  className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive(link.href)
                      ? 'text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/50'
                      : 'text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-white hover:bg-surface-100 dark:hover:bg-surface-800/50'
                  }`}
                >
                  {link.label}
                  {isActive(link.href) && (
                    <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-brand-500 rounded-full" />
                  )}
                </Link>
              ))}
            </div>

            {/* Right Controls */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={openSearch}
                className="p-2.5 rounded-xl text-surface-500 hover:text-surface-900 dark:text-surface-400 dark:hover:text-white hover:bg-surface-100 dark:hover:bg-surface-800 transition-all duration-200"
                aria-label="Search"
                id="nav-search-toggle"
              >
                <Search className="w-[18px] h-[18px]" />
              </button>

              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2.5 rounded-xl text-surface-500 hover:text-surface-900 dark:text-surface-400 dark:hover:text-white hover:bg-surface-100 dark:hover:bg-surface-800 transition-all duration-200"
                aria-label="Toggle theme"
                id="nav-theme-toggle"
              >
                {theme === 'dark' ? <Sun className="w-[18px] h-[18px]" /> : <Moon className="w-[18px] h-[18px]" />}
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2.5 rounded-xl text-surface-500 hover:text-surface-900 dark:text-surface-400 dark:hover:text-white hover:bg-surface-100 dark:hover:bg-surface-800 transition-all duration-200"
                aria-label="Toggle menu"
                id="nav-mobile-toggle"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Search Bar — Expandable with live results */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-out ${
            searchOpen ? 'max-h-[32rem] opacity-100' : 'max-h-0 opacity-0'
          }`}
          ref={searchRef}
        >
          <div className="container-page pb-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400 pointer-events-none" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search articles, topics, authors..."
                className="w-full pl-11 pr-10 py-3 rounded-2xl bg-surface-100 dark:bg-surface-800/80 border border-surface-200 dark:border-surface-700 text-sm text-surface-900 dark:text-white placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-400 transition-all"
                id="nav-search-input"
                autoFocus={searchOpen}
                autoComplete="off"
              />
              {query && (
                <button
                  onClick={() => { setQuery(''); setResults([]); }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-lg text-surface-400 hover:text-surface-600 dark:hover:text-surface-300"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Search Results */}
            {(results.length > 0 || (searching && query.length >= 2)) && (
              <div className="mt-2 card rounded-2xl overflow-hidden shadow-elevated">
                {searching && results.length === 0 ? (
                  <div className="px-4 py-6 text-center text-sm text-surface-400">
                    <Clock className="w-4 h-4 mx-auto mb-2 animate-pulse" />
                    Searching...
                  </div>
                ) : (
                  <ul>
                    {results.map((r, i) => (
                      <li key={r._id}>
                        <Link
                          href={`/blog/${getSlug(r.slug)}`}
                          className={`flex items-center gap-3 px-4 py-3 hover:bg-surface-50 dark:hover:bg-surface-800/50 transition-colors ${
                            i < results.length - 1 ? 'border-b border-surface-100 dark:border-surface-800' : ''
                          }`}
                          onClick={() => { setQuery(''); setResults([]); setSearchOpen(false); }}
                        >
                          {r.image?.asset?.url && (
                            <Image
                              src={r.image.asset.url}
                              alt=""
                              width={40}
                              height={40}
                              className="w-10 h-10 rounded-lg object-cover shrink-0"
                            />
                          )}
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-surface-900 dark:text-white line-clamp-1">{r.title}</p>
                            <p className="text-xs text-surface-400 mt-0.5">{typeof r.category.slug === 'string' ? r.category.title : r.category.title}</p>
                          </div>
                          <ChevronRight className="w-3.5 h-3.5 text-surface-300 shrink-0" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {!searching && query.length >= 2 && results.length === 0 && (
              <div className="mt-2 card rounded-2xl px-4 py-6 text-center">
                <p className="text-sm text-surface-500">No results for &quot;{query}&quot;</p>
                <Link
                  href="/blog"
                  className="text-xs text-brand-500 hover:text-brand-600 mt-1 inline-block"
                  onClick={() => setSearchOpen(false)}
                >
                  Browse all posts →
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-out ${
            mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="container-page pb-6 pt-2">
            <div className="space-y-1">
              {SITE_CONFIG.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive(link.href)
                      ? 'text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/50'
                      : 'text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800/50'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                  <ChevronRight className="w-4 h-4 opacity-40" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
