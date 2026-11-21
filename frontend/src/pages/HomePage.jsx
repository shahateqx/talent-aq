import { Link } from "react-router";
import { ArrowUpRightIcon, PlayIcon } from "lucide-react";
import { SignInButton, useUser } from "@clerk/clerk-react";
import AppShell from "../components/AppShell";

const features = [
    {
        tag: "Live video",
        title: "Face to face",
        body: "Crystal-clear video keeps the conversation human while you work through the hard parts.",
        index: "F 001",
        label: "Video call",
    },
    {
        tag: "Shared editor",
        title: "Type together",
        body: "One Monaco workspace, two cursors. Syntax highlighting for JavaScript, Python and Java.",
        index: "F 002",
        label: "Live editing",
    },
    {
        tag: "Judge0",
        title: "Run instantly",
        body: "Execute solutions in a sandbox and check them against expected output in one click.",
        index: "F 003",
        label: "Code execution",
    },
];

function HomePage() {
    const { isSignedIn } = useUser();

    return (
        <AppShell>
            <div className="space-y-4">
                {/* HERO GRID */}
                <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
                    <section className="panel relative flex min-h-[440px] flex-col overflow-hidden p-7 sm:p-9">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                            <span className="tag tag-lime">Featured / 001</span>
                            <span className="tag tag-pink">Open beta</span>
                        </div>

                        <div className="my-auto py-10">
                            <div className="micro mb-6">Collaborative coding studio</div>
                            <h1 className="pixel text-[52px] text-[var(--lime)] sm:text-[66px] lg:text-[76px]">
                                Interview prep
                                <br />
                                on another
                                <br />
                                <span className="text-[var(--text)]">level.</span>
                            </h1>
                        </div>

                        <div className="flex flex-wrap items-center gap-3">
                            {isSignedIn ? (
                                <Link to="/dashboard" className="btn-cyan">
                                    Enter studio <ArrowUpRightIcon className="size-4" />
                                </Link>
                            ) : (
                                <SignInButton mode="modal">
                                    <button className="btn-cyan">
                                        Get started <ArrowUpRightIcon className="size-4" />
                                    </button>
                                </SignInButton>
                            )}
                            <a href="#features" className="btn-void">
                                Explore features
                            </a>
                        </div>
                    </section>

                    <section className="panel group relative min-h-[440px] overflow-hidden">
                        <img
                            src="/hero.png"
                            alt="Two developers pair programming"
                            className="absolute inset-0 h-full w-full object-cover opacity-60 grayscale transition-all duration-500 group-hover:scale-[1.03] group-hover:opacity-75"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#08090b] via-[#08090b]/25 to-transparent" />
                        <div className="absolute left-4 top-4">
                            <span className="tag">Watch / Demo</span>
                        </div>
                        <div className="absolute inset-0 grid place-items-center">
                            <span className="grid size-16 place-items-center rounded-full border border-[var(--cyan)] bg-[#08090b]/70 text-[var(--cyan)] shadow-[0_0_40px_-8px_rgba(34,211,238,0.7)] transition-transform group-hover:scale-110">
                                <PlayIcon className="size-6 fill-current" />
                            </span>
                        </div>
                        <div className="absolute inset-x-0 bottom-0 panel-bar bg-[#0b0c0e]/85">
                            <span>INTRO / 00:42</span>
                            <span className="text-[var(--cyan)]">PLAY ▸</span>
                        </div>
                    </section>
                </div>

                {/* FEATURE CARDS */}
                <div id="features" className="grid gap-4 md:grid-cols-3">
                    {features.map((feature) => (
                        <article key={feature.index} className="panel panel-hover group overflow-hidden">
                            <div className="flex min-h-[210px] flex-col justify-between p-6">
                                <span className="tag w-fit">{feature.tag}</span>
                                <div>
                                    <h2 className="pixel text-[34px] text-[#d8dade] transition-colors group-hover:text-[var(--lime)]">
                                        {feature.title}
                                    </h2>
                                    <p className="mt-3 max-w-xs text-[13px] leading-relaxed text-[#8b9097]">
                                        {feature.body}
                                    </p>
                                </div>
                            </div>
                            <div className="panel-bar">
                                <span>{feature.index} / {feature.label}</span>
                                <ArrowUpRightIcon className="size-3.5 text-[var(--muted)] transition-colors group-hover:text-[var(--lime)]" />
                            </div>
                        </article>
                    ))}
                </div>

                {/* STATS */}
                <div className="panel grid grid-cols-1 divide-y divide-[var(--line)] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
                    {[
                        { value: "10K+", label: "Engineers", dot: "dot-pink" },
                        { value: "50K+", label: "Sessions", dot: "dot-yellow" },
                        { value: "99.9%", label: "Uptime", dot: "dot-green" },
                    ].map((stat) => (
                        <div key={stat.label} className="flex items-center justify-between gap-4 p-7">
                            <div>
                                <div className="pixel text-[38px] text-[var(--text)]">{stat.value}</div>
                                <div className="micro mt-1">{stat.label}</div>
                            </div>
                            <i className={`dot ${stat.dot}`} />
                        </div>
                    ))}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 pt-2">
                    <span className="micro">Talent AQ — an sX9 project</span>
                    <span className="micro">Built for people who love the craft.</span>
                </div>
            </div>
        </AppShell>
    );
}
export default HomePage;
