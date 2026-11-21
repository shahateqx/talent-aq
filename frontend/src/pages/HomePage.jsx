import { Link } from "react-router";
import {
    ArrowRightIcon,
    CheckIcon,
    Code2Icon,
    SparklesIcon,
    UsersIcon,
    VideoIcon,
} from "lucide-react";
import { SignInButton } from "@clerk/clerk-react";

const features = [
    {
        icon: VideoIcon,
        title: "Face to face, in flow",
        body: "Crystal-clear video and audio keep the conversation human while you work through the hard parts together.",
    },
    {
        icon: Code2Icon,
        title: "One editor, two minds",
        body: "A live coding workspace with syntax highlighting, multiple languages, and an instant run button.",
    },
    {
        icon: UsersIcon,
        title: "Built for collaboration",
        body: "Share a room, talk through trade-offs, and learn how another engineer actually thinks.",
    },
];

function HomePage() {
    return (
        <div className="min-h-screen">
            {/* NAV */}
            <nav className="sticky top-0 z-50 border-b border-[var(--line)] bg-[#0a0d13]/80 backdrop-blur-xl">
                <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5">
                    <Link to="/" className="group flex items-center gap-3">
                        <span className="relative grid size-10 place-items-center rounded-xl border border-[var(--line-strong)] bg-gradient-to-br from-[#2b261d] to-[#12151c] transition-transform duration-300 group-hover:scale-105">
                            <SparklesIcon className="size-[18px] text-[var(--gold-bright)]" strokeWidth={1.6} />
                        </span>
                        <span className="flex flex-col leading-none">
                            <span className="display-serif text-[23px] text-[#f3efe6]">
                                Talent <span className="italic text-[var(--gold-bright)]">AQ</span>
                            </span>
                            <span className="mt-1 text-[9px] font-semibold uppercase tracking-[0.28em] text-[#7d818c]">
                                An sX9 Project
                            </span>
                        </span>
                    </Link>

                    <SignInButton mode="modal">
                        <button className="group inline-flex items-center gap-2 rounded-full border border-[rgba(255,255,255,0.28)] bg-gradient-to-br from-[#f0d7b0] to-[#cfac79] px-6 py-3 text-[13px] font-semibold text-[#1a140c] shadow-[0_14px_36px_-16px_rgba(216,185,138,0.9)] transition-all duration-300 hover:-translate-y-0.5">
                            Get started
                            <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
                        </button>
                    </SignInButton>
                </div>
            </nav>

            {/* HERO */}
            <section className="relative overflow-hidden">
                <div className="glow-orb -left-40 top-0 size-[520px] bg-[rgba(163,126,72,0.15)]" />
                <div className="glow-orb -right-40 top-32 size-[460px] bg-[rgba(102,91,145,0.13)]" />
                <div
                    className="pointer-events-none absolute inset-0 opacity-[0.16]"
                    style={{
                        backgroundImage:
                            "linear-gradient(rgba(226,205,168,.07) 1px, transparent 1px), linear-gradient(90deg, rgba(226,205,168,.07) 1px, transparent 1px)",
                        backgroundSize: "72px 72px",
                        maskImage: "radial-gradient(ellipse at 50% 0%, black, transparent 70%)",
                    }}
                />

                <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-5 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:py-28">
                    <div className="animate-rise">
                        <span className="inline-flex items-center gap-2 rounded-full border border-[rgba(216,185,138,0.22)] bg-[rgba(216,185,138,0.06)] px-4 py-2">
                            <span className="pulse-dot size-1.5 rounded-full bg-[var(--gold)]" />
                            <span className="eyebrow !text-[10px]">Real-time collaboration</span>
                        </span>

                        <h1 className="display-serif mt-7 text-[54px] leading-[0.98] text-[#f3efe6] sm:text-6xl lg:text-[76px]">
                            Code together,
                            <br />
                            <span className="italic text-[var(--gold-bright)]">learn together.</span>
                        </h1>

                        <p className="mt-7 max-w-xl text-[16px] leading-[1.8] text-[#979ba5]">
                            A considered space for collaborative coding interviews and pair
                            programming. Meet face to face, think out loud, and solve problems that
                            actually make you better.
                        </p>

                        <div className="mt-7 flex flex-wrap gap-2.5">
                            {["Live video", "Shared editor", "Three languages"].map((item) => (
                                <span
                                    key={item}
                                    className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-white/[0.02] px-4 py-2 text-xs text-[#b9b6af]"
                                >
                                    <CheckIcon className="size-3.5 text-[var(--gold)]" strokeWidth={2} />
                                    {item}
                                </span>
                            ))}
                        </div>

                        <div className="mt-9 flex flex-wrap items-center gap-4">
                            <SignInButton mode="modal">
                                <button className="group inline-flex items-center gap-3 rounded-full border border-[rgba(255,255,255,0.28)] bg-gradient-to-br from-[#f0d7b0] to-[#cfac79] px-7 py-4 text-sm font-semibold text-[#1a140c] shadow-[0_18px_45px_-18px_rgba(216,185,138,0.9)] transition-all duration-300 hover:-translate-y-0.5">
                                    Start coding now
                                    <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
                                </button>
                            </SignInButton>
                            <a
                                href="#features"
                                className="inline-flex items-center gap-2.5 rounded-full border border-[var(--line-strong)] px-7 py-4 text-sm font-medium text-[#d7d4cc] transition-all duration-300 hover:border-[var(--gold-dim)] hover:text-[var(--gold-bright)]"
                            >
                                <VideoIcon className="size-4" strokeWidth={1.6} />
                                Explore the platform
                            </a>
                        </div>

                        <div className="surface mt-12 grid max-w-lg grid-cols-3 divide-x divide-[var(--line)] py-5">
                            {[
                                { value: "10K+", label: "Engineers" },
                                { value: "50K+", label: "Sessions" },
                                { value: "99.9%", label: "Uptime" },
                            ].map((stat) => (
                                <div key={stat.label} className="px-5 text-center">
                                    <div className="display-serif text-3xl text-[var(--gold-bright)]">
                                        {stat.value}
                                    </div>
                                    <div className="eyebrow mt-1 !tracking-[0.14em] !text-[#7f838d]">
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* HERO VISUAL */}
                    <div className="animate-rise relative mx-auto w-full max-w-[620px]" style={{ animationDelay: "120ms" }}>
                        <div className="absolute -inset-6 rounded-[2.5rem] bg-[radial-gradient(circle_at_50%_30%,rgba(216,185,138,0.16),transparent_65%)]" />
                        <div className="surface relative overflow-hidden !rounded-[26px] p-2.5">
                            <div className="relative overflow-hidden rounded-[18px] border border-[var(--line)] bg-[#0d1016]">
                                <img
                                    src="/hero.png"
                                    alt="Talent AQ collaborative coding workspace"
                                    className="h-auto w-full opacity-95"
                                />
                                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0b0e14]/40 via-transparent to-transparent" />
                            </div>
                            <div className="flex items-center justify-between px-4 py-3">
                                <span className="eyebrow !tracking-[0.16em] !text-[#7f838d]">
                                    The workspace
                                </span>
                                <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.14em] text-[#8d919b]">
                                    <span className="size-1.5 rounded-full bg-[#8cc5a2]" />
                                    Live
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FEATURES */}
            <section id="features" className="relative border-t border-[var(--line)] py-24">
                <div className="glow-orb left-1/2 top-0 size-[520px] -translate-x-1/2 bg-[rgba(102,91,145,0.09)]" />
                <div className="relative mx-auto max-w-7xl px-5">
                    <div className="mb-14 max-w-2xl">
                        <div className="mb-4 flex items-center gap-3">
                            <span className="h-px w-8 bg-[var(--gold)]" />
                            <span className="eyebrow">Thoughtfully built</span>
                        </div>
                        <h2 className="display-serif text-4xl text-[#f3efe6] sm:text-5xl">
                            Everything you need to{" "}
                            <span className="italic text-[var(--gold-bright)]">succeed.</span>
                        </h2>
                        <p className="mt-4 text-[15px] leading-relaxed text-[#9296a0]">
                            Fewer distractions, better conversations, and a workspace that gets out
                            of your way.
                        </p>
                    </div>

                    <div className="grid gap-5 md:grid-cols-3">
                        {features.map((feature, index) => (
                            <div
                                key={feature.title}
                                className="surface surface-hover group relative overflow-hidden p-7"
                            >
                                <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent opacity-40" />
                                <div className="mb-8 flex items-start justify-between">
                                    <span className="grid size-14 place-items-center rounded-full border border-[var(--line-strong)] bg-white/[0.025] transition-all duration-300 group-hover:border-[rgba(216,185,138,0.35)]">
                                        <feature.icon
                                            className="size-5 text-[var(--gold)]"
                                            strokeWidth={1.5}
                                        />
                                    </span>
                                    <span className="font-mono text-xs text-[#5d626c]">
                                        0{index + 1}
                                    </span>
                                </div>
                                <h3 className="display-serif text-[26px] text-[#f0ece3]">
                                    {feature.title}
                                </h3>
                                <p className="mt-3 text-sm leading-relaxed text-[#8d919b]">
                                    {feature.body}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <footer className="border-t border-[var(--line)] py-8">
                <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-5 text-xs text-[#6f747e]">
                    <span>Talent AQ · An sX9 project</span>
                    <span>Built for people who love the craft.</span>
                </div>
            </footer>
        </div>
    );
}
export default HomePage;
