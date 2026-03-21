'use client';

import { useState } from 'react';
import { MessageCircle, X, Send, Phone, Instagram } from 'lucide-react';

export function FloatingContact() {
  const [open, setOpen] = useState(false);

  const contacts = [
    {
      label: 'WhatsApp',
      href: 'https://wa.me/998959760747?text=Здравствуйте! Хочу узнать о товарах DUCANI.',
      icon: <Phone className="w-5 h-5" />,
      bg: 'bg-[#25D366]',
      text: 'text-white',
    },
    {
      label: 'Telegram',
      href: 'https://t.me/ducani_channel',
      icon: <Send className="w-5 h-5" />,
      bg: 'bg-[#229ED9]',
      text: 'text-white',
    },
    {
      label: 'Instagram',
      href: 'https://www.instagram.com/ducani_group/',
      icon: <Instagram className="w-5 h-5" />,
      bg: 'bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#F77737]',
      text: 'text-white',
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Contact buttons */}
      <div className={`flex flex-col items-end gap-3 transition-all duration-300 ${open ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
        {contacts.map((c) => (
          <a
            key={c.label}
            href={c.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-2.5 px-4 py-2.5 rounded-full shadow-xl ${c.bg} ${c.text} text-sm font-medium transition-transform hover:scale-105`}
          >
            {c.icon}
            {c.label}
          </a>
        ))}
      </div>

      {/* Main toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className={`w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 ${
          open ? 'bg-white/10 backdrop-blur border border-white/20 rotate-45' : 'bg-[#FFD700] hover:bg-[#FFC700]'
        }`}
      >
        {open
          ? <X className="w-6 h-6 text-white" />
          : <MessageCircle className="w-6 h-6 text-black" />
        }
      </button>
    </div>
  );
}
