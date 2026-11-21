import { Link } from "react-router";
import AppShell from "../components/AppShell";
import { PROBLEMS } from "../data/problems";
import { ArrowUpRightIcon, Code2Icon } from "lucide-react";
import { getDifficultyBadgeClass } from "../lib/utils";

function ProblemsPage() {
    const problems = Object.values(PROBLEMS);
    const counts = {
        Easy: problems.filter((p) => p.difficulty === "Easy").length,
        Medium: problems.filter((p) => p.difficulty === "Medium").length,
        Hard: problems.filter((p) => p.difficulty === "Hard").length,
    };

    return (
        <AppShell>
            <div className="space-y-4">
                <section className="panel relative overflow-hidden p-7 sm:p-9">
                    <div className="mb-6 flex flex-wrap items-center gap-2">
                        <span className="tag tag-lime">Library / 010</span>
                        <span className="tag">Curated</span>
                    </div>
                    <h1 className="pixel text-[46px] text-[var(--text)] sm:text-[62px]">
                        Problem <span className="text-[var(--lime)]">library.</span>
                    </h1>
                    <p className="mt-4 max-w-2xl text-[13px] leading-relaxed text-[#8b9097]">
                        Ten hand-picked challenges across strings, arrays, hash maps and dynamic
                        programming. Solve them solo, or open a room and work them out loud.
                    </p>
                </section>

                <section className="panel overflow-hidden">
                    <div className="flex items-center justify-between border-b border-[var(--line)] px-5 py-4">
                        <span className="micro micro-bright">All problems</span>
                        <span className="micro">Sort: index ↑</span>
                    </div>

                    <div>
                        {problems.map((problem, index) => (
                            <Link
                                key={problem.id}
                                to={`/problem/${problem.id}`}
                                className="group grid grid-cols-[36px_40px_1fr_auto] items-center gap-3 border-b border-[var(--line)] px-5 py-5 transition-colors last:border-b-0 hover:bg-[#14171a] sm:grid-cols-[48px_44px_1fr_180px_auto]"
                            >
                                <span className="font-mono text-[10px] text-[#5d6269]">
                                    C {String(index + 1).padStart(3, "0")}
                                </span>
                                <span className="grid size-9 place-items-center border border-[var(--line)] bg-[#15171a]">
                                    <Code2Icon
                                        className="size-4 text-[#7c8087] transition-colors group-hover:text-[var(--lime)]"
                                        strokeWidth={1.6}
                                    />
                                </span>
                                <div className="min-w-0">
                                    <h2 className="truncate text-sm font-semibold text-[var(--text)] transition-colors group-hover:text-[var(--lime)]">
                                        {problem.title}
                                    </h2>
                                    <p className="micro mt-1 truncate">{problem.category}</p>
                                    <p className="mt-2 line-clamp-1 max-w-2xl text-[12px] text-[#8b9097]">
                                        {problem.description.text}
                                    </p>
                                </div>
                                <div className="hidden sm:flex sm:items-center sm:gap-2">
                                    <span className={`badge ${getDifficultyBadgeClass(problem.difficulty)}`}>
                                        {problem.difficulty}
                                    </span>
                                </div>
                                <ArrowUpRightIcon className="size-4 text-[#5d6269] transition-colors group-hover:text-[var(--lime)]" />
                            </Link>
                        ))}
                    </div>

                    <div className="panel-bar">
                        <span>END OF LIST</span>
                        <span>{String(problems.length).padStart(3, "0")} ENTRIES</span>
                    </div>
                </section>

                <section className="panel grid grid-cols-2 divide-x divide-[var(--line)] sm:grid-cols-4">
                    {[
                        { label: "Total", value: problems.length, dot: "dot-cyan" },
                        { label: "Easy", value: counts.Easy, dot: "dot-green" },
                        { label: "Medium", value: counts.Medium, dot: "dot-yellow" },
                        { label: "Hard", value: counts.Hard, dot: "dot-pink" },
                    ].map((stat) => (
                        <div key={stat.label} className="flex items-center justify-between p-6">
                            <div>
                                <div className="pixel text-[34px] text-[var(--text)]">
                                    {String(stat.value).padStart(2, "0")}
                                </div>
                                <div className="micro mt-1">{stat.label}</div>
                            </div>
                            <i className={`dot ${stat.dot}`} />
                        </div>
                    ))}
                </section>
            </div>
        </AppShell>
    );
}
export default ProblemsPage;
