"use client";

import Link from "next/link";
import { FormEvent, useRef, useState } from "react";

type ProductResult = {
  slug: string;
  name: string;
  price: number;
  descriptor: string;
  stockLabel: string;
  lane: string;
};

type ReplyPayload = {
  text: string;
  products?: ProductResult[];
  suggestions?: string[];
  handoff?: boolean;
  intent: string;
};

type ChatMessage = {
  id: number;
  role: "assistant" | "user";
  text: string;
  products?: ProductResult[];
  suggestions?: string[];
  handoff?: boolean;
};

const welcome: ChatMessage = {
  id: 1,
  role: "assistant",
  text: "Hi! I’m the resident Mhenching attendant. I can help you find products, Christmas gifts, local-made items, payment options, pickup, and local delivery.",
  suggestions: ["Gifts under ₱200", "Mhenching Finds", "Gawang Magdalena", "How can I pay?"]
};

function peso(value: number) {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    maximumFractionDigits: 0
  }).format(value);
}

export function ResidentChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([welcome]);
  const [value, setValue] = useState("");
  const [sending, setSending] = useState(false);
  const nextId = useRef(2);

  async function send(text: string) {
    const clean = text.trim();
    if (!clean || sending) return;

    setMessages((current) => [...current, { id: nextId.current++, role: "user", text: clean }]);
    setValue("");
    setSending(true);

    try {
      const response = await fetch("/api/resident-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: clean })
      });

      if (!response.ok) throw new Error("Resident attendant request failed");
      const payload = (await response.json()) as ReplyPayload;
      setMessages((current) => [
        ...current,
        {
          id: nextId.current++,
          role: "assistant",
          text: payload.text,
          products: payload.products,
          suggestions: payload.suggestions,
          handoff: payload.handoff
        }
      ]);
    } catch {
      setMessages((current) => [
        ...current,
        {
          id: nextId.current++,
          role: "assistant",
          text: "I couldn’t reach the attendant service just now. Please try again shortly; sensitive order or payment issues should still be checked by a person."
        }
      ]);
    } finally {
      setSending(false);
    }
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void send(value);
  }

  return (
    <div className="resident-chat" data-open={open ? "true" : "false"}>
      {open ? (
        <section className="resident-panel" aria-label="Mhenching resident attendant">
          <header className="resident-header">
            <div>
              <div className="resident-kicker">Resident attendant · preview</div>
              <strong>Ask Mhenching</strong>
            </div>
            <button className="resident-close" type="button" onClick={() => setOpen(false)} aria-label="Close chat">
              ×
            </button>
          </header>

          <div className="resident-messages" aria-live="polite">
            {messages.map((message) => (
              <div className={`resident-message resident-message--${message.role}`} key={message.id}>
                <div className="resident-bubble">{message.text}</div>

                {message.handoff ? (
                  <div className="resident-handoff">Human review needed · the live handoff queue is the next connection.</div>
                ) : null}

                {message.products?.length ? (
                  <div className="resident-products">
                    {message.products.map((product) => (
                      <Link className="resident-product" href={`/product/${product.slug}`} key={product.slug} onClick={() => setOpen(false)}>
                        <span>
                          <strong>{product.name}</strong>
                          <small>{product.descriptor}</small>
                        </span>
                        <span className="resident-product-meta">
                          <strong>{peso(product.price)}</strong>
                          <small>{product.stockLabel}</small>
                        </span>
                      </Link>
                    ))}
                  </div>
                ) : null}

                {message.role === "assistant" && message.suggestions?.length ? (
                  <div className="resident-suggestions">
                    {message.suggestions.map((suggestion) => (
                      <button key={suggestion} type="button" onClick={() => void send(suggestion)} disabled={sending}>
                        {suggestion}
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}

            {sending ? <div className="resident-thinking">Checking Mhenching…</div> : null}
          </div>

          <form className="resident-form" onSubmit={submit}>
            <label className="sr-only" htmlFor="resident-message">Ask Mhenching</label>
            <input
              id="resident-message"
              value={value}
              onChange={(event) => setValue(event.target.value)}
              placeholder="Ask about products, delivery, GCash…"
              maxLength={600}
              autoComplete="off"
            />
            <button type="submit" disabled={sending || !value.trim()} aria-label="Send message">Send</button>
          </form>

          <footer className="resident-footnote">Product/payment answers are policy- and catalog-based. Sensitive cases are never auto-approved.</footer>
        </section>
      ) : null}

      <button className="resident-launcher" type="button" onClick={() => setOpen((current) => !current)} aria-expanded={open} aria-label="Open Mhenching attendant">
        <span className="resident-dot" aria-hidden="true" />
        <span>Ask Mhenching</span>
      </button>
    </div>
  );
}
