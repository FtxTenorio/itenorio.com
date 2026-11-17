// Latest posts of the blog (The Itenorio Perspective), read from its RSS feed.
//
// The blog is a separate site: a static Ghost export published to
// s3://itenorio.com/blog/ by the src-frontend-itenorio-blog repo, on its own
// schedule. So the posts are fetched in the browser (same origin, no CORS)
// instead of at build time, and the home page always shows the newest ones.
// In `npm run dev`, vite.config.js proxies /blog to the live site.

export const BLOG_URL = "/blog/";
export const BLOG_RSS_URL = "/blog/rss/";

/** Smaller version of a post image (Ghost and Unsplash both resize on the URL). */
const resizeImage = (url, width = 600) => {
  if (!url) return null;
  if (url.includes("images.unsplash.com")) return url.replace(/([?&])w=\d+/, `$1w=${width}`);
  if (url.includes("/blog/content/images/") && !url.includes("/size/")) {
    return url.replace("/blog/content/images/", `/blog/content/images/size/w${width}/`);
  }
  return url;
};

/** Absolute itenorio.com URLs -> paths, so links stay on the current host (dev, preview). */
const toPath = (url) => url.replace(/^https?:\/\/(www\.)?itenorio\.com/, "");

const text = (item, tag) => item.getElementsByTagName(tag)[0]?.textContent?.trim() ?? "";

/**
 * Plain-text excerpt. Posts without a custom excerpt get the start of their
 * HTML as <description> ("<p>Morning to anyone&apos;s…"), cut mid-sentence:
 * drop the tags, decode the entities and end the cut text with "…".
 */
const toExcerpt = (html) => {
  const doc = new DOMParser().parseFromString(html, "text/html");
  doc.querySelectorAll("p, br, li, h1, h2, h3, h4, blockquote").forEach((el) => el.append(" "));
  const plain = (doc.body.textContent ?? "").replace(/\s+/g, " ").trim();
  if (!plain || plain === html.trim() || /[.!?…]["')\]]?$/.test(plain)) return plain;
  // Ghost may cut inside a word ("(it'"): drop the last, possibly partial, word.
  return `${plain.replace(/\s+\S*$/, "").replace(/[\s,;:–([-]+$/, "")}…`;
};

/** Parses the Ghost RSS feed into plain post objects. */
export const parseBlogFeed = (xml) => {
  const doc = new DOMParser().parseFromString(xml, "application/xml");
  if (doc.getElementsByTagName("parsererror").length) throw new Error("Invalid blog feed");

  return [...doc.getElementsByTagName("item")].map((item) => {
    const image = item.getElementsByTagName("media:content")[0]?.getAttribute("url");
    return {
      id: text(item, "guid") || text(item, "link"),
      title: text(item, "title"),
      excerpt: toExcerpt(text(item, "description")),
      url: toPath(text(item, "link")),
      tag: text(item, "category") || null,
      author: text(item, "dc:creator") || null,
      date: new Date(text(item, "pubDate")),
      image: resizeImage(image && toPath(image)),
    };
  });
};

/** The `limit` newest posts. Throws when the feed can't be read. */
export const fetchLatestPosts = async (limit = 3, { signal } = {}) => {
  const response = await fetch(BLOG_RSS_URL, { signal });
  if (!response.ok) throw new Error(`Blog feed: HTTP ${response.status}`);
  const posts = parseBlogFeed(await response.text());
  return posts.sort((a, b) => b.date - a.date).slice(0, limit);
};
