import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  Sparkles,
  Star,
  PartyPopper,
  GraduationCap,
  BookOpen,
  Rocket,
  ArrowRight,
  Beaker,
  ShieldCheck,
  Smile,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import heroImg from "@/assets/hero-science-party.jpg";
import birthdayImg from "@/assets/event-birthday.jpg";
import schoolImg from "@/assets/event-school.jpg";
import libraryImg from "@/assets/event-library.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BrightSpark Science — Unforgettable Kids' Science Parties & Events" },
      {
        name: "description",
        content:
          "Hands-on science parties, school workshops and library events that spark wonder. Book a BrightSpark experience full of bubbling, fizzing, jaw-dropping fun.",
      },
      { property: "og:title", content: "BrightSpark Science — Kids' Science Parties & Events" },
      {
        property: "og:description",
        content:
          "Hands-on science parties, workshops and events that spark wonder for kids of all ages.",
      },
      { property: "og:image", content: heroImg },
      { name: "twitter:image", content: heroImg },
    ],
  }),
  component: Index,
});

const events = [
  {
    icon: PartyPopper,
    title: "Birthday Parties",
    text: "A fizzing, foaming celebration where every guest becomes a junior scientist with goggles, experiments and a wow-finale.",
    img: birthdayImg,
  },
  {
    icon: GraduationCap,
    title: "School Workshops",
    text: "Curriculum-friendly hands-on sessions that bring STEM to life and leave whole classrooms buzzing with curiosity.",
    img: schoolImg,
  },
  {
    icon: BookOpen,
    title: "Library & Community Events",
    text: "Show-stopping demonstrations and interactive stations perfect for libraries, festivals and family days out.",
    img: libraryImg,
  },
];

const steps = [
  { icon: Beaker, title: "Goggles on", text: "Every child is kitted out and ready to experiment." },
  { icon: Sparkles, title: "Hands-on magic", text: "Real experiments — slime, eruptions, dry-ice clouds." },
  { icon: Rocket, title: "The big finale", text: "A jaw-dropping reaction nobody forgets." },
];

const testimonials = [
  {
    quote:
      "The best party we've ever hosted. The kids were glued for the full hour and still talk about the exploding foam!",
    name: "Sarah M.",
    role: "Birthday parent",
  },
  {
    quote:
      "Our whole year group was captivated. A brilliant, safe and genuinely educational workshop.",
    name: "Mr. Davies",
    role: "Primary teacher",
  },
  {
    quote:
      "Engaging, professional and so much fun. Our library event had the biggest turnout of the year.",
    name: "Priya K.",
    role: "Community librarian",
  },
];

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-brand-red/10 blur-3xl" />
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 md:py-24 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-sm font-semibold text-primary">
              <Sparkles className="h-4 w-4" /> Science that wows
            </span>
            <h1 className="mt-5 text-4xl font-black leading-[1.05] text-brand-navy sm:text-5xl lg:text-6xl">
              Unlock the{" "}
              <span className="text-brand-blue">Magic</span> of{" "}
              <span className="text-brand-red">Science</span>
            </h1>
            <p className="mt-5 max-w-md text-lg text-muted-foreground">
              Unforgettable hands-on science parties, school workshops and events. We bring the
              bubbling, fizzing, jaw-dropping fun — you bring the curious kids.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="hero" size="xl">
                <Link to="/booking">
                  Book a Party <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="heroOutline" size="xl">
                <a href="#events">See our events</a>
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-brand-blue" /> Fully insured & safe
              </span>
              <span className="flex items-center gap-2">
                <Smile className="h-5 w-5 text-brand-red" /> 500+ happy parties
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
            className="relative"
          >
            <div className="overflow-hidden rounded-3xl shadow-[var(--shadow-card)] ring-1 ring-border">
              <img
                src={heroImg}
                alt="Children doing colorful science experiments at a party"
                width={1600}
                height={1100}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-5 -left-5 hidden rounded-2xl bg-background p-4 shadow-[var(--shadow-card)] ring-1 ring-border sm:block">
              <p className="text-2xl font-black text-brand-blue">100%</p>
              <p className="text-xs font-semibold text-muted-foreground">hands-on fun</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What parties look like */}
      <section className="bg-secondary/50 py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-red">
              Where science meets play
            </p>
            <h2 className="mt-3 text-3xl font-bold text-brand-navy md:text-4xl">
              What our parties look like
            </h2>
            <p className="mt-4 text-muted-foreground">
              From the first goggles-on moment to the grand finale, every event is packed with
              real, safe, hands-on experiments kids get to do themselves.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {steps.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="rounded-2xl bg-background p-7 shadow-[var(--shadow-card)] ring-1 ring-border"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[image:var(--gradient-hero)] text-primary-foreground">
                  <s.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-xl font-bold text-brand-navy">{s.title}</h3>
                <p className="mt-2 text-muted-foreground">{s.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Events / services */}
      <section id="events" className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5">
          <div className="flex flex-col items-end justify-between gap-4 sm:flex-row">
            <div className="max-w-xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-blue">
                Our services
              </p>
              <h2 className="mt-3 text-3xl font-bold text-brand-navy md:text-4xl">
                Events we love to run
              </h2>
            </div>
            <Button asChild variant="accent" size="lg">
              <Link to="/booking">
                View pricing <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="mt-12 grid gap-7 md:grid-cols-3">
            {events.map((e, i) => (
              <motion.article
                key={e.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                className="group overflow-hidden rounded-2xl bg-background shadow-[var(--shadow-card)] ring-1 ring-border"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={e.img}
                    alt={e.title}
                    loading="lazy"
                    width={1000}
                    height={1000}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary text-brand-blue">
                    <e.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-xl font-bold text-brand-navy">{e.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{e.text}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Happy scientists */}
      <section className="bg-secondary/50 py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-red">
              Happy scientists
            </p>
            <h2 className="mt-3 text-3xl font-bold text-brand-navy md:text-4xl">
              Loved by parents, teachers & kids
            </h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <motion.figure
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex flex-col rounded-2xl bg-background p-7 shadow-[var(--shadow-card)] ring-1 ring-border"
              >
                <div className="flex gap-1 text-brand-yellow">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 text-foreground/80">"{t.quote}"</blockquote>
                <figcaption className="mt-5">
                  <p className="font-bold text-brand-navy">{t.name}</p>
                  <p className="text-sm text-muted-foreground">{t.role}</p>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-5">
          <div className="relative overflow-hidden rounded-3xl bg-[image:var(--gradient-hero)] px-8 py-14 text-center text-primary-foreground shadow-[var(--shadow-soft)] md:px-16">
            <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-brand-red/30 blur-2xl" />
            <h2 className="relative text-3xl font-bold md:text-4xl">
              Ready to spark some wonder?
            </h2>
            <p className="relative mx-auto mt-3 max-w-xl text-primary-foreground/80">
              Check live availability and reserve your date with a small deposit. It only takes a
              minute.
            </p>
            <div className="relative mt-7">
              <Button asChild variant="accent" size="xl">
                <Link to="/booking">
                  Book your event <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
