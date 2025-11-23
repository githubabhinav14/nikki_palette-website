import { NextResponse } from 'next/server';

// Mock testimonials data for now
const testimonials = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.j@email.com',
    message: 'Nikkitha created a beautiful portrait of my daughter that captured her personality perfectly. The attention to detail and artistic skill is remarkable!',
    rating: 5,
    artworkType: 'Portrait',
    wouldRecommend: true,
    status: 'approved',
    createdAt: '2025-11-22T15:25:27.644Z'
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'm.chen@email.com',
    message: 'The custom t-shirt design exceeded all expectations. Professional, creative, and delivered on time. Highly recommend for any custom art needs!',
    rating: 5,
    artworkType: 'T-Shirt Design',
    wouldRecommend: true,
    status: 'approved',
    createdAt: '2025-11-22T15:25:27.644Z'
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    email: 'emily.r@email.com',
    message: 'Working with Nikkitha was an absolute pleasure. She understood my vision for the painting and brought it to life beautifully. The communication throughout was excellent.',
    rating: 5,
    artworkType: 'Painting',
    wouldRecommend: true,
    status: 'approved',
    createdAt: '2025-11-22T15:25:27.644Z'
  }
];

export async function GET() {
  try {
    return NextResponse.json({ success: true, data: testimonials });
  } catch (error) {
    console.error('Testimonials API error:', error);
    return NextResponse.json({ error: 'Failed to fetch testimonials' }, { status: 500 });
  }
}