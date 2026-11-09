// Main navigation (navbar + footer). Internal paths must exist in
// src/config/routes.js; `external: true` links are served by something else
// (the blog is a static Ghost export published to s3://itenorio.com/blog/ by
// the src-frontend-itenorio-blog repo), so they use a plain <a>.
export const NAV_LINKS = [
  { to: "/extensions", label: "Extensions", icon: "fas fa-puzzle-piece" },
  { to: "/websites", label: "Websites", icon: "fas fa-globe" },
  { to: "/shortener", label: "Shortener", icon: "fas fa-link" },
  { to: "/career", label: "Career", icon: "fas fa-briefcase" },
  { to: "/blog/", label: "Blog", icon: "fas fa-pen-nib", external: true },
];
