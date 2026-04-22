/**
 * Premium Footer
 * Modern editorial footer with gradient accent and social links
 */

import Link from 'next/link';
import { SITE_CONFIG } from '@/lib/constants';
import {
  Newspaper,
  ArrowUpRight,
  Mail,
  Heart,
} from 'lucide-react';
import { TwitterIcon, LinkedinIcon, InstagramIcon } from '@/components/ui/SocialIcons';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-20 pb-20 md:pb-0" id="footer">
      {/* Top gradient line */}
      <div className="h-px bg-gradient-to-r from-transparent via-brand-400/50 to-transparent" />

      {/* Newsletter CTA Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-surface-900 via-surface-900 to-surface-800 dark:from-surface-950 dark:via-surface-950 dark:to-surface-900">
        <div className="absolute inset-0 noise-overlay" />
        <div className="relative container-page py-16 md:py-20">
          <div className="max-w-2xl mx-auto text-center">
            <span className="badge-brand mb-4">Stay in the loop</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mt-4 mb-4">
              Never miss a story
            </h2>
            <p className="text-surface-400 text-lg mb-8 max-w-lg mx-auto">
              Get the latest news, insights, and event updates delivered straight to your inbox. No spam, ever.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" id="newsletter-form">
              <div className="relative flex-1">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-500" />
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white/10 border border-white/10 text-white placeholder:text-surface-500 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-400/50 transition-all backdrop-blur-sm"
                  required
                  id="newsletter-email"
                />
              </div>
              <button
                type="submit"
                className="btn-primary py-3.5 px-8 rounded-2xl shrink-0"
                id="newsletter-submit"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Main Footer Content */}
      <div className="bg-surface-950 dark:bg-black text-surface-400">
        <div className="container-page py-14 md:py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <Link href="/" className="flex items-center gap-2.5 mb-4 group">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center shadow-md">
                  <Newspaper className="w-5 h-5 text-white" strokeWidth={2.5} />
                </div>
                <span className="text-lg font-display font-bold text-white">
                  NAISS <span className="text-brand-400">News</span>
                </span>
              </Link>
              <p className="text-sm leading-relaxed text-surface-500 max-w-xs">
                {SITE_CONFIG.description}
              </p>
            </div>

            {/* Navigation */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-surface-500 mb-4">
                Navigation
              </h4>
              <ul className="space-y-2.5">
                {SITE_CONFIG.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-surface-400 hover:text-white transition-colors duration-200 flex items-center gap-1 group"
                    >
                      {link.label}
                      <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 group-hover:opacity-70 group-hover:translate-y-0 transition-all duration-200" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-surface-500 mb-4">
                Resources
              </h4>
              <ul className="space-y-2.5">
                {['Archive', 'RSS Feed', 'Sitemap', 'Privacy', 'Terms'].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm text-surface-400 hover:text-white transition-colors duration-200"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-surface-500 mb-4">
                Connect
              </h4>
              <div className="flex flex-wrap gap-2">
                {SITE_CONFIG.social.twitter && (
                  <a
                    href={SITE_CONFIG.social.twitter}
                    className="w-10 h-10 rounded-xl bg-surface-800 hover:bg-surface-700 flex items-center justify-center transition-all duration-200 hover:scale-105"
                    aria-label="Twitter"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <TwitterIcon className="w-4 h-4 text-surface-400" />
                  </a>
                )}
                {SITE_CONFIG.social.linkedin && (
                  <a
                    href={SITE_CONFIG.social.linkedin}
                    className="w-10 h-10 rounded-xl bg-surface-800 hover:bg-surface-700 flex items-center justify-center transition-all duration-200 hover:scale-105"
                    aria-label="LinkedIn"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <LinkedinIcon className="w-4 h-4 text-surface-400" />
                  </a>
                )}
                {SITE_CONFIG.social.instagram && (
                  <a
                    href={SITE_CONFIG.social.instagram}
                    className="w-10 h-10 rounded-xl bg-surface-800 hover:bg-surface-700 flex items-center justify-center transition-all duration-200 hover:scale-105"
                    aria-label="Instagram"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <InstagramIcon className="w-4 h-4 text-surface-400" />
                  </a>
                )}
                {SITE_CONFIG.social.email && (
                  <a
                    href={`mailto:${SITE_CONFIG.social.email}`}
                    className="w-10 h-10 rounded-xl bg-surface-800 hover:bg-surface-700 flex items-center justify-center transition-all duration-200 hover:scale-105"
                    aria-label="Email"
                  >
                    <Mail className="w-4 h-4 text-surface-400" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="divider mt-12 mb-8" />
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs text-surface-600">
              © {currentYear} {SITE_CONFIG.name}. All rights reserved.
            </p>
            <p className="text-xs text-surface-600 flex items-center gap-1">
              Made with <Heart className="w-3 h-3 text-red-500 fill-red-500" /> by NAISS Society
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
