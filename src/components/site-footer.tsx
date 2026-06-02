import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Mail, Phone, MapPin, Instagram, Facebook, FlaskConical, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  message: z.string().trim().min(1, "Tell us a little about your event").max(1000),
});

export function SiteFooter() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse(form);
    if (!result.success) {
      toast.error(result.error.issues[0].message);
      return;
    }
    toast.success("Thanks! We'll be in touch within 24 hours. 🧪");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <footer id="contact" className="bg-[image:var(--gradient-navy)] text-primary-foreground">
      <div className="mx-auto max-w-6xl px-5 py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-yellow">
              Get in Touch
            </p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">Contact us</h2>
            <p className="mt-4 max-w-md text-primary-foreground/70">
              Planning a birthday, school workshop or library event? Send us a message and
              we'll help you craft the perfect science experience.
            </p>

            <ul className="mt-8 space-y-4 text-sm">
              <li className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-foreground/10">
                  <Mail className="h-5 w-5 text-brand-yellow" />
                </span>
                <a href="mailto:hello@brightspark.science" className="hover:underline">
                  hello@brightspark.science
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-foreground/10">
                  <Phone className="h-5 w-5 text-brand-yellow" />
                </span>
                <a href="tel:+15551234567" className="hover:underline">
                  +1 (555) 123-4567
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-foreground/10">
                  <MapPin className="h-5 w-5 text-brand-yellow" />
                </span>
                Serving the greater metro area & surrounds
              </li>
            </ul>

            <div className="mt-8 flex gap-3">
              <a
                href="#"
                aria-label="Instagram"
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-foreground/10 transition-colors hover:bg-brand-red"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-foreground/10 transition-colors hover:bg-brand-red"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-2xl bg-primary-foreground/5 p-6 ring-1 ring-primary-foreground/10 md:p-8"
          >
            <div className="grid gap-4">
              <div className="grid gap-2">
                <label htmlFor="cf-name" className="text-sm font-semibold">
                  Name
                </label>
                <Input
                  id="cf-name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your name"
                  maxLength={100}
                  className="border-primary-foreground/20 bg-primary-foreground/5 text-primary-foreground placeholder:text-primary-foreground/40"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="cf-email" className="text-sm font-semibold">
                  Email
                </label>
                <Input
                  id="cf-email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@email.com"
                  maxLength={255}
                  className="border-primary-foreground/20 bg-primary-foreground/5 text-primary-foreground placeholder:text-primary-foreground/40"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="cf-message" className="text-sm font-semibold">
                  Message
                </label>
                <Textarea
                  id="cf-message"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell us about your event…"
                  rows={4}
                  maxLength={1000}
                  className="border-primary-foreground/20 bg-primary-foreground/5 text-primary-foreground placeholder:text-primary-foreground/40"
                />
              </div>
              <Button type="submit" variant="accent" size="lg" className="mt-1 w-full">
                <Send className="h-4 w-4" /> Send message
              </Button>
            </div>
          </form>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-primary-foreground/10 pt-8 text-sm text-primary-foreground/60 sm:flex-row">
          <span className="flex items-center gap-2">
            <FlaskConical className="h-4 w-4 text-brand-yellow" /> © {new Date().getFullYear()}{" "}
            BrightSpark Science
          </span>
          <div className="flex gap-6">
            <Link to="/" className="hover:text-primary-foreground">
              Home
            </Link>
            <Link to="/booking" className="hover:text-primary-foreground">
              Booking
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}