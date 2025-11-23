import { NextResponse } from 'next/server';

const blogPosts = [
  {
    _id: '1',
    title: 'The Art of Color Theory',
    slug: 'the-art-of-color-theory',
    excerpt: 'Exploring the fundamental principles of color theory in digital art and design.',
    content: 'Color theory is the foundation of all visual arts. Understanding how colors interact, complement, and contrast with each other is essential for creating compelling artwork. In this post, we explore the color wheel, complementary colors, and how to use them effectively in your digital creations.',
    featuredImage: '/images/blog/color-theory.jpg',
    author: 'Nikki Palette',
    tags: ['color theory', 'digital art', 'design'],
    publishedAt: '2024-01-15T00:00:00.000Z',
    readTime: '5 min read',
    status: 'published'
  },
  {
    _id: '2',
    title: 'Digital Painting Techniques',
    slug: 'digital-painting-techniques',
    excerpt: 'Master the essential techniques for creating stunning digital paintings.',
    content: 'Digital painting opens up endless possibilities for artists. From brush selection to layer management, this comprehensive guide covers everything you need to know to create professional digital artwork. We discuss various painting techniques, blending modes, and how to achieve different textures and effects.',
    featuredImage: '/images/blog/digital-painting.jpg',
    author: 'Nikki Palette',
    tags: ['digital painting', 'techniques', 'tutorial'],
    publishedAt: '2024-01-20T00:00:00.000Z',
    readTime: '8 min read',
    status: 'published'
  },
  {
    _id: '3',
    title: 'Creative Inspiration Sources',
    slug: 'creative-inspiration-sources',
    excerpt: 'Finding inspiration in everyday life and transforming it into art.',
    content: 'Inspiration can come from anywhere - nature, music, emotions, or daily experiences. This post explores various sources of creative inspiration and how to channel them into your artistic practice. Learn techniques for developing your creative eye and maintaining a consistent flow of ideas.',
    featuredImage: '/images/blog/inspiration.jpg',
    author: 'Nikki Palette',
    tags: ['inspiration', 'creativity', 'art process'],
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