# Public Folder - Static Assets

This folder contains static assets that can be served directly by Next.js.

## Folder Structure

```
public/
├── images/
│   ├── artworks/     # Store artwork images here
│   ├── artist/       # Store artist profile photos here
│   ├── gallery/      # Store gallery images here
│   └── blog/         # Store blog post images here
```

## How to Use

Images placed in the public folder can be referenced directly in your components:

```jsx
// For images in public/images/artworks/
<Image 
  src="/images/artworks/my-artwork.jpg" 
  alt="My Artwork"
  width={500}
  height={300}
/>

// For images in public/images/artist/
<Image 
  src="/images/artist/profile-photo.jpg" 
  alt="Artist Profile"
  width={300}
  height={300}
/>
```

## Benefits

- ✅ **Faster Loading**: Static assets are served directly without processing
- ✅ **Better Organization**: Structured folders for different image types
- ✅ **Easy Management**: Simple file-based organization
- ✅ **CDN Ready**: Works well with CDN services

## Tips

- Use descriptive filenames (e.g., `portrait-oil-painting-2024.jpg`)
- Optimize images before placing them here (use tools like TinyPNG)
- Consider using WebP format for better compression
- Keep file sizes reasonable (< 500KB for most images)