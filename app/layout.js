import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { Instagram, Mail, Phone, Menu, X } from 'lucide-react';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });

export const metadata = {
  title: 'Alex Artiste | Professional Artist Portfolio',
  description: 'Artist specializing in custom portraits, paintings, t-shirt art, sketches, and digital art. Based in New York City. Commission custom artwork today.',
  keywords: 'artist, portrait artist, custom paintings, t-shirt design, digital art, sketches, New York artist, art commissions',
  openGraph: {
    title: 'Alex Artiste | Professional Artist Portfolio',
    description: 'Passionate artist bringing visions to life through diverse mediums',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${playfair.variable} font-inter antialiased`}>
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

function Navigation() {
  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-cream-50/95 backdrop-blur-sm border-b border-cream-200 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <a href="#home" className="text-2xl font-playfair font-bold text-gold-600 hover:text-gold-700 transition-colors">
              Alex Artiste
            </a>
            
            <div className="hidden md:flex items-center gap-8">
              <a href="#home" className="text-sm font-medium text-foreground hover:text-gold-600 transition-colors">
                Home
              </a>
              <a href="#gallery" className="text-sm font-medium text-foreground hover:text-gold-600 transition-colors">
                Gallery
              </a>
              <a href="#about" className="text-sm font-medium text-foreground hover:text-gold-600 transition-colors">
                About
              </a>
              <a href="#services" className="text-sm font-medium text-foreground hover:text-gold-600 transition-colors">
                Services
              </a>
              <a href="#testimonials" className="text-sm font-medium text-foreground hover:text-gold-600 transition-colors">
                Testimonials
              </a>
              <a href="#contact" className="px-6 py-2 bg-gold-600 text-white rounded-full hover:bg-gold-700 transition-all hover:shadow-lg font-medium">
                Contact
              </a>
            </div>

            <button className="md:hidden p-2 text-foreground hover:text-gold-600">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>
      
      {/* Mobile spacer */}
      <div className="h-16"></div>
    </>
  );
}

function Footer() {
  return (
    <footer className="bg-cream-900 text-cream-100 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-playfair font-bold text-gold-400 mb-4">Alex Artiste</h3>
            <p className="text-cream-300 text-sm">
              Passionate artist bringing visions to life through diverse mediums, inspired by nature and human emotion.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-playfair font-semibold mb-4 text-gold-400">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#home" className="text-cream-300 hover:text-gold-400 transition-colors text-sm">Home</a></li>
              <li><a href="#gallery" className="text-cream-300 hover:text-gold-400 transition-colors text-sm">Gallery</a></li>
              <li><a href="#about" className="text-cream-300 hover:text-gold-400 transition-colors text-sm">About</a></li>
              <li><a href="#services" className="text-cream-300 hover:text-gold-400 transition-colors text-sm">Services</a></li>
              <li><a href="#contact" className="text-cream-300 hover:text-gold-400 transition-colors text-sm">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-playfair font-semibold mb-4 text-gold-400">Get in Touch</h4>
            <div className="space-y-3">
              <a href="mailto:artist.contact@example.com" className="flex items-center gap-2 text-cream-300 hover:text-gold-400 transition-colors text-sm">
                <Mail size={16} />
                artist.contact@example.com
              </a>
              <a href="tel:+1234567890" className="flex items-center gap-2 text-cream-300 hover:text-gold-400 transition-colors text-sm">
                <Phone size={16} />
                +123-456-7890
              </a>
              <a href="https://instagram.com/MyArtGallery" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-cream-300 hover:text-gold-400 transition-colors text-sm">
                <Instagram size={16} />
                @MyArtGallery
              </a>
              <p className="text-cream-300 text-sm">📍 New York City</p>
            </div>
          </div>
        </div>

        <div className="border-t border-cream-700 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-cream-400 text-sm">
              &copy; {new Date().getFullYear()} Alex Artiste. All rights reserved.
            </p>
            <div className="flex gap-4">
              <a href="https://instagram.com/MyArtGallery" target="_blank" rel="noopener noreferrer" className="text-cream-400 hover:text-gold-400 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="text-cream-400 hover:text-gold-400 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}