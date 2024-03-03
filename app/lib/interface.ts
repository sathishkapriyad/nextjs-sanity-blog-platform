export interface simpleBlogCard {
    title: string;
    smallDescription: string;
    currentSlug: string;
    titleImage: any;
    tags: string;
    author: string;
    authorImage: any;
  }

  export interface fullBlog {
    currentSlug: string;
    title: string;
    content: any;
    titleImage: any;
    tags: string;
    author: string;
    authorImage: any;
    smallDescription: string;
  }

  // interface.ts
export interface advertType {
  adtitle: string;
  adposition: string;
  adImage: any;
}
