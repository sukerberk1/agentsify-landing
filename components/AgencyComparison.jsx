import { useState, useEffect } from 'react';
import { TbSquareRoundedXFilled } from "react-icons/tb";
import { FiCheckSquare } from "react-icons/fi";
import { Check, X } from 'lucide-react';

const comparisonData = [
    {
        category: "Time to Deliver Results",
        agentsify: "21-30 Days",
        aiStartup: "3 Months",
        softwareAgency: "2-4 Weeks",
        freelancers: "3-6 Months",
    },
    {
        category: "Failure Rate",
        agentsify: "Low",
        aiStartup: "High",
        softwareAgency: "Very High",
        freelancers: "Unpredictable",
    },
    {
        category: "Price (Relative)",
        agentsify: "Affordable",
        aiStartup: "Moderate",
        softwareAgency: "Expensive",
        freelancers: "Highly Variable",
    },
    {
        category: "Guarantees",
        agentsify: true,
        aiStartup: false,
        softwareAgency: false,
        freelancers: false,
    }
];

const AgencyComparison = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [animatedItems, setAnimatedItems] = useState([]);

    const backgroundImageUrl = '/agency-bg.jpg';

    const otherAgenciesData = [
        "High failure rate",
        "Expensive services",
        "Slow project delivery",
        "Lack of guarantees or accountability"
    ];

    const agentsifyData = [
        "Industry-leading low failure rate",
        "Affordable solutions tailored to your needs",
        "Rapid delivery timelines",
        "Solid guarantees for your peace of mind"
    ];

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 300);

        otherAgenciesData.forEach((_, index) => {
            setTimeout(() => {
                setAnimatedItems(prev => [...prev, `other-${index}`]);
            }, 800 + index * 200);
        });

        agentsifyData.forEach((_, index) => {
            setTimeout(() => {
                setAnimatedItems(prev => [...prev, `agentsify-${index}`]);
            }, 1200 + index * 200);
        });

        return () => clearTimeout(timer);
    }, []);

    return (
        <section className="relative py-8 px-4 md:px-8 lg:px-16 overflow-hidden bg-black">

            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/70 via-black/60 to-blue-900/50" />

            <div className="max-w-5xl mx-auto relative z-10">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 font-poppins">
                        Compare your <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent font-extrabold">options</span> for AI solutions
                    </h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 mx-auto rounded-full" />
                </div>

                <div className="overflow-x-auto">
                    <div className="min-w-[1000px] overflow-hidden rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 shadow-2xl">
                        <div className="grid grid-cols-5 gap-0 text-white text-base font-semibold border-b border-white/20">
                            <div className="text-left uppercase p-3 border-r border-white/10 font-inter bg-gradient-to-r from-slate-800/50 to-gray-700/50">Categories</div>
                            {[
                                { label: "Agentsify", gradient: "from-emerald-400/30 to-teal-500/30", textColor: "text-black" },
                                { label: "AI Startup", textColor: "text-white" },
                                { label: "Software Agency", textColor: "text-white" },
                                { label: "Freelancers", textColor: "text-white" }
                            ].map((item, i) => (
                                <div key={i} className={`text-center p-3 font-inter ${i < 3 ? 'border-r border-white/10' : ''} ${i === 0 ? `bg-gradient-to-b ${item.gradient} ${item.textColor} font-bold` : `bg-gradient-to-b ${item.gradient} ${item.textColor}`}`}>
                                    {item.label}
                                </div>
                            ))}
                        </div>

                        <div>
                            {comparisonData.map((row, index) => (
                                <div key={index} className={`grid grid-cols-5 gap-0 ${index < comparisonData.length - 1 ? 'border-b border-white/10' : ''} hover:bg-white/5 transition-all duration-300`}>
                                    <div className="text-left text-white font-medium p-3 border-r border-white/10 font-inter bg-gradient-to-r from-slate-800/30 to-gray-700/30">
                                        {row.category}
                                    </div>
                                    {[
                                        { value: row.agentsify, gradient: "from-emerald-400/30 to-teal-500/30", textColor: "text-black font-semibold" },
                                        { value: row.aiStartup, textColor: "text-white" },
                                        { value: row.softwareAgency, textColor: "text-white" },
                                        { value: row.freelancers, textColor: "text-white" }
                                    ].map((cell, idx) => (
                                        <div key={idx} className={`text-center flex justify-center items-center font-normal text-sm p-4 font-inter ${idx < 3 ? 'border-r border-white/10' : ''} bg-gradient-to-b ${cell.gradient} ${cell.textColor}`}>
                                            {row.category === "Guarantees" ? (
                                                <div className="w-7 h-7 flex items-center justify-center">
                                                    {cell.value ? (
                                                        <Check className="w-5 h-5 text-emerald-400 drop-shadow-lg" />
                                                    ) : (
                                                        <X className="w-5 h-5 text-red-400 drop-shadow-lg" />
                                                    )}
                                                </div>
                                            ) : (
                                                <span>{cell.value}</span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="text-center mt-10">
                    <p className="text-white text-lg font-medium mb-4 font-inter">
                        Ready to experience the <span className="text-white-400 font-extrabold text-shadow">Agentsify</span> difference?
                    </p>
                    <button className="bg-black text-white font-bold py-3 px-8 rounded-lg border border-purple-500/30 hover:border-orange-500/50 transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-purple-600/40 hover:shadow-orange-500/50 hover:shadow-2xl font-inter"
                        onClick={() => window.location.href = '/contactus'}>
                        Get Started Today
                    </button>
                </div>
            </div>

            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: `url(${backgroundImageUrl})`,
                    backgroundColor: '#000'
                }}
            />
            <div className="absolute inset-0 bg-black/70" />

            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                    backgroundImage: `
                        linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
                    `,
                    backgroundSize: '50px 50px'
                }} />
            </div>

            <div className="absolute top-20 left-20 w-32 h-32 bg-red-500/10 rounded-full blur-xl animate-pulse" />
            <div className="absolute bottom-20 right-20 w-40 h-40 bg-green-500/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }} />
            <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-purple-500/10 rounded-full blur-xl animate-bounce" style={{ animationDelay: '2s' }} />

            <div className="max-w-4xl mx-auto relative z-10 mt-30 pt-16">
                <div className="text-center mb-12">
                    <h2 className={`text-2xl md:text-4xl font-bold text-white mb-6 transition-all duration-1000 drop-shadow-2xl ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
                        Why choose <span className="text-white-400 font-extrabold text-shadow">Agentsify</span> over other agencies?
                    </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-6 justify-center max-w-4xl mx-auto">

                    <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
                        <div className="bg-gray-900/60 backdrop-blur-md rounded-2xl p-6 border border-gray-600/40 hover:border-red-500/40 transition-all duration-500 relative overflow-hidden group shadow-2xl">
                            <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <h3 className="text-lg font-bold text-gray-200 mb-5 text-center z-10 relative drop-shadow-lg">Other Agencies</h3>
                            <div className="space-y-4 relative z-10">
                                {otherAgenciesData.map((item, index) => (
                                    <div
                                        key={index}
                                        className={`flex items-start space-x-3 transition-all duration-500 ${animatedItems.includes(`other-${index}`) ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}
                                    >
                                        <div className="flex-shrink-0 mt-1">
                                            <div className="w-5 h-5 bg-black-500/40 flex items-center justify-center animate-pulse">
                                                <TbSquareRoundedXFilled className="w-5 h-5 text-red-400" />
                                            </div>
                                        </div>
                                        <p className="text-gray-200 text-sm leading-relaxed drop-shadow-md">{item}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className={`relative transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'} max-w-lg w-full mx-auto`}>
                        <div className="bg-gradient-to-br from-green-900/50 to-emerald-800/40 backdrop-blur-md rounded-2xl p-6 border border-green-500/40 hover:border-green-400/60 transition-all duration-500 relative overflow-hidden group hover:shadow-2xl hover:shadow-green-500/20 shadow-2xl">
                            <div className="absolute inset-0 bg-gradient-to-br from-green-400/15 to-emerald-500/15 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="absolute -inset-1 bg-gradient-to-r from-green-400/30 to-emerald-500/30 rounded-2xl blur opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
                            <h3 className="text-lg font-bold text-green-400 mb-5 text-center relative z-10 drop-shadow-lg">Agentsify</h3>
                            <div className="space-y-4 relative z-10">
                                {agentsifyData.map((item, index) => (
                                    <div
                                        key={index}
                                        className={`flex items-start space-x-3 transition-all duration-500 hover:scale-105 ${animatedItems.includes(`agentsify-${index}`) ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
                                    >
                                        <div className="flex-shrink-0 mt-1">
                                            <div className="w-5 h-5 bg-black-500/40 flex items-center justify-center animate-pulse">
                                                <FiCheckSquare className="w-5 h-5 text-green-400" />
                                            </div>
                                        </div>
                                        <p className="text-white text-sm leading-relaxed font-medium drop-shadow-md">{item}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .text-shadow {
                    text-shadow: 0 0 20px rgb(192, 173, 210);
                }
            `}</style>
            <div className="absolute bottom-0 left-0 right-0 h-32 z-20"
                style={{
                    background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(30,0,60,0.6) 80%, rgba(0,0,0,0.9) 100%)'
                }}
            ></div>
        </section >
    );
};

export default AgencyComparison;
