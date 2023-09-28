import { formatDateToString, slugDateFormat } from "@/lib/functions";
import { TPost } from "@/lib/types";
import { API_URI, BLOG_ID } from "@/lib/variables";
import Link from "next/link";
import { AiOutlineClockCircle } from "react-icons/ai";
import { FaCommentAlt } from "react-icons/fa";

async function getPosts<T>() {
  const postNumber = 10;
  const res = await fetch(
    `${API_URI}/sites/${BLOG_ID}/posts/?number=${postNumber}&order=DESC`
  );

  if (!res.ok) throw Error("failed to fetch");
  const data = await res.json();

  return data;
}

export default async function Home() {
  const data = await getPosts();
  const posts: TPost[] = await data.posts;
  return (
    <>
      {posts.map((post, index) => (
        <div key={post.ID} className="mx-3 my-5">
          {index === 0 ? (
            <>
              <img
                className="w-full mb-3"
                src={`${post.featured_image}?resize=900,450`}
              />
              <h2 className="pb-5 my-4 border-b-[1px] border-slate-200 text-3xl text-sky-600 hover:text-sky-500">
                <Link href={`${slugDateFormat(post.date)}/${post.slug}`}>
                  {post.title}
                </Link>
              </h2>
            </>
          ) : (
            <>
              <p>index: {index}</p>
              {post.featured_image && (
                <div>{`${post.featured_image}?resize=350,350`}</div>
              )}
              <h2 className="my-5 text-4xl font-normal text-slate-900 hover:text-slate-600">
                <Link href={`${slugDateFormat(post.date)}/${post.slug}`}>
                  {post.title}
                </Link>
              </h2>
              <div dangerouslySetInnerHTML={{ __html: post.excerpt }} />
              <div className="flex flex-row justify-between my-2 text-slate-400 text-sm">
                <p className="flex flex-row items-center">
                  <img
                    className="mr-3 relative rounded-full h-8 w-8 overflow-hidden"
                    src={post.author.avatar_URL}
                  />
                  {post.author.name}
                </p>
                <p className="flex flex-row items-center">
                  <span className="mr-1 flex items-center">
                    <AiOutlineClockCircle size={14} className="mr-1" />
                    {formatDateToString(post.date)}
                  </span>
                  {" / "}
                  <span className="ml-1 flex items-center">
                    <FaCommentAlt size={11} className="mr-1" />
                    {post.discussion.comment_count}
                  </span>
                </p>
              </div>
            </>
          )}
        </div>
      ))}
    </>
  );
}
