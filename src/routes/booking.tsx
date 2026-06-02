import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { format } from "date-fns";
import {
  Check,
  Star,
  CalendarDays,
  Clock,
  CreditCard,
  ShieldCheck,
  Lock,
  PartyPopper,
} from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Separator } from "@/components/ui/separator";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/booking")({
  head: () => ({
    meta: [
      { title: "Booking & Pricing — BrightSpark Science Parties" },
      {
        name: "description",
        content:
          "Check live availability, choose your science party package and reserve your date with a small refundable deposit. Simple, transparent pricing.",
      },
      { property: "og:title", content: "Booking & Pricing — BrightSpark Science" },
      {
        property: "og:description",
        content:
          "Choose a package, pick an available date and reserve with a refundable deposit.",
      },
    ],
  }),
  component: BookingPage,
});

const packages = [
  {
    id: "spark",
    name: "The Spark",
    price: 199,
    duration: "45 minutes",
    kids: "Up to 12 kids",
    popular: false,
    features: ["1 science host", "3 hands-on experiments", "Goggles for every child", "Take-home slime"],
  },
  {
    id: "blast",
    name: "The Blast",
    price: 299,
    duration: "60 minutes",
    kids: "Up to 20 kids",
    popular: true,
    features: [
      "1 science host",
      "5 hands-on experiments",
      "Goggles + lab coats",
      "Dry-ice cloud finale",
      "Take-home kit",
    ],
  },
  {
    id: "mega",
    name: "The Mega Lab",
    price: 449,
    duration: "90 minutes",
    kids: "Up to 30 kids",
    popular: false,
    features: [
      "2 science hosts",
      "7 hands-on experiments",
      "Goggles + lab coats",
      "Giant eruption finale",
      "Take-home kit",
      "Custom theme",
    ],
  },
];

const timeSlots = ["10:00 AM", "11:30 AM", "1:00 PM", "2:30 PM", "4:00 PM"];
const DEPOSIT = 50;

const bookingSchema = z.object({
  name: z.string().trim().min(1, "Enter your name").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z.string().trim().min(7, "Enter a valid phone number").max(20),
});

// Simulated availability: Mondays closed; every 3rd day fully booked.
function isDayUnavailable(date: Date) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (date < today) return true;
  if (date.getDay() === 1) return true; // Mondays closed
  if (date.getDate() % 7 === 0) return true; // pretend fully booked
  return false;
}

function BookingPage() {
  const [selectedPkg, setSelectedPkg] = useState("blast");
  const [date, setDate] = useState<Date | undefined>();
  const [time, setTime] = useState<string | undefined>();
  const [form, setForm] = useState({ name: "", email: "", phone: "" });

  const pkg = useMemo(() => packages.find((p) => p.id === selectedPkg)!, [selectedPkg]);
  const ready = Boolean(date && time && form.name && form.email && form.phone);

  const handleReserve = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !time) {
      toast.error("Please pick an available date and time.");
      return;
    }
    const result = bookingSchema.safeParse(form);
    if (!result.success) {
      toast.error(result.error.issues[0].message);
      return;
    }
    toast.success(
      `Date held! ${pkg.name} on ${format(date, "EEE d MMM")} at ${time}. Deposit step coming once payments are enabled.`,
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Header */}
      <section className="border-b border-border bg-secondary/40">
        <div className="mx-auto max-w-6xl px-5 py-14 text-center md:py-20">
          <span className="inline-flex items-center gap-2 rounded-full bg-background px-4 py-1.5 text-sm font-semibold text-brand-blue ring-1 ring-border">
            <PartyPopper className="h-4 w-4" /> Booking & Pricing
          </span>
          <h1 className="mx-auto mt-5 max-w-2xl text-4xl font-black text-brand-navy md:text-5xl">
            Reserve your science adventure
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Pick a package, choose an available date and hold your spot with a small refundable
            deposit of ${DEPOSIT}.
          </p>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className="text-center text-3xl font-bold text-brand-navy md:text-4xl">
            Choose your package
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {packages.map((p) => {
              const active = selectedPkg === p.id;
              return (
                <button
                  type="button"
                  key={p.id}
                  onClick={() => setSelectedPkg(p.id)}
                  className={cn(
                    "relative flex flex-col rounded-2xl border-2 bg-background p-7 text-left transition-all",
                    active
                      ? "border-brand-blue shadow-[var(--shadow-soft)]"
                      : "border-border hover:border-brand-blue/40",
                  )}
                >
                  {p.popular && (
                    <span className="absolute -top-3 right-6 inline-flex items-center gap-1 rounded-full bg-brand-red px-3 py-1 text-xs font-bold text-primary-foreground">
                      <Star className="h-3 w-3 fill-current" /> Most popular
                    </span>
                  )}
                  <h3 className="text-xl font-bold text-brand-navy">{p.name}</h3>
                  <div className="mt-3 flex items-end gap-1">
                    <span className="text-4xl font-black text-brand-blue">${p.price}</span>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-4 w-4" /> {p.duration}
                    </span>
                    <span>•</span>
                    <span>{p.kids}</span>
                  </div>
                  <Separator className="my-5" />
                  <ul className="flex-1 space-y-2.5">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-foreground/80">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <span
                    className={cn(
                      "mt-6 inline-flex items-center justify-center rounded-lg py-2.5 text-sm font-semibold",
                      active
                        ? "bg-brand-blue text-primary-foreground"
                        : "bg-secondary text-foreground",
                    )}
                  >
                    {active ? "Selected" : "Select"}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Calendar + reservation */}
      <section className="bg-secondary/40 py-16 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 lg:grid-cols-[1fr_minmax(0,420px)]">
          {/* Date & time */}
          <div className="rounded-2xl bg-background p-6 shadow-[var(--shadow-card)] ring-1 ring-border md:p-8">
            <h2 className="flex items-center gap-2 text-2xl font-bold text-brand-navy">
              <CalendarDays className="h-6 w-6 text-brand-blue" /> Check availability
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Greyed-out dates are unavailable. Mondays are our rest day!
            </p>
            <div className="mt-6 flex flex-col gap-8 md:flex-row md:items-start">
              <div className="rounded-xl border border-border p-2">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(d) => {
                    setDate(d);
                    setTime(undefined);
                  }}
                  disabled={isDayUnavailable}
                  className="[--cell-size:2.4rem]"
                />
              </div>
              <div className="flex-1">
                <h3 className="flex items-center gap-2 text-sm font-semibold text-brand-navy">
                  <Clock className="h-4 w-4 text-brand-blue" /> Available times
                </h3>
                {!date ? (
                  <p className="mt-3 text-sm text-muted-foreground">
                    Select a date to see available time slots.
                  </p>
                ) : (
                  <div className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-2">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setTime(slot)}
                        className={cn(
                          "rounded-lg border-2 px-3 py-2.5 text-sm font-semibold transition-colors",
                          time === slot
                            ? "border-brand-blue bg-brand-blue text-primary-foreground"
                            : "border-border bg-background text-foreground hover:border-brand-blue/40",
                        )}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Summary & deposit */}
          <motion.form
            onSubmit={handleReserve}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="h-fit rounded-2xl bg-background p-6 shadow-[var(--shadow-card)] ring-1 ring-border md:p-8 lg:sticky lg:top-24"
          >
            <h2 className="flex items-center gap-2 text-2xl font-bold text-brand-navy">
              <CreditCard className="h-6 w-6 text-brand-red" /> Your booking
            </h2>

            <dl className="mt-5 space-y-3 rounded-xl bg-secondary/60 p-4 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Package</dt>
                <dd className="font-semibold text-brand-navy">{pkg.name}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Date</dt>
                <dd className="font-semibold text-brand-navy">
                  {date ? format(date, "EEE d MMM yyyy") : "—"}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Time</dt>
                <dd className="font-semibold text-brand-navy">{time ?? "—"}</dd>
              </div>
              <Separator />
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Total</dt>
                <dd className="font-semibold text-brand-navy">${pkg.price}</dd>
              </div>
              <div className="flex justify-between text-base">
                <dt className="font-bold text-brand-navy">Deposit due today</dt>
                <dd className="font-black text-brand-red">${DEPOSIT}</dd>
              </div>
            </dl>

            <div className="mt-5 grid gap-3">
              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Full name"
                maxLength={100}
              />
              <Input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="Email address"
                maxLength={255}
              />
              <Input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="Phone number"
                maxLength={20}
              />
            </div>

            <Button
              type="submit"
              variant="hero"
              size="xl"
              className="mt-5 w-full"
              disabled={!ready}
            >
              <Lock className="h-4 w-4" /> Reserve with ${DEPOSIT} deposit
            </Button>

            <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
              <ShieldCheck className="h-4 w-4 text-brand-blue" /> Refundable deposit · secured
              checkout
            </p>
            <p className="mt-3 rounded-lg bg-secondary/60 p-3 text-center text-xs text-muted-foreground">
              Live payment processing activates once Lovable Cloud & payments are enabled.
            </p>
          </motion.form>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}