import { BlogPosting } from "https://raw.githubusercontent.com/deco-sites/blog/main/blog/types.ts";
import Image from "apps/website/components/Image.tsx";

export interface Props {
  title: string;
  posts: BlogPosting[] | null;
}

function MyStyle({ title, posts }: Props) {
  if (!posts || posts.length === 0) return null;

  return (
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
                    src={post.thumbnailUrl}
                    class="object-cover h-full w-full"
                  />
                )}
              </div>
              <h5 class="font-bold text-body">{post.headline}</h5>
              <div
                class="truncate text-small line-clamp-3 w-full overflow-clip"
                dangerouslySetInnerHTML={{ __html: post.description ?? "" }}
              />
              <div class="flex items-end flex-1">
                <a class="underline font-bold text-small" href={post.url}>
                  LEIA MAIS
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MyStyle;
