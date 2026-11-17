import { useEffect, useState } from "react";
import { Section } from "../../../components/ui/Section";
import { SwipeRow } from "../../../components/ui/SwipeRow";
import { HOME_BG } from "../../../config/theme";
import { BLOG_RSS_URL, BLOG_URL, fetchLatestPosts } from "../../../data/blog";

const POSTS = 3;

const formatDate = (date) =>
  date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

// The blog is another site (Ghost), so every link is a plain <a>.
const PostCard = ({ post }) => (
  <a
    href={post.url}
    className="group flex flex-col overflow-hidden rounded-xl border border-line bg-surface/60 hover:border-brand/50 transition-colors"
  >
    <div className="aspect-[16/9] lg:[@media(max-height:900px)]:aspect-[2/1] overflow-hidden bg-white/5">
      {post.image ? (
        <img
          src={post.image}
          alt=""
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-gray-600">
          <i className="fas fa-pen-nib text-2xl" aria-hidden="true" />
        </div>
      )}
    </div>
    <div className="flex flex-col flex-grow p-4 sm:p-5">
      <p className="flex items-center gap-2 text-xs text-gray-500 mb-3">
        {post.tag && (
          <span className="px-2 py-0.5 rounded-full bg-brand/10 border border-brand/25 text-brand-soft">
            {post.tag}
          </span>
        )}
        <time dateTime={post.date.toISOString()}>{formatDate(post.date)}</time>
      </p>
      <h3 className="text-lg font-semibold text-white leading-snug mb-2 group-hover:text-brand-soft transition-colors">
        {post.title}
      </h3>
      <p className="text-sm text-gray-400 leading-relaxed line-clamp-2 sm:line-clamp-3 lg:[@media(max-height:900px)]:line-clamp-2">
        {post.excerpt}
      </p>
      <span className="mt-auto pt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-soft">
        Read post
        <i className="fas fa-arrow-right text-xs" aria-hidden="true" />
      </span>
    </div>
  </a>
);

const PostSkeleton = () => (
  <div className="flex flex-col overflow-hidden rounded-xl border border-line bg-surface/60 animate-pulse" aria-hidden="true">
    <div className="aspect-[16/9] lg:[@media(max-height:900px)]:aspect-[2/1] bg-white/5" />
    <div className="p-5 space-y-3">
      <div className="h-3 w-1/3 rounded bg-white/10" />
      <div className="h-5 w-4/5 rounded bg-white/10" />
      <div className="h-3 w-full rounded bg-white/5" />
      <div className="h-3 w-2/3 rounded bg-white/5" />
    </div>
  </div>
);

// Latest posts of the blog, fetched from its RSS feed in the browser (see
// data/blog.js). The pre-rendered HTML has the skeleton; if the feed can't be
// read, the cards are left out and only the link to the blog stays.
export const BlogSection = () => {
  const [state, setState] = useState({ status: "loading", posts: [] });

  useEffect(() => {
    const controller = new AbortController();
    fetchLatestPosts(POSTS, { signal: controller.signal })
      .then((posts) => setState({ status: posts.length ? "ready" : "empty", posts }))
      .catch((error) => {
        if (error.name !== "AbortError") setState({ status: "error", posts: [] });
      });
    return () => controller.abort();
  }, []);

  const { status, posts } = state;

  return (
    <Section
      id="blog"
      eyebrow="From the blog"
      title="The Itenorio Perspective."
      intro="Thoughts on technology, software engineering, and everything in between: notes from building the studio's products, opinions and the occasional trip."
      fullScreen
      background={HOME_BG.base}
      wave={HOME_BG.alt}
      bubbles={[
        { color: "#6366f1", className: "-top-16 right-[15%] w-[26rem] h-[26rem]" },
        { color: "#38bdf8", className: "bottom-[5%] -left-24 w-[22rem] h-[22rem]" },
      ]}
    >
      {(status === "loading" || status === "ready") && (
        <SwipeRow label="Latest blog posts" className="mb-5 sm:mb-8 lg:mb-6">
          {status === "loading"
            ? Array.from({ length: POSTS }, (_, index) => <PostSkeleton key={index} />)
            : posts.map((post) => <PostCard key={post.id} post={post} />)}
        </SwipeRow>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <a
          href={BLOG_URL}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-brand hover:bg-[#0a86ee] font-semibold transition-colors"
        >
          <i className="fas fa-pen-nib" aria-hidden="true" />
          {status === "ready" ? "See all posts" : "Read the blog"}
        </a>
        <a
          href={BLOG_RSS_URL}
          className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-gray-400 hover:text-white font-medium transition-colors"
        >
          <i className="fas fa-rss" aria-hidden="true" />
          RSS feed
        </a>
      </div>
    </Section>
  );
};
