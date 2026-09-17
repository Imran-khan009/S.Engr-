import React from 'react';
import { SocialPlatform } from '../types';
import { IconHelper } from './IconHelper';
import { ShieldCheck, Heart, Lock, ArrowUp } from 'lucide-react';

interface FooterProps {
  socials: SocialPlatform[];
  onOpenAdmin: () => void;
  onOpenProjectModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ socials, onOpenAdmin, onOpenProjectModal }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-900 text-slate-400 font-mono text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-12">
          {/* Brand Info (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-xl tracking-tight text-white font-sans">
                S • ENGR
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800">
                Official Hub
              </span>
            </div>

            <p className="text-sm font-sans font-bold text-slate-200">
              Engr. Imran Khan
            </p>

            <p className="text-xs text-slate-400 leading-relaxed font-sans max-w-sm">
              Technology • IoT • Creative Design • Digital Marketing • Construction & Design • Teaching.
            </p>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-cyan-300">
              <strong className="text-white block mb-0.5">Core Philosophy:</strong>
              Learn • Create • Build • Teach • Hire
            </div>

            {/* Social pills */}
            <div className="flex flex-wrap gap-2 pt-2">
              {socials.filter(s => s.enabled).slice(0, 6).map((soc) => (
                <a
                  key={soc.id}
                  href={soc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-cyan-500/20 border border-slate-800 hover:border-cyan-500/40 text-slate-400 hover:text-cyan-300 flex items-center justify-center transition-colors"
                  title={soc.name}
                >
                  <IconHelper name={soc.icon || soc.platform} className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Navigation (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#services" className="hover:text-cyan-400 transition-colors">Services Marketplace</a>
              </li>
              <li>
                <a href="#work" className="hover:text-cyan-400 transition-colors">Featured Engineering Work</a>
              </li>
              <li>
                <a href="#experience" className="hover:text-cyan-400 transition-colors">Career Timeline & Education</a>
              </li>
              <li>
                <a href="#skills" className="hover:text-cyan-400 transition-colors">Skills Ecosystem</a>
              </li>
              <li>
                <a href="#teach" className="hover:text-cyan-400 transition-colors">Teaching & Mentorship</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-cyan-400 transition-colors">Contact Imran</a>
              </li>
            </ul>
          </div>

          {/* Trust & Direct Request (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Work With Engr. Imran Khan
            </h4>
            <p className="text-xs text-slate-400 font-sans leading-relaxed">
              Available for direct contracts, technical project consultation, or through verified escrow on Fiverr and Upwork.
            </p>

            <button
              onClick={onOpenProjectModal}
              className="w-full py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-400 hover:from-cyan-300 hover:to-blue-300 transition-all shadow-md shadow-cyan-500/20"
            >
              START A PROJECT INQUIRY
            </button>

            <div className="flex items-center space-x-2 text-[10px] text-slate-500">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span>Strict NDA & authentic capability guarantee.</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-[11px] text-slate-500 text-center sm:text-left">
            © {new Date().getFullYear()} S • ENGR (Engr. Imran Khan). All rights reserved.
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={onOpenAdmin}
              className="text-[11px] text-slate-500 hover:text-cyan-400 flex items-center space-x-1 transition-colors"
            >
              <Lock className="w-3 h-3" />
              <span>Admin Access</span>
            </button>

            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
              title="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
