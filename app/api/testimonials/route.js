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
  },
  {
    id: '4',
    name: 'David Thompson',
    email: 'd.thompson@email.com',
    message: 'The digital art piece I commissioned is stunning. The level of detail and creativity is beyond what I imagined. Will definitely be back for more!',
    rating: 5,
    artworkType: 'Digital Art',
    wouldRecommend: true,
    status: 'approved',
    createdAt: '2025-11-22T15:25:27.644Z'
  },
  {
    id: '5',
    name: 'Lisa Park',
    email: 'lisa.p@email.com',
    message: 'Amazing sketch work! The portrait of my pet is so lifelike and captures their essence perfectly. Thank you for such a wonderful piece of art.',
    rating: 5,
    artworkType: 'Sketch',
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