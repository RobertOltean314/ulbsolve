import { forwardRef, useRef, useState, useEffect } from "react";
import { useInView } from "framer-motion";
import UserTypesBackground from "./UserTypesBackground";
import UserTypesHeading from "./UserTypesHeading";
import UserTypesGrid from "./UserTypesGrid";
import FooterText from "./UserTypesFooterText";
import { userTypes } from "../../../data/userTypesSection.userTypes";

export const UserTypesSection = forwardRef<HTMLDivElement>((props, ref) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  const [isMobile, setIsMobile] = useState(false);

  // ULBS color palette
  const primaryBlue = "#0A3363"; // Navy blue from logo
  const primaryRed = "#CC0000"; // Red from logo

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section
      className="py-24 md:py-32 bg-white relative overflow-hidden"
      ref={(node: HTMLDivElement | null) => {
        // Handle both refs
        sectionRef.current = node;
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      }}
    >
      <UserTypesBackground
        isMobile={isMobile}
        primaryBlue={primaryBlue}
        primaryRed={primaryRed}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        <UserTypesHeading isInView={isInView} primaryBlue={primaryBlue} />

        <UserTypesGrid
          userTypes={userTypes}
          isInView={isInView}
          primaryBlue={primaryBlue}
        />

        <FooterText isInView={isInView} />
      </div>
    </section>
  );
});

UserTypesSection.displayName = "UserTypesSection";

export default UserTypesSection;
