'use client'

import { useState } from 'react'
import { Instagram, Mail, Phone, Menu, X } from 'lucide-react'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'

export default function Navigation() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-cream-50/95 backdrop-blur-sm border-b border-cream-200 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <a href="#home" className="text-2xl font-playfair font-bold text-gold-600 hover:text-gold-700 transition-colors">
              Nikki Palette
            </a>

            <div className="hidden md:flex items-center gap-8">
              <a href="#home" className="text-sm font-medium text-foreground hover:text-gold-600 transition-colors">Home</a>
              <a href="#gallery" className="text-sm font-medium text-foreground hover:text-gold-600 transition-colors">Gallery</a>
              <a href="#about" className="text-sm font-medium text-foreground hover:text-gold-600 transition-colors">About</a>
              <a href="#services" className="text-sm font-medium text-foreground hover:text-gold-600 transition-colors">Services</a>
              <a href="#testimonials" className="text-sm font-medium text-foreground hover:text-gold-600 transition-colors">Testimonials</a>
              <a href="#blog" className="text-sm font-medium text-foreground hover:text-gold-600 transition-colors">Blog</a>
              <a href="#contact" className="px-6 py-2 bg-gold-600 text-white rounded-full hover:bg-gold-700 transition-all hover:shadow-lg font-medium">Contact</a>
            </div>

            <div className="flex items-center gap-2">
              <button aria-label="Open menu" className="md:hidden p-2 text-foreground hover:text-gold-600" onClick={() => setOpen(true)}>
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="h-16" />

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right" className="bg-cream-50 border-l w-3/4 sm:max-w-sm">
          <SheetHeader>
            <SheetTitle className="font-playfair">Menu</SheetTitle>
          </SheetHeader>
          <div className="mt-4 space-y-2">
            <a href="#home" onClick={() => setOpen(false)} className="block px-3 py-2 rounded-md text-foreground hover:bg-cream-100">Home</a>
            <a href="#gallery" onClick={() => setOpen(false)} className="block px-3 py-2 rounded-md text-foreground hover:bg-cream-100">Gallery</a>
            <a href="#about" onClick={() => setOpen(false)} className="block px-3 py-2 rounded-md text-foreground hover:bg-cream-100">About</a>
            <a href="#services" onClick={() => setOpen(false)} className="block px-3 py-2 rounded-md text-foreground hover:bg-cream-100">Services</a>
            <a href="#testimonials" onClick={() => setOpen(false)} className="block px-3 py-2 rounded-md text-foreground hover:bg-cream-100">Testimonials</a>
            <a href="#blog" onClick={() => setOpen(false)} className="block px-3 py-2 rounded-md text-foreground hover:bg-cream-100">Blog</a>
            <a href="#contact" onClick={() => setOpen(false)} className="block px-3 py-2 rounded-md text-white bg-gold-600 hover:bg-gold-700 rounded-lg">Contact</a>

            <div className="mt-6 border-t pt-4">
              <div className="space-y-3 text-sm">
                <a href="mailto:nikithanarsingoju1@gmail.com" className="flex items-center gap-2 text-foreground">
                  <Mail size={16} /> nikithanarsingoju1@gmail.com
                </a>
                <a href="tel:+917673926708" className="flex items-center gap-2 text-foreground">
                  <Phone size={16} /> +91 76739 26708
                </a>
                <a href="https://instagram.com/nikki_palette" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-foreground">
                  <Instagram size={16} /> @nikki_palette
                </a>
              </div>
            </div>

            <button aria-label="Close menu" className="absolute right-4 top-4 p-2" onClick={() => setOpen(false)}>
              <X size={18} />
            </button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}