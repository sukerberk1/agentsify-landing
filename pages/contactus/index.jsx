import { useState } from 'react';
import { Mail, MapPin, Send, CheckCircle, AlertCircle, PhoneCall, Zap, Star, Shield, Headphones, X, Calendar } from 'lucide-react';
import Footer from '../../components/Footer';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    Name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isCalModalOpen, setIsCalModalOpen] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const { t, i18n, ready } = useTranslation('common');

 const handleSubmit = async (e) => {
    e.preventDefault();

    const { Name, email, subject, message } = formData;

    if (!Name || !email || !subject || !message) {
      setSubmitStatus('error');
      alert(t('contactustab.errortext1'));
      return;
    }

    if (Name.length < 2 || Name.length > 50 || !/^[a-zA-Z\s]+$/.test(Name)) {
      alert(t('contactustab.errortext2'));
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setSubmitStatus('error');
      alert(t('contactustab.errortext3'));
      return;
    }

    if (subject.length < 5 || subject.length > 100) {
      alert(t('contactustab.errortext4'));
      return;
    }

    if (message.length < 10) {
      alert(t('contactustab.errortext5'));
      return;
    }

    setIsSubmitting(true);

    try {
      // Create form data that matches the hidden form exactly
      const netlifyFormData = new FormData();
      netlifyFormData.append('form-name', 'contact');
      netlifyFormData.append('Name', Name);
      netlifyFormData.append('email', email);
      netlifyFormData.append('subject', subject);
      netlifyFormData.append('message', message);

      // Submit to root path, not to __forms.html
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(netlifyFormData).toString()
      });

      if (response.ok) {
        setHasSubmitted(true);
        setSubmitStatus('success');
        setFormData({
          Name: '',
          email: '',
          subject: '',
          message: '',
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    }

    setIsSubmitting(false);

    setTimeout(() => {
      setSubmitStatus(null);
    }, 5000);
  };

  const openCalModal = () => {
    setIsCalModalOpen(true);
  };

  const closeCalModal = () => {
    setIsCalModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <section className="relative pt-32 pb-16 px-6 sm:px-8">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 to-blue-900/30"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            {t('contactustab.contactusheadingpart1')}  <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent"> {t('contactustab.contactusheadingpart2')}</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            {t('contactustab.contactuspara')}
          </p>
        </div>
      </section>

      <section className="py-16 px-6 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            <div className="relative">
              <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-8 border border-white/10 backdrop-blur-sm">
                <h2 className="text-3xl font-bold text-white mb-2">  {t('contactustab.messageformtitle')}  </h2>
                <p className="text-gray-300 mb-8">  {t('contactustab.messageformdescription')}  </p>

                {submitStatus === 'success' && (
                  <div className="mb-6 p-4 bg-green-500/20 border border-green-500/30 rounded-lg flex items-center gap-3">
                    <CheckCircle className="text-green-400" size={20} />
                    <span className="text-green-300">  {t('contactustab.suceessmessagetext')}   </span>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg flex items-center gap-3">
                    <AlertCircle className="text-red-400" size={20} />
                    <span className="text-red-300">  {t('contactustab.errorMessagetext')} </span>
                  </div>
                )}

                {/* Updated: Remove the netlify form attributes from the main form */}
                <form onSubmit={handleSubmit}>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-gray-300 font-semibold mb-2">{t('contactustab.Namefield')}  *</label>
                      <input
                        type="text"
                        name="Name"
                        value={formData.Name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300"
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-300 font-semibold mb-2">{t('contactustab.Emailfield')} *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300"
                        placeholder="john@example.com"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-300 font-semibold mb-2"> {t('contactustab.Subjectfield')} *</label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300"
                        placeholder="How can we help you?"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-300 font-semibold mb-2">{t('contactustab.Messagefield')} *</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={5}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300 resize-vertical"
                        placeholder="Tell us more about your project and requirements..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting || hasSubmitted}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 disabled:scale-100 shadow-lg hover:shadow-blue-500/25 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          {t('contactustab.sendbutton')}
                          <Send size={20} />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Rest of your component remains the same */}
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-8 border border-white/10 backdrop-blur-sm">
                <h2 className="text-2xl font-bold text-white mb-6">  {t('contactustab.reachouttext')}  </h2>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="text-white" size={20} />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">   {t('contactustab.emailtext')}  </h3>
                      <div className="space-y-1">
                        <a href="mailto:stan@agentsify.ai" className="text-blue-400 hover:text-blue-300 transition-colors block">
                          stan@agentsify.ai
                        </a>
                        <a href="mailto:kirill@agentsify.ai" className="text-blue-400 hover:text-blue-300 transition-colors block">
                          kirill@agentsify.ai
                        </a>
                        <a href="mailto:szymon@agentsify.ai" className="text-blue-400 hover:text-blue-300 transition-colors block">
                          karani@agentsify.ai
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <PhoneCall className="text-white" size={20} />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">  {t('contactustab.scheuldeacall')}     </h3>
                      <button
                        onClick={openCalModal}
                        className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-green-500/25 flex items-center gap-2"
                      >
                        <Calendar size={16} />
                        {t('contactustab.bookacall')}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="text-white" size={20} />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">  {t('contactustab.locationtext')}  </h3>
                      <p className="text-gray-300 text-sm">  {t('contactustab.locationpara')}  </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-8 border border-white/10 backdrop-blur-sm">
                <h2 className="text-2xl font-bold text-white mb-6"> {t('contactustab.whychooseAgentsifytext')}  </h2>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg flex items-center justify-center">
                      <Headphones className="text-white" size={16} />
                    </div>
                    <div>
                      <p className="text-white font-semibold">{t('contactustab.Supporttext')}</p>
                      <p className="text-gray-300 text-sm">{t('contactustab.Supportpara')}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                      <Zap className="text-white" size={16} />
                    </div>
                    <div>
                      <p className="text-white font-semibold"> {t('contactustab.quicktext')}   </p>
                      <p className="text-gray-300 text-sm"> {t('contactustab.quickpara')}  </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg flex items-center justify-center">
                      <Shield className="text-white" size={16} />
                    </div>
                    <div>
                      <p className="text-white font-semibold">  {t('contactustab.securitytext')}   </p>
                      <p className="text-gray-300 text-sm"> {t('contactustab.securitypara')}    </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
                      <Star className="text-white" size={16} />
                    </div>
                    <div>
                      <p className="text-white font-semibold">   {t('contactustab.ratingtext')}  </p>
                      <p className="text-gray-300 text-sm">  {t('contactustab.ratingpara')}  </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />

      {isCalModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-4xl h-[80vh] relative">
            <button
              onClick={closeCalModal}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
            >
              <X className="text-gray-600" size={20} />
            </button>
            <iframe
              src="https://cal.com/agentsify/15min"
              width="100%"
              height="100%"
              style={{ border: 'none', borderRadius: '16px' }}
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
};

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}

export default ContactUs;
