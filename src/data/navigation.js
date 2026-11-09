// Main navigation (navbar + footer). Internal paths must exist in
// src/config/routes.js; `external: true` links are served by something else
// (the blog is a static Ghost export published to s3://itenorio.com/blog/ by
// the src-frontend-itenorio-blog repo), so they use a plain <a>.
export const NAV_LINKS = [
  { to: "/", label: "Home", icon: "fas fa-house", end: true },
  { to: "/extensions", label: "Extensions", icon: "fas fa-puzzle-piece" },
  { to: "/websites", label: "Websites", icon: "fas fa-globe" },
  { to: "/shortener", label: "Shortener", icon: "fas fa-link" },
  { to: "/career", label: "Career", icon: "fas fa-briefcase" },
];

// The blog is a different site (Ghost), so the navbar shows it apart, after
// Contact; the footer lists it with the other links.
export const BLOG_LINK = { to: "/blog/", label: "Blog", icon: "fas fa-pen-nib" };

// Legal pages, listed in the footer.
export const LEGAL_LINKS = [
  { to: "/legal/terms", label: "Terms of Service" },
  { to: "/legal/privacy", label: "Privacy Policy" },
  { to: "/legal/refund-policy", label: "Refund Policy" },
];
