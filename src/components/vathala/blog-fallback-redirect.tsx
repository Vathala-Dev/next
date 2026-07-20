/**
 * Production (vathala.com) is served by Apache, which returns index.html — the
 * home page — with HTTP 200 for any path that has no matching static file.
 * That includes blog posts published from the admin portal AFTER the last
 * static build (e.g. /blog/<new-slug>/). Because Apache serves the home page
 * instead of a real 404, GitHub Pages' 404.html is never hit and the
 * not-found.tsx redirect never runs, so the visitor is stranded on the home
 * page when they click a freshly published post.
 *
 * This inline script ships ONLY inside the home page's exported HTML. It runs
 * during HTML parsing — before React hydration and before the hero paints — so
 * the moment Apache serves the home page at a /blog/<slug>/ URL it forwards to
 * /blog/?slug=<slug>, where the blog index page fetches the post from the live
 * API and renders it client-side.
 *
 * It is a no-op on the real home page ("/") and on any non-blog path, and it is
 * absent from real static blog pages (which Apache serves directly), so already
 * built posts keep their clean SEO URLs untouched.
 */
export const BlogFallbackRedirect = () => (
  <script
    dangerouslySetInnerHTML={{
      __html:
        "(function(){try{var p=location.pathname.replace(/\\/+$/,'');var m=p.match(/^\\/blog\\/(.+)$/);if(m){location.replace('/blog/?slug='+encodeURIComponent(m[1])+location.hash);}}catch(e){}})();",
    }}
  />
);
