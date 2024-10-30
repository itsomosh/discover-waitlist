import React from 'react';
import { Instagram, Facebook, Twitter, Mail, MapPin, Phone } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Discover Diani</h3>
            <p className="text-gray-400">
              Your gateway to the best experiences in Diani Beach, Kenya.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors hover:underline">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors hover:underline">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors hover:underline">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-400 group">
                <Phone className="w-5 h-5 group-hover:text-blue-400 transition-colors" />
                <a href="tel:+254113241777" className="group-hover:text-white transition-colors">
                  +254 113 241 777
                </a>
              </li>
              <li className="flex items-center gap-2 text-gray-400 group">
                <Mail className="w-5 h-5 group-hover:text-blue-400 transition-colors" />
                <a href="mailto:info@discoverdiani.co.ke" className="group-hover:text-white transition-colors">
                  info@discoverdiani.co.ke
                </a>
              </li>
              <li className="flex items-start gap-2 text-gray-400 group">
                <MapPin className="w-5 h-5 flex-shrink-0 group-hover:text-blue-400 transition-colors" />
                <span className="group-hover:text-white transition-colors">
                  Diani Bazaar, Diani, Beach Road
                </span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex gap-4">
              {[
                { icon: <Instagram className="w-6 h-6" />, href: "https://instagram.com/ashafromdiani", label: "Instagram" },
                { icon: <Facebook className="w-6 h-6" />, href: "https://facebook.com/ashafromdiani", label: "Facebook" },
                { icon: <Twitter className="w-6 h-6" />, href: "https://twitter.com/ashafromdiani", label: "Twitter" }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-110"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
            <p className="mt-4 text-sm text-gray-400">
              Follow us <span className="text-blue-400">@ashafromdiani</span>
            </p>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-700 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Discover Diani. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}