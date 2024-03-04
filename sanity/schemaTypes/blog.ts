export default {
    name: 'blog',
    type: 'document',
    title: 'Blog',
    fields: [
      {
        name: 'title',
        type: 'string',
        title: 'Title of blog article',
      },
      {
        name: 'slug',
        type: 'slug',
        title: 'Slug',
        options: {
          source: 'title',
          maxLength: 96,
        },
      },
      {
        name: 'publishedAt',
        type: 'datetime',
        title: 'Published at',
        description: 'You can use this field to schedule post publishing.',
      },
      {
        name: 'categories',
        type: 'array',
        title: 'Categories',
        of: [{ type: 'reference', to: { type: 'category' } }],
      },
      {
        name: 'tags',
        type: 'array',
        title: 'Tags',
        of: [{ type: 'string' }],
        options: {
          layout: 'tags',
        },
      },
      {
        name: 'titleImage',
        type: 'image',
        title: 'Title Image',
        options: {
          hotspot: true,
        },
      },
      {
        name: 'smallDescription',
        type: 'text',
        title: 'Small Description',
      },
      {
        name: 'author',
        type: 'string',
        title: 'Author',
      },
      {
        name: 'authorImage',
        type: 'image',
        title: 'Author Image',
      },
      {
        name: 'content',
        type: 'array',
        title: 'Content',
        of: [{ type: 'block' }],
      },
      {
        name: 'featured',
        type: 'boolean',
        title: 'Featured Article',
        description: 'Whether this article is featured on the site.',
      },
    ],
  
    preview: {
      select: {
        title: 'title',
        author: 'author',
        media: 'titleImage',
        tag0: 'tags.0',
        tag1: 'tags.1',
        featured: 'featured',
      },
      prepare(selection: { title: any; author: any; media: any; tag0: any; tag1: any; featured: any; }) {
        const { title, author, media, tag0, tag1, featured } = selection;
        // Combine tags into a single string
        const tags = [tag0, tag1].filter(Boolean).join(', ');
        // Create a subtitle string that will display author, tags, and featured status
        const subtitleParts = [];
        if (author) {
          subtitleParts.push(`by ${author}`);
        }
        if (tags) {
          subtitleParts.push(`Tags: ${tags}`);
        }
        if (featured) {
          subtitleParts.push('Featured');
        }
        const subtitle = subtitleParts.join(' - ');
  
        return {
          title,
          subtitle,
          media,
        };
      },
    },
  };
  