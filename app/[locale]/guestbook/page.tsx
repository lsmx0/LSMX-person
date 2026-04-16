"use client";

import { useTranslations } from "next-intl";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send } from "lucide-react";
import { HandDrawnCard, HandDrawnUnderline } from "@/components/hand-drawn";
import type { GuestbookMessage } from "@/lib/supabase";

export default function GuestbookPage() {
  const t = useTranslations("guestbook");
  const [messages, setMessages] = useState<GuestbookMessage[]>([]);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchMessages = useCallback(async () => {
    try {
      const res = await fetch("/api/guestbook");
      if (res.ok) {
        const data = await res.json();
        setMessages(data);
      }
    } catch (e) {
      console.error("Failed to fetch messages:", e);
    }
  }, []);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !content.trim()) return;
    setLoading(true);

    // Optimistic update
    const optimisticMsg: GuestbookMessage = {
      id: Math.random().toString(36).slice(2) + Date.now().toString(36),
      name: name.trim(),
      content: content.trim(),
      created_at: new Date().toISOString(),
    };
    setMessages((prev) => [optimisticMsg, ...prev]);
    setName("");
    setContent("");

    try {
      await fetch("/api/guestbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: optimisticMsg.name, content: optimisticMsg.content }),
      });
      fetchMessages();
    } catch (e) {
      console.error("Failed to post message:", e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-bold">{t("title")}</h1>
        <HandDrawnUnderline width={180} seed={30} className="mt-2" />
        <p className="text-[var(--muted)] mt-3">{t("description")}</p>
      </div>

      {/* Form */}
      <HandDrawnCard seed={500} hoverEffect={false} className="mb-10 bg-[var(--card-bg)]">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t("namePlaceholder")}
            className="bg-transparent border-b-2 border-sketch-stroke/30 focus:border-sketch-accent2 outline-none py-2 px-1 transition-colors"
            required
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={t("messagePlaceholder")}
            rows={3}
            className="bg-transparent border-b-2 border-sketch-stroke/30 focus:border-sketch-accent2 outline-none py-2 px-1 transition-colors resize-none"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="self-end flex items-center gap-2 px-4 py-2 bg-sketch-accent2/20 hover:bg-sketch-accent2/30 border border-sketch-accent2/50 rounded-lg transition-colors disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
            {t("submit")}
          </button>
        </form>
      </HandDrawnCard>

      {/* Messages */}
      {messages.length === 0 ? (
        <p className="text-center text-[var(--muted)]">{t("empty")}</p>
      ) : (
        <div className="flex flex-col gap-4">
          <AnimatePresence>
            {messages.map((msg, i) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ delay: i * 0.05 }}
              >
                <HandDrawnCard seed={600 + i} hoverEffect={false} className="bg-[var(--card-bg)]">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-bold text-sm">{msg.name}</p>
                      <p className="mt-1">{msg.content}</p>
                    </div>
                    <time className="text-xs text-[var(--muted)] whitespace-nowrap">
                      {new Date(msg.created_at).toLocaleDateString()}
                    </time>
                  </div>
                </HandDrawnCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
