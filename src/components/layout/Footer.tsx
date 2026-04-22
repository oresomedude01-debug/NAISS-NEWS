/**
 * Footer Component
 */

import Link from 'next/link';
import { SITE_CONFIG } from '@/lib/constants';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 dark:bg-black text-white mt-20">
      <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-bold mb-2">{SITE_CONFIG.name}</h3>
            <p className="text-gray-400 text-sm">{SITE_CONFIG.description}</p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2">
              {SITE_CONFIG.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-400 hover:text-white transition">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  Archive
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  RSS Feed
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  Sitemap
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold mb-4">Follow</h4>
            <ul className="space-y-2">
              {SITE_CONFIG.social.twitter && (
                <li>
                  <a href={SITE_CONFIG.social.twitter} className="text-gray-400 hover:text-white transition">
                    Twitter
                  </a>
                </li>
              )}
              {SITE_CONFIG.social.linkedin && (
                <li>
                  <a href={SITE_CONFIG.social.linkedin} className="text-gray-400 hover:text-white transition">
                    LinkedIn
                  </a>
                </li>
              )}
              {SITE_CONFIG.social.instagram && (
                <li>
                  <a href={SITE_CONFIG.social.instagram} className="text-gray-400 hover:text-white transition">
                    Instagram
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © {currentYear} {SITE_CONFIG.name}. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-400">
            <a href="#" className="hover:text-white transition">
              Privacy
            </a>
            <a href="#" className="hover:text-white transition">
              Terms
            </a>
            <a href="#" className="hover:text-white transition">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
