import { NextResponse } from 'next/server';

// Mock services data for now
const services = [
  {
    id: '1',
    title: 'Custom Portraits',
    description: 'Professional portrait commissions in various mediums - pencil, charcoal, oil, or digital.',
    price: 'Starting at $150',
    imageUrl: 'https://images.unsplash.com/photo-1579783928621-7a13d66a62d1',
    createdAt: '2025-11-22T15:25:27.644Z'
  },
  {
    id: '2',
    title: 'Painting Commissions',
    description: 'Original paintings tailored to your vision - landscapes, abstracts, or custom concepts.',
    price: 'Starting at $300',
    imageUrl: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9',
    createdAt: '2025-11-22T15:25:27.644Z'
  },
  {
    id: '3',
    title: 'T-Shirt Design',
    description: 'Unique t-shirt artwork for personal use, brands, or events.',
    price: 'Starting at $100',
    imageUrl: 'https://images.unsplash.com/photo-1685883518316-355533810d68',
    createdAt: '2025-11-22T15:25:27.644Z'
  },
  {
    id: '4',
    title: 'Digital Art',
    description: 'Modern digital illustrations perfect for prints, social media, or commercial use.',
    price: 'Starting at $200',
    imageUrl: 'https://images.unsplash.com/photo-1635322966219-b75ed372eb01',
    createdAt: '2025-11-22T15:25:27.644Z'
  },
  {
    id: '5',
    title: 'Sketches & Drawings',
    description: 'Quick sketches, detailed drawings, and custom illustration work.',
    price: 'Starting at $75',
    imageUrl: 'https://images.unsplash.com/photo-1602738328654-51ab2ae6c4ff',
    createdAt: '2025-11-22T15:25:27.644Z'
  },
  {
    id: '6',
    title: 'Bulk/Commercial',
    description: 'Large orders and commercial projects. Contact for custom pricing.',
    price: 'Custom Quote',
    imageUrl: 'https://images.pexels.com/photos/102127/pexels-photo-102127.jpeg',
    createdAt: '2025-11-22T15:25:27.644Z'
  }
];

export async function GET() {
  try {
    return NextResponse.json({ success: true, data: services });
  } catch (error) {
    console.error('Services API error:', error);
    return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 });
  }
}