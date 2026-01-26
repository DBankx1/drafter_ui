import { Mail } from "lucide-react";

function Footer() {
  return (
    <footer className="relative z-10 mx-auto mt-12 mb-6 flex flex-col items-center gap-4 text-center text-xs">
      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
        <a
          className="hover:text-primary/60 font-medium transition-colors"
          href="/help"
        >
          Help Center
        </a>
        <a
          className="hover:text-primary/60 hidden transition-colors sm:inline"
          href="/help/buyers"
        >
          Buyer's Guide
        </a>
        <a
          className="hover:text-primary/60 hidden transition-colors sm:inline"
          href="/help/influencers"
        >
          Influencer's Guide
        </a>
        <a
          href="mailto:support@yarninfluencer.com"
          className="hover:text-primary/60 flex items-center gap-1.5 transition-colors"
        >
          <Mail className="h-5 w-5" />
          Contact Support
        </a>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
        <a
          className="hover:text-primary/60 transition-colors"
          href="/legal/privacy"
        >
          Privacy Policy
        </a>
        <a className="hover:text-/60 transition-colors" href="/legal/terms">
          Terms of Service
        </a>
        <a
          className="hover:text-primary/60 transition-colors"
          href="/legal/acceptable-use"
        >
          Acceptable Use
        </a>
      </div>
      <p>© {new Date().getFullYear()} Drafter. Developed by PaxelTech.</p>
    </footer>
  );
}

export default Footer;
