  export interface simpleBlogCard {
    content: any;
    title: string;
    smallDescription: string;
    currentSlug: string;
    titleImage: any; // You might want to create a more specific type for image
    tags: string[];
    author: string;
    authorImage: any; // You might want to create a more specific type for image
    publishedAt: string;
    categories: any[]; // You might want to create a more specific type for categories
    featured: boolean;
  }

// lib/interface.ts
export interface BlogPost {
  content: any;
  title: string;
  smallDescription: string;
  currentSlug: string;
  titleImage: { asset: { _ref: string } }; // Adjust according to your Sanity image structure
  tags: string[];
  author: string;
  authorImage: { asset: { _ref: string } }; // Adjust according to your Sanity image structure
  publishedAt: string;
  categories: { title: string }[];
  featured: boolean;
}

export interface advertType {
  adtitle: string;
  adposition: string;
  adImage: { asset: { _ref: string } }; // Adjust according to your Sanity image structure
}
