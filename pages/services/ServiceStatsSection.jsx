import { useState, useEffect } from 'react';
import { TrendingUp } from 'lucide-react';

const gradients = [
    {
        id: 'grad1',
        colors: ['#ff6a00', '#ee0979'],
        shadowColor: 'rgba(255, 106, 0, 0.4)',
        bgColor: 'from-orange-500/10 to-pink-500/10',
        borderColor: 'border-orange-400/30 hover:border-orange-300/50'
    },
    {
        id: 'grad2',
        colors: ['#f9d423', '#ff4e50'],
        shadowColor: 'rgba(200, 16, 139, 0.4)',
        bgColor: 'from-cyan-500/10 to-blue-500/10',
        borderColor: 'border-cyan-400/30 hover:border-cyan-300/50'
    },
    {
        id: 'grad3',
        colors: ['#f12711', '#f5af19'],
        shadowColor: 'rgba(249, 212, 35, 0.4)',
        bgColor: 'from-yellow-500/10 to-red-500/10',
        borderColor: 'border-yellow-400/30 hover:border-yellow-300/50'
    }
];

const stats = [
    {
        label: 'Client satisfaction rate',
        value: 98,
    },
    {
        label: 'Businesses enhanced through AI',
        value: 100,
    },
    {
        label: 'Processes improved dramatically',
        value: 96,
    }
];

const AnimatedCircularProgress = ({ value, gradient }) => {
    const [progress, setProgress] = useState(0);
    const [displayValue, setDisplayValue] = useState(0);
    const radius = 32;
    const stroke = 5;
    const normalizedRadius = radius - stroke / 2;
    const circumference = 2 * Math.PI * normalizedRadius;

    useEffect(() => {
        const timer = setTimeout(() => {
            setProgress(value);
        }, 200);


        const duration = 1500;
        const startTime = Date.now() + 200;

        const animateValue = () => {
            const elapsed = Date.now() - startTime;
            const progressRatio = Math.min(elapsed / duration, 1);
            const easedProgress = 1 - Math.pow(1 - progressRatio, 3); // Ease-out cubic
            const currentValue = Math.round(easedProgress * value);

            setDisplayValue(currentValue);

            if (progressRatio < 1) {
                requestAnimationFrame(animateValue);
            }
        };

        const valueTimer = setTimeout(animateValue, 200);

        return () => {
            clearTimeout(timer);
            clearTimeout(valueTimer);
        };
    }, [value]);


    const minVisibleProgress = 70;
    const scaledProgress = minVisibleProgress + (progress * (100 - minVisibleProgress)) / 100;
    const strokeDashoffset = circumference - (scaledProgress / 100) * circumference;

    return (
        <div className="flex justify-center items-center">
            <div className="relative w-20 h-20">
                <svg
                    className="w-full h-full transform -rotate-90"
                    viewBox="0 0 80 80"
                >
                    <defs>
                        <linearGradient id={gradient.id} x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor={gradient.colors[0]} />
                            <stop offset="100%" stopColor={gradient.colors[1]} />
                        </linearGradient>
                    </defs>


                    <circle
                        cx="40"
                        cy="40"
                        r={normalizedRadius}
                        fill="none"
                        stroke="rgba(255, 255, 255, 0.1)"
                        strokeWidth={stroke}
                    />


                    <circle
                        cx="40"
                        cy="40"
                        r={normalizedRadius}
                        fill="none"
                        stroke={`url(#${gradient.id})`}
                        strokeWidth={stroke}
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        style={{
                            transition: 'stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1)',
                            filter: `drop-shadow(0 0 6px ${gradient.shadowColor})`,
                        }}
                    />
                </svg>

                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white font-bold text-base tabular-nums">
                        {displayValue}%
                    </span>
                </div>
            </div>
        </div>
    );
};

const ServiceStatsSection = () => {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    return (
        <div
            className="relative rounded-2xl py-8 px-4 sm:px-6 lg:px-8 text-white overflow-hidden"
            style={{
                backgroundImage: 'url("service-stats-bg.jpg")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}
        >

            <div className="absolute inset-0 bg-black/50 rounded-2xl"></div>
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-r from-blue-400/15 to-teal-400/15 rounded-full blur-xl animate-pulse"></div>
                <div className="absolute bottom-10 right-10 w-32 h-32 bg-gradient-to-r from-emerald-400/15 to-cyan-400/15 rounded-full blur-xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-gradient-to-r from-indigo-400/15 to-blue-400/15 rounded-full blur-xl animate-pulse delay-500"></div>
            </div>

            <div className="relative z-10 text-center mb-10">
                <h3 className="text-2xl md:text-3xl font-bold mb-3 bg-gradient-to-r from-white via-gray-100 to-blue-100 bg-clip-text text-transparent">
                    Our Transformative Impact
                </h3>
                <p className="text-gray-300 text-sm max-w-xl mx-auto">
                    Delivering exceptional results through cutting-edge AI solutions and innovative approaches
                </p>
            </div>

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
                {stats.map((stat, i) => (
                    <div
                        key={i}
                        className={`group relative bg-gradient-to-br ${gradients[i].bgColor} backdrop-blur-sm rounded-xl p-6 border ${gradients[i].borderColor} transition-all duration-500 hover:scale-105 cursor-pointer`}
                        style={{
                            boxShadow: hoveredIndex === i
                                ? `0 20px 40px ${gradients[i].shadowColor}, 0 0 20px ${gradients[i].shadowColor}`
                                : '0 10px 30px rgba(0,0,0,0.3)'
                        }}
                        onMouseEnter={() => setHoveredIndex(i)}
                        onMouseLeave={() => setHoveredIndex(null)}
                    >
                        <div className="mb-4">
                            <AnimatedCircularProgress
                                value={stat.value}
                                gradient={gradients[i]}
                            />
                        </div>
                        <div className="text-center space-y-1">
                            <h4 className="font-semibold text-base text-white group-hover:text-gray-100 transition-colors duration-300">
                                {stat.label}
                            </h4>
                        </div>
                        <div
                            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                            style={{
                                background: `linear-gradient(135deg, ${gradients[i].colors[0]}15, ${gradients[i].colors[1]}15)`
                            }}
                        />
                    </div>
                ))}
            </div>

            <div className="relative z-10 text-center mt-8">
                <button className="group bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white font-semibold py-2.5 px-6 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
                    onClick={() => window.location.href = '/casestudies'}>
                    <span className="flex items-center gap-2 text-sm">
                        Discover Our Solutions
                        <TrendingUp size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                </button>
            </div>
        </div >
    );
};

export default ServiceStatsSection;
