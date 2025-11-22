import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { Resend } from 'resend';
import { ContactFormEmail } from '@/components/emails/ContactFormEmail';
import { z } from 'zod';

const resend = new Resend(process.env.RESEND_API_KEY);

let client;
let db;

async function connectDB() {
  if (db) return db;
  try {
    client = new MongoClient(process.env.MONGO_URL);
    await client.connect();
    db = client.db();
    console.log('✅ MongoDB connected successfully');
    return db;
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    throw error;
  }
}

// Validation schemas
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters').max(5000),
});

const artworkSchema = z.object({
  title: z.string().min(1),
  category: z.enum(['portraits', 'tshirt', 'paintings', 'sketches', 'digital']),
  imageUrl: z.string().url(),
  description: z.string().optional(),
});

const testimonialSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Testimonial must be at least 10 characters').max(1000),
  rating: z.number().min(1).max(5),
  artworkType: z.string().optional(),
  wouldRecommend: z.boolean().optional(),
});

const blogPostSchema = z.object({
  title: z.string().min(5).max(200),
  excerpt: z.string().min(20).max(500),
  content: z.string().min(100),
  category: z.enum(['techniques', 'inspiration', 'tutorials', 'behind-scenes', 'art-business']),
  author: z.string().min(1),
  imageUrl: z.string().url(),
  readTime: z.string(),
  tags: z.array(z.string()).optional(),
});

// API Routes Handler
export async function GET(request) {
  try {
    const database = await connectDB();
    const url = new URL(request.url);
    const pathname = url.pathname.replace('/api', '');

    // Get all artworks or filter by category
    if (pathname === '/artworks') {
      const category = url.searchParams.get('category');
      const query = category && category !== 'all' ? { category } : {};
      const artworks = await database.collection('artworks').find(query).toArray();
      return NextResponse.json({ success: true, data: artworks });
    }

    // Get all testimonials (only approved ones for public display)
    if (pathname === '/testimonials') {
      const testimonials = await database.collection('testimonials')
        .find({ status: 'approved' })
        .sort({ createdAt: -1 })
        .toArray();
      return NextResponse.json({ success: true, data: testimonials });
    }

    // Get all services
    if (pathname === '/services') {
      const services = await database.collection('services').find({}).toArray();
      return NextResponse.json({ success: true, data: services });
    }

    // Get all blog posts
    if (pathname === '/blog') {
      const blogPosts = await database.collection('blog').find({}).sort({ createdAt: -1 }).toArray();
      return NextResponse.json({ success: true, data: blogPosts });
    }

    // Handle newsletter subscriptions
    if (pathname === '/newsletter') {
      try {
        const body = await request.json();
        const { email } = body;

        // Validate email
        if (!email) {
          return NextResponse.json({ 
            error: 'Email address is required' 
          }, { status: 400 });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          return NextResponse.json({ 
            error: 'Invalid email format' 
          }, { status: 400 });
        }

        // Check if email already exists
        const existing = await database.collection('newsletter').findOne({ email });
        if (existing) {
          return NextResponse.json({ 
            error: 'Email already subscribed to newsletter' 
          }, { status: 409 });
        }

        // Add to newsletter collection
        const subscription = {
          id: uuidv4(),
          email,
          subscribedAt: new Date().toISOString(),
          isActive: true,
        };

        await database.collection('newsletter').insertOne(subscription);

        // Send welcome email (optional)
        try {
          await resend.emails.send({
            from: 'Alex Artiste <noreply@alexartiste.com>',
            to: email,
            subject: 'Welcome to Alex Artiste Newsletter!',
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #D4AF37;">Welcome to Alex Artiste Newsletter!</h2>
                <p>Thank you for subscribing to our newsletter. You'll receive updates on:</p>
                <ul>
                  <li>New artwork releases</li>
                  <li>Blog posts and art insights</li>
                  <li>Exclusive content and behind-the-scenes</li>
                  <li>Special offers and commission opportunities</li>
                </ul>
                <p>We look forward to sharing our artistic journey with you!</p>
                <p style="color: #666;">Best regards,<br>Alex Artiste</p>
              </div>
            `,
          });
        } catch (emailError) {
          console.error('Failed to send welcome email:', emailError);
          // Don't fail the subscription if email fails
        }

        return NextResponse.json({ 
          success: true, 
          message: 'Successfully subscribed to newsletter!' 
        });
      } catch (error) {
        console.error('Newsletter subscription error:', error);
        return NextResponse.json({ 
          error: 'Failed to subscribe to newsletter' 
        }, { status: 500 });
      }
    }

    return NextResponse.json({ error: 'Route not found' }, { status: 404 });
  } catch (error) {
    console.error('GET Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const database = await connectDB();
    const url = new URL(request.url);
    const pathname = url.pathname.replace('/api', '');
    const body = await request.json();

    // Contact form submission
    if (pathname === '/contact') {
      const validatedData = contactSchema.parse(body);

      // Save to database
      const contactData = {
        id: uuidv4(),
        ...validatedData,
        createdAt: new Date().toISOString(),
      };
      await database.collection('contacts').insertOne(contactData);

      // Send email via Resend
      try {
        const { data, error } = await resend.emails.send({
          from: 'Art Portfolio <onboarding@resend.dev>',
          to: [process.env.ADMIN_EMAIL || 'artist.contact@example.com'],
          subject: `New Art Commission Inquiry from ${validatedData.name}`,
          replyTo: validatedData.email,
          react: ContactFormEmail({
            senderName: validatedData.name,
            senderEmail: validatedData.email,
            senderPhone: validatedData.phone,
            message: validatedData.message,
          }),
        });

        if (error) {
          console.error('Email sending error:', error);
          return NextResponse.json(
            { success: true, message: 'Message saved but email failed to send', emailError: error },
            { status: 200 }
          );
        }

        return NextResponse.json(
          { success: true, message: 'Message sent successfully!', emailId: data?.id },
          { status: 200 }
        );
      } catch (emailError) {
        console.error('Email error:', emailError);
        return NextResponse.json(
          { success: true, message: 'Message saved but email failed', emailError: emailError.message },
          { status: 200 }
        );
      }
    }

    // Add artwork (admin)
    if (pathname === '/artworks') {
      const validatedData = artworkSchema.parse(body);
      const artwork = {
        id: uuidv4(),
        ...validatedData,
        createdAt: new Date().toISOString(),
      };
      await database.collection('artworks').insertOne(artwork);
      return NextResponse.json({ success: true, data: artwork }, { status: 201 });
    }

    // Add testimonial
    if (pathname === '/testimonials') {
      try {
        const validatedData = testimonialSchema.parse(body);
        
        // Check if this email has already submitted a testimonial
        const existingTestimonial = await database.collection('testimonials').findOne({ 
          email: validatedData.email,
          status: { $in: ['pending', 'approved'] }
        });
        
        if (existingTestimonial) {
          return NextResponse.json({ 
            error: 'You have already submitted a testimonial. Multiple submissions are not allowed.' 
          }, { status: 409 });
        }
        
        const testimonial = {
          id: uuidv4(),
          ...validatedData,
          status: 'pending', // Requires admin approval
          createdAt: new Date().toISOString(),
        };
        
        await database.collection('testimonials').insertOne(testimonial);
        
        // Send notification email to admin
        try {
          await resend.emails.send({
            from: 'Art Portfolio <noreply@alexartiste.com>',
            to: process.env.ADMIN_EMAIL || 'artist.contact@example.com',
            subject: 'New Testimonial Submission - Pending Review',
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #D4AF37;">New Testimonial Submission</h2>
                <p>A new testimonial has been submitted and is pending review:</p>
                <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
                  <p><strong>Name:</strong> ${validatedData.name}</p>
                  <p><strong>Email:</strong> ${validatedData.email}</p>
                  <p><strong>Rating:</strong> ${validatedData.rating}/5 stars</p>
                  ${validatedData.artworkType ? `<p><strong>Artwork Type:</strong> ${validatedData.artworkType}</p>` : ''}
                  <p><strong>Message:</strong></p>
                  <p style="font-style: italic;">"${validatedData.message}"</p>
                </div>
                <p>Please log in to your admin panel to review and approve this testimonial.</p>
              </div>
            `,
          });
        } catch (emailError) {
          console.error('Failed to send admin notification email:', emailError);
          // Don't fail the testimonial submission if email fails
        }
        
        return NextResponse.json({ 
          success: true, 
          message: 'Testimonial submitted successfully! It will be reviewed before publication.',
          data: testimonial 
        }, { status: 201 });
        
      } catch (error) {
        if (error instanceof z.ZodError) {
          return NextResponse.json({ 
            error: 'Validation failed', 
            details: error.errors 
          }, { status: 400 });
        }
        
        console.error('Testimonial submission error:', error);
        return NextResponse.json({ 
          error: 'Failed to submit testimonial. Please try again.' 
        }, { status: 500 });
      }
    }

    // Add blog post
    if (pathname === '/blog') {
      const validatedData = blogPostSchema.parse(body);
      const blogPost = {
        id: uuidv4(),
        ...validatedData,
        tags: validatedData.tags || [],
        createdAt: new Date().toISOString(),
      };
      await database.collection('blog').insertOne(blogPost);
      return NextResponse.json({ success: true, data: blogPost }, { status: 201 });
    }

    // Handle commission requests
    if (pathname === '/commissions') {
      try {
        const formData = await request.formData();
        
        // Validate required fields
        const requiredFields = ['name', 'email', 'serviceType', 'description'];
        for (const field of requiredFields) {
          if (!formData.get(field)) {
            return NextResponse.json({ 
              error: `Missing required field: ${field}` 
            }, { status: 400 });
          }
        }
        
        // Validate email format
        const email = formData.get('email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          return NextResponse.json({ 
            error: 'Invalid email format' 
          }, { status: 400 });
        }
        
        // Process uploaded files
        const referenceImages = [];
        const files = formData.getAll('referenceImages');
        
        for (const file of files) {
          if (file instanceof File) {
            // Validate file size (10MB limit)
            if (file.size > 10 * 1024 * 1024) {
              return NextResponse.json({ 
                error: `File ${file.name} exceeds 10MB limit` 
              }, { status: 400 });
            }
            
            // Validate file type
            if (!file.type.startsWith('image/')) {
              return NextResponse.json({ 
                error: `File ${file.name} is not an image` 
              }, { status: 400 });
            }
            
            // Store file info (in production, you'd upload to cloud storage)
            referenceImages.push({
              name: file.name,
              type: file.type,
              size: file.size,
              uploadedAt: new Date().toISOString(),
            });
          }
        }
        
        // Create commission request
        const commission = {
          id: uuidv4(),
          name: formData.get('name'),
          email: formData.get('email'),
          phone: formData.get('phone') || '',
          serviceType: formData.get('serviceType'),
          budget: formData.get('budget') || '',
          deadline: formData.get('deadline') || '',
          size: formData.get('size') || '',
          description: formData.get('description'),
          referenceUrls: formData.get('referenceUrls') || '',
          referenceImages: referenceImages,
          status: 'pending',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        
        await database.collection('commissions').insertOne(commission);
        
        // Send confirmation email (using existing email setup)
        try {
          const emailData = {
            from: 'commissions@alexartiste.com',
            to: commission.email,
            subject: 'Commission Request Received - Alex Artiste',
            html: `
              <h2>Thank you for your commission request!</h2>
              <p>Dear ${commission.name},</p>
              <p>I've received your commission request for ${commission.serviceType}. I'll review your details and get back to you within 24 hours.</p>
              <p><strong>Project Summary:</strong></p>
              <ul>
                <li>Service: ${commission.serviceType}</li>
                <li>Budget: ${commission.budget || 'Not specified'}</li>
                <li>Size: ${commission.size || 'Not specified'}</li>
                <li>Deadline: ${commission.deadline || 'Not specified'}</li>
              </ul>
              <p>Best regards,<br>Alex Artiste</p>
            `,
          };
          
          // Send email using existing email service
          await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: 'Alex Artiste',
              email: 'noreply@alexartiste.com',
              message: `Commission request received from ${commission.name} (${commission.email}) for ${commission.serviceType}`,
              ...emailData
            }),
          });
        } catch (emailError) {
          console.error('Failed to send confirmation email:', emailError);
          // Don't fail the commission submission if email fails
        }
        
        return NextResponse.json({ success: true, data: commission });
      } catch (error) {
        console.error('Commission submission error:', error);
        return NextResponse.json({ 
          error: 'Failed to submit commission request' 
        }, { status: 500 });
      }
    }

    return NextResponse.json({ error: 'Route not found' }, { status: 404 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: error.errors.map(e => ({
            field: e.path.join('.'),
            message: e.message,
          })),
        },
        { status: 422 }
      );
    }

    console.error('POST Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Initialize default data
export async function initializeData() {
  const database = await connectDB();

  // Check if data already exists
  const artworkCount = await database.collection('artworks').countDocuments();
  if (artworkCount > 0) return;

  // Sample artworks
  const artworks = [
    // Portraits
    { id: uuidv4(), title: 'Contemporary Portrait', category: 'portraits', imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e', description: 'Professional male portrait study', createdAt: new Date().toISOString() },
    { id: uuidv4(), title: 'Elegant Portrait', category: 'portraits', imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb', description: 'Professional female portrait', createdAt: new Date().toISOString() },
    { id: uuidv4(), title: 'Artistic Portrait', category: 'portraits', imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2', description: 'Creative portrait photography', createdAt: new Date().toISOString() },
    
    // Paintings
    { id: uuidv4(), title: 'Classical Painting', category: 'paintings', imageUrl: 'https://images.unsplash.com/photo-1579783928621-7a13d66a62d1', description: 'Traditional painting style', createdAt: new Date().toISOString() },
    { id: uuidv4(), title: 'Landscape Art', category: 'paintings', imageUrl: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9', description: 'Beautiful landscape painting', createdAt: new Date().toISOString() },
    { id: uuidv4(), title: 'Art Supplies', category: 'paintings', imageUrl: 'https://images.pexels.com/photos/102127/pexels-photo-102127.jpeg', description: 'Paint palette and brushes', createdAt: new Date().toISOString() },
    
    // Sketches
    { id: uuidv4(), title: 'Eye Study', category: 'sketches', imageUrl: 'https://images.unsplash.com/photo-1602738328654-51ab2ae6c4ff', description: 'Detailed eye sketch', createdAt: new Date().toISOString() },
    { id: uuidv4(), title: 'Abstract Drawing', category: 'sketches', imageUrl: 'https://images.unsplash.com/photo-1569091791842-7cfb64e04797', description: 'Abstract ink drawing', createdAt: new Date().toISOString() },
    { id: uuidv4(), title: 'Pet Portrait', category: 'sketches', imageUrl: 'https://images.unsplash.com/photo-1640894822819-0a94bec464bf', description: 'Dog portrait sketch', createdAt: new Date().toISOString() },
    
    // Digital Art
    { id: uuidv4(), title: 'Digital Performance', category: 'digital', imageUrl: 'https://images.unsplash.com/photo-1593073862407-a3ce22748763', description: 'Digital stage art', createdAt: new Date().toISOString() },
    { id: uuidv4(), title: 'Fantasy Forest', category: 'digital', imageUrl: 'https://images.unsplash.com/photo-1635322966219-b75ed372eb01', description: 'Fantasy forest scene', createdAt: new Date().toISOString() },
    { id: uuidv4(), title: 'Floral Digital', category: 'digital', imageUrl: 'https://images.unsplash.com/photo-1641391503184-a2131018701b', description: 'Digital floral portrait', createdAt: new Date().toISOString() },
    
    // T-Shirt Designs
    { id: uuidv4(), title: 'Artistic Tee', category: 'tshirt', imageUrl: 'https://images.unsplash.com/photo-1685883518316-355533810d68', description: 'Artistic t-shirt design', createdAt: new Date().toISOString() },
    { id: uuidv4(), title: 'Design Mockup', category: 'tshirt', imageUrl: 'https://images.unsplash.com/photo-1618677603286-0ec56cb6e1b5', description: 'T-shirt mockup', createdAt: new Date().toISOString() },
    { id: uuidv4(), title: 'Clean Template', category: 'tshirt', imageUrl: 'https://images.unsplash.com/photo-1618677603544-51162346e165', description: 'Clean t-shirt template', createdAt: new Date().toISOString() },
  ];

  // Sample testimonials
  const testimonials = [
    { id: uuidv4(), name: 'Sarah Johnson', message: 'Alex created the most beautiful portrait of my family. The attention to detail was incredible!', rating: 5, createdAt: new Date().toISOString() },
    { id: uuidv4(), name: 'Michael Chen', message: 'The t-shirt designs are amazing! My business has received so many compliments.', rating: 5, createdAt: new Date().toISOString() },
    { id: uuidv4(), name: 'Emily Rodriguez', message: 'Professional, creative, and delivered on time. Highly recommend!', rating: 5, createdAt: new Date().toISOString() },
  ];

  // Sample services
  const services = [
    {
      id: uuidv4(),
      title: 'Custom Portraits',
      description: 'Professional portrait commissions in various mediums - pencil, charcoal, oil, or digital.',
      price: 'Starting at $150',
      imageUrl: 'https://images.unsplash.com/photo-1579783928621-7a13d66a62d1',
      createdAt: new Date().toISOString(),
    },
    {
      id: uuidv4(),
      title: 'Painting Commissions',
      description: 'Original paintings tailored to your vision - landscapes, abstracts, or custom concepts.',
      price: 'Starting at $300',
      imageUrl: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9',
      createdAt: new Date().toISOString(),
    },
    {
      id: uuidv4(),
      title: 'T-Shirt Design',
      description: 'Unique t-shirt artwork for personal use, brands, or events.',
      price: 'Starting at $100',
      imageUrl: 'https://images.unsplash.com/photo-1685883518316-355533810d68',
      createdAt: new Date().toISOString(),
    },
    {
      id: uuidv4(),
      title: 'Digital Art',
      description: 'Modern digital illustrations perfect for prints, social media, or commercial use.',
      price: 'Starting at $200',
      imageUrl: 'https://images.unsplash.com/photo-1635322966219-b75ed372eb01',
      createdAt: new Date().toISOString(),
    },
    {
      id: uuidv4(),
      title: 'Sketches & Drawings',
      description: 'Quick sketches, detailed drawings, and custom illustration work.',
      price: 'Starting at $75',
      imageUrl: 'https://images.unsplash.com/photo-1602738328654-51ab2ae6c4ff',
      createdAt: new Date().toISOString(),
    },
    {
      id: uuidv4(),
      title: 'Bulk/Commercial',
      description: 'Large orders and commercial projects. Contact for custom pricing.',
      price: 'Custom Quote',
      imageUrl: 'https://images.pexels.com/photos/102127/pexels-photo-102127.jpeg',
      createdAt: new Date().toISOString(),
    },
  ];

  await database.collection('artworks').insertMany(artworks);
  await database.collection('testimonials').insertMany(testimonials);
  await database.collection('services').insertMany(services);

  console.log('✅ Database initialized with sample data');
}

// Initialize on first request
initializeData().catch(console.error);
