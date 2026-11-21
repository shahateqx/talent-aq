import { getDifficultyBadgeClass } from "../lib/utils";

function Section({ label, children }) {
    return (
        <section className="rounded-2xl border border-[var(--line)] bg-white/[0.018] p-5">
            <h2 className="eyebrow mb-4 !tracking-[0.18em]">{label}</h2>
            {children}
        </section>
    );
}

function ProblemDescription({ problem, currentProblemId, onProblemChange, allProblems }) {
    return (
        <div className="h-full overflow-y-auto bg-[#0c0f15]">
            <div className="border-b border-[var(--line)] bg-[#0e1118] px-6 py-6">
                <div className="mb-3 flex items-start justify-between gap-4">
                    <h1 className="display-serif text-[34px] leading-tight text-[#f3efe6]">
                        {problem.title}
                    </h1>
                    <span className={`badge mt-1 ${getDifficultyBadgeClass(problem.difficulty)}`}>
                        {problem.difficulty}
                    </span>
                </div>
                <p className="text-xs uppercase tracking-[0.16em] text-[#7f838d]">{problem.category}</p>

                <select
                    className="select select-sm mt-5 w-full !rounded-xl"
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

            <div className="space-y-5 p-6">
                <Section label="Description">
                    <div className="space-y-3 text-[14px] leading-[1.8] text-[#b6b3ac]">
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
                                    <span className="grid size-6 place-items-center rounded-full border border-[var(--line-strong)] font-mono text-[10px] text-[var(--gold)]">
                                        {idx + 1}
                                    </span>
                                    <span className="text-[13px] font-medium text-[#d7d4cc]">
                                        Example {idx + 1}
                                    </span>
                                </div>
                                <div className="space-y-2 rounded-xl border border-[var(--line)] bg-[#080a0f]/70 p-4 font-mono text-[13px]">
                                    <div className="flex gap-3">
                                        <span className="min-w-[62px] text-[var(--gold)]">Input</span>
                                        <span className="text-[#c9c6bf]">{example.input}</span>
                                    </div>
                                    <div className="flex gap-3">
                                        <span className="min-w-[62px] text-[#93ada6]">Output</span>
                                        <span className="text-[#c9c6bf]">{example.output}</span>
                                    </div>
                                    {example.explanation && (
                                        <div className="mt-2 border-t border-[var(--line)] pt-2 font-sans text-xs leading-relaxed text-[#858a94]">
                                            <span className="font-semibold text-[#b6b3ac]">Why: </span>
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
                            <li key={idx} className="flex gap-3 text-[13px] text-[#b6b3ac]">
                                <span className="mt-1.5 size-1 shrink-0 rounded-full bg-[var(--gold)]" />
                                <code className="font-mono">{constraint}</code>
                            </li>
                        ))}
                    </ul>
                </Section>
            </div>
        </div>
    );
}
export default ProblemDescription;
