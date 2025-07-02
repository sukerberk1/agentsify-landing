import { useState, useEffect } from "react";
import ParticlesContainer from "./ParticlesContainer";

const customStyles = `
  @keyframes gradient-shift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  
  .animate-gradient-shift {
    animation: gradient-shift 3s ease-in-out infinite;
  }

  .min-h-screen-mobile {
    min-height: 100vh;
    min-height: 100dvh; 
  }

  .text-responsive {
    word-break: break-word;
    hyphens: auto;
  }

  .touch-target {
    min-height: 48px;
    min-width: 48px;
  }

  .gradient-transition-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 120px;
    background: linear-gradient(to bottom, transparent, rgba(0,0,0,0.8));
    z-index: 5;
    pointer-events: none;
  }
`;

const LandingHome = () => {
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [displayText, setDisplayText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [typingSpeed, setTypingSpeed] = useState(150);
    const [isMounted, setIsMounted] = useState(false);

    const textArray = [
        "team's efficiency.",
        "enterprise.",
        "project goals.",
    ];

    const longestText = textArray.reduce((a, b) => a.length > b.length ? a : b);

    useEffect(() => {
        setIsMounted(true);
        setDisplayText(textArray[0]);
    }, []);

    useEffect(() => {
        if (!isMounted) return;

        const handleTyping = () => {
            const currentFullText = textArray[currentTextIndex];

            if (isDeleting) {
                setDisplayText(currentFullText.substring(0, displayText.length - 1));
                setTypingSpeed(75);
            } else {
                setDisplayText(currentFullText.substring(0, displayText.length + 1));
                setTypingSpeed(150);
            }

            if (!isDeleting && displayText === currentFullText) {
                setTimeout(() => setIsDeleting(true), 2000);
            } else if (isDeleting && displayText === "") {
                setIsDeleting(false);
                setCurrentTextIndex((prevIndex) => (prevIndex + 1) % textArray.length);
            }
        };

        const timer = setTimeout(handleTyping, typingSpeed);

        return () => clearTimeout(timer);
    }, [displayText, isDeleting, currentTextIndex, typingSpeed, textArray, isMounted]);

    const displayTextContent = isMounted ? displayText : textArray[0];

    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: customStyles }} />

            <div className="bg-primary/60 relative min-h-screen-mobile overflow-hidden -mb-2">
                <div className="w-full h-full bg-gradient-to-r from-primary/10 via-black/30 to-black/10">

                    <div className="hidden xl:block">
                        <div className="text-center flex flex-col justify-center xl:pt-16 xl:text-left h-screen xl:ml-20 xl:mr-0">

                            <div className="flex items-center justify-center xl:justify-start mb-8 relative z-10 px-4 xl:px-0">
                                <div className="flex items-center gap-3">
                                    <i className="bi bi-check2-circle text-lg text-gray-400"></i>
                                    <span className="text-gray-400 font-medium uppercase tracking-wide text-sm">
                                        Trusted AI solutions for over <strong className="text-gray-400">10+</strong> satisfied businesses
                                    </span>
                                </div>
                            </div>

                            <h1 className="text-5xl xl:text-6xl font-bold text-white relative z-10 px-4 xl:px-0 xl:pr-96 leading-tight text-responsive mb-8">
                                We will build an AI
                                <br />
                                Agent tailored for your{" "}
                                <span className="text-accent inline-block min-w-fit">
                                    <span
                                        className="inline-block"
                                        style={{ minWidth: `${longestText.length + 1}ch` }}
                                    >
                                        {displayTextContent}
                                        {isMounted && <span className="animate-pulse">|</span>}
                                    </span>
                                </span>
                            </h1>

                            <p className="text-lg text-gray-300 max-w-sm xl:max-w-2xl mx-auto xl:mx-0 mb-10 relative z-10 px-4 xl:px-0 leading-relaxed">
                                We specialize in developing, auditing, and consulting custom AI solutions designed to meet the unique challenges of modern businesses. Our solutions are not just intelligent they're practical and built for real-world complexity.
                            </p>

                            <div className="flex justify-center xl:justify-start relative z-10 px-4 xl:px-0">
                                <button className="relative inline-flex items-center justify-center px-10 py-4 font-semibold text-white rounded-full overflow-hidden group touch-target transition-transform hover:scale-105"
                                    onClick={() => window.location.href = '/services'}>
                                    <span className="absolute inset-0 rounded-full bg-gradient-to-r
                        from-purple-500 via-pink-500 via-red-500 via-orange-500
                        via-yellow-500 via-green-500 via-blue-500 via-indigo-500
                        to-purple-500 animate-gradient-shift bg-[length:200%_200%]">

                                    </span>
                                    <span className="absolute inset-0 rounded-full blur-sm opacity-75
                        bg-gradient-to-r
                        from-purple-500 via-pink-500 via-red-500 via-orange-500
                        via-yellow-500 via-green-500 via-blue-500 via-indigo-500
                        to-purple-500 animate-gradient-shift bg-[length:200%_200%]">
                                    </span>
                                    <span className="relative z-10 text-lg">
                                        Explore&nbsp;AI&nbsp;Services
                                    </span>
                                </button>
                            </div>
                        </div>

                        <div className="absolute right-32 top-48 w-96 h-96 z-20 animate-float">
                            <img
                                src="/chatbot.jpg"
                                alt="AI Chatbot Assistant"
                                className="w-full h-full object-cover rounded-full"
                            />
                        </div>

                        <div className="w-full xl:w-[1250px] h-[100vh] absolute right-0 top-0 pointer-events-none">
                            <div className="w-full h-full">
                                <ParticlesContainer />
                            </div>
                        </div>
                    </div>

                    <div className="xl:hidden relative min-h-screen-mobile">
                        <div className="absolute inset-0">
                            <ParticlesContainer />
                        </div>

                        <div className="relative z-10 min-h-screen-mobile flex flex-col justify-center px-6 sm:px-8 py-16 sm:py-20">
                            <div className="text-center max-w-4xl mx-auto w-full space-y-6">
                                <div className="flex items-center justify-center">
                                    <div className="flex items-center gap-2 flex-wrap justify-center">
                                        <i className="bi bi-check2-circle text-base text-gray-400 flex-shrink-0"></i>
                                        <span className="text-gray-400 font-medium uppercase tracking-wide text-xs sm:text-sm text-center">
                                            Trusted AI for <strong className="text-gray-400">10+</strong> businesses
                                        </span>
                                    </div>
                                </div>

                                <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold text-white text-center leading-tight text-responsive">
                                    We will build an AI
                                    <br />
                                    Agent tailored for your{" "}
                                    <span className="text-accent block xs:inline-block mt-2 xs:mt-0">
                                        <span
                                            className="inline-block min-w-0"
                                            style={{ minWidth: `${Math.min(longestText.length + 1, 15)}ch` }}
                                        >
                                            {displayTextContent}
                                            {isMounted && <span className="animate-pulse">|</span>}
                                        </span>
                                    </span>
                                </h1>

                                <p className="text-gray-300 text-center max-w-2xl mx-auto text-base sm:text-lg md:text-xl leading-relaxed text-responsive">
                                    We specialize in developing, auditing, and consulting custom AI solutions designed to meet the unique challenges of modern businesses. Our solutions are not just intelligent they're practical and built for real-world complexity.
                                </p>

                                <div className="flex justify-center pt-4">
                                    <button className="relative inline-flex items-center justify-center px-8 py-4 sm:px-10 sm:py-4 font-semibold text-white rounded-full overflow-hidden group touch-target transition-transform active:scale-95 hover:scale-105"
                                        onClick={() => window.location.href = '/services'}>
                                        <span className="absolute inset-0 rounded-full bg-gradient-to-r
                            from-purple-500 via-pink-500 via-red-500 via-orange-500
                            via-yellow-500 via-green-500 via-blue-500 via-indigo-500
                            to-purple-500 animate-gradient-shift bg-[length:200%_200%]">
                                        </span>
                                        <span className="absolute inset-0 rounded-full blur-sm opacity-75
                            bg-gradient-to-r
                            from-purple-500 via-pink-500 via-red-500 via-orange-500
                            via-yellow-500 via-green-500 via-blue-500 via-indigo-500
                            to-purple-500 animate-gradient-shift bg-[length:200%_200%]">
                                        </span>
                                        <span className="relative z-10 text-base sm:text-lg whitespace-nowrap">
                                            Explore AI Services
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="gradient-transition-overlay"></div>
            </div>
        </>
    );
};

export default LandingHome;
