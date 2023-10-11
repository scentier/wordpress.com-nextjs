import { TPostContent } from "@/lib/types";
import { API_URI, BLOG_ID } from "@/lib/variables";

type Props = {
  params: { postId: string };
};

async function getPost<T>(slug: string) {
  const endpoint = `${API_URI}/sites/${BLOG_ID}/posts/slug:${slug}`;
  console.log(endpoint);
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
