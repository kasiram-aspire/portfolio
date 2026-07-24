import React, { useState, useRef } from 'react';
import { MapPin, Mail, Phone, Clock, Send, CheckCircle2, AlertCircle, Sparkles, ExternalLink } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ProfileData, AccentColor } from '../types';

interface ContactProps {
  profile: ProfileData;
  accentColor: AccentColor;
  presetSubject?: string;
}

export const Contact: React.FC<ContactProps> = ({ profile, accentColor, presetSubject = '' }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: presetSubject || 'Full-Time Role / Hiring',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Refs for focusing mandatory fields
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  // Preset quick subjects
  const quickSubjects = [
    'Full-Time Role / Hiring',
    'Consultation / Advisory',
    'Freelance Project',
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errorMessage) setErrorMessage('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.name.trim()) {
      setErrorMessage('Please enter your name.');
      nameRef.current?.focus();
      nameRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    if (!formData.email.trim()) {
      setErrorMessage('Please enter your email address.');
      emailRef.current?.focus();
      emailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    if (!formData.email.includes('@') || !formData.email.includes('.')) {
      setErrorMessage('Please enter a valid email address.');
      emailRef.current?.focus();
      emailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    if (!formData.message.trim()) {
      setErrorMessage('Please enter your message.');
      messageRef.current?.focus();
      messageRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to send message.');
      }

      setIsSubmitting(false);
      setSubmitted(true);

      // Launch Confetti Celebration
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#0284c7', '#38bdf8', '#34d399', '#f43f5e', '#a855f7'],
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: 'Full-Time Role / Hiring',
        message: '',
      });
    } catch (err: any) {
      setIsSubmitting(false);
      setErrorMessage(err.message || 'Failed to send message. Please try again.');
    }
  };

  const getAccentBg = () => {
    switch (accentColor) {
      case 'emerald': return 'bg-emerald-600 hover:bg-emerald-500';
      case 'violet': return 'bg-purple-600 hover:bg-purple-500';
      case 'rose': return 'bg-rose-600 hover:bg-rose-500';
      case 'amber': return 'bg-amber-600 hover:bg-amber-500';
      default: return 'bg-sky-600 hover:bg-sky-500';
    }
  };

  const getAccentText = () => {
    switch (accentColor) {
      case 'emerald': return 'text-emerald-500';
      case 'violet': return 'text-purple-500';
      case 'rose': return 'text-rose-500';
      case 'amber': return 'text-amber-500';
      default: return 'text-sky-500';
    }
  };

  return (
    <section id="contact" className="py-20 px-6 sm:px-10 lg:px-16 lg:ml-[300px] bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 transition-colors duration-300">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Header */}
        <div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white uppercase font-sans">
            Contact
          </h2>
          <div className={`h-1 w-16 ${getAccentBg()} rounded my-3`} />
          <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed max-w-3xl">
            Have a project in mind, a question, or a job opportunity? Feel free to reach out directly through the contact form or info details below.
          </p>
        </div>

        {/* Contact Info & Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Info Cards Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-start gap-4">
              <div className={`p-3.5 rounded-xl ${getAccentBg()} text-white shadow-md shrink-0`}>
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white">Location:</h4>
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">{profile.details.city}</p>
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-start gap-4">
              <div className={`p-3.5 rounded-xl ${getAccentBg()} text-white shadow-md shrink-0`}>
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white">Email:</h4>
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 truncate">{profile.details.email}</p>
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-start gap-4">
              <div className={`p-3.5 rounded-xl ${getAccentBg()} text-white shadow-md shrink-0`}>
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white">Call:</h4>
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">{profile.details.phone}</p>
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-start gap-4">
              <div className={`p-3.5 rounded-xl ${getAccentBg()} text-white shadow-md shrink-0`}>
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white">Open Hours:</h4>
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">Monday - Friday: 9am - 7pm EST</p>
              </div>
            </div>

            {/* Interactive Google Map Card */}
            <a
              href="https://www.google.com/maps?q=12.834601560696946,80.20031268755632"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 h-60 bg-slate-900 block shadow-sm hover:shadow-md transition-all duration-300"
              title="Click to view location in Google Maps"
            >
              <iframe
                title="Google Maps Location"
                src="https://maps.google.com/maps?q=12.834601560696946,80.20031268755632&z=15&output=embed"
                className="w-full h-full border-0 pointer-events-none opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-slate-950/10 group-hover:bg-transparent transition-colors pointer-events-none" />
              <div className="absolute bottom-3 left-3 right-3 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-3 rounded-xl border border-slate-200/80 dark:border-slate-800 flex items-center justify-between shadow-lg pointer-events-none">
                <div className="flex items-center gap-2.5">
                  <div className={`p-2 rounded-lg ${getAccentBg()} text-white shrink-0`}>
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">{profile.details.city}</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">12.8346° N, 80.2003° E</p>
                  </div>
                </div>
                <span className={`flex items-center gap-1.5 text-xs font-bold ${getAccentText()} group-hover:underline shrink-0`}>
                  <span>Open Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </span>
              </div>
            </a>
          </div>

          {/* Right Form Column */}
          <div className="lg:col-span-7 bg-slate-50 dark:bg-slate-800/50 p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xl">
            {submitted ? (
              <div className="text-center py-10 space-y-5">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
                    Thank you for reaching out! Your message has been sent directly to <span className="font-semibold text-slate-900 dark:text-white">kasiram186@gmail.com</span> via server dispatch. I will review it and reply back to your inbox as soon as possible.
                  </p>
                </div>

                <div className="pt-4">
                  <button
                    onClick={() => setSubmitted(false)}
                    className={`px-6 py-2.5 rounded-xl font-semibold text-xs text-white ${getAccentBg()} active:scale-95 transition-all shadow-md`}
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Send Me a Direct Message
                </h3>

                {errorMessage && (
                  <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xs font-semibold flex items-center gap-2.5">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Quick Subject Tags */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Quick Subject Topics
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {quickSubjects.map((sub) => (
                      <button
                        type="button"
                        key={sub}
                        onClick={() => setFormData({ ...formData, subject: sub })}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                          formData.subject === sub
                            ? `${getAccentBg()} text-white shadow-md`
                            : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        {sub}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                      Your Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      ref={nameRef}
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. John Doe"
                      className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                      Your Email <span className="text-rose-500">*</span>
                    </label>
                    <input
                      ref={emailRef}
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. john@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Project subject line"
                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    Message <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    ref={messageRef}
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe your project goals, timeline, or inquiry details..."
                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm transition-all"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 text-white shadow-xl transition-all duration-200 active:scale-95 ${getAccentBg()}`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Transmitting Message...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
