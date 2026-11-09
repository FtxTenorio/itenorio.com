import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { SiteLayout } from "./layouts/SiteLayout";
import CareerPage from "./pages/career/CareerPage";
import NotFoundPage from "./pages/NotFoundPage";

// Heavier, less visited pages are split into their own chunks
// (the <Suspense> fallback lives in SiteLayout, so the navbar stays visible).
const ExtensionsPage = lazy(() => import("./pages/extensions/ExtensionsPage"));
const CrunchyrollNavigatorPrivacyPage = lazy(
  () => import("./pages/extensions/CrunchyrollNavigatorPrivacyPage"),
);
const WebsitesPage = lazy(() => import("./pages/websites/WebsitesPage"));
const ShortenerPage = lazy(() => import("./pages/shortener/ShortenerPage"));

// Every path below must also be listed in src/config/routes.js so the build
// emits a matching dist/<path>/index.html for S3 + CloudFront.
export default function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route index element={<CareerPage />} />
        <Route path="career" element={<CareerPage />} />
        <Route path="extensions">
          <Route index element={<ExtensionsPage />} />
          <Route
            path="crunchy-navigator/privacy-policy"
            element={<CrunchyrollNavigatorPrivacyPage />}
          />
        </Route>
        <Route path="websites" element={<WebsitesPage />} />
        <Route path="shortener" element={<ShortenerPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
