import React, { useState, useEffect } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, Users, Award, TrendingUp } from 'lucide-react';
import Footer from '../../components/Footer';

const Reviews = () => {
  const [activeReview, setActiveReview] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    setIsVisible(true);

    const interval = setInterval(() => {
      setActiveReview((prev) => (prev + 1) % reviews.length);
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const reviews = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "Product Manager",
      company: "TechFlow Inc.",
      rating: 5,
      text: "Absolutely game-changing! The level of innovation and attention to detail exceeded all our expectations. Our team productivity increased by 300% within just two weeks.",
      avatar: "SC",
      featured: true
    },
    {
      id: 2,
      name: "Marcus Rodriguez",
      role: "CEO",
      company: "Innovate Labs",
      rating: 5,
      text: "I've tried countless solutions, but this stands out as truly revolutionary. The ROI was immediate and the customer support is phenomenal.",
      avatar: "MR",
      featured: false
    },
    {
      id: 3,
      name: "Emily Watson",
      role: "Design Director",
      company: "Creative Studio",
      rating: 5,
      text: "The user experience is flawless and the design aesthetics are stunning. It's rare to find a product that combines functionality with such beautiful design.",
      avatar: "EW",
      featured: true
    },
    {
      id: 4,
      name: "David Kim",
      role: "CTO",
      company: "DataStream",
      rating: 5,
      text: "Technical excellence at its finest. The performance optimization and scalability features have transformed our entire infrastructure.",
      avatar: "DK",
      featured: false
    },
    {
      id: 5,
      name: "Lisa Thompson",
      role: "Marketing Lead",
      company: "Growth Co.",
      rating: 5,
      text: "Our conversion rates skyrocketed by 250% after implementation. The analytics and insights provided are incredibly valuable.",
      avatar: "LT",
      featured: true
    }
  ];

  const carouselColorSchemes = [
    {
      bg: 'from-rose-100 to-pink-100',
      hoverBg: 'hover:from-rose-200 hover:to-pink-200',
      border: 'border-rose-300',
      hoverBorder: 'hover:border-rose-400',
      shadow: 'hover:shadow-lg hover:shadow-rose-300/40',
      avatarBg: 'from-pink-500 to-rose-500',
      avatarText: 'text-white font-semibold',
      nameText: 'text-rose-900 font-semibold',
      roleText: 'text-rose-700',
      companyText: 'text-rose-600',
      quoteIcon: 'text-rose-500',
      reviewText: 'text-pink-900 text-lg leading-relaxed',
      navBg: 'bg-rose-200 border-rose-300',
      navHover: 'hover:bg-rose-300 hover:border-rose-400',
      navText: 'text-rose-900',
      dotActive: 'bg-rose-500',
      dotInactive: 'bg-rose-300 hover:bg-rose-400'
    },

    {
      bg: 'from-sky-100 to-cyan-50',
      hoverBg: 'hover:from-sky-200 hover:to-sky-200',
      border: 'border-teal-200/50',
      hoverBorder: 'hover:border-teal-300/60',
      shadow: 'hover:shadow-md hover:shadow-cyan-100/30',
      avatarBg: 'from-teal-400 to-emerald-300',
      avatarText: 'text-white',
      nameText: 'text-emerald-900 font-semibold',
      roleText: 'text-teal-700',
      companyText: 'text-emerald-800',
      quoteIcon: 'text-teal-600',
      reviewText: 'text-teal-900',
      navBg: 'bg-sky-200/30 border-teal-200/40',
      navHover: 'hover:border-cyan-300/60',
      navText: 'text-teal-900',
      dotActive: 'bg-teal-400',
      dotInactive: 'bg-white/50 hover:bg-cyan-300/70'
    },


    {
      bg: 'from-blue-50 to-blue-100',
      hoverBg: 'hover:from-blue-200 hover:to-blue-300',
      border: 'border-blue-100',
      hoverBorder: 'hover:border-blue-200',
      shadow: 'hover:shadow-md hover:shadow-blue-100',
      avatarBg: 'from-blue-400 to-blue-500',
      avatarText: 'text-white',
      nameText: 'text-blue-900 font-semibold',
      roleText: 'text-blue-700',
      companyText: 'text-blue-800',
      quoteIcon: 'text-blue-600',
      reviewText: 'text-blue-900',
      navBg: 'bg-blue-100 border-blue-100',
      navHover: 'hover:border-blue-200',
      navText: 'text-blue-900',
      dotActive: 'bg-blue-500',
      dotInactive: 'bg-white/50 hover:bg-blue-300'
    },

    {
      bg: 'from-orange-100 to-amber-100',
      hoverBg: 'hover:bg-orange-200 hover:to-amber-200',
      border: 'border-orange-200/50',
      hoverBorder: 'hover:border-amber-300/60',
      shadow: 'hover:shadow-md hover:shadow-orange-100/30',
      avatarBg: 'from-orange-400 to-amber-400',
      avatarText: 'text-white',
      nameText: 'text-amber-900 font-semibold',
      roleText: 'text-orange-700',
      companyText: 'text-amber-800',
      quoteIcon: 'text-orange-600',
      reviewText: 'text-amber-900',
      navBg: 'bg-orange-100/40 border-orange-200/50',
      navHover: 'hover:border-amber-300/60',
      navText: 'text-amber-900',
      dotActive: 'bg-amber-400',
      dotInactive: 'bg-white/50 hover:bg-orange-300'
    },

    {
      bg: 'from-gray-50 to-slate-100',
      hoverBg: 'hover:from-gray-100 hover:to-gray-200',
      border: 'border-slate-200/50',
      hoverBorder: 'hover:border-indigo-300/60',
      shadow: 'hover:shadow-md hover:shadow-indigo-100/30',
      avatarBg: 'from-indigo-500 to-slate-500',
      avatarText: 'text-white',
      nameText: 'text-indigo-900 font-semibold',
      roleText: 'text-indigo-700',
      companyText: 'text-slate-800',
      quoteIcon: 'text-indigo-600',
      reviewText: 'text-slate-900',
      navBg: 'bg-slate-100/40 border-slate-200/50',
      navHover: 'hover:border-indigo-300/60',
      navText: 'text-indigo-900',
      dotActive: 'bg-indigo-500',
      dotInactive: 'bg-white/50 hover:bg-indigo-400/70'
    },
  ];

  const stats = [
    { label: "Happy Customers", value: "10K+", icon: Users },
    { label: "Average Rating", value: "4.5/5", icon: Star },
    { label: "Success Rate", value: "99%", icon: TrendingUp },
    { label: "Agents Delivered", value: "5+", icon: Award }
  ];

  const nextReview = () => {
    setActiveReview((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setActiveReview((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const StarRating = ({ rating }) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-5 h-5 transition-all duration-300 transform hover:scale-125 ${i < rating ? 'text-emerald-400 fill-emerald-400' : 'text-gray-300'
              }`}
            style={{ animationDelay: `${i * 100}ms` }}
          />
        ))}
      </div>
    );
  };

  const currentColors = carouselColorSchemes[activeReview];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '4s' }}></div>

        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-30 animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        <div className={`text-center pt-32 pb-20 px-4 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 bg-gradient-to-r from-white via-cyan-200 to-emerald-200 bg-clip-text text-transparent animate-pulse">
            What Our Customers Say
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed transform transition-all duration-1000 delay-300 hover:scale-105">
            Don't just take our word for it. Here's what industry leaders are saying about their transformative experience.
          </p>
        </div>

        <div className="px-4 mb-20">
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={`text-center transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                style={{ transitionDelay: `${index * 200}ms` }}
                onMouseEnter={() => setHoveredCard(`stat-${index}`)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className={`
          bg-gradient-to-br from-green-50 to-emerald-50
          border border-green-200
          rounded-2xl p-6 backdrop-blur-sm
          transition-all duration-300 cursor-pointer
          ${hoveredCard === `stat-${index}`
                    ? 'scale-110 shadow-xl shadow-green-200/60'
                    : 'hover:scale-105 hover:shadow-md hover:shadow-green-100/50'
                  }
        `}>
                  <stat.icon className={`w-8 h-8 text-green-700 mx-auto mb-4 transition-all duration-300
            ${hoveredCard === `stat-${index}` ? 'animate-bounce text-green-800' : ''}
          `} />
                  <div className="text-3xl font-bold text-green-900 mb-2 transition-all duration-300">{stat.value}</div>
                  <div className="text-green-700 text-sm">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="px-4 mb-20">
          <div className="max-w-4xl mx-auto">
            <div className={`relative bg-gradient-to-br ${currentColors.bg} backdrop-blur-xl rounded-3xl p-8 md:p-12 border ${currentColors.border} shadow-2xl ${currentColors.hoverBg} ${currentColors.hoverBorder} ${currentColors.shadow} transition-all duration-500`}>
              <Quote className={`w-12 h-12 ${currentColors.quoteIcon} mb-6 animate-pulse`} />

              <div className="transition-all duration-900 transform" key={activeReview}>
                <p className={`text-xl md:text-2xl ${currentColors.reviewText} leading-relaxed mb-8 animate-fade-in`}>
                  "{reviews[activeReview].text}"
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-16 h-16 bg-gradient-to-r ${currentColors.avatarBg} rounded-full flex items-center justify-center ${currentColors.avatarText} font-bold text-lg transform transition-all duration-300 hover:scale-110 hover:rotate-12 animate-fade-in`}>
                      {reviews[activeReview].avatar}
                    </div>
                    <div className="animate-fade-in">
                      <div className={`${currentColors.nameText} font-semibold text-lg`}>{reviews[activeReview].name}</div>
                      <div className={`${currentColors.roleText}`}>{reviews[activeReview].role}</div>
                      <div className={`${currentColors.companyText} text-sm`}>{reviews[activeReview].company}</div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2 animate-fade-in">
                    <StarRating rating={reviews[activeReview].rating} />
                    {reviews[activeReview].featured && (
                      <span className="bg-gradient-to-r from-amber-400 to-orange-500 text-black px-3 py-1 rounded-full text-xs font-semibold animate-bounce">
                        Featured Review
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center mt-8">
                <button
                  onClick={prevReview}
                  className={`p-3 rounded-full ${currentColors.navBg} ${currentColors.navText} transition-all duration-300 hover:scale-110 hover:rotate-12 active:scale-95 ${currentColors.navHover}`}
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <div className="flex gap-2">
                  {reviews.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveReview(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-150 ${index === activeReview
                        ? `${currentColors.dotActive} scale-125 animate-pulse`
                        : `${currentColors.dotInactive}`
                        }`}
                    />
                  ))}
                </div>

                <button
                  onClick={nextReview}
                  className={`p-3 rounded-full ${currentColors.navBg} ${currentColors.navText} transition-all duration-300 hover:scale-110 hover:-rotate-12 active:scale-95 ${currentColors.navHover}`}
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 pb-20">
          <div className="max-w-6xl mx-auto">
            <h2 className={`text-4xl font-bold text-white text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}>
              More Success Stories
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {reviews.map((review, index) => {
                const colorSchemes = [
                  {
                    bg: 'from-[#F8ECD4] to-[#EDE2D1]',
                    hoverBg: 'hover:from-[#F9E2D4] hover:to-[#F0D8C1]',
                    border: 'border-purple-200',
                    hoverBorder: 'hover:border-purple-300',
                    shadow: 'hover:shadow-purple-200/60',
                    avatar: 'from-purple-400 to-violet-400',
                    name: 'text-purple-900',
                    role: 'text-purple-700',
                    company: 'text-purple-800',
                    text: 'text-purple-900',
                    textHover: 'group-hover:text-purple-950'
                  },
                  {
                    bg: 'from-[#FC9FB1] to-[#FDE2D4]',
                    hoverBg: 'hover:from-[#FDA6B8] hover:to-[#FEE0D4]',
                    border: 'border-orange-200',
                    hoverBorder: 'hover:border-orange-300',
                    shadow: 'hover:shadow-orange-200/60',
                    avatar: 'from-orange-400 to-amber-400',
                    name: 'text-orange-900',
                    role: 'text-orange-700',
                    company: 'text-amber-800',
                    text: 'text-orange-900',
                    textHover: 'group-hover:text-orange-950'
                  },
                  {
                    bg: 'from-[#FCB046] to-[#D1F0E8]',
                    hoverBg: 'hover:from-[#FDBB5C] hover:to-[#D8F6F0]',
                    border: 'border-emerald-200',
                    hoverBorder: 'hover:border-emerald-300',
                    shadow: 'hover:shadow-emerald-200/60',
                    avatar: 'from-emerald-400 to-teal-400',
                    name: 'text-emerald-900',
                    role: 'text-emerald-700',
                    company: 'text-teal-800',
                    text: 'text-emerald-900',
                    textHover: 'group-hover:text-emerald-950'
                  },
                  {
                    bg: 'from-[#9f5529] to-[#f5c6a1]',
                    hoverBg: 'hover:from-[#b76a3c] hover:to-[#f8d1b2]',
                    border: 'border-rose-200',
                    hoverBorder: 'hover:border-rose-300',
                    shadow: 'hover:shadow-rose-200/60',
                    avatar: 'from-rose-400 to-pink-400',
                    name: 'text-rose-900',
                    role: 'text-rose-700',
                    company: 'text-pink-800',
                    text: 'text-rose-900',
                    textHover: 'group-hover:text-rose-950'
                  },
                  {
                    bg: 'from-[#8E457A] to-[#C8D8E4]',
                    hoverBg: 'hover:from-[#A05B8C] hover:to-[#D0E0F4]',
                    border: 'border-blue-200',
                    hoverBorder: 'hover:border-blue-300',
                    shadow: 'hover:shadow-blue-200/60',
                    avatar: 'from-blue-400 to-sky-400',
                    name: 'text-blue-900',
                    role: 'text-blue-700',
                    company: 'text-sky-800',
                    text: 'text-blue-900',
                    textHover: 'group-hover:text-blue-950'
                  }
                ];

                const colors = colorSchemes[index % colorSchemes.length];

                return (
                  <div
                    key={review.id}
                    className={`relative bg-gradient-to-br ${colors.bg} backdrop-blur-lg rounded-2xl p-6 border ${colors.border} ${colors.hoverBg} ${colors.hoverBorder} transition-all duration-500 hover:scale-105 hover:shadow-2xl ${colors.shadow} group cursor-pointer ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                      }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                    onMouseEnter={() => setHoveredCard(`review-${index}`)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-12 h-12 bg-gradient-to-r ${colors.avatar} rounded-full flex items-center justify-center text-white font-semibold transition-all duration-300 ${hoveredCard === `review-${index}` ? 'scale-110 rotate-12' : ''
                        }`}>
                        {review.avatar}
                      </div>
                      <div>
                        <div className={`${colors.name} font-semibold`}>{review.name}</div>
                        <div className={`${colors.role} text-sm`}>{review.role}</div>
                      </div>
                    </div>

                    <StarRating rating={review.rating} />

                    <p className={`${colors.text} mt-4 leading-relaxed ${colors.textHover} transition-colors duration-300`}>
                      "{review.text}"
                    </p>

                    <div className={`mt-4 ${colors.company} text-sm font-medium`}>
                      {review.company}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="px-4 pb-20">
          <div
            className={`max-w-4xl mx-auto text-center bg-gradient-to-r from-[#dbe4ff] to-[#e6e9ff] rounded-3xl p-12 border border-[#c2ccf0]/50 hover:border-[#aab5e6]/70 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            style={{ transitionDelay: '800ms' }}
          >
            <h3 className="text-4xl font-bold text-[#1a1a1a] mb-6">
              Ready to Join Thousands of Happy Customers?
            </h3>
            <p className="text-xl text-[#2e2e2e] mb-8 max-w-2xl mx-auto">
              Experience the transformation yourself. Start your journey today and see why industry leaders choose us.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-gradient-to-r from-[#8a95e0] to-[#6f7acb] text-white font-semibold rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300 hover:shadow-indigo-400/40 active:scale-95"
                onClick={() => window.location.href = '/about'}>
                Get Started Now
              </button>
              <button className="px-8 py-4 border-2 border-[#8a95e0] text-[#1a1a1a] font-semibold rounded-full hover:bg-[#dbe4ff] hover:border-[#6f7acb] transition-all duration-300 hover:scale-105 active:scale-95"
                onClick={() => window.location.href = '/bookcall'}>
                Schedule Demo
              </button>
            </div>

          </div>
        </div>

      </div>
      <Footer />

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Reviews;
