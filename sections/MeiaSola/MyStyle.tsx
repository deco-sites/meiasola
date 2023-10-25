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

        <ul class="flex gap-5 carousel carousel-start scrollbar-none -mx-[24px] mobile:-mx-[50px] laptop:-mx-[70px]">
          {posts.map((post, index) => {
            const isFirst = index === 0;
            const isLast = index === posts.length - 1;
            return (
              <li
                key={"post-" + index}
                class={`carousel-item box-border ${
                  isFirst ? "pl-[24px] mobile:pl-[50px] laptop:pl-[70px]" : ""
                } ${
                  isLast ? "pr-[24px] mobile:pr-[50px] laptop:pr-[70px]" : ""
                }`}
              >
                <a
                  href={post.url}
                  target="_blank"
                  aria-label={`Abrir post: ${post.headline}`}
                  class="w-[310px] desktop:w-[calc((100vw-70px-70px)/4-20px)] monitor:w-[310px] flex flex-col gap-3"
                >
                  <div class="w-full h-[328px] bg-grey-1">
                    {post.image && (
                      <Image
                        alt="Imagem do post"
                        width={310}
                        height={328}
                        loading="lazy"
                        fetchPriority="auto"
                        src={post.image}
                        class="object-cover h-full w-full"
                      />
                    )}
                  </div>

                  <div class="flex flex-col justify-between items-start gap-3 flex-1">
                    <h5 class="font-bold text-body">{post.headline}</h5>
                    <div class="flex flex-col gap-3">
                      <div class="text-small line-clamp-3 w-full overflow-clip post-content">
                        {post.description}
                      </div>
                      <span class="underline font-bold text-small">
                        LEIA MAIS
                      </span>
                    </div>
                  </div>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default MyStyle;
