import * as WP from "https://raw.githubusercontent.com/johnbillion/wp-json-schemas/2117b51650c9a662803e74182edf06af9bd327f7/packages/wp-types/index.ts";

export interface Thing {
  "@type": "Thing";
  /** IRI identifying the canonical address of this object. */
  "@id"?: string;
  /** An additional type for the item, typically used for adding more specific types from external vocabularies in microdata syntax. This is a relationship between something and a class that the thing is in. In RDFa syntax, it is better to use the native RDFa syntax - the 'typeof' attribute - for multiple types. Schema.org tools may have only weaker understanding of extra types, in particular those defined externally. */
  additionalType?: string;
  /** An alias for the item. */
  alternateName?: string;
  /** A description of the item. */
  description?: string;
  /** A sub property of description. A short description of the item used to disambiguate from other, similar items. Information from other properties (in particular, name) may be necessary for the description to be useful for disambiguation. */
  disambiguatingDescription?: string;
  /** The identifier property represents any kind of identifier for any kind of {@link https://schema.org/Thing Thing}, such as ISBNs, GTIN codes, UUIDs etc. Schema.org provides dedicated properties for representing many of these, either as textual strings or as URL (URI) links. See {@link /docs/datamodel.html#identifierBg background notes} for more details. */
  identifier?: string;
  /** An image of the item. This can be a {@link https://schema.org/URL URL} or a fully described {@link https://schema.org/ImageObject ImageObject}. */
  image?: ImageObject;
  /** The name of the item. */
  name?: string;
  /** URL of a reference Web page that unambiguously indicates the item's identity. E.g. the URL of the item's Wikipedia page, Wikidata entry, or official website. */
  sameAs?: string;
  /** A CreativeWork or Event about this Thing. */
  subjectOf?: string;
  /** URL of the item. */
  url?: string;
}

export interface ImageObject extends Omit<Thing, "@type"> {
  "@type": "ImageObject";
}

/**
 * A creative work, such as an article, book, or painting.
 * For more information, see: https://schema.org/CreativeWork
 */
export interface CreativeWork extends Omit<Thing, "@type"> {
  "@type": "CreativeWork";
  /** The author of this content or rating. Please note that author is special in that HTML 5 provides a special mechanism for indicating authorship via the rel tag. That is equivalent to this and may be used interchangeably. */
  author?: (Person | Organization)[];
  /** Date of first broadcast/publication. */
  keywords?: string;
  /** A thumbnail image relevant to the Thing. */
  thumbnailUrl?: string;
  /** Thumbnail image for an image or video. */
  thumbnail?: ImageObject;
  /** Date of first broadcast/publication. */
  datePublished?: string;
  /** The date on which the CreativeWork was most recently modified or when the item's entry was modified within a DataFeed. */
  dateModified?: string;
  /** Headline of the article. */
  headline?: string;
}

export interface Person extends Omit<Thing, "@type"> {
  "@type": "Person";
  /** Email address. */
  email?: string;
  // Add more properties from the schema.org specification as needed
}

/**
 * An organization such as a school, NGO, corporation, club, etc.
 * For more information, see: https://schema.org/Organization
 */
export interface Organization extends Omit<Thing, "@type"> {
  "@type": "Organization";
  /** Email address. */
  email?: string;
  // Add more properties from the schema.org specification as needed
}

/**
 * A blog is a frequently updated online platform, where an individual or a group of individuals share their opinions, thoughts, or knowledge on various topics.
 * For more information, see: https://schema.org/Blog
 */
export interface Blog extends Omit<CreativeWork, "@type"> {
  "@type": "Blog";
  /** The posts in this blog. */
  blogPosts?: BlogPosting[];
  /** The International Standard Serial Number (ISSN) that identifies this serial publication. You can repeat this property to identify different formats of, or the linking ISSN (ISSN-L) for, this serial publication. */
  issn?: string;
  // Add more properties from the schema.org specification as needed
}

/**
 * An article, such as a news article or piece of investigative report. Newspapers and magazines have articles of many different types and this is intended to cover them all.
 * For more information, see: https://schema.org/Article
 */
export interface Article extends Omit<CreativeWork, "@type"> {
  "@type": "Article";
  /** The actual body of the article. */
  articleBody?: string;
  /** The article's section or heading. */
  articleSection?: string;
  /** The page on which the article ends. */
  pageEnd?: string;
  /** The page on which the article starts. */
  pageStart?: string;
  /** Any description of pages that is not separated into pageStart and pageEnd; for example, "1-6, 9, 55". */
  pagination?: string;
  /** The number of words in the text of the Article. */
  wordCount?: number;
  // Add more properties from the schema.org specification as needed
}

/**
 * A blog post. A specific entry or article posted in a blog.
 * For more information, see: https://schema.org/BlogPosting
 */
export interface BlogPosting extends Omit<Article, "@type"> {
  "@type": "BlogPosting";
}

export type BlogPost = {
  /**
   * The embedded representation of relations. Only present when the '_embed' query parameter is set.
   */
  _embedded?: {
    /**
     * The  featured media for the post.
     */
    "wp:featuredmedia"?: {
      id: number;
      source_url?: string;
      alt_text?: string;
    }[];
    /**
     * The author of the post.
     */
    author?: {
      id?: number;
      name?: string;
      avatar_urls?: {
        [key: string]: string;
      };
    }[];
  };
} & WP.WP_REST_API_Post;
