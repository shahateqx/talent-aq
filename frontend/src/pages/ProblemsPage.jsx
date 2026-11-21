import { Link } from "react-router";
import Navbar from "../components/Navbar";

import { PROBLEMS } from "../data/problems";
import { ChevronRightIcon, Code2Icon } from "lucide-react";
import { getDifficultyBadgeClass } from "../lib/utils";

function ProblemsPage() {
    const problems = Object.values(PROBLEMS);

    const easyProblemsCount = problems.filter((p) => p.difficulty === "Easy").length;
    const mediumProblemsCount = problems.filter((p) => p.difficulty === "Medium").length;
    const hardProblemsCount = problems.filter((p) => p.difficulty === "Hard").length;

    return (
        <div className="min-h-screen">
            <Navbar />

            <div className="relative overflow-hidden">
                <div className="glow-orb -top-52 left-[20%] size-[480px] bg-[rgba(163,126,72,0.12)]" />
                <div className="relative mx-auto max-w-6xl px-5 pb-8 pt-14">
                    <div className="animate-rise flex items-center gap-3">
                        <span className="h-px w-8 bg-[var(--gold)]" />
                        <span className="eyebrow">The library</span>
                    </div>
                    <h1 className="display-serif animate-rise mt-4 text-5xl text-[#f3efe6] sm:text-6xl">
                        Practice <span className="italic text-[var(--gold-bright)]">problems</span>
                    </h1>
                    <p className="animate-rise mt-4 max-w-2xl text-[15px] leading-relaxed text-[#9296a0]">
                        A curated set of challenges. Work them alone for craft, or open a room and
                        solve them with someone who sees the problem differently.
                    </p>
                </div>
            </div>

            <div className="mx-auto max-w-6xl px-5 pb-16">
                <div className="space-y-3">
                    {problems.map((problem, index) => (
                        <Link
                            key={problem.id}
                            to={`/problem/${problem.id}`}
                            className="group surface surface-hover flex items-center gap-5 p-5 sm:p-6"
                        >
                            <span className="hidden w-8 shrink-0 font-mono text-xs text-[#60656f] sm:block">
                                {String(index + 1).padStart(2, "0")}
                            </span>
                            <span className="grid size-12 shrink-0 place-items-center rounded-xl border border-[var(--line)] bg-white/[0.025] transition-colors duration-300 group-hover:border-[rgba(216,185,138,0.3)]">
                                <Code2Icon
                                    className="size-5 text-[var(--gold-dim)] transition-colors duration-300 group-hover:text-[var(--gold-bright)]"
                                    strokeWidth={1.5}
                                />
                            </span>

                            <div className="min-w-0 flex-1">
                                <div className="mb-1.5 flex flex-wrap items-center gap-3">
                                    <h2 className="text-[17px] font-semibold text-[#f0ece3] transition-colors group-hover:text-[var(--gold-bright)]">
                                        {problem.title}
                                    </h2>
                                    <span className={`badge ${getDifficultyBadgeClass(problem.difficulty)}`}>
                                        {problem.difficulty}
                                    </span>
                                    <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#6f747e]">
                                        {problem.category}
                                    </span>
                                </div>
                                <p className="line-clamp-2 max-w-3xl text-sm leading-relaxed text-[#8d919b]">
                                    {problem.description.text}
                                </p>
                            </div>

                            <span className="grid size-10 shrink-0 place-items-center rounded-full border border-[var(--line)] text-[var(--gold-dim)] transition-all duration-300 group-hover:border-[var(--gold)] group-hover:bg-[rgba(216,185,138,0.1)] group-hover:text-[var(--gold-bright)]">
                                <ChevronRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
                            </span>
                        </Link>
                    ))}
                </div>

                <div className="surface mt-10 grid grid-cols-2 divide-x divide-[var(--line)] sm:grid-cols-4">
                    {[
                        { label: "Total problems", value: problems.length, tone: "text-[#f3efe6]" },
                        { label: "Easy", value: easyProblemsCount, tone: "text-[#a5dcb9]" },
                        { label: "Medium", value: mediumProblemsCount, tone: "text-[#e6c98f]" },
                        { label: "Hard", value: hardProblemsCount, tone: "text-[#e6a49f]" },
                    ].map((stat) => (
                        <div key={stat.label} className="px-6 py-6 text-center">
                            <div className={`display-serif text-4xl ${stat.tone}`}>{stat.value}</div>
                            <div className="eyebrow mt-2 !tracking-[0.14em] !text-[#7f838d]">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
export default ProblemsPage;
