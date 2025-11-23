import { NextResponse } from 'next/server';

const blogPosts = [
  {
    _id: '1',
    title: 'The Art of Color Theory in Portrait Painting',
    slug: 'the-art-of-color-theory-in-portrait-painting',
    excerpt: 'Discover how understanding color relationships can transform your portrait paintings from good to breathtaking. Learn the secrets of warm and cool tones.',
    content: 'Color theory is the foundation of all visual arts. Understanding how colors interact, complement, and contrast with each other is essential for creating compelling artwork. In this post, we explore the color wheel, complementary colors, and how to use them effectively in your portrait paintings.',
    featuredImage: '/images/artworks/IMG_20221110_183351_400.jpg',
    author: 'Nikkitha',
    tags: ['color theory', 'portrait', 'painting'],
    publishedAt: '2024-01-15T00:00:00.000Z',
    readTime: '5 min read',
    status: 'published'
  },
  {
    _id: '2',
    title: 'From Sketch to Masterpiece: My Creative Process Revealed',
    slug: 'from-sketch-to-masterpiece-creative-process',
    excerpt: 'Take a journey through my artistic process, from initial concept sketches to finished artwork. See how ideas evolve into stunning creations.',
    content: 'Every masterpiece begins with a simple sketch. This comprehensive guide takes you through my complete creative process, from initial concept development to final artwork completion. Learn about sketching techniques, composition planning, and how to bring your artistic vision to life.',
    featuredImage: '/images/artworks/IMG_20221022_135924.jpg',
    author: 'Nikkitha',
    tags: ['process', 'sketching', 'creation'],
    publishedAt: '2024-01-20T00:00:00.000Z',
    readTime: '8 min read',
    status: 'published'
  },
  {
    _id: '3',
    title: 'The Psychology of Art: How Colors Affect Emotions',
    slug: 'psychology-of-art-colors-emotions',
    excerpt: 'Explore the fascinating connection between colors and human emotions. Learn how to use this knowledge to create more impactful artwork.',
    content: 'Colors have a profound impact on human emotions and behavior. This post explores the fascinating connection between colors and human psychology. Learn how to use warm colors to evoke energy and passion, cool colors for calmness, and how to create emotional depth in your artwork.',
    featuredImage: '/images/artworks/IMG_20221106_125129_724.jpg',
    author: 'Nikkitha',
    tags: ['psychology', 'emotions', 'color'],
    publishedAt: '2024-01-25T00:00:00.000Z',
    readTime: '6 min read',
    status: 'published'
  }
];

export async function GET() {
  try {
    return NextResponse.json({ success: true, data: blogPosts });
  } catch (error) {
    console.error('Blog API error:', error);
    return NextResponse.json({ error: 'Failed to fetch blog posts' }, { status: 500 });
  }
}