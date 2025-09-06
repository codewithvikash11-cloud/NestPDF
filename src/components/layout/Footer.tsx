import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Tools: [
      { name: "PDF to Word", href: "/pdf-to-word" },
      { name: "Word to PDF", href: "/word-to-pdf" },
      { name: "Merge PDF", href: "/merge-pdf" },
      { name: "Split PDF", href: "/split-pdf" },
      { name: "Compress PDF", href: "/compress-pdf" },
    ],
    More: [
      { name: "PDF to JPG", href: "/pdf-to-jpg" },
      { name: "JPG to PDF", href: "/jpg-to-pdf" },
      { name: "Unlock PDF", href: "/unlock-pdf" },
      { name: "Protect PDF", href: "/protect-pdf" },
      { name: "Rotate PDF", href: "/rotate-pdf" },
    ],
    Company: [
      { name: "About Us", href: "/about" },
      { name: "Contact", href: "/contact" },
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms & Conditions", href: "/terms" },
    ],
  };

  return (
    <footer className="bg-muted/50 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">PN</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                PDFNest
              </span>
            </Link>
            <p className="text-muted-foreground text-sm">
              All-in-One PDF Tools, Fast & Free. Process your PDF files with ease using our comprehensive suite of tools.
            </p>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="space-y-4">
              <h3 className="font-semibold text-foreground">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-border mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © {currentYear} PDFNest. All rights reserved.
          </p>
          <p className="text-muted-foreground text-sm flex items-center gap-1 mt-2 sm:mt-0">
            Made with <Heart className="h-4 w-4 text-red-500" /> for PDF enthusiasts
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;