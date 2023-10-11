import { slugDateFormat } from "@/lib/functions";
import { TPost, TPostContent } from "@/lib/types";
import { API_URI, BLOG_ID } from "@/lib/variables";

// https://nextjs.org/docs/app/api-reference/functions/generate-static-params
export async function generateStaticParams() {
  const postNumber = 10;
  const endpoint = `${API_URI}/sites/${BLOG_ID}/posts/?number=${postNumber}&order=DESC`;
  const res = await fetch(endpoint).then((res) => res.json());
  const posts: TPost[] = await res.posts;

  return posts.map((post) => ({
    postId: `${slugDateFormat(post.date)}/${post.slug}`.split("/"),
  }));
}

type Props = {
  params: { postId: string };
};

async function getPost<T>(slug: string) {
  const endpoint = `${API_URI}/sites/${BLOG_ID}/posts/slug:${slug}`;
  const res = await fetch(endpoint, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) throw Error("failed to fetch");
  const data = await res.json();

  return data;
}

export default async function post({ params }: Props) {
  const postId = params.postId;
  const postSlug = postId[3];
  const post: TPostContent = await getPost(postSlug);
  return (
    <div>
      <h1>{post.title}</h1>
      <div>{post.content}</div>
    </div>
  );
}
