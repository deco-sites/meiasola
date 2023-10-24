import { fetchSafe } from "apps/utils/fetch.ts";

import * as cheerio from "https://esm.sh/cheerio@1.0.0-rc.12";

import { BlogPosting } from "https://raw.githubusercontent.com/deco-sites/blog/main/blog/types.ts";
import { BlogPost } from "https://raw.githubusercontent.com/deco-sites/blog/main/packs/wordpress/types.ts";
import { toBlogPost } from "https://raw.githubusercontent.com/deco-sites/blog/main/packs/wordpress/utils/transform.ts";

/**
 * @title Meia Sola - Blog Posts from API
 * @description Use this function to list blog posts from blog.meiasola.com.br
 */
const blogPostListLoader = async (
  _props: unknown,
  _req: Request
): Promise<BlogPosting[] | null> => {
  const response = await fetchSafe(
    "https://blog.meiasola.com/mstyle/wp-json/wp/v2/posts?per_page=4"
  );
  const list = await response.json();

  const posts = list.map((post: BlogPost) => {
    return toBlogPost(post);
  });

  posts.forEach((post) => {
    if (!post.image) {
      const $ = cheerio.load(post.articleBody);
      const firstImage = $("img").first();
      if (firstImage.length > 0) {
        post.image = firstImage.attr("src");
      }
    }
  });

  return posts;
};

export default blogPostListLoader;
