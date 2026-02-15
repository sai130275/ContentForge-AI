import { memo } from "react";
import { APP_NAME } from "@/lib/constants";

const Footer = memo(() => {
  const currentYear = new Date().getFullYear();

  return (
    <footer 
      className="border-t py-12 px-6"
      role="contentinfo"
    >
      <div className="container mx-auto max-w-5xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div 
            className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center"
            aria-hidden="true"
          >
            <span className="text-primary-foreground font-bold text-sm">CF</span>
          </div>
          <span className="font-semibold">{APP_NAME}</span>
        </div>
        <p className="text-sm text-muted-foreground">
          © {currentYear} {APP_NAME}. Transform your content creation workflow.
        </p>
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";

export default Footer;
