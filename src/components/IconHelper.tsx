import React from 'react';
import {
  Code2,
  Cpu,
  Terminal,
  Palette,
  TrendingUp,
  Video,
  FileSpreadsheet,
  Compass,
  Sparkles,
  Briefcase,
  Globe,
  Linkedin,
  MessageCircle,
  Mail,
  Youtube,
  Share2,
  Instagram,
  Layers,
  GraduationCap,
  HardHat,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
  Clock,
  DollarSign,
  ShieldCheck,
  Check,
  ChevronRight,
  X,
  Plus,
  Send,
  Lock,
  RefreshCw,
  Sliders,
  Settings,
  AlertCircle
} from 'lucide-react';

interface IconHelperProps {
  name: string;
  className?: string;
}

export const IconHelper: React.FC<IconHelperProps> = ({ name, className = 'w-5 h-5' }) => {
  switch (name.toLowerCase()) {
    case 'whatsapp':
    case 'messagecircle':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-label="WhatsApp">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
      );
    case 'tiktok':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-label="TikTok">
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 2.89 3.5 2.74 1.4-.04 2.65-.96 3.09-2.28.21-.59.27-1.22.25-1.84V.02h-.02z" />
        </svg>
      );
    case 'fiverr':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-label="Fiverr">
          <circle cx="12" cy="12" r="11" fill="currentColor" fillOpacity="0.15" />
          <path d="M10.1 7.2h-1.6c-.9 0-1.5.3-1.8.8-.3.5-.5 1.2-.5 2.2H4.8v2.1h1.4v5.7h2.5v-5.7h1.7v-2.1H8.7c0-.5.1-.9.3-1.1.2-.2.5-.3.9-.3h1.2V7.2zm3.8 3.9h-2.3v6.9h2.3v-6.9zm0-2.8h-2.3v1.9h2.3V8.3zm4.5 9.7c1 0 1.8-.4 2.3-1.1v-5.8h-2.3v3.7c0 .5-.3.8-.8.8-.5 0-.8-.3-.8-.8v-3.7h-2.3v4.1c0 1.7 1.6 2.8 3.1 2.8z" />
        </svg>
      );
    case 'facebook':
    case 'share2':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-label="Facebook">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      );
    case 'instagram':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-label="Instagram">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.13-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      );
    case 'linkedin':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-label="LinkedIn">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451c.979 0 1.778-.773 1.778-1.729V1.73C24 .774 23.205 0 22.225 0z" />
        </svg>
      );
    case 'youtube':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-label="YouTube">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      );
    case 'upwork':
    case 'globe':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-label="Upwork">
          <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c0 1.506-1.226 2.731-2.731 2.731-1.505 0-2.731-1.225-2.731-2.731V3.492H0v7.112c0 2.837 2.309 5.146 5.146 5.146 2.837 0 5.146-2.309 5.146-5.146v-1.157c.504 1.341 1.236 2.793 2.172 4.093l-1.821 8.566h2.464l1.32-6.208c1.235.857 2.671 1.373 4.134 1.373 3.916 0 7.1-3.184 7.1-7.1 0-3.918-3.184-7.108-7.1-7.108z" />
        </svg>
      );
    case 'code2':
    case 'code':
    case 'web':
      return <Code2 className={className} />;
    case 'cpu':
    case 'iot':
    case 'hardware':
      return <Cpu className={className} />;
    case 'terminal':
    case 'programming':
      return <Terminal className={className} />;
    case 'palette':
    case 'creative':
    case 'design':
      return <Palette className={className} />;
    case 'trendingup':
    case 'marketing':
    case 'ads':
      return <TrendingUp className={className} />;
    case 'video':
      return <Video className={className} />;
    case 'filespreadsheet':
    case 'excel':
    case 'data':
      return <FileSpreadsheet className={className} />;
    case 'compass':
    case 'construction':
    case 'civil':
      return <Compass className={className} />;
    case 'sparkles':
    case 'ai':
      return <Sparkles className={className} />;
    case 'briefcase':
      return <Briefcase className={className} />;
    case 'mail':
    case 'email':
      return <Mail className={className} />;
    case 'graduationcap':
    case 'teach':
      return <GraduationCap className={className} />;
    case 'hardhat':
      return <HardHat className={className} />;
    default:
      return <Layers className={className} />;
  }
};
