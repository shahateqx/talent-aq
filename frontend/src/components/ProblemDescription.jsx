import { getDifficultyBadgeClass } from "../lib/utils";

function Section({ label, children }) {
    return (
        <section className="border border-[var(--line)] bg-[#0f1114] p-5">
            <div className="micro mb-4 text-[var(--lime)]">{label}</div>
            {children}
        </section>
    );
}

function ProblemDescription({ problem, currentProblemId, onProblemChange, allProblems }) {
    return (
        <div className="h-full overflow-y-auto bg-[#0b0c0e]">
            <div className="border-b border-[var(--line)] bg-[#0e1013] px-6 py-6">
                <div className="mb-3 flex items-start justify-between gap-4">
                    <h1 className="pixel text-[32px] leading-none text-[var(--text)]">
                        {problem.title}
                    </h1>
                    <span className={`badge ${getDifficultyBadgeClass(problem.difficulty)}`}>
                        {problem.difficulty}
                    </span>
                </div>
                <div className="micro">{problem.category}</div>

                <select
                    className="select mt-5 w-full"
                    value={currentProblemId}
                    onChange={(e) => onProblemChange(e.target.value)}
                >
                    {allProblems.map((p) => (
                        <option key={p.id} value={p.id}>
                            {p.title} — {p.difficulty}
                        </option>
                    ))}
                </select>
            </div>

            <div className="space-y-4 p-6">
                <Section label="Description">
                    <div className="space-y-3 text-[13px] leading-[1.8] text-[#b7bbc1]">
                        <p>{problem.description.text}</p>
                        {problem.description.notes.map((note, idx) => (
                            <p key={idx}>{note}</p>
                        ))}
                    </div>
                </Section>

                <Section label="Examples">
                    <div className="space-y-5">
                        {problem.examples.map((example, idx) => (
                            <div key={idx}>
                                <div className="mb-2.5 flex items-center gap-2.5">
                                    <span className="grid size-6 place-items-center border border-[var(--line)] font-mono text-[10px] text-[var(--lime)]">
                                        {String(idx + 1).padStart(2, "0")}
                                    </span>
                                    <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-[#d8dade]">
                                        Example {idx + 1}
                                    </span>
                                </div>
                                <div className="space-y-2 border border-[var(--line)] bg-[#08090b] p-4 font-mono text-[12px] leading-relaxed">
                                    <div className="flex gap-3">
                                        <span className="min-w-[58px] text-[var(--lime)]">IN</span>
                                        <span className="break-all text-[#b7bbc1]">{example.input}</span>
                                    </div>
                                    <div className="flex gap-3">
                                        <span className="min-w-[58px] text-[var(--cyan)]">OUT</span>
                                        <span className="break-all text-[#b7bbc1]">{example.output}</span>
                                    </div>
                                    {example.explanation && (
                                        <div className="mt-2 border-t border-[var(--line)] pt-2 text-[11px] leading-relaxed text-[#7c8087]">
                                            <span className="text-[#b7bbc1]">Why: </span>
                                            {example.explanation}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </Section>

                <Section label="Constraints">
                    <ul className="space-y-2.5">
                        {problem.constraints.map((constraint, idx) => (
                            <li key={idx} className="flex gap-3 font-mono text-[12px] text-[#b7bbc1]">
                                <span className="text-[var(--lime)]">›</span>
                                <span>{constraint}</span>
                            </li>
                        ))}
                    </ul>
                </Section>
            </div>
        </div>
    );
}
export default ProblemDescription;
