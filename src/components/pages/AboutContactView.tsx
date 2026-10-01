import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MessageCircle, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  Heart, 
  Building2, 
  Compass, 
  Send, 
  CheckCircle2,
  Sparkles,
  ExternalLink,
  Navigation,
  Store,
  Crown
} from 'lucide-react';
import { storageService, getWhatsAppUrl } from '../../services/storageService';
import { MedicalDisclaimer } from '../common/MedicalDisclaimer';

export const AboutContactView: React.FC = () => {
  const settings = storageService.getBusinessSettings();
  const mapsUrl = settings.googleMapsUrl || 'https://www.google.com/maps/search/?api=1&query=MAGNET+Pharmacy+Main+Road+Erandol+Maharashtra+425109';

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('General Enquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !message.trim()) return;

    // Send contact enquiry to storage service
    storageService.createEnquiry({
      customerName: name.trim(),
      phone: phone.trim(),
      email: email.trim() || undefined,
      deliveryMethod: 'discuss',
      items: [{ productName: `Contact Enquiry: ${subject}`, quantity: 1, notes: message }],
      message: `[Subject: ${subject}] ${message}`,
      preferredContact: 'whatsapp'
    });

    setSubmitted(true);
  };

  return (
    <div className="py-10 sm:py-16 bg-white min-h-screen space-y-16">
      
      {/* Hero Intro */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            About Magnet & Contact Helpdesk
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-display">
            Dedicated to Community Wellness & Healthcare Integrity
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Magnet is a comprehensive pharmacy, medical store, and general wellness destination committed to offering authentic medicines, compassionate customer service, and specialized pilgrimage health support.
          </p>

          {/* Premium Owner Badge in About section */}
          <div className="pt-2 flex justify-center">
            <div className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-3 px-4 py-2 rounded-2xl bg-emerald-50/90 border border-emerald-200 text-xs sm:text-sm shadow-2xs">
              <span className="flex items-center gap-1.5 font-bold text-emerald-950">
                <Crown className="w-4 h-4 text-amber-500 fill-amber-400 shrink-0" />
                <span>Founder & Owner: Ansari Rayyan - Erandol, Maharashtra</span>
              </span>
              <span className="hidden sm:inline text-emerald-300 font-light">|</span>
              <a 
                href="tel:7620059437"
                className="flex items-center gap-1.5 font-bold text-emerald-700 hover:text-emerald-900 transition-colors"
                title="Call Founder / Store Manager"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-600" />
                <span>Contact: 76200 59437</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Business Offerings Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-slate-50 rounded-3xl border border-slate-200/80 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg">
              Pharmacy & Medical Store
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Full inventory of genuine prescription pharmaceuticals, OTC wellness products, pediatric supplies, and healthcare devices dispensed under registered pharmacist supervision.
            </p>
          </div>

          <div className="p-6 bg-slate-50 rounded-3xl border border-slate-200/80 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-800 flex items-center justify-center">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg">
              Pilgrimage Medicine Support
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Specialized travel healthcare assistance for pilgrims visiting Makkah & Madina (Umrah & Hajj), including Ihram-safe hygiene items, blister care, and hydration packs.
            </p>
          </div>

          <div className="p-6 bg-slate-50 rounded-3xl border border-slate-200/80 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg">
              Personal Care & General Store
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Premium personal care, skincare, baby essentials, oral hygiene, and daily nutritional supplements from reputable national and international brands.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Channels & Location Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Contact Info & Store Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900 text-white p-8 rounded-3xl space-y-6 shadow-xl">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  Connect Directly
                </span>
                <h3 className="text-2xl font-bold font-display mt-1">
                  Contact Information
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Our pharmacy team is readily available during operating hours.
                </p>
              </div>

              <div className="space-y-4 text-sm">
                <a 
                  href={`tel:${settings.phone.replace(/\s+/g, '')}`}
                  className="flex items-start gap-4 p-3.5 bg-slate-800 rounded-2xl hover:bg-slate-700/80 transition-colors group"
                >
                  <div className="p-2.5 bg-emerald-950 text-emerald-400 rounded-xl group-hover:bg-emerald-600 group-hover:text-white transition-colors shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400">Phone Helpline</span>
                    <p className="font-bold text-white text-base">{settings.phone}</p>
                  </div>
                </a>

                <a 
                  href={`https://wa.me/91${settings.whatsappNumber.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 p-3.5 bg-slate-800 rounded-2xl hover:bg-slate-700/80 transition-colors group"
                >
                  <div className="p-2.5 bg-emerald-900/70 text-emerald-300 rounded-xl group-hover:bg-emerald-600 group-hover:text-white transition-colors shrink-0">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400">WhatsApp Chat</span>
                    <p className="font-bold text-emerald-300 text-base">{settings.phone}</p>
                  </div>
                </a>

                <a 
                  href={`mailto:${settings.email}`}
                  className="flex items-start gap-4 p-3.5 bg-slate-800 rounded-2xl hover:bg-slate-700/80 transition-colors group"
                >
                  <div className="p-2.5 bg-emerald-950 text-emerald-400 rounded-xl group-hover:bg-emerald-600 group-hover:text-white transition-colors shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="overflow-hidden">
                    <span className="text-xs text-slate-400">Email Inquiries</span>
                    <p className="font-bold text-white text-sm truncate">{settings.email}</p>
                  </div>
                </a>

                <div className="flex items-start gap-4 p-3.5 bg-slate-800 rounded-2xl">
                  <div className="p-2.5 bg-emerald-950 text-emerald-400 rounded-xl shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400">Operating Hours</span>
                    <p className="font-bold text-white text-sm">{settings.storeTimings || '9:00 AM – 11:00 PM (Daily)'}</p>
                    <p className="text-xs text-emerald-400 font-medium mt-0.5">Open All 7 Days (9:00 AM to 11:00 PM)</p>
                  </div>
                </div>

                <div className="p-3.5 bg-slate-800 rounded-2xl space-y-2.5">
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 bg-emerald-950 text-emerald-400 rounded-xl shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs text-slate-400">Pharmacy Address</span>
                      <p className="font-bold text-white text-sm leading-snug">{settings.address || 'Main Road, Erandol, Jalgaon District, Maharashtra - 425109'}</p>
                    </div>
                  </div>
                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-xs ml-11 cursor-pointer"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Get Directions on Google Maps</span>
                    <ExternalLink className="w-3 h-3 opacity-80" />
                  </a>
                </div>

                {/* Owner & Founder Badge Card */}
                <div className="pt-2 border-t border-slate-800/80">
                  <div className="flex items-center justify-between gap-3 bg-gradient-to-r from-emerald-950/70 to-slate-800/90 p-3.5 rounded-2xl border border-emerald-800/50">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">Founder & Store Manager</span>
                      <p className="font-bold text-white text-sm">Ansari Rayyan</p>
                      <p className="text-[11px] text-slate-400">Erandol, Maharashtra</p>
                    </div>
                    <a
                      href="tel:7620059437"
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all shadow-xs shrink-0"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>76200 59437</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Send Message Form */}
          <div className="lg:col-span-7 bg-slate-50 p-8 rounded-3xl border border-slate-200/90 shadow-2xs space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                Send a Message
              </span>
              <h3 className="text-2xl font-bold text-slate-900 font-display mt-0.5">
                Have a Question for our Pharmacist?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Fill out the form below or message us directly via WhatsApp.
              </p>
            </div>

            {submitted ? (
              <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-3">
                <div className="w-12 h-12 bg-emerald-600 text-white rounded-2xl flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-slate-900 text-base">Message Sent Successfully!</h4>
                <p className="text-xs text-slate-600 max-w-sm mx-auto">
                  Thank you for reaching out. Our pharmacy team will respond to your phone number <strong>{phone}</strong> shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-4 py-2 bg-emerald-700 text-white text-xs font-semibold rounded-xl"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-700">
                      Your Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Mohammed Rayyan"
                      className="w-full mt-1 px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700">
                      Mobile Number <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 7620059437"
                      className="w-full mt-1 px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-700">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. rayyanansari7666@gmail.com"
                      className="w-full mt-1 px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700">
                      Subject
                    </label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full mt-1 px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="General Enquiry">General Medicine Enquiry</option>
                      <option value="Pilgrimage Travel Kit">Pilgrimage (Umrah/Hajj) Support</option>
                      <option value="Prescription Verification">Prescription Verification</option>
                      <option value="Product Sourcing">Unlisted Medicine Sourcing</option>
                      <option value="Bulk Order">Group / Family Healthcare Kit</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700">
                    Message / Question <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="How can Magnet pharmacy assist you today? Please include medicine names, pack preferences, or any specific requirements..."
                    className="w-full mt-1 px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-4 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl shadow-md transition-all text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message to Magnet</span>
                </button>
              </form>
            )}

            <div className="pt-2">
              <a
                href={getWhatsAppUrl('Hello Magnet, I would like to speak with a pharmacist.')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-semibold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Prefer Quick Chat? Connect Instantly on WhatsApp</span>
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Store Location & Google Maps Card Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="p-6 sm:p-8 bg-gradient-to-r from-emerald-900 to-teal-900 text-white flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/80 border border-emerald-600/50 text-xs font-semibold text-emerald-200">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>Erandol, Jalgaon District, Maharashtra</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold font-display text-white">
                Visit MAGNET Pharmacy in Erandol
              </h3>
              <p className="text-sm text-emerald-100 max-w-xl">
                Located conveniently on Main Road, Erandol. Open every day from <strong>9:00 AM to 11:00 PM</strong> for prescription dispensing, counter pickup, and healthcare consultations.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-xl bg-white text-emerald-950 hover:bg-emerald-50 font-bold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <Navigation className="w-4 h-4 text-emerald-700" />
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5 text-emerald-600" />
              </a>
              <a
                href={`tel:${settings.phone.replace(/\s+/g, '')}`}
                className="px-4 py-3 rounded-xl bg-emerald-800/80 hover:bg-emerald-700 border border-emerald-600/60 text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer"
              >
                <Phone className="w-4 h-4 text-emerald-300" />
                <span>Call Store</span>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left Location Info Badges */}
            <div className="lg:col-span-5 p-6 sm:p-8 bg-slate-50 border-r border-slate-200 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                    <Store className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Store Address</h4>
                    <p className="font-bold text-slate-900 text-sm mt-0.5">
                      MAGNET Pharmacy & Medical Store
                    </p>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Main Road, Erandol, Jalgaon District, Maharashtra - 425109
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Shop Timings</h4>
                    <p className="font-bold text-slate-900 text-sm mt-0.5">
                      9:00 AM – 11:00 PM
                    </p>
                    <p className="text-xs text-emerald-700 font-medium mt-0.5">
                      Open All 7 Days (Monday to Sunday)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                    <Crown className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Store Owner</h4>
                    <p className="font-bold text-slate-900 text-sm mt-0.5">
                      Ansari Rayyan
                    </p>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Erandol, Maharashtra • Phone: +91 76200 59437
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200">
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all shadow-xs"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Get Live Directions (Google Maps)</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                </a>
              </div>
            </div>

            {/* Right Interactive Map Frame */}
            <div className="lg:col-span-7 h-72 sm:h-96 relative bg-slate-100">
              <iframe
                title="MAGNET Pharmacy Erandol Maharashtra Location Map"
                src="https://maps.google.com/maps?q=Erandol,+Maharashtra+425109&t=&z=14&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
              <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-lg shadow-sm border border-slate-200 text-[11px] font-semibold text-slate-800 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                <span>Erandol, Maharashtra (9 AM - 11 PM)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <MedicalDisclaimer />
      </div>

    </div>
  );
};
