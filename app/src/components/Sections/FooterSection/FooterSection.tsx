import React from "react";
import { motion } from "framer-motion";

// Define interface for footer links
interface FooterLink {
  name: string;
  href: string;
  external?: boolean;
}

// Define interface for link groups
interface FooterLinkGroup {
  title: string;
  links: FooterLink[];
}

export const FooterSection: React.FC = () => {
  // ULBS color palette
  const primaryBlue: string = "#0A3363"; // Navy blue from logo
  const primaryRed: string = "#CC0000"; // Red from logo

  // Footer link groups with strong typing
  const footerLinks: FooterLinkGroup[] = [
    {
      title: "Platform",
      links: [
        { name: "Dashboard", href: "/dashboard" },
        { name: "Projects", href: "/marketplace" },
        { name: "Create Project", href: "/create" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Community Guidelines", href: "/guidelines" },
        { name: "Tutorials", href: "/tutorials" },
        { name: "FAQ", href: "/faq" },
      ],
    },
    {
      title: "University",
      links: [
        {
          name: "ULBS Website",
          href: "https://www.ulbsibiu.ro",
          external: true,
        },
        {
          name: "Facebook",
          href: "https://www.facebook.com/ULBSibiu",
          external: true,
        },
        {
          name: "GitHub",
          href: "https://github.com/ulbsolve",
          external: true,
        },
      ],
    },
  ];

  return (
    <footer
      className="relative py-20 overflow-hidden"
      style={{ backgroundColor: primaryBlue }}
    >
      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div className="grid grid-cols-4 gap-8 md:grid-cols-2 sm:grid-cols-1">
          {/* Logo and Tagline Column */}
          <div className="col-span-1">
            <motion.span
              className="text-2xl font-bold text-white block mb-4"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              ULBSolve
            </motion.span>
            <p className="text-white/70">Connect. Collaborate. Create.</p>
          </div>

          {/* Link Columns */}
          {footerLinks.map((group, groupIndex) => (
            <div key={groupIndex} className="col-span-1">
              <h4 className="text-lg font-semibold mb-6 text-white">
                {group.title}
              </h4>
              <div className="space-y-3">
                {group.links.map((link, linkIndex) => (
                  <motion.a
                    key={linkIndex}
                    href={link.href}
                    {...(link.external
                      ? {
                          target: "_blank",
                          rel: "noopener noreferrer",
                        }
                      : {})}
                    className="block text-white/70 transition-colors duration-200 hover:text-white relative overflow-hidden group"
                    whileHover={{
                      color: "#FFFFFF",
                      x: 5,
                      transition: { duration: 0.3 },
                    }}
                  >
                    {link.name}
                    <span
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-white 
                      transform -translate-x-full group-hover:translate-x-0 
                      transition-transform duration-300"
                    />
                  </motion.a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Copyright Section */}
        <div className="mt-16 pt-6 border-t border-white/10 text-center relative">
          <p className="text-sm text-white/70">
            &copy; {new Date().getFullYear()} ULBSolve. All rights reserved. A
            project of Lucian Blaga University of Sibiu.
          </p>
        </div>
      </div>

      {/* Red accent line at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1"
        style={{ backgroundColor: primaryRed }}
      />
    </footer>
  );
};

export default FooterSection;
