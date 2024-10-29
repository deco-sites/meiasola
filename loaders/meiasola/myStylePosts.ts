import { fetchSafe } from "apps/utils/fetch.ts";

import * as cheerio from "https://esm.sh/cheerio@1.0.0-rc.12";
import {
  BlogPost,
  BlogPosting,
  ImageObject,
} from "site/types/blog.ts";
import { toBlogPost } from "site/utils/blog.ts";

/**
 * @title Meia Sola - Blog Posts from API
 * @description Use this function to list blog posts from blog.meiasola.com.br
 */
const blogPostListLoader = async (
  _props: unknown,
  _req: Request
): Promise<BlogPosting[] | null> => {
  
  const timeout = new Promise<undefined>((resolve) => {
    setTimeout(() => {
      resolve(undefined);
    }, 10_000);
  });

  const response = await Promise.race([
    fetchSafe(
      "https://blog.meiasola.com/mstyle/wp-json/wp/v2/posts?per_page=4",
    ),
    timeout,
  ]);

  if (!response) {
    return [];
  }

  const list = await response.text();

  const json = list.indexOf("</script>") === -1
    ? JSON.parse(String(list))
    : JSON.parse(String(list.slice(list.indexOf("</script>") + "</script>".length)));

  const posts: BlogPosting[] = json.map((post: BlogPost) => {
    return toBlogPost(post);
  });

  posts.forEach((post) => {
    if (!post.image) {
      const $ = cheerio.load(post.articleBody ?? "");
      const firstImage = $("img").first();
      if (firstImage.length > 0) {
        post.image = { url: firstImage.attr("src") } as ImageObject;
      }
    }

    const $ = cheerio.load(post.description ?? "");
    post.description = $.text();
  });

  return posts;
};

export default blogPostListLoader;
