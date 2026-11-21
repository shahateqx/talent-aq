import { Code2, Clock, Users, Trophy, Loader } from "lucide-react";
import { getDifficultyBadgeClass } from "../lib/utils";
import { formatDistanceToNow } from "date-fns";

function SessionCard({ session, index }) {
    return (
        <div className="group relative overflow-hidden rounded-2xl border border-[var(--line)] bg-white/[0.018] p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--line-strong)]">
            <span className="absolute right-5 top-4 font-mono text-[11px] text-[#5d626c]">
                {String(index + 1).padStart(2, "0")}
            </span>

            {session.status === "active" && (
                <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[rgba(140,197,162,0.25)] bg-[rgba(140,197,162,0.08)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#a5dcb9]">
                    <span className="pulse-dot size-1.5 rounded-full bg-[#8cc5a2]" />
                    Active
                </span>
            )}

            <div className="mb-5 flex items-start gap-3">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-[var(--line)] bg-gradient-to-br from-[#2a251c] to-[#12151c]">
                    <Code2 className="size-5 text-[var(--gold)]" strokeWidth={1.5} />
                </span>
                <div className="min-w-0 pt-0.5">
                    <h3 className="truncate pr-8 font-semibold text-[#f0ece3]">
                        {session.problem || "Untitled session"}
                    </h3>
                    {session.difficulty && (
                        <span className={`badge mt-2 ${getDifficultyBadgeClass(session.difficulty)}`}>
                            {session.difficulty}
                        </span>
                    )}
                </div>
            </div>

            <div className="space-y-2 text-xs text-[#8d919b]">
                <div className="flex items-center gap-2">
                    <Clock className="size-3.5 text-[var(--gold-dim)]" strokeWidth={1.6} />
                    {formatDistanceToNow(new Date(session.createdAt), { addSuffix: true })}
                </div>
                <div className="flex items-center gap-2">
                    <Users className="size-3.5 text-[var(--gold-dim)]" strokeWidth={1.6} />
                    {session.participant ? "2 participants" : "1 participant"}
                </div>
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-[var(--line)] pt-4">
                <span className="eyebrow !tracking-[0.14em] !text-[#777c86]">Completed</span>
                <span className="text-[11px] text-[#6f747e]">
                    {new Date(session.updatedAt).toLocaleDateString()}
                </span>
            </div>
        </div>
    );
}

function RecentSessions({ sessions, isLoading }) {
    return (
        <section className="surface mt-6 p-6 lg:p-7">
            <div className="mb-7 flex flex-wrap items-end justify-between gap-3">
                <div>
                    <span className="eyebrow">The archive</span>
                    <h2 className="display-serif mt-2 text-3xl text-[#f3efe6]">Your past sessions</h2>
                </div>
                <span className="text-xs text-[#7d818b]">{sessions.length} recorded</span>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {isLoading ? (
                    <div className="col-span-full grid place-items-center py-20">
                        <Loader className="size-8 animate-spin text-[var(--gold)]" strokeWidth={1.5} />
                    </div>
                ) : sessions.length > 0 ? (
                    sessions.map((session, index) => (
                        <SessionCard key={session._id} session={session} index={index} />
                    ))
                ) : (
                    <div className="col-span-full grid place-items-center py-16 text-center">
                        <span className="mb-5 grid size-20 place-items-center rounded-full border border-[var(--line)] bg-white/[0.02]">
                            <Trophy className="size-8 text-[var(--gold-dim)]" strokeWidth={1.2} />
                        </span>
                        <p className="text-base font-medium text-[#d7d4cc]">No sessions yet</p>
                        <p className="mt-1 text-sm text-[#7f838d]">
                            Your solved problems will live here.
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
}
export default RecentSessions;
