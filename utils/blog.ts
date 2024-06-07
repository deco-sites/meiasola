import {
  BlogPosting,
  ImageObject,
  Organization,
  BlogPost as BlogPostWordpress,
} from "../types/blog.ts";

export const toBlogPost = (post: BlogPostWordpress): BlogPosting => {
  const featuredMedia = post._embedded?.["wp:featuredmedia"]?.find(
    (media) => media.id === post.featured_media
  );

  const author = post._embedded?.["author"]?.find(
    (author) => author.id === post.author
  );

  return {
    "@type": "BlogPosting",
    "@id": post.id?.toString(),
    headline: post.title?.rendered,
    description: post.excerpt?.rendered,
    image: post._embedded?.["wp:featuredmedia"]?.[0]
      ? ({
          "@type": "ImageObject",
          url: featuredMedia?.source_url,
          alternateName: featuredMedia?.alt_text,
        } as ImageObject)
      : undefined,
    datePublished: post.date,
    dateModified: post.modified,
    articleBody: post.content?.rendered,
    author: author
      ? [
          {
            "@type": "Organization",
            name: author?.name,
            image: {
              "@type": "ImageObject",
              url: author?.avatar_urls?.["96"],
              alternateName: author?.name,
            },
          } as Organization,
        ]
      : undefined,
    url: post.link,
  };
};
