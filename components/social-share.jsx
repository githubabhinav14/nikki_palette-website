'use client';

import { useState } from 'react';
import { Facebook, Twitter, Instagram, Mail, Link2, Share2, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';

export function ShareButtons({ 
  title = 'Nikki Palette - Professional Artist Portfolio',
  description = 'Check out this amazing artwork from Nikkitha!',
  url = typeof window !== 'undefined' ? window.location.href : '',
  image = '',
  size = 'default',
  variant = 'outline',
  className = ''
}) {
  const [copied, setCopied] = useState(false);

  const shareOnFacebook = () => {
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(description)}`;
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  const shareOnTwitter = () => {
    const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(description)}&url=${encodeURIComponent(url)}`;
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  const shareOnInstagram = () => {
    // Instagram doesn't have a direct share URL, so we'll copy to clipboard with Instagram mention
    const text = `Check out this amazing artwork from Nikkitha! 🎨\n\n${description}\n\nView more: ${url}\n\n#art #artist #customart #commission #nikkipalette`;
    navigator.clipboard.writeText(text);
    toast.success('Instagram caption copied to clipboard!');
  };

  const shareOnWhatsApp = () => {
    const shareUrl = `https://wa.me/917673926708?text=${encodeURIComponent(description + ' ' + url)}`;
    window.open(shareUrl, '_blank');
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success('Link copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error('Failed to copy link');
    }
  };

  const shareViaEmail = () => {
    const subject = encodeURIComponent(title);
    const body = encodeURIComponent(`I thought you might be interested in this artwork by Nikkitha:

${description}

View it here: ${url}`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  const buttonSize = size === 'sm' ? 'h-8 w-8' : 'h-10 w-10';
  const iconSize = size === 'sm' ? 16 : 20;

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Button
        variant={variant}
        size={size === 'sm' ? 'sm' : 'default'}
        onClick={shareOnFacebook}
        className="hover:bg-blue-600 hover:text-white transition-colors"
        title="Share on Facebook"
      >
        <Facebook className={size === 'sm' ? 'h-4 w-4' : 'h-5 w-5'} />
      </Button>

      <Button
        variant={variant}
        size={size === 'sm' ? 'sm' : 'default'}
        onClick={shareOnTwitter}
        className="hover:bg-blue-400 hover:text-white transition-colors"
        title="Share on Twitter"
      >
        <Twitter className={size === 'sm' ? 'h-4 w-4' : 'h-5 w-5'} />
      </Button>

      <Button
        variant={variant}
        size={size === 'sm' ? 'sm' : 'default'}
        onClick={shareOnInstagram}
        className="hover:bg-pink-600 hover:text-white transition-colors"
        title="Share on Instagram"
      >
        <Instagram className={size === 'sm' ? 'h-4 w-4' : 'h-5 w-5'} />
      </Button>

      <Button
        variant={variant}
        size={size === 'sm' ? 'sm' : 'default'}
        onClick={shareOnWhatsApp}
        className="hover:bg-green-600 hover:text-white transition-colors"
        title="Share on WhatsApp"
      >
        <MessageCircle className={size === 'sm' ? 'h-4 w-4' : 'h-5 w-5'} />
      </Button>

      <Button
        variant={variant}
        size={size === 'sm' ? 'sm' : 'default'}
        onClick={shareViaEmail}
        className="hover:bg-red-600 hover:text-white transition-colors"
        title="Share via Email"
      >
        <Mail className={size === 'sm' ? 'h-4 w-4' : 'h-5 w-5'} />
      </Button>

      <Button
        variant={variant}
        size={size === 'sm' ? 'sm' : 'default'}
        onClick={copyToClipboard}
        className="hover:bg-gray-600 hover:text-white transition-colors"
        title="Copy link"
      >
        <Link2 className={size === 'sm' ? 'h-4 w-4' : 'h-5 w-5'} />
        {copied && <span className="ml-1 text-xs">Copied!</span>}
      </Button>
    </div>
  );
}

export function ShareDropdown({ 
  title = 'Nikki Palette - Professional Artist Portfolio',
  description = 'Check out this amazing artwork!',
  url = typeof window !== 'undefined' ? window.location.href : '',
  image = ''
}) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success('Link copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error('Failed to copy link');
    }
  };

  const shareOnFacebook = () => {
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  const shareOnTwitter = () => {
    const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(description)}&url=${encodeURIComponent(url)}`;
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  const shareViaEmail = () => {
    const subject = encodeURIComponent(title);
    const body = encodeURIComponent(`${description}\n\nView it here: ${url}`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <Share2 className="h-4 w-4 mr-2" />
          Share
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={shareOnFacebook} className="cursor-pointer">
          <Facebook className="h-4 w-4 mr-2" />
          Facebook
        </DropdownMenuItem>
        <DropdownMenuItem onClick={shareOnTwitter} className="cursor-pointer">
          <Twitter className="h-4 w-4 mr-2" />
          Twitter
        </DropdownMenuItem>
        <DropdownMenuItem onClick={shareViaEmail} className="cursor-pointer">
          <Mail className="h-4 w-4 mr-2" />
          Email
        </DropdownMenuItem>
        <DropdownMenuItem onClick={copyToClipboard} className="cursor-pointer">
          <Link2 className="h-4 w-4 mr-2" />
          {copied ? 'Copied!' : 'Copy Link'}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// Social media follow buttons
export function SocialFollowButtons({ 
  size = 'default', 
  variant = 'outline',
  className = '' 
}) {
  const socialLinks = [
    { 
      name: 'Instagram', 
      icon: Instagram, 
      url: 'https://instagram.com/nikki_palette',
      color: 'hover:bg-pink-600'
    },
    { 
      name: 'Twitter', 
      icon: Twitter, 
      url: 'https://twitter.com/alexartiste',
      color: 'hover:bg-blue-400'
    },
    { 
      name: 'Facebook', 
      icon: Facebook, 
      url: 'https://facebook.com/alexartiste',
      color: 'hover:bg-blue-600'
    },
  ];

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {socialLinks.map((social) => (
        <Button
          key={social.name}
          variant={variant}
          size={size}
          onClick={() => window.open(social.url, '_blank')}
          className={`${social.color} hover:text-white transition-colors`}
          title={`Follow on ${social.name}`}
        >
          <social.icon className={size === 'sm' ? 'h-4 w-4' : 'h-5 w-5'} />
        </Button>
      ))}
    </div>
  );
}