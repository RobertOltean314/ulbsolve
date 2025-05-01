import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSolana } from "../../context/SolanaContext";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import HeroSection from "../../components/Presentation/HeroSection/HeroSection";
import ChallengeSection from "../../components/Presentation/ChallengeSection/ChallengeSection";
import { FeaturesSection } from "../../components/Presentation/Features/FeaturesSection";
import { UserTypesSection } from "../../components/Presentation/UserTypesSection/UserTypesSection";
import { WorkflowSection } from "../../components/Presentation/WorkflowSection/WorkflowSection";
import { FAQSection } from "../../components/Presentation/FAQSection/FAQSection";
import { TechStackSection } from "../../components/Presentation/TechStackSection/TechStackSection";
import { CTASection } from "../../components/Presentation/CTASection/CTASection";
import { PageLayout } from "../../components/Layout/PageLayout";
import Footer from "../../components/Common/Footer";

/**
 * Presentation page for ULBSolve platform
 * Uses the Layout component with fullWidth=true to accommodate the full-width sections
 */
const PresentationPage: React.FC = () => {
  const navigate = useNavigate();
  const { connected } = useSolana();
  const { setVisible } = useWalletModal();
  const [isScrolled, setIsScrolled] = useState(false);

  // Add refs for all sections
  const heroRef = useRef<HTMLDivElement>(null);
  const challengeRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const userTypesRef = useRef<HTMLDivElement>(null);
  const workflowRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);
  const techStackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Redirect to marketplace if connected
  useEffect(() => {
    if (connected) {
      navigate("/marketplace");
    }
  }, [connected, navigate]);

  // Modified to directly open the wallet modal
  const handleExploreClick = () => {
    setVisible(true); // This directly shows the native Solana wallet selection modal
  };

  return (
    <PageLayout
      fullWidth={true}
      className="overflow-x-hidden font-inter"
      hideFooter={true} // Use the specialized FooterSection from presentation page
    >
      <div ref={heroRef} id="hero">
        <HeroSection
          title="ULBSolve"
          subtitle="Connect. Collaborate. Create."
          description="A digital marketplace connecting ULBS students and faculty with projects, opportunities, and collaborative solutions."
          ctaText="Start Exploring"
          onCtaClick={handleExploreClick}
        />
      </div>

      <div ref={challengeRef} id="challenges">
        <ChallengeSection />
      </div>

      <div ref={featuresRef} id="features">
        <FeaturesSection />
      </div>

      <div ref={userTypesRef} id="user-types">
        <UserTypesSection />
      </div>

      <div ref={workflowRef} id="workflow">
        <WorkflowSection />
      </div>

      <div ref={faqRef} id="faq">
        <FAQSection />
      </div>

      <div ref={techStackRef} id="tech-stack">
        <TechStackSection />
      </div>

      <CTASection />

      {/* Use the FooterSection directly in the presentation page for now */}
      <div className="mt-auto">
        <Footer />
      </div>
    </PageLayout>
  );
};

export default PresentationPage;
