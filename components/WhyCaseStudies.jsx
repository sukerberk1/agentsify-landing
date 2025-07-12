import { useEffect, useRef, useState, useMemo } from "react";
import { useTranslation } from 'next-i18next';


const WhyCaseStudiesAgentsify = () => {
    const typedRef = useRef(null);
    const [currentTile, setCurrentTile] = useState(0);
    const { t, i18n, ready } = useTranslation('common');

    const translatedStrings = useMemo(() => {
        if (!ready) return [];

        const strings = [
            t('whyagentsify.question1'),
            t('whyagentsify.question2'),
            t('whyagentsify.question3'),
        ];

        const hasValidTranslations = strings.every(str =>
            str && typeof str === 'string' && !str.startsWith('whyagentsify.')
        );

        return hasValidTranslations ? strings : [];
    }, [ready, t, i18n.language]);

    useEffect(() => {
        if (!typedRef.current || translatedStrings.length === 0) return;

        let currentIndex = 0;
        const typeText = () => {
            if (typedRef.current && translatedStrings.length > 0) {
                typedRef.current.innerHTML = translatedStrings[currentIndex];
                currentIndex = (currentIndex + 1) % translatedStrings.length;
            }
        };

        typeText();
        const interval = setInterval(typeText, 7000);

        return () => clearInterval(interval);
    }, [translatedStrings]);

    const tileData = useMemo(() => {
        if (!ready) return [];

        return [
            {
                category: t('whyagentsify.tiles.automation.category'),
                categoryColor: "indigo-400",
                iconColor: "indigo-400",
                icon: "bi bi-gear",
                backgroundColor: "bg-white/95",
                borderColor: "border-indigo-400",
                shadowColor: "shadow-indigo-400/10",
                title: [t('whyagentsify.tiles.automation.title1', { returnObjects: true }), t('whyagentsify.tiles.automation.title2', { returnObjects: true }), t('whyagentsify.tiles.automation.title3', { returnObjects: true })],
                description: t('whyagentsify.tiles.automation.description'),
                features: t('whyagentsify.tiles.automation.features', { returnObjects: true }),
                animation: "automation"
            },
            {
                category: t('whyagentsify.tiles.service.category'),
                categoryColor: "orange-500",
                iconColor: "orange-500",
                icon: "bi bi-speedometer2",
                backgroundColor: "bg-gray-50/95",
                borderColor: "border-orange-200",
                shadowColor: "shadow-orange-500/10",
                title: [t('whyagentsify.tiles.service.title1', { returnObjects: true }), t('whyagentsify.tiles.service.title2', { returnObjects: true })],
                description: t('whyagentsify.tiles.service.description'),
                features: t('whyagentsify.tiles.service.features', { returnObjects: true }),
                animation: "service"
            },
            {
                category: t('whyagentsify.tiles.cost.category'),
                categoryColor: "purple-500",
                iconColor: "purple-500",
                backgroundColor: "bg-white/95",
                borderColor: "border-purple-200",
                shadowColor: "shadow-purple-500/10",
                icon: "bi bi-currency-exchange",
                title: [t('whyagentsify.tiles.cost.title1', { returnObjects: true }), t('whyagentsify.tiles.cost.title2', { returnObjects: true }), t('whyagentsify.tiles.cost.title3', { returnObjects: true })],
                description: t('whyagentsify.tiles.cost.description'),
                features: t('whyagentsify.tiles.cost.features', { returnObjects: true }),
                animation: "cost"
            }
        ];
    }, [ready, t, i18n.language]);

    const RotatingText = ({ texts, className }) => {
        const [currentIndex, setCurrentIndex] = useState(0);
        const [itemHeight, setItemHeight] = useState(0);
        const itemRef = useRef(null);

        useEffect(() => {
            if (!texts || texts.length === 0) return;

            const interval = setInterval(() => {
                setCurrentIndex((prev) => (prev + 1) % texts.length);
            }, 6000);

            return () => clearInterval(interval);
        }, [texts]);

        useEffect(() => {
            if (itemRef.current) {
                setItemHeight(itemRef.current.offsetHeight);
            }
        }, [currentIndex]);

        if (!texts || texts.length === 0) return null;

        return (
            <div className={`relative overflow-hidden ${className}`} style={{ height: itemHeight }}>
                <div
                    className="transition-transform duration-1000 ease-in-out"
                    style={{ transform: `translateY(-${currentIndex * itemHeight}px)` }}
                >
                    {texts.map((text, index) => (
                        <div
                            key={index}
                            ref={index === 0 ? itemRef : null}
                            className="flex items-center"
                        >
                            {text}
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const benefits = useMemo(() => {
        if (!ready) return [];
        return t('casestudies.benefits', { returnObjects: true }) || [];
    }, [ready, t, i18n.language]);

    const currentData = tileData[currentTile] || {};

    const handleDotClick = (index) => {
        setCurrentTile(index);
    };

    useEffect(() => {
        if (tileData.length === 0) return;

        const interval = setInterval(() => {
            setCurrentTile((prev) => (prev + 1) % tileData.length);
        }, 50000);

        return () => clearInterval(interval);
    }, [tileData.length]);

    const getIconColorClass = (iconColor) => {
        switch (iconColor) {
            case 'indigo-400':
                return 'bg-indigo-400';
            case 'orange-500':
                return 'bg-orange-500';
            case 'purple-500':
                return 'bg-purple-500';
            default:
                return 'bg-indigo-400';
        }
    };

    const getCategoryColorClass = (categoryColor) => {
        switch (categoryColor) {
            case 'indigo-400':
                return 'text-indigo-400';
            case 'orange-500':
                return 'text-orange-500';
            case 'purple-500':
                return 'text-purple-500';
            default:
                return 'text-indigo-400';
        }
    };

    const getBackgroundClass = (backgroundColor) => {
        switch (backgroundColor) {
            case 'bg-white/95':
                return 'bg-white/95';
            case 'bg-gray-50/95':
                return 'bg-gray-50/95';
            default:
                return 'bg-white/95';
        }
    };

    const getBorderClass = (borderColor) => {
        switch (borderColor) {
            case 'border-indigo-400':
                return 'border-indigo-400';
            case 'border-orange-200':
                return 'border-orange-200';
            case 'border-purple-200':
                return 'border-purple-200';
            default:
                return 'border-indigo-400';
        }
    };

    const getShadowClass = (shadowColor) => {
        switch (shadowColor) {
            case 'shadow-indigo-400/10':
                return 'shadow-2xl shadow-indigo-400/10';
            case 'shadow-orange-500/10':
                return 'shadow-2xl shadow-orange-500/10';
            case 'shadow-purple-500/10':
                return 'shadow-2xl shadow-purple-500/10';
            default:
                return 'shadow-2xl shadow-indigo-400/10';
        }
    };

    const getButtonColorClass = (iconColor) => {
        switch (iconColor) {
            case 'indigo-400':
                return 'bg-indigo-500 hover:bg-indigo-600 hover:shadow-indigo-400/30 focus:ring-indigo-500';
            case 'orange-500':
                return 'bg-orange-500 hover:bg-orange-600 hover:shadow-orange-500/30 focus:ring-orange-500';
            case 'purple-500':
                return 'bg-purple-500 hover:bg-purple-600 hover:shadow-purple-500/30 focus:ring-purple-500';
            default:
                return 'bg-indigo-500 hover:bg-indigo-600 hover:shadow-indigo-400/30 focus:ring-indigo-500';
        }
    };

    const getDotColorClass = (iconColor, isActive) => {
        if (!isActive) return 'bg-gray-600 hover:bg-gray-500';

        switch (iconColor) {
            case 'indigo-400':
                return 'bg-indigo-500 shadow-lg shadow-indigo-500/50';
            case 'orange-500':
                return 'bg-orange-500 shadow-lg shadow-orange-500/50';
            case 'purple-500':
                return 'bg-purple-500 shadow-lg shadow-purple-500/50';
            default:
                return 'bg-indigo-500 shadow-lg shadow-indigo-500/50';
        }
    };

    const getDotAnimationClass = (iconColor) => {
        switch (iconColor) {
            case 'indigo-400':
                return 'bg-indigo-400';
            case 'orange-500':
                return 'bg-orange-500';
            case 'purple-500':
                return 'bg-purple-500';
            default:
                return 'bg-indigo-400';
        }
    };

    const renderAnimatedContent = (animationType, iconColor) => {
        const baseClasses = "w-full h-48 sm:h-64 flex items-center justify-center rounded-2xl shadow-lg transition-all duration-1000 ease-in-out";

        switch (animationType) {
            case 'automation':
                return (
                    <div className={`${baseClasses} bg-gradient-to-br from-indigo-50 to-indigo-100 border border-indigo-200`}>
                        <div className="text-center space-y-4">
                            <div className="flex justify-center space-x-2">
                                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-indigo-500 rounded-lg animate-pulse"></div>
                                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-indigo-400 rounded-lg animate-pulse animation-delay-300"></div>
                                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-indigo-600 rounded-lg animate-pulse animation-delay-600"></div>
                            </div>
                            <div className="text-indigo-600 font-bold text-base sm:text-lg animate-bounce">
                                ⚙️ AUTOMATION
                            </div>
                            <div className="text-indigo-500 text-xs sm:text-sm font-medium animate-fade-in">
                                Streamlining Workflows
                            </div>
                        </div>
                    </div>
                );

            case 'service':
                return (
                    <div className={`${baseClasses} bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200`}>
                        <div className="text-center space-y-4">
                            <div className="relative">
                                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-orange-500 rounded-full mx-auto animate-ping opacity-20"></div>
                                <div className="absolute inset-0 w-12 h-12 sm:w-16 sm:h-16 bg-orange-500 rounded-full mx-auto flex items-center justify-center">
                                    <span className="text-white font-bold text-lg sm:text-xl">📈</span>
                                </div>
                            </div>
                            <div className="text-orange-600 font-bold text-base sm:text-lg animate-pulse">
                                SERVICE QUALITY
                            </div>
                            <div className="text-orange-500 text-xs sm:text-sm font-medium animate-fade-in">
                                Excellence in Every Operation
                            </div>
                        </div>
                    </div>
                );

            case 'cost':
                return (
                    <div className={`${baseClasses} bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200`}>
                        <div className="text-center space-y-4">
                            <div className="flex justify-center items-end space-x-1">
                                <div className="w-3 h-6 sm:w-4 sm:h-8 bg-purple-500 rounded animate-grow-bar"></div>
                                <div className="w-3 h-8 sm:w-4 sm:h-12 bg-purple-400 rounded animate-grow-bar animation-delay-300"></div>
                                <div className="w-3 h-12 sm:w-4 sm:h-16 bg-purple-600 rounded animate-grow-bar animation-delay-600"></div>
                                <div className="w-3 h-16 sm:w-4 sm:h-20 bg-purple-500 rounded animate-grow-bar animation-delay-900"></div>
                            </div>
                            <div className="text-purple-600 font-bold text-base sm:text-lg animate-bounce">
                                💰 COST EFFICIENCY
                            </div>
                            <div className="text-purple-500 text-xs sm:text-sm font-medium animate-fade-in">
                                Maximizing ROI
                            </div>
                        </div>
                    </div>
                );

            default:
                return (
                    <div className={`${baseClasses} bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200`}>
                        <div className="text-center">
                            <div className="text-gray-600 font-bold text-base sm:text-lg">🤖 AI Solutions</div>
                        </div>
                    </div>
                );
        }
    };

    const DoneAllIcon = ({ style }) => (
        <svg
            width={style?.fontSize || 16}
            height={style?.fontSize || 16}
            viewBox="0 0 24 24"
            fill={style?.color || 'currentColor'}
            className="inline-block"
        >
            <path d="M18 7l-1.41-1.41-6.34 6.34 1.41 1.41L18 7zm4.24-1.41L11.66 16.17 7.48 12l-1.41 1.41L11.66 19l12-12-1.42-1.41zM.41 13.41L6 19l1.41-1.41L1.83 12 .41 13.41z" />
        </svg>
    );

    if (!ready) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-900">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
            </div>
        );
    }

    if (tileData.length === 0) {
        return null;
    }

    return (
        <>
            <section className="relative text-white -mt-1 pt-8 sm:pt-12 pb-6 px-4 md:px-8 min-h-screen overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-gray-900"
                    style={{
                        backgroundImage: 'url("/why.jpg")',
                    }}
                />

                <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-gray-900/70 to-black/80" />

                <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/100 via-black/80 to-transparent" />

                <div
                    className="absolute bottom-0 left-0 right-0 z-10"
                >
                    <div className="w-full h-full bg-gradient-to-b from-transparent via-black/60 to-black/90"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto text-center">
                    <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold leading-tight mb-4 min-h-[60px] sm:min-h-[80px] px-2">
                        <span id="cards-header-typed" ref={typedRef}></span>
                    </h2>

                    <p className="text-sky-300 max-w-2xl mx-auto text-sm sm:text-base md:text-lg mb-4 sm:mb-6 px-2">
                        {t('whyagentsify.para1')}
                    </p>

                    <div className="flex items-center justify-center px-2 sm:px-6 py-4">
                        <div className={`flex flex-col lg:flex-row items-center justify-between max-w-4xl w-full mx-auto rounded-2xl sm:rounded-3xl border-2 ${getBorderClass(currentData.borderColor)} ${getBackgroundClass(currentData.backgroundColor)} backdrop-blur-xl p-4 sm:p-6 md:p-8 lg:p-10 ${getShadowClass(currentData.shadowColor)} lg:gap-12 transition-all duration-700 ease-in-out transform hover:scale-[1.02] space-y-6 lg:space-y-0`}>

                            <div className="w-full lg:w-1/2 space-y-3 sm:space-y-4">
                                <div className="flex items-center gap-2 justify-start">
                                    <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full ${getIconColorClass(currentData.iconColor)} flex items-center justify-center transition-colors duration-700 shadow-lg`}>
                                        <i className={`${currentData.icon} text-white text-xs sm:text-sm`}></i>
                                    </div>
                                    <h4 className={`uppercase ${getCategoryColorClass(currentData.categoryColor)} font-semibold tracking-widest text-xs sm:text-sm transition-colors duration-700`}>
                                        {currentData.category}
                                    </h4>
                                </div>

                                <h2 className="text-xl sm:text-2xl md:text-4xl font-bold leading-tight text-gray-900 text-left mb-2 sm:mb-3">
                                    {currentData.title && currentData.title.map((line, index) => (
                                        <div key={`${currentTile}-${index}`} className="transform transition-all duration-700 ease-in-out">
                                            {line}
                                        </div>
                                    ))}
                                </h2>

                                <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed text-left mb-2 sm:mb-3 transition-all duration-700 ease-in-out">
                                    {currentData.description}
                                </p>

                                <ul className="text-gray-800 space-y-1.5 sm:space-y-2">
                                    {Array.isArray(currentData.features) && currentData.features.map((feature, index) => (
                                        <li
                                            key={`${currentTile}-feature-${index}`}
                                            className="flex items-center gap-2 sm:gap-3 justify-start transform transition-all duration-700 ease-in-out text-sm sm:text-base"
                                            style={{ transitionDelay: `${index * 100}ms` }}
                                        >
                                            <div
                                                className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full ${getIconColorClass(currentData.iconColor)} flex items-center justify-center flex-shrink-0 shadow-md`}
                                            >
                                                <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </div>
                                            <span className="text-gray-700">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="flex justify-start pt-2 sm:pt-3">
                                    <button className={`inline-flex items-center px-4 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm rounded-lg ${getButtonColorClass(currentData.iconColor)} text-white font-medium shadow-md transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent `}
                                        onClick={() => window.location.href = `${i18n.language === 'en' ? '' : '/' + i18n.language}/contactus`}>
                                        {t('whyagentsify.scheuldeacall')}
                                        <svg className="ml-1.5 sm:ml-2 w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            <div className="w-full lg:w-[45%] flex items-center justify-center">
                                <div className="relative max-w-full w-full max-w-[300px] sm:max-w-[400px]">
                                    {renderAnimatedContent(currentData.animation, currentData.iconColor)}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center mt-4 sm:mt-6 mb-8 space-x-2 sm:space-x-3">
                        {tileData.map((tile, index) => (
                            <button
                                key={index}
                                onClick={() => handleDotClick(index)}
                                className={`relative w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300 hover:scale-110 focus:outline-none ${getDotColorClass(tile.iconColor, currentTile === index)}`}
                            >
                                {currentTile === index && (
                                    <div className={`absolute inset-0 rounded-full animate-ping opacity-20 ${getDotAnimationClass(tile.iconColor)}`}></div>
                                )}
                            </button>
                        ))}
                    </div>

                    <div className="max-w-6xl mx-auto text-center relative z-10 mt-15">
                        <div className="mb-10 text-orange-300">
                            <h4 className="text-xl md:text-2xl font-semibold leading-snug mb-3">
                                {t('casestudies.exploreourHeading')}{' '}
                                <a href={`${i18n.language === 'en' ? '' : `/${i18n.language}`}/casestudies`} className="hover:opacity-80 transition-opacity duration-300">
                                    <span className="text-orange-300 font-semibold underline decoration-2 decoration-white">
                                        {t('casestudies.caseStudiesHeading')}
                                    </span>
                                </a>
                            </h4>

                            <p className="text-emerald-300 text-sm font-extrabold md:text-base leading-relaxed max-w-3xl mx-auto">
                                {t('casestudies.description')}
                            </p>
                        </div>

                        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 lg:gap-8">
                            {benefits.map((benefit, index) => (
                                <div key={index} className="flex items-center gap-3">
                                    <DoneAllIcon style={{ fontSize: 16, color: '#FFFFFF' }} />
                                    <RotatingText
                                        texts={benefit.texts}
                                        className="text-white text-sm md:text-base font-extrabold whitespace-nowrap"
                                    />
                                </div>
                            ))}
                        </div>

                    </div>

                </div>
            </section >

            <style>{`
                .gradient-text {
                    background: linear-gradient(45deg, #8b5cf6, #06b6d4);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }
                
                .animation-delay-500 {
                    animation-delay: 0.5s;
                }
                
                .animation-delay-1000 {
                    animation-delay: 1s;
                }
                
                .animation-delay-1500 {
                    animation-delay: 1.5s;
                }
                
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                }
                
                .animate-float {
                    animation: float 3s ease-in-out infinite;
                }
                
                @keyframes grow-bar {
                    0% { transform: scaleY(0); }
                    100% { transform: scaleY(1); }
                }
                
                @keyframes fade-in {
                    0% { opacity: 0; transform: translateY(10px); }
                    100% { opacity: 1; transform: translateY(0); }
                }
                
                .animate-grow-bar {
                    animation: grow-bar 2s ease-in-out infinite alternate;
                    transform-origin: bottom;
                }
                
                .animate-fade-in {
                    animation: fade-in 6s ease-in-out infinite alternate;
                }
                
                .animation-delay-300 {
                    animation-delay: 0.3s;
                }
                
                .animation-delay-600 {
                    animation-delay: 0.6s;
                }
                
                .animation-delay-900 {
                    animation-delay: 0.9s;
                }

                
                @media (max-width: 640px) {
                    .min-h-screen {
                        min-height: auto;
                        padding-bottom: 2rem;
                    }
                    
                    h2 {
                        word-wrap: break-word;
                        overflow-wrap: break-word;
                    }
                    
                    * {
                        max-width: 100%;
                        box-sizing: border-box;
                    }
                }
                
                @media (max-width: 480px) {
                    .text-2xl {
                        font-size: 1.25rem;
                        line-height: 1.75rem;
                    }
                    
                    .text-xl {
                        font-size: 1.125rem;
                        line-height: 1.75rem;
                    }
                }
            `}</style>
        </>
    );
};

export default WhyCaseStudiesAgentsify;
