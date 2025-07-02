import { useState } from 'react';
import { Linkedin, Mail, ArrowRight, CheckCircle, Users } from 'lucide-react';

export default function AgentsifyFooter() {
    const [email, setEmail] = useState('');
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubscribe = async (e) => {
        e.preventDefault();
        if (!email) return;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        setIsLoading(true);

        try {
            const res = await fetch('/.netlify/functions/subscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            if (!res.ok) {
                throw new Error('Failed to subscribe');
            }

            setIsSubscribed(true);
            setEmail('');
            setTimeout(() => setIsSubscribed(false), 3000);
        } catch (err) {
            alert('Subscription failed. Please try again later.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const footerLinks = {
        general: [
            { name: 'Services', href: '/services' },
            { name: 'CaseStudies', href: '/casestudies' },
            { name: 'About Agentsify', href: '/about' },
        ],
        support: [
            { name: 'Contact Us', href: '/contactus' }
        ]
    };

    const socialLinks = [
        { icon: Linkedin, href: 'https://www.linkedin.com/company/agentsify-ai/', label: 'LinkedIn' },
    ];

    return (
        <div className="bg-gradient-to-br from-slate-700 via-purple-700 to-slate-700">
            <footer className="bg-slate-900/95 backdrop-blur-sm border-t border-slate-800">
                <div className="max-w-7xl mx-auto px-6 py-8">

                    <div className="grid grid-cols-1 lg:grid-cols-6 gap-6 mb-8">

                        <div className="lg:col-span-4">
                            <div className="inline-block mb-4">
                                <img
                                    src="/logo.png"
                                    alt="Agentsify Logo"
                                    className="h-10 w-auto"
                                />
                                Let's build your AI future together.
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 max-w-4xl">
                                <div className="lg:col-span-2 bg-slate-800/50 rounded-xl p-4 border border-slate-700">
                                    <h3 className="text-base font-semibold text-white mb-2">Stay Updated</h3>
                                    <p className="text-slate-400 text-sm mb-3">Subscribe to receive the latest updates and AI insights</p>
                                    {isSubscribed ? (
                                        <div className="flex items-center text-green-400">
                                            <CheckCircle className="w-5 h-5 mr-2" />
                                            <span className="font-medium">Successfully subscribed!</span>
                                        </div>
                                    ) : (
                                        <div className="space-y-2">
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                                                <input
                                                    type="email"
                                                    placeholder="Enter your email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    className="w-full bg-slate-700 border border-slate-600 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                                                    onKeyPress={(e) => e.key === 'Enter' && handleSubscribe(e)}
                                                />
                                            </div>
                                            <button
                                                onClick={handleSubscribe}
                                                disabled={isLoading || !email}
                                                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2.5 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                                            >
                                                {isLoading ? 'Subscribing...' : 'Subscribe'}
                                            </button>
                                        </div>
                                    )}
                                </div>

                                <div className="lg:col-span-1 bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-xl p-4 border border-slate-700">
                                    <div className="flex items-center mb-2">
                                        <Users className="w-4 h-4 text-orange-400 mr-2" />
                                        <h3 className="text-base font-bold text-white">PARTNER PROGRAM</h3>
                                    </div>
                                    <p className="text-slate-300 mb-3 text-sm leading-relaxed">
                                        Join mission, Share success.
                                    </p>
                                    <a
                                        href="/contactus"
                                        className="group inline-flex items-center text-orange-400 hover:text-orange-300 font-semibold text-sm transition-colors duration-200"
                                    >
                                        Become a Partner
                                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-white font-semibold mb-4 text-lg">General</h3>
                            <ul className="space-y-2">
                                {footerLinks.general.map((link) => (
                                    <li key={link.name}>
                                        <a
                                            href={link.href}
                                            className="text-slate-400 hover:text-white transition-colors duration-200 hover:underline"
                                        >
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-white font-semibold mb-4 text-lg">Support</h3>
                            <ul className="space-y-2">
                                {footerLinks.support.map((link) => (
                                    <li key={link.name}>
                                        <a
                                            href={link.href}
                                            className="text-slate-400 hover:text-white transition-colors duration-200 hover:underline"
                                        >
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-slate-800 pt-6">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                            <div className="text-slate-400 text-sm">
                                © {new Date().getFullYear()} Agentsify AI. All rights reserved.
                            </div>

                            <div className="flex items-center space-x-4">
                                <span className="text-slate-400 text-sm mr-2">Follow Us:</span>
                                {socialLinks.map((social) => {
                                    const Icon = social.icon;
                                    return (
                                        <a
                                            key={social.label}
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={social.label}
                                            className="text-slate-400 hover:text-white transition-colors duration-200 p-2 hover:bg-slate-800 rounded-lg"
                                        >
                                            <Icon className="w-5 h-5" />
                                        </a>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
