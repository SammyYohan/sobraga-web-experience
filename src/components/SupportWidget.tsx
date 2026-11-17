import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Phone, ChevronDown, Send, X } from 'lucide-react';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
}

export const SupportWidget: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activePanel, setActivePanel] = useState<'none' | 'chat' | 'call'>('none');
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm1',
      sender: 'bot',
      text: 'Bonjour ! Bienvenue sur le service consommateur SOBRAGA. Comment pouvons-nous vous aider aujourd’hui ?',
    },
  ]);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;
    const userMsg: Message = { id: `u-${Date.now()}`, sender: 'user', text: trimmed };
    let reply =
      'Merci pour votre message. Pour un traitement rapide par nos équipes à Libreville, vous pouvez également utiliser notre formulaire Contact ou appeler le +241 011 70 26 11.';
    const lower = trimmed.toLowerCase();
    if (lower.includes('prix') || lower.includes('regab')) {
      reply =
        'Le prix public conseillé de Régab 65 cl est fixé à 600 FCFA et la bouteille 33 cl à 350 FCFA. Consultez la grille complète dans « Prix homologués ».';
    } else if (lower.includes('emploi') || lower.includes('stage') || lower.includes('recrut')) {
      reply =
        'Vous pouvez déposer votre CV et lettre de motivation directement sur la page « Rejoignez-nous ».';
    } else if (lower.includes('vin') || lower.includes('cave')) {
      reply =
        'Notre Cave à vin Sovingab est joignable au 077 26 96 28 ou par email : arthur.nicolas@castel-afrique.com.';
    }
    setMessages((prev) => [...prev, userMsg, { id: `b-${Date.now()}`, sender: 'bot', text: reply }]);
    setInput('');
  };

  return (
    <div className="fixed right-5 bottom-5 z-40 flex flex-col items-end gap-2">
      <AnimatePresence>
        {activePanel === 'chat' && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.96 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-80 overflow-hidden rounded-2xl border border-neutral-200/80 bg-white/95 shadow-2xl backdrop-blur-md"
          >
            <div className="flex items-center justify-between bg-gradient-to-r from-[#7D0000] to-[#A40910] px-4 py-3.5 text-white">
              <div>
                <p className="text-sm font-bold">Service Consommateur</p>
                <p className="text-[11px] text-red-100">SOBRAGA · Les Boissons du Gabon</p>
              </div>
              <button
                type="button"
                onClick={() => setActivePanel('none')}
                aria-label="Fermer la messagerie"
                className="cursor-pointer rounded-lg p-1.5 transition hover:bg-white/15"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="max-h-64 space-y-3 overflow-y-auto bg-neutral-50/90 p-3.5 text-xs">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`rounded-xl px-3.5 py-2.5 leading-relaxed shadow-2xs ${
                    m.sender === 'user'
                      ? 'ml-8 bg-[#7D0000] text-white'
                      : 'mr-6 border border-neutral-200 bg-white text-neutral-800'
                  }`}
                >
                  {m.text}
                </div>
              ))}
            </div>
            <form
              onSubmit={sendMessage}
              className="flex items-center gap-2 border-t border-neutral-200 bg-white p-2.5"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Votre message..."
                aria-label="Message au support"
                className="flex-1 rounded-lg border border-neutral-200 px-3 py-2 text-xs focus:border-[#7D0000] focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Envoyer le message"
                className="cursor-pointer rounded-lg bg-[#7D0000] p-2 text-white transition hover:bg-[#9E0B0F]"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>
          </motion.div>
        )}

        {activePanel === 'call' && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.96 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-72 rounded-2xl border border-neutral-200/80 bg-white/95 p-4 shadow-2xl backdrop-blur-md"
          >
            <div className="flex items-center justify-between border-b border-neutral-100 pb-2.5">
              <p className="text-sm font-bold text-[#7D0000]">Nous appeler</p>
              <button
                type="button"
                onClick={() => setActivePanel('none')}
                aria-label="Fermer les numéros"
                className="cursor-pointer rounded-lg p-1 text-neutral-500 hover:bg-neutral-100"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-3 space-y-2.5 text-xs text-neutral-700">
              <div>
                <p className="font-semibold text-neutral-900">Standard Libreville / Owendo</p>
                <a href="tel:+241011701979" className="text-[#9E0B0F] hover:underline tabular-nums">
                  +241 011 70 19 79 / 011 70 19 69
                </a>
              </div>
              <div>
                <p className="font-semibold text-neutral-900">Numéro consommateur</p>
                <a href="tel:+241011702611" className="text-[#9E0B0F] hover:underline tabular-nums">
                  +241 011 70 26 11
                </a>
              </div>
              <button
                type="button"
                onClick={() => {
                  setActivePanel('none');
                  onNavigate('/contact');
                }}
                className="mt-1 w-full cursor-pointer rounded-lg bg-[#7D0000] py-2 font-semibold text-white transition hover:bg-[#9E0B0F]"
              >
                Ouvrir le formulaire Contact
              </button>
            </div>
          </motion.div>
        )}

        {menuOpen && activePanel === 'none' && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="w-48 overflow-hidden rounded-xl border border-neutral-200 bg-white/95 shadow-xl backdrop-blur-md"
          >
            <button
              type="button"
              onClick={() => {
                setActivePanel('chat');
                setMenuOpen(false);
              }}
              className="flex w-full cursor-pointer items-center gap-3 border-b border-neutral-100 px-4 py-3 text-left text-xs font-medium text-neutral-700 transition hover:bg-[#FDF6F6]"
            >
              <MessageSquare className="h-4 w-4 text-[#9E0B0F]" />
              <span>Chat with us</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setActivePanel('call');
                setMenuOpen(false);
              }}
              className="flex w-full cursor-pointer items-center gap-3 px-4 py-3 text-left text-xs font-medium text-neutral-700 transition hover:bg-[#FDF6F6]"
            >
              <Phone className="h-4 w-4 text-[#9E0B0F]" />
              <span>Call Us</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => {
          if (activePanel !== 'none') {
            setActivePanel('none');
          } else {
            setMenuOpen((o) => !o);
          }
        }}
        aria-label="Assistance Sobraga"
        className="group relative flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-gradient-to-br from-[#9E0B0F] to-[#6B0000] text-white shadow-lg ring-2 ring-white/80 transition-all duration-200 hover:scale-105 hover:shadow-xl"
      >
        {menuOpen || activePanel !== 'none' ? (
          <ChevronDown className="h-5 w-5" />
        ) : (
          <MessageSquare className="h-5 w-5" />
        )}
      </button>
    </div>
  );
};
