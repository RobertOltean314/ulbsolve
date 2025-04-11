// Modified PresentationPage.tsx
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSolana } from "../../context/SolanaContext";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import HeroSection from "../../components/Sections/HeroSection/HeroSection";
import { Navbar } from "../../components/Navbar/Navbar";
import ChallengeSection from "../../components/Sections/ChallengeSection/ChallengeSection";
import { FeaturesSection } from "../../components/Sections/Features/FeaturesSection";
import { UserTypesSection } from "../../components/Sections/UserTypesSection/UserTypesSection";
import { WorkflowSection } from "../../components/Sections/WorkflowSection/WorkflowSection";
import { FAQSection } from "../../components/Sections/FAQSection/FAQSection";
import { TechStackSection } from "../../components/Sections/TechStackSection/TechStackSection";
import { CTASection } from "../../components/Sections/CTASection/CTASection";
import { FooterSection } from "../../components/Sections/FooterSection/FooterSection";

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

  // Scroll functions for each section
  const scrollToHero = () => {
    heroRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToChallenge = () => {
    challengeRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToUserTypes = () => {
    userTypesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToWorkflow = () => {
    workflowRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToFAQ = () => {
    faqRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToTechStack = () => {
    techStackRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Modified to directly open the wallet modal
  const handleExploreClick = () => {
    setVisible(true); // This directly shows the native Solana wallet selection modal
  };

  return (
    <div className="bg-[#121212] text-white overflow-x-hidden font-inter">
      <Navbar
        isScrolled={isScrolled}
        onLogoClick={scrollToHero}
        onChallengeClick={scrollToChallenge}
        onFeatureClick={scrollToFeatures}
        onUserTypesClick={scrollToUserTypes}
        onWorkflowClick={scrollToWorkflow}
        onFAQClick={scrollToFAQ}
        onTechStackClick={scrollToTechStack}
      />

      <div ref={heroRef}>
        <HeroSection
          title="ULBSolve"
          subtitle="Connect. Collaborate. Create."
          description="A digital marketplace connecting ULBS students and faculty with projects, opportunities, and collaborative solutions."
          ctaText="Start Exploring"
          onCtaClick={handleExploreClick}
        />
      </div>

      <div ref={challengeRef}>
        <ChallengeSection />
      </div>

      <div ref={featuresRef}>
        <FeaturesSection />
      </div>

      <div ref={userTypesRef}>
        <UserTypesSection />
      </div>

      <div ref={workflowRef}>
        <WorkflowSection />
      </div>

      <div ref={faqRef}>
        <FAQSection />
      </div>

      <div ref={techStackRef}>
        <TechStackSection />
      </div>

      <CTASection />

      <FooterSection />
    </div>
  );
};

export default PresentationPage;
