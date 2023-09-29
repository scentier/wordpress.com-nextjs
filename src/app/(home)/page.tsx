import {
  excerptText,
  formatDateToString,
  slugDateFormat,
} from "@/lib/functions";
import { TPost } from "@/lib/types";
import { API_URI, BLOG_ID, SITE_TITLE, SITE_URL } from "@/lib/variables";
import Link from "next/link";
import { AiOutlineClockCircle } from "react-icons/ai";
import { FaCommentAlt } from "react-icons/fa";
import { Source_Serif_4 } from "next/font/google";

const source_serif_4 = Source_Serif_4({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

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
      <header className="absolute top-14 md:top-12 mx-auto mb-8 z-[2]">
        <div className="flex flex-row m-0 w-full h-14 mx-8 xl:my-9">
          <div className="flex justify-center items-center w-12 h-12 bg-sky-700">
            <div className="w-8 h-8 bg-[url('/assets/wpcom-wmark.svg')] bg-cover bg-center bg-no-repeat text-white block"></div>
          </div>
          <h1 className="text-white flex items-center">
            <Link
              className="pl-5 pr-4 pt-2 pb-3 mb-2 font-light text-xl bg-sky-900 hover:bg-sky-700 text-white"
              href={SITE_URL}
            >
              {SITE_TITLE}
            </Link>
          </h1>
        </div>
      </header>
      <div
        style={{
          backgroundImage: posts[0].featured_image
            ? `url(${posts[0].featured_image}?w=2000)`
            : `url(./assets/featured-image-placeholder.svg)`,
        }}
        className="min-h-[148px] sm:min-h-[366px] bg-cover bg-center bg-no-repeat"
      ></div>
      <main className="max-w-[700px] lg:max-w-[960px] mx-auto pt-9 px-7">
        {posts.map((post, index) => (
          <div
            key={post.ID}
            className="mx-3 my-5 pt-2 pb-6 justify-between border-b-[1px] border-slate-200"
          >
            {index === 0 ? (
              <>
                <h2 className="pb-5 my-4 text-3xl text-sky-600 hover:text-sky-500">
                  <Link href={`${slugDateFormat(post.date)}/${post.slug}`}>
                    {post.title}
                  </Link>
                </h2>
                <p
                  className="text-sm leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: excerptText(post.excerpt, 100),
                  }}
                />
              </>
            ) : (
              <div className="flex flex-row">
                <Link
                  className="abosolute w-1/3 bottom-7 top-0 bg-sky-50 bg-cover bg-center bg-no-repeat border-solid border-[1px] border-sky-100"
                  style={{
                    backgroundImage: post.featured_image
                      ? `url(${post.featured_image}?resize=350,350)`
                      : `url(./assets/featured-image-placeholder.svg)`,
                  }}
                  href={`${slugDateFormat(post.date)}/${post.slug}`}
                >
                  <div></div>
                </Link>
                <div className="w-2/3 flex flex-col justify-between space-y-3 ml-4">
                  <h2
                    style={source_serif_4.style}
                    className="text-4xl font-normal text-slate-900 hover:text-slate-600"
                  >
                    <Link href={`${slugDateFormat(post.date)}/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h2>
                  <p
                    className="text-sm leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html: excerptText(post.excerpt),
                    }}
                  />
                  <div className="flex flex-row justify-between text-slate-400 text-sm">
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
                </div>
              </div>
            )}
          </div>
        ))}
      </main>
    </>
  );
}
