import {
    ArrowRightIcon,
    Code2Icon,
    CrownIcon,
    SparklesIcon,
    UsersIcon,
    LoaderIcon,
} from "lucide-react";
import { Link } from "react-router";
import { getDifficultyBadgeClass } from "../lib/utils";

function SessionRow({ session, index, isUserInSession }) {
    const isFull = session.participant && !isUserInSession(session);

    return (
        <div className="group relative overflow-hidden rounded-2xl border border-[var(--line)] bg-white/[0.018] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--line-strong)] hover:bg-white/[0.035]">
            <span className="absolute inset-y-0 left-0 w-px bg-[var(--gold)] opacity-0 transition-opacity duration-300 group-hover:opacity-70" />
            <div className="flex items-center gap-4 p-5">
                <span className="hidden w-6 shrink-0 font-mono text-xs text-[#5f646e] sm:block">
                    {String(index + 1).padStart(2, "0")}
                </span>

                <span className="relative grid size-12 shrink-0 place-items-center rounded-xl border border-[var(--line-strong)] bg-gradient-to-br from-[#2a251c] to-[#12151c]">
                    <Code2Icon className="size-5 text-[var(--gold)]" strokeWidth={1.6} />
                    <span className="absolute -right-1 -top-1 size-3 rounded-full border-2 border-[#11151d] bg-[#8cc5a2]" />
                </span>

                <div className="min-w-0 flex-1">
                    <div className="mb-1.5 flex flex-wrap items-center gap-2">
                        <h3 className="truncate text-[15px] font-semibold text-[#f0ece3]">{session.problem}</h3>
                        <span className={`badge ${getDifficultyBadgeClass(session.difficulty)}`}>
                            {session.difficulty}
                        </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#8d919b]">
                        <span className="flex items-center gap-1.5">
                            <CrownIcon className="size-3.5 text-[var(--gold-dim)]" />
                            {session.host?.name}
                        </span>
                        <span className="flex items-center gap-1.5">
                            <UsersIcon className="size-3.5" />
                            {session.participant ? "2 / 2" : "1 / 2"}
                        </span>
                        <span
                            className={`badge !px-2 !py-0.5 ${isFull ? "badge-error" : "badge-success"}`}
                        >
                            {isFull ? "Full" : "Open"}
                        </span>
                    </div>
                </div>

                {isFull ? (
                    <span className="hidden shrink-0 rounded-full border border-[var(--line)] px-5 py-2 text-xs font-medium text-[#6e737d] sm:inline">
                        Full
                    </span>
                ) : (
                    <Link
                        to={`/session/${session._id}`}
                        className="group/btn inline-flex shrink-0 items-center gap-2 rounded-full border border-[rgba(216,185,138,0.28)] bg-[rgba(216,185,138,0.09)] px-5 py-2 text-xs font-semibold text-[var(--gold-bright)] transition-all duration-300 hover:border-[var(--gold)] hover:bg-[rgba(216,185,138,0.16)]"
                    >
                        {isUserInSession(session) ? "Rejoin" : "Join"}
                        <ArrowRightIcon className="size-3.5 transition-transform group-hover/btn:translate-x-0.5" />
                    </Link>
                )}
            </div>
        </div>
    );
}

function ActiveSessions({ sessions, isLoading, isUserInSession }) {
    return (
        <section className="surface flex h-full flex-col p-6 lg:col-span-2 lg:p-7">
            <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                    <span className="eyebrow">Happening now</span>
                    <h2 className="display-serif mt-2 text-3xl text-[#f3efe6]">Live sessions</h2>
                </div>
                <span className="flex items-center gap-2 rounded-full border border-[rgba(140,197,162,0.2)] bg-[rgba(140,197,162,0.07)] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#a5dcb9]">
                    <span className="pulse-dot size-1.5 rounded-full bg-[#8cc5a2]" />
                    {sessions.length} active
                </span>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto pr-1" style={{ maxHeight: 430 }}>
                {isLoading ? (
                    <div className="grid place-items-center py-20">
                        <LoaderIcon className="size-8 animate-spin text-[var(--gold)]" strokeWidth={1.5} />
                    </div>
                ) : sessions.length > 0 ? (
                    sessions.map((session, index) => (
                        <SessionRow
                            key={session._id}
                            session={session}
                            index={index}
                            isUserInSession={isUserInSession}
                        />
                    ))
                ) : (
                    <div className="grid place-items-center py-16 text-center">
                        <span className="mb-5 grid size-20 place-items-center rounded-full border border-[var(--line)] bg-white/[0.02]">
                            <SparklesIcon className="size-8 text-[var(--gold-dim)]" strokeWidth={1.2} />
                        </span>
                        <p className="text-base font-medium text-[#d7d4cc]">The floor is yours</p>
                        <p className="mt-1 text-sm text-[#7f838d]">
                            No live sessions yet — create one and invite a partner.
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
}
export default ActiveSessions;
