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
    case 'fiverr':
      return <Briefcase className={className} />;
    case 'globe':
    case 'upwork':
      return <Globe className={className} />;
    case 'linkedin':
      return <Linkedin className={className} />;
    case 'messagecircle':
    case 'whatsapp':
      return <MessageCircle className={className} />;
    case 'mail':
    case 'email':
      return <Mail className={className} />;
    case 'youtube':
      return <Youtube className={className} />;
    case 'share2':
    case 'facebook':
      return <Share2 className={className} />;
    case 'instagram':
      return <Instagram className={className} />;
    case 'graduationcap':
    case 'teach':
      return <GraduationCap className={className} />;
    case 'hardhat':
      return <HardHat className={className} />;
    default:
      return <Layers className={className} />;
  }
};
