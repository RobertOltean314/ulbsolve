import { forwardRef, useRef, useState, useEffect } from "react";
import { useInView } from "framer-motion";
import { workflowSteps } from "../../../data/presentationPage.workflow";
import WorkflowBackground from "./WorkflowBackground";
import WorkflowHeading from "./WorkflowHeading";
import WorkflowStepsContainer from "./WorkflowStepContainer";
import AnimationKeyframes from "./AnimationKeyframes";

export const WorkflowSection = forwardRef<HTMLDivElement>((props, ref) => {
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
      className="py-24 md:py-32 relative overflow-hidden"
      style={{ backgroundColor: primaryBlue }}
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
      {/* Background elements */}
      <WorkflowBackground
        isMobile={isMobile}
        primaryBlue={primaryBlue}
        primaryRed={primaryRed}
      />

      {/* Content container */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        {/* Section heading */}
        <WorkflowHeading isInView={isInView} />

        {/* Workflow steps */}
        <WorkflowStepsContainer
          steps={workflowSteps}
          isInView={isInView}
          primaryRed={primaryRed}
        />
      </div>

      {/* Animation keyframes */}
      <AnimationKeyframes />
    </section>
  );
});

WorkflowSection.displayName = "WorkflowSection";

export default WorkflowSection;
