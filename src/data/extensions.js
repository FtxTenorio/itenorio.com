export const extensions = [
  {
    id: "crunchy",
    // URL: /extensions/crunchy-navigator (the slug predates the rename and is
    // part of the privacy policy URL used by the Chrome Web Store listing).
    slug: "crunchy-navigator",
    name: "Crunchyroll Navigator",
    tagline: "A better Simulcasts page for Crunchyroll.",
    shortDesc: "Audio & dub filters, episode list and dub badges.",
    description:
      "A free Chrome extension for Crunchyroll that adds dub, rating, genre and length filters, instant search, dub badges and a full episode list to the Simulcasts page — so you can find what to watch in seconds.",
    platform: "Chrome",
    price: "Free",
    supportNote:
      "Crunchyroll Navigator is free and maintained with voluntary support from its users.",
    disclaimer:
      "Crunchyroll Navigator is an independent project by iTenorio Tech. It is not affiliated with, endorsed or sponsored by Crunchyroll. Crunchyroll is a trademark of its respective owner.",
    logo: "https://dy9pxtyo5i8g0.cloudfront.net/itenorio/images/assets/crunchy-navigator-ext.png",
    isImage: true,
    color: "#ff6b00",
    // rating / ratingCount / users / size / updated are copied by hand from
    // the Chrome Web Store listing — update them when the listing changes.
    // `users` is the real count; pages show it rounded down (formatUsers).
    rating: 5.0,
    ratingCount: 1,
    users: 35,
    status: "Published",
    storeUrl: "https://link.itenorio.com/CRUNCHY_NAVIGATOR",
    privacyUrl: "/extensions/crunchy-navigator/privacy-policy/",
    websiteUrl: "https://itenorio.com/extensions/crunchy-navigator",
    category: "Entertainment",
    version: "2.3.0",
    updated: "Nov 4, 2026",
    size: "420 KiB",
    language: "21 languages",
    overview:
      "Crunchyroll Navigator replaces the Crunchyroll Simulcasts grid with the filters the site doesn't have. Filter the season by dub language, rating, age rating, length, genres and content warnings, search titles as you type, and open any show to see its full episode list with the audio languages of each episode — without leaving the page. The interface speaks 21 languages, it runs entirely in your browser, needs no account of ours and collects no personal data.",
    // Real store screenshots (rendered from the extension repo's
    // tools/promo-tiles, English). Files live in public/images/crunchyroll-navigator/.
    screenshots: [
      {
        src: "/images/crunchyroll-navigator/dub-filter.webp",
        label: "Dub filter",
        alt: "Crunchyroll Navigator filter bar with English selected: only the dubbed shows of the season stay highlighted, each with a DUB badge.",
      },
      {
        src: "/images/crunchyroll-navigator/episode-list.webp",
        label: "Episode list",
        alt: "Episode list of Frieren: Beyond Journey's End season 2 opened from the Simulcasts page, showing each episode with its audio language.",
      },
      {
        src: "/images/crunchyroll-navigator/filters.webp",
        label: "More filters",
        alt: "Rating, length and age rating filters, plus genres and content warnings that can be included or excluded.",
      },
      {
        src: "/images/crunchyroll-navigator/search.webp",
        label: "Search",
        alt: "Typing 'frie' in the search bar highlights Frieren and fades out the other shows of the season.",
      },
    ],
    features: [
      {
        title: "Dub filter",
        description:
          "Filter the simulcast season by audio language — English, Japanese, Spanish, Portuguese, German and more — with \"only\", \"at least\" or \"up to\" the languages you pick.",
      },
      {
        title: "Episode list in one click",
        description:
          "Open any show and see its full episode list, with descriptions and the audio languages of each episode.",
      },
      {
        title: "Dub badges",
        description:
          "Pick your preferred audio language and every show dubbed in it gets a badge.",
      },
      {
        title: "Rating, age, length and genre filters",
        description:
          "Combine rating, age rating and length (short, medium, long) with genres and content warnings you can include or exclude.",
      },
      {
        title: "Instant search",
        description: "Type a few letters and the season is filtered as you type.",
      },
      {
        title: "21 languages",
        description:
          "The interface follows your browser language; episode titles and descriptions come from Crunchyroll in the same language when available.",
      },
    ],
    roadmap: [
      {
        title: "External Score Integration",
        description: "Overlay live ratings from MyAnimeList (MAL) and AniList.",
      },
      {
        title: "Enhanced Home Screen",
        description:
          "Advanced filters and cleaner layouts for home screen recommendations.",
      },
      {
        title: "Smart Recommendation Engine",
        description:
          "Intelligent, personalized suggestions based on your taste.",
      },
      {
        title: "Release Schedule & Calendar",
        description:
          "Track weekly episode release days, countdowns, and key metadata at a glance.",
      },
    ],
    privacyDescription:
      "We respect your privacy. Crunchyroll Navigator operates locally on your device and does not collect or transmit personal data.",
    developerType:
      "Non-trader. Consumer rights do not apply to contracts between you and this developer in the EU.",
    supportEmail: "extensions@itenorio.com",
  },
  {
    id: "coming-soon",
    name: "More in the works",
    shortDesc: "New ideas coming soon.",
    description:
      "I have several ideas for new browser extensions. I will be adding them here as soon as they are ready to be published. Stay tuned!",
    logo: "fa-solid fa-lightbulb",
    isImage: false,
    color: "#8b5cf6",
    rating: 0,
    ratingCount: 0,
    users: 0,
    status: "In Development",
    category: "Productivity",
    version: "In development",
    updated: "Not published yet",
    size: "Not available",
    language: "English",
    overview:
      "Several browser extension ideas are in development. Details will be added here as each project gets closer to release.",
    features: [],
    roadmap: [
      {
        title: "New browser extensions",
        description:
          "More tools and ideas will be announced as they become ready.",
      },
    ],
    privacyDescription:
      "Privacy information will be published when this extension is ready for release.",
    developerType:
      "Developer information will be available when this extension is published.",
    supportEmail: "extensions@itenorio.com",
  },
];

/**
 * User count rounded down, so the site never shows more than the store:
 * 7 → "7", 35 → "30+", 180 → "100+", 2400 → "2,000+".
 */
export function formatUsers(count) {
  if (count < 10) return String(count);
  const step = 10 ** Math.floor(Math.log10(count));
  return `${(Math.floor(count / step) * step).toLocaleString("en-US")}+`;
}
