import React from "react";
import { motion } from "framer-motion";

// Define interface for footer links
interface FooterLink {
  name: string;
  href: string;
  external?: boolean;
}

// Define interface for team members
interface TeamMember {
  name: string;
  role: string;
  github?: string;
  linkedin?: string;
}

export const Footer: React.FC = () => {
  // ULBS color palette
  const primaryBlue: string = "#0A3363"; // Navy blue from logo
  const primaryRed: string = "#CC0000"; // Red from logo

  // Team members
  const teamMembers: TeamMember[] = [
    {
      name: "Oltean Robert",
      role: "Ratat 1",
      github: "https://github.com/RobertOltean314",
      linkedin: "https://www.linkedin.com/in/robert-oltean-0888b9251/",
    },
    {
      name: "Adrelean Vlad",
      role: "Ratat 2",
      github: "https://github.com/BotFluTi",
      linkedin: "https://linkedin.com/in/adrelean-vlad",
    },
    {
      name: "Burnete Darius",
      role: "Ratat 3",
      github: "https://github.com/DariusBurnete",
      linkedin: "https://linkedin.com/in/burnete-darius",
    },
  ];

  // University links
  const universityLinks: FooterLink[] = [
    {
      name: "ULBS Website",
      href: "https://www.ulbsibiu.ro",
      external: true,
    },
    {
      name: "Faculty of Engineering",
      href: "https://inginerie.ulbsibiu.ro",
      external: true,
    },
  ];

  return (
    <footer
      className="relative py-12 overflow-hidden"
      style={{ backgroundColor: primaryBlue }}
    >
      <div className="max-w-7xl mx-auto px-8 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
          {/* Logo and Tagline Column */}
          <div className="col-span-1">
            <motion.div
              className="flex items-center"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-2xl font-bold text-white mr-2">
                ULBSolve
              </span>
              <svg
                className="h-8 w-8 text-white"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7 10L12 15L17 10"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>
            <p className="text-white/70 mt-4">
              A digital marketplace connecting ULBS students and faculty with
              projects, opportunities, and collaborative solutions.
            </p>
          </div>

          {/* University Links */}
          <div className="col-span-1">
            <h4 className="text-lg font-semibold mb-4 text-white border-b border-white/20 pb-2">
              University
            </h4>
            <div className="space-y-2.5">
              {universityLinks.map((link, index) => (
                <motion.div
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-white/70 transition-colors duration-200 hover:text-white"
                  >
                    {link.name}
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright Section with Development Team */}
        <div className="mt-10 pt-6 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-center items-center">
            <p className="text-sm text-white/70 mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} ULBSolve. All rights reserved.
            </p>
            {/* Development Team */}
          </div>
          <div className="mt-4 text-center">
            <p className="text-xs text-white/50 mt-3 flex flex-wrap items-center justify-center">
              A project of{" "}
              <a
                href="https://www.ulbsibiu.ro"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-white/70 mx-1"
              >
                Lucian Blaga University of Sibiu
              </a>
              <span className="mx-1">developed by:</span>
              {teamMembers.map((member, index) => (
                <React.Fragment key={index}>
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/70 hover:text-white transition-colors mx-1"
                  >
                    {member.name}
                  </a>
                  {index < teamMembers.length - 1 && (
                    <span className="text-white/50 mx-0.5">•</span>
                  )}
                </React.Fragment>
              ))}
            </p>
          </div>
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

export default Footer;
