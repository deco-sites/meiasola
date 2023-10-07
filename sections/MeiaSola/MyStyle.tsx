import { BlogPosting } from "https://raw.githubusercontent.com/deco-sites/blog/main/blog/types.ts";

import Image from "apps/website/components/Image.tsx";
import { Head } from "$fresh/runtime.ts";

export interface Props {
  title: string;
  posts: BlogPosting[] | null;
}

function MyStyle({ title, posts }: Props) {
  if (!posts || posts.length === 0) return null;

  return (
    <>
      <Head>
        <style type="text/css">
          {`        
            .post-content > p {
              white-space: break-spaces;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 3;
            }
            .post-content .link-more {
              display: none;
            }
        `}
        </style>
      </Head>
      <div class="w-full container py-6 flex flex-col gap-6 text-black">
        <h3 class="font-bold text-subtitle tracking-widest">{title}</h3>

        <div class="flex gap-5 overflow-x-scroll snap-x snap-mandatory scrollbar-none">
          {posts.map((post, index) => {
            return (
              <div
                key={"post-" + index}
                class="w-[310px] shrink-0 snap-start desktop:shrink flex flex-col gap-3 overflow-clip"
              >
                <div class="w-[310px] h-[328px] bg-grey-1">
                  {post.thumbnailUrl && (
                    <Image
                      alt="Imagem do post"
                      width={310}
                      height={328}
                      loading="lazy"
                      fetchPriority="auto"
                      src={post.thumbnailUrl}
                      class="object-cover h-full w-full"
                    />
                  )}
                </div>

                <div class="flex flex-col justify-end items-start gap-3 flex-1">
                  <h5 class="font-bold text-body">{post.headline}</h5>
                  <div
                    class="truncate text-small line-clamp-3 w-full overflow-clip post-content"
                    dangerouslySetInnerHTML={{ __html: post.description ?? "" }}
                  />
                  <a class="underline font-bold text-small" href={post.url}>
                    LEIA MAIS
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default MyStyle;
