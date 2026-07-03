import { CallbackModalProvider } from "@/components/vathala/callback-modal-context";
import { FloatingBottomCtas } from "@/components/vathala/floating-bottom-ctas";
import { MainNavigation } from "@/components/vathala/main-navigation";
import { SiteFooter } from "@/components/vathala/site-footer";

type BlogPageShellProps = {
  children: React.ReactNode;
};

export const BlogPageShell = ({ children }: BlogPageShellProps) => (
  <CallbackModalProvider>
    <MainNavigation lightHeader />
    <main className="pb-[calc(9rem+env(safe-area-inset-bottom))] sm:pb-36">
      {children}
    </main>
    <FloatingBottomCtas />
    <SiteFooter />
  </CallbackModalProvider>
);
