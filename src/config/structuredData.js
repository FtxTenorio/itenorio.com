// schema.org data (JSON-LD) for each route, written into the pre-rendered
// HTML by scripts/prerender.mjs. Plain JS: it runs in Node at build time.
// Check the output with https://search.google.com/test/rich-results.
import { COMPANY, CONTACT_EMAILS } from "../data/company.js";
import { extensions } from "../data/extensions.js";
import { careerTrajectory } from "../data/careerTrajectory.js";
import { educationList } from "../data/educationList.js";
import { SITE_NAME, SITE_URL } from "./routes.js";

export const pageUrl = (path) => `${SITE_URL}${path === "/" ? "/" : `${path}/`}`;

const ORG_ID = `${SITE_URL}/#organization`;
const PERSON_ID = `${SITE_URL}/career/#person`;
const WEBSITE_ID = `${SITE_URL}/#website`;

export const SOCIAL_PROFILES = [
  "https://github.com/FtxTenorio",
  "https://www.linkedin.com/in/ftxtenorio/",
  "https://www.instagram.com/ftxtenorio/",
];

const organization = {
  "@type": "Organization",
  "@id": ORG_ID,
  name: SITE_NAME,
  legalName: COMPANY.legalName,
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/logo.png`,
  description:
    "Software development studio from São Paulo, Brazil, building browser extensions, websites and backend systems.",
  taxID: COMPANY.cnpj,
  email: CONTACT_EMAILS[0].email,
  founder: { "@id": PERSON_ID },
  address: {
    "@type": "PostalAddress",
    streetAddress: COMPANY.address.street,
    addressLocality: "São Paulo",
    addressRegion: "SP",
    postalCode: COMPANY.address.postalCode,
    addressCountry: "BR",
  },
  contactPoint: CONTACT_EMAILS.slice(0, 2).map((item) => ({
    "@type": "ContactPoint",
    contactType: item.label,
    email: item.email,
    availableLanguage: ["English", "Portuguese"],
  })),
};

const website = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  name: SITE_NAME,
  url: `${SITE_URL}/`,
  publisher: { "@id": ORG_ID },
  inLanguage: "en",
};

const current = careerTrajectory.find((job) => job.isCurrent) ?? careerTrajectory[0];

const person = {
  "@type": "Person",
  "@id": PERSON_ID,
  name: "Paulo Tenório",
  jobTitle: current.role,
  url: `${SITE_URL}/career/`,
  image: `${SITE_URL}/images/paulo-tenorio.webp`,
  worksFor: { "@id": ORG_ID },
  sameAs: SOCIAL_PROFILES,
  alumniOf: [...new Set(educationList.map((edu) => edu.institution))].map((name) => ({
    "@type": "CollegeOrUniversity",
    name,
  })),
  hasCredential: educationList.map((edu) => ({
    "@type": "EducationalOccupationalCredential",
    name: edu.degree,
    credentialCategory: "degree",
  })),
};

const breadcrumbs = (trail) => ({
  "@type": "BreadcrumbList",
  itemListElement: trail.map(([name, path], index) => ({
    "@type": "ListItem",
    position: index + 1,
    name,
    item: pageUrl(path),
  })),
});

const softwareApplication = (ext) => ({
  "@type": "SoftwareApplication",
  name: ext.name,
  description: ext.description,
  applicationCategory: "BrowserApplication",
  applicationSubCategory: "Browser extension",
  operatingSystem: "Chrome",
  softwareVersion: ext.version,
  url: pageUrl(`/extensions/${ext.slug}`),
  downloadUrl: ext.storeUrl,
  image: `${SITE_URL}${ext.screenshots?.[0]?.src ?? ""}`,
  screenshot: (ext.screenshots ?? []).map((shot) => `${SITE_URL}${shot.src}`),
  featureList: ext.features.map((feature) => feature.title),
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  author: { "@id": ORG_ID },
  publisher: { "@id": ORG_ID },
  // No aggregateRating on purpose: Google requires it to reflect reviews
  // shown on this page, and they live on the Chrome Web Store.
});

const product = extensions.find((ext) => ext.slug === "crunchy-navigator");

/** Returns the JSON-LD graph for a route path (or null). */
export function structuredDataFor(path) {
  const graph = [organization, website];

  switch (path) {
    case "/":
      graph.push(person);
      break;
    case "/career":
      graph.push(person, breadcrumbs([["Home", "/"], ["Career", "/career"]]));
      break;
    case "/extensions":
      graph.push(breadcrumbs([["Home", "/"], ["Extensions", "/extensions"]]));
      break;
    case "/extensions/crunchy-navigator":
      graph.push(
        softwareApplication(product),
        breadcrumbs([
          ["Home", "/"],
          ["Extensions", "/extensions"],
          [product.name, "/extensions/crunchy-navigator"],
        ]),
      );
      break;
    default: {
      // Other pages: breadcrumbs from the path segments.
      if (path) {
        const trail = [["Home", "/"]];
        const parts = path.split("/").filter(Boolean);
        parts.forEach((part, index) => {
          const name = part.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
          trail.push([name, `/${parts.slice(0, index + 1).join("/")}`]);
        });
        graph.push(breadcrumbs(trail));
      }
    }
  }

  return { "@context": "https://schema.org", "@graph": graph };
}
