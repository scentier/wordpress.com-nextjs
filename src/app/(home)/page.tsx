import { formatDateToString, slugDateFormat } from "@/lib/functions";
import { API_URI, BLOG_ID } from "@/lib/variables";
import Link from "next/link";

async function getPosts<T>() {
  const postNumber = 10;
  const res = await fetch(
    `${API_URI}/sites/${BLOG_ID}/posts/?number=${postNumber}&order=DESC`
  );

  if (!res.ok) throw Error("failed to fetch");
  const data = await res.json();

  return data;
}

type TAuthor = {
  name: string;
};

type TComment = {
  comment_count: number;
};

type TPost = {
  ID: number;
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  featured_image?: string;
  author: TAuthor;
  discussion: TComment;
};

export default async function Home() {
  const data = await getPosts();
  const posts: TPost[] = await data.posts;
  return (
    <>
      {posts.map((post, index) => (
        <div key={post.ID}>
          <p>index: {index}</p>
          {post.featured_image && (
            <div>{`${post.featured_image}?resize=350,350`}</div>
          )}
          <h2 className="text-4xl font-normal mx-3 my-5 text-sky-600 hover:text-sky-500">
            <Link href={`${slugDateFormat(post.date)}/${post.slug}`}>
              {post.title}
            </Link>
          </h2>
          <div dangerouslySetInnerHTML={{ __html: post.excerpt }} />
          <div>
            <p>{post.author.name}</p>
            <p>
              <span>{formatDateToString(post.date)}</span>/
              {post.discussion.comment_count}
            </p>
          </div>
        </div>
      ))}
    </>
  );
}
