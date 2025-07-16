import { useState, useEffect } from 'react';
import { Users, Lightbulb, Rocket, CheckCircle, Zap, Award, ArrowRight, Eye, Compass, Clock } from 'lucide-react';
import Footer from '../../components/Footer';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

const AboutUs = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [activeValue, setActiveValue] = useState(0);
    const [activeTimelineItem, setActiveTimelineItem] = useState(0);
    const { t, i18n, ready } = useTranslation('common');

    useEffect(() => {
        setIsVisible(true);
        const interval = setInterval(() => {
            setActiveValue((prev) => (prev + 1) % 6);
        }, 3000);

        const timelineInterval = setInterval(() => {
            setActiveTimelineItem((prev) => (prev + 1) % 3);
        }, 4000);

        return () => {
            clearInterval(interval);
            clearInterval(timelineInterval);
        };
    }, []);

    const iconMap = {
        'Lightbulb': <Lightbulb size={20} />,
        'Rocket': <Rocket size={20} />,
        'Users': <Users size={20} />,
        'CheckCircle': <CheckCircle size={20} />,
    };

    const rawTimelineItems = ready ? t('AboutUsTab.timelineItems', { returnObjects: true }) : [];
    const timelineItems = rawTimelineItems.map(item => ({
        ...item,
        icon: iconMap[item.icon] || <Lightbulb size={20} />,
    }));

    const rawValues = ready ? t('AboutUsTab.values', { returnObjects: true }) : [];
    const values = rawValues.map(item => ({
        ...item,
    }));

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
            <section className="relative pt-32 pb-24 md:pt-40 md:pb-10 flex items-center justify-center px-6 sm:px-8">
                <div className="absolute inset-0 bg-[#9F73AB]/10 backdrop-blur-sm"></div>

                <div className="relative z-10 text-center max-w-3xl mx-auto">
                    <div className="space-y-4">
                        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2">
                            {t('AboutUsTab.heading')}
                        </h1>

                        <p className="text-xl text-gray-300 leading-relaxed mb-2">
                            {t('AboutUsTab.subheading')}
                        </p>

                        <div>
                            <button className="bg-white text-purple-900 hover:bg-gray-100 px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                                onClick={() => {
                                    const lang = i18n?.language || 'en';
                                    const path = `${lang === 'en' ? '' : '/' + lang}/casestudies`;
                                    window.location.href = path;
                                }}>
                                {t('AboutUsTab.discoverbuttonText')}
                                <ArrowRight className="inline-block ml-2" size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </section >

            <section className="py-20 bg-gradient-to-br from-slate-800 via-purple-800/30 to-slate-900 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    <div className="text-center mb-10">
                        <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                            {t('AboutUsTab.section2Heading')}
                        </h2>
                    </div>

                    <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 mb-16">

                        <div className="group relative flex flex-col items-center">
                            <div className="relative w-48 h-48 rounded-full">
                                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 via-blue-500 to-cyan-400 p-1 animate-pulse">
                                    <div className="w-full h-full rounded-full bg-slate-900"></div>
                                </div>

                                <div className="absolute inset-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-105 transition-transform duration-300">
                                    <Eye size={48} className="text-blue-600" />
                                </div>

                                <div className="hidden lg:block absolute top-1/2 -right-8 w-8 h-0.5 bg-gradient-to-r from-blue-400 to-transparent"></div>
                            </div>

                            <h3 className="text-2xl font-bold text-blue-400 mt-6 mb-2"> {t('AboutUsTab.visonheading')}</h3>
                            <p className="text-center text-gray-300 text-m max-w-xs leading-relaxed">
                                {t('AboutUsTab.visionpara')}
                            </p>
                        </div>

                        <div className="group relative flex flex-col items-center lg:scale-110">
                            <div className="relative w-52 h-52 rounded-full">
                                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 via-teal-500 to-green-400 p-1.5 shadow-2xl">
                                    <div className="w-full h-full rounded-full bg-slate-900"></div>
                                </div>


                                <div className="absolute inset-6 bg-gradient-to-br from-teal-50 to-green-50 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-105 transition-transform duration-300">
                                    <Compass size={56} className="text-teal-600" />
                                </div>

                                <div className="hidden lg:block absolute top-1/2 -left-10 w-10 h-0.5 bg-gradient-to-l from-teal-400 to-transparent"></div>
                                <div className="hidden lg:block absolute top-1/2 -right-10 w-10 h-0.5 bg-gradient-to-r from-teal-400 to-transparent"></div>
                            </div>

                            <h3 className="text-3xl font-bold text-teal-400 mt-6 mb-3">{t('AboutUsTab.missionheading')}</h3>
                            <p className="text-center text-gray-300 max-w-sm leading-relaxed">
                                {t('AboutUsTab.missionpara')}
                            </p>
                        </div>


                        <div className="group relative flex flex-col items-center">
                            <div className="relative w-48 h-48 rounded-full">

                                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400 via-orange-500 to-red-400 p-1 animate-pulse">
                                    <div className="w-full h-full rounded-full bg-slate-900"></div>
                                </div>

                                <div className="absolute inset-4 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-105 transition-transform duration-300">
                                    <Award size={48} className="text-orange-600" />
                                </div>

                                <div className="hidden lg:block absolute top-1/2 -left-8 w-8 h-0.5 bg-gradient-to-l from-orange-400 to-transparent"></div>
                            </div>

                            <h3 className="text-2xl font-bold text-orange-400 mt-6 mb-2">{t('AboutUsTab.goalsheading')}</h3>
                            <p className="text-center text-gray-300 text-m max-w-xs leading-relaxed">
                                {t('AboutUsTab.goalspara')}
                            </p>
                        </div>
                    </div>

                    <div className="text-center">
                        <p className="text-lg text-gray-300 max-w-4xl mx-auto leading-relaxed">
                            {t('AboutUsTab.section2para')}
                        </p>
                    </div>
                </div>
            </section>

            <section className="py-24 bg-gradient-to-br from-slate-900 via-indigo-900/30 to-slate-800 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-14">
                        <h2 className="text-2xl lg:text-4xl font-bold text-white mb-4">
                            {t('AboutUsTab.timelineHeading')}
                        </h2>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                            {t('AboutUsTab.timelineSubheading')}
                        </p>
                    </div>


                    <div className="relative">
                        <div className="relative">
                            <div className="hidden lg:grid lg:grid-cols-2 gap-8 items-center justify-center max-w-5xl mx-auto">
                                {timelineItems.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex flex-col items-center"
                                        onMouseEnter={() => setActiveTimelineItem(index)}
                                    >
                                        <div className={`group relative p-6 rounded-xl border transition-all duration-500 w-full max-w-xs ${activeTimelineItem === index
                                            ? 'bg-white/10 border-white/30 shadow-2xl scale-105'
                                            : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 hover:scale-105'
                                            }`}>
                                            <div className={`w-10 h-10 bg-gradient-to-br ${item.color} rounded-lg flex items-center justify-center shadow-lg mb-4 mx-auto`}>
                                                <div className="text-white">
                                                    {item.icon}
                                                </div>
                                            </div>

                                            <div className="text-center mb-3">
                                                <span className={`text-lg font-bold bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>
                                                    {item.year}
                                                </span>
                                            </div>

                                            <h3 className="text-lg font-bold text-white mb-2 text-center">{item.title}</h3>

                                            <p className="text-sm text-gray-300 leading-relaxed text-center">{item.description}</p>

                                            {activeTimelineItem === index && (
                                                <div className="absolute -inset-1 bg-gradient-to-r from-purple-400/20 to-blue-400/20 rounded-xl blur-xl"></div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="lg:hidden space-y-8">
                                {timelineItems.map((item, index) => (
                                    <div
                                        key={index}
                                        className={`relative flex items-start gap-4 transition-all duration-500 ${activeTimelineItem === index ? 'scale-105' : 'hover:scale-105'
                                            }`}
                                        onTouchStart={() => setActiveTimelineItem(index)}
                                    >

                                        <div className={`flex-shrink-0 w-6 h-6 rounded-full border-4 border-white transition-all duration-500 mt-2 ${activeTimelineItem === index
                                            ? `bg-gradient-to-r ${item.color} shadow-lg scale-125`
                                            : 'bg-slate-800'
                                            }`}></div>

                                        {index < timelineItems.length - 1 && (
                                            <div className="absolute left-3 top-8 w-0.5 h-16 bg-gradient-to-b from-gray-400 to-transparent"></div>
                                        )}

                                        <div className={`flex-1 p-6 rounded-xl border transition-all duration-500 ${activeTimelineItem === index
                                            ? 'bg-white/10 border-white/30 shadow-2xl'
                                            : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                                            }`}>
                                            <div className="flex items-center gap-3 mb-4">
                                                <div className={`w-10 h-10 bg-gradient-to-br ${item.color} rounded-lg flex items-center justify-center shadow-lg`}>
                                                    <div className="text-white">
                                                        {item.icon}
                                                    </div>
                                                </div>
                                                <span className={`text-lg font-bold bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>
                                                    {item.year}
                                                </span>
                                            </div>
                                            <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                                            <p className="text-gray-300 leading-relaxed">{item.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section >

            <section className="py-20 lg:py-10 bg-gradient-to-br from-slate-900 via-[#9F73AB]/20 to-slate-800 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                    <div className="text-center mb-16">
                        <h2 className="text-2xl lg:text-4xl font-bold text-gray-300 mb-4">
                            {t('AboutUsTab.ValuesHeading')}
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                        {values.map((value, index) => (
                            <div
                                key={index}
                                className={`group relative p-8 rounded-2xl border transition-all duration-500 cursor-pointer
    ${activeValue === index
                                        ? 'scale-105 shadow-xl border-white/20'
                                        : 'hover:scale-105 hover:shadow-xl border-transparent'
                                    }
    ${index === 0 ? 'bg-pink-50 text-pink-800'
                                        : index === 1 ? 'bg-blue-50 text-blue-800'
                                            : index === 2 ? 'bg-green-50 text-green-800'
                                                : index === 3 ? 'bg-yellow-50 text-yellow-800'
                                                    : index === 4 ? 'bg-red-50 text-red-800'
                                                        : 'bg-purple-50 text-purple-800'
                                    }
  `}
                                onMouseEnter={() => setActiveValue(index)}
                            >

                                <div className={`w-16 h-16 bg-gradient-to-br ${value.color} rounded-xl flex items-center justify-center shadow-lg mb-4 group-hover:scale-110 transition-all duration-300`}>
                                    <span className="text-2xl font-bold text-white">
                                        {value.letter}
                                    </span>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-center gap-2">
                                        <h4 className={`text-xl font-bold transition-colors duration-300 ${activeValue === index
                                            ? 'text-gray-900'
                                            : 'text-black group-hover:text-black'
                                            }`}>
                                            {value.title}
                                        </h4>
                                    </div>
                                    <p className={`text-sm font-semibold leading-relaxed transition-colors duration-300 ${activeValue === index
                                        ? 'text-gray-900'
                                        : 'text-gray-900'
                                        }`}>
                                        {value.description}
                                    </p>
                                </div>

                                {activeValue === index && (
                                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-400/20 to-blue-400/20 rounded-2xl blur-xl"></div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-center mt-8">
                        <div className="flex items-center gap-4 px-6 py-4 bg-gradient-to-r from-purple-900/50 to-blue-900/50 rounded-lg border-l-4 border-blue-500 shadow-md max-w-fit">
                            <div className="flex items-center gap-1">
                                {values.map((value, index) => (
                                    <span
                                        key={index}
                                        className={`w-8 h-8 bg-gradient-to-br ${value.color} rounded-md flex items-center justify-center text-white font-bold text-sm transition-transform duration-300 ${activeValue === index ? 'scale-110 shadow-lg' : ''
                                            }`}
                                    >
                                        {value.letter}
                                    </span>
                                ))}
                            </div>
                            <span className="text-lg font-semibold text-gray-200 whitespace-nowrap">
                                {t('AboutUsTab.AgentsifyWay')}
                            </span>
                        </div>
                    </div>

                </div>
            </section>

            <section className="py-12 bg-gradient-to-br from-slate-800 via-indigo-900/20 to-slate-900 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                            {t('AboutUsTab.teamHeading')}
                        </h2>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                            {t('AboutUsTab.teamsubheading')}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
                        {/* Team Member 1 - CEO */}
                        <div className="group relative bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                            <div className="relative mb-6">
                                <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto shadow-xl">
                                    <span className="text-2xl font-bold text-white">S</span>
                                </div>
                                <div className="absolute -inset-1 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>

                            <div className="text-center">
                                <h3 className="text-xl font-bold text-white mb-1"> {t('AboutUsTab.teammember1name')} </h3>
                                <p className="text-purple-400 font-semibold mb-3"> {t('AboutUsTab.teammember1role')} </p>
                                <p className="text-gray-300 text-sm leading-relaxed">
                                    {t('AboutUsTab.teammember1description')}
                                </p>
                            </div>
                        </div>

                        {/* Team Member 2 - COO */}
                        <div className="group relative bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                            <div className="relative mb-6">
                                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto shadow-xl">
                                    <span className="text-2xl font-bold text-white">CL</span>
                                </div>
                                <div className="absolute -inset-1 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>

                            <div className="text-center">
                                <h3 className="text-xl font-bold text-white mb-1"> {t('AboutUsTab.teammember2name')} </h3>
                                <p className="text-blue-400 font-semibold mb-3"> {t('AboutUsTab.teammember2role')} </p>
                                <p className="text-gray-300 text-sm leading-relaxed">
                                    {t('AboutUsTab.teammember2description')}
                                </p>
                            </div>

                        </div>

                        {/* Team Member 3 */}
                        <div className="group relative bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                            <div className="relative mb-6">
                                <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto shadow-xl">
                                    <span className="text-2xl font-bold text-white">ED</span>
                                </div>
                                <div className="absolute -inset-1 bg-gradient-to-r from-green-400/20 to-teal-400/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>

                            <div className="text-center">
                                <h3 className="text-xl font-bold text-white mb-1"> {t('AboutUsTab.teammember3name')} </h3>
                                <p className="text-green-400 font-semibold mb-3"> {t('AboutUsTab.teammember3role')}  </p>
                                <p className="text-gray-300 text-sm leading-relaxed">
                                    {t('AboutUsTab.teammember3description')}
                                </p>
                            </div>

                        </div>

                        {/* Team Member 4  */}
                        <div className="group relative bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                            <div className="relative mb-6">
                                <div className="w-24 h-24 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto shadow-xl">
                                    <span className="text-2xl font-bold text-white">WE</span>
                                </div>
                                <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>

                            <div className="text-center">
                                <h3 className="text-xl font-bold text-white mb-1"> {t('AboutUsTab.teammember4name')} </h3>
                                <p className="text-yellow-400 font-semibold mb-3">  {t('AboutUsTab.teammember4role')}     </p>
                                <p className="text-gray-300 text-sm leading-relaxed">
                                    {t('AboutUsTab.teammember4description')}
                                </p>
                            </div>

                        </div>

                        {/* Team Member 5 - Co-Founder */}
                        <div className="group relative bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                            <div className="relative mb-6">
                                <div className="w-24 h-24 bg-gradient-to-br from-[#0066ff] to-pink-500 rounded-full flex items-center justify-center mx-auto shadow-xl">
                                    <span className="text-2xl font-bold text-white">SL</span>
                                </div>
                                <div className="absolute -inset-1 bg-gradient-to-r from-red-400/20 to-pink-400/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>

                            <div className="text-center">
                                <h3 className="text-xl font-bold text-white mb-1"> {t('AboutUsTab.teammember5name')}   </h3>
                                <p className="text-[#0066ff] font-semibold mb-3">  {t('AboutUsTab.teammember5role')}   </p>
                                <p className="text-gray-300 text-sm leading-relaxed">
                                    {t('AboutUsTab.teammember5description')}
                                </p>
                            </div>
                        </div>

                        {/* Team Member 6 - */}
                        <div className="group relative bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl">

                            <div className="relative mb-6">
                                <div className="w-24 h-24 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto shadow-xl">
                                    <span className="text-2xl font-bold text-white">CY</span>
                                </div>
                                <div className="absolute -inset-1 bg-gradient-to-r from-red-400/20 to-pink-400/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>

                            <div className="text-center">
                                <h3 className="text-xl font-bold text-white mb-1">  {t('AboutUsTab.teammember6name')}  </h3>
                                <p className="text-red-400 font-semibold mb-3"> {t('AboutUsTab.teammember6role')}  </p>
                                <p className="text-gray-300 text-sm leading-relaxed">
                                    {t('AboutUsTab.teammember6description')}
                                </p>
                            </div>
                        </div>

                        {/* Team Member 7 - */}
                        <div className="group relative bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                            <div className="relative mb-6">
                                <div className="w-24 h-24 bg-gradient-to-br from-[#00f0ff] to-purple-500 rounded-full flex items-center justify-center mx-auto shadow-xl">
                                    <span className="text-2xl font-bold text-white">KN</span>
                                </div>
                                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-400/20 to-purple-400/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>

                            <div className="text-center">
                                <h3 className="text-xl font-bold text-white mb-1">  {t('AboutUsTab.teammember7name')} </h3>
                                <p className="text-[#00f0ff] font-semibold mb-3"> {t('AboutUsTab.teammember7role')}</p>
                                <p className="text-gray-300 text-sm leading-relaxed">
                                    {t('AboutUsTab.teammember7description')}
                                </p>
                            </div>
                        </div>

                        {/* Team Member 8 - */}

                        <div className="group relative bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl">

                            <div className="relative mb-6">
                                <div className="w-24 h-24 bg-gradient-to-br from-[#ACE1AF] rounded-full flex items-center justify-center mx-auto shadow-xl">
                                    <span className="text-2xl font-bold text-white">AM</span>
                                </div>
                                <div className="absolute -inset-1 bg-gradient-to-r from-red-400/20 to-pink-400/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>

                            <div className="text-center">
                                <h3 className="text-xl font-bold text-white mb-1">  {t('AboutUsTab.teammember8name')} </h3>
                                <p className="text-[#ACE1AF] font-semibold mb-3">  {t('AboutUsTab.teammember8role')} </p>
                                <p className="text-gray-300 text-sm leading-relaxed">
                                    {t('AboutUsTab.teammember8description')}
                                </p>
                            </div>
                        </div>

                        {/* Team Member 9 - */}
                        <div className="group relative bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl">

                            <div className="relative mb-6">
                                <div className="w-24 h-24 bg-gradient-to-br from-[#a0f0ff] to-pink-500 rounded-full flex items-center justify-center mx-auto shadow-xl">
                                    <span className="text-2xl font-bold text-white">VM</span>
                                </div>
                                <div className="absolute -inset-1 bg-gradient-to-r from-red-400/20 to-pink-400/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>

                            <div className="text-center">
                                <h3 className="text-xl font-bold text-white mb-1"> {t('AboutUsTab.teammember9name')}  </h3>
                                <p className="text-[#a0f0ff] font-semibold mb-3"> {t('AboutUsTab.teammember9role')}   </p>
                                <p className="text-gray-300 text-sm leading-relaxed">
                                    {t('AboutUsTab.teammember9description')}
                                </p>
                            </div>
                        </div>


                        {/* Team Member 10 - */}

                        <div className="group relative bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl">

                            <div className="relative mb-6">
                                <div className="w-24 h-24 bg-gradient-to-br from-[#A8F1FF] to-pink-200 rounded-full flex items-center justify-center mx-auto shadow-xl">
                                    <span className="text-2xl font-bold text-white">PA</span>
                                </div>
                                <div className="absolute -inset-1 bg-gradient-to-r from-red-400/20 to-pink-400/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>

                            <div className="text-center">
                                <h3 className="text-xl font-bold text-white mb-1"> {t('AboutUsTab.teammember10name')}  </h3>
                                <p className="text-[#9FB3DF] font-semibold mb-3"> {t('AboutUsTab.teammember10role')}   </p>
                                <p className="text-gray-300 text-sm leading-relaxed">
                                    {t('AboutUsTab.teammember10description')}
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            <section className="py-10 bg-gradient-to-r from-slate-900 via-gray-900 to-slate-900 relative overflow-hidden">

                <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-blue-900/20"></div>
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>

                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">

                    <h2 className="text-4xl lg:text-3xl font-bold text-white mb-6">
                        {t('AboutUsTab.readyToRevolutionizeheading')}
                    </h2>


                    <p className="text-xl lg:text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                        {t('AboutUsTab.readyToRevolutionizetext')}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <button className="group bg-gradient-to-r from-[#8a95e0] to-[#6f7acb] hover:from-[#8a95e0] to-[#6f7acb] text-gray-900 px-8 py-3 rounded-full font-bold text-base transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-yellow-500/20"
                            onClick={() => {
                                const lang = i18n?.language || 'en';
                                const path = `${lang === 'en' ? '' : '/' + lang}/contactus`;
                                window.location.href = path;
                            }}>
                            {t('AboutUsTab.demobutton')}
                            <ArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform duration-300" size={16} />
                        </button>

                    </div>

                    <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-8 text-gray-400">
                        <div className="flex items-center gap-2">
                            <Clock size={16} />
                            <span className="text-sm">{t('AboutUsTab.freeconsultationtext')}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Users size={16} />
                            <span className="text-sm">{t('AboutUsTab.Nocommitmentrequiredtext')}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Zap size={16} />
                            <span className="text-sm">{t('AboutUsTab.getstartedtext')}</span>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div >
    );
};

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
        },
    };
}

export default AboutUs;
