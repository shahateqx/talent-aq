import { ArrowUpRightIcon, ClockIcon, Code2Icon, LoaderIcon, UsersIcon } from "lucide-react";
import { getDifficultyBadgeClass } from "../lib/utils";
import { formatDistanceToNow } from "date-fns";

function SessionCard({ session, index }) {
    return (
        <article className="panel panel-hover overflow-hidden">
            <div className="flex min-h-[190px] flex-col justify-between p-5">
                <div className="flex items-start justify-between">
                    <span className="grid size-10 place-items-center border border-[var(--line)] bg-[#15171a]">
                        <Code2Icon className="size-4 text-[var(--cyan)]" strokeWidth={1.6} />
                    </span>
                    {session.status === "active" ? (
                        <span className="tag tag-cyan">Active</span>
                    ) : (
                        <span className="font-mono text-[10px] text-[#5d6269]">
                            {String(index + 1).padStart(3, "0")}
                        </span>
                    )}
                </div>
                <div>
                    <h3 className="truncate text-sm font-semibold text-[var(--text)]">
                        {session.problem || "Untitled session"}
                    </h3>
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                        {session.difficulty && (
                            <span className={`badge ${getDifficultyBadgeClass(session.difficulty)}`}>
                                {session.difficulty}
                            </span>
                        )}
                        <span className="micro inline-flex items-center gap-1.5">
                            <ClockIcon className="size-3" />
                            {formatDistanceToNow(new Date(session.createdAt), { addSuffix: true })}
                        </span>
                    </div>
                    <div className="micro mt-2 inline-flex items-center gap-1.5">
                        <UsersIcon className="size-3" />
                        {session.participant ? "2 participants" : "1 participant"}
                    </div>
                </div>
            </div>
            <div className="panel-bar">
                <span>{new Date(session.updatedAt).toLocaleDateString()}</span>
                <ArrowUpRightIcon className="size-3.5" />
            </div>
        </article>
    );
}

function RecentSessions({ sessions, isLoading }) {
    return (
        <section className="panel mt-4 overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--line)] px-5 py-5">
                <div>
                    <div className="micro mb-2">The archive</div>
                    <h2 className="pixel text-[30px] text-[var(--text)]">Past sessions</h2>
                </div>
                <span className="micro micro-bright">{sessions.length} recorded</span>
            </div>

            <div className="p-5">
                {isLoading ? (
                    <div className="grid place-items-center py-20">
                        <LoaderIcon className="size-7 animate-spin text-[var(--lime)]" strokeWidth={1.5} />
                    </div>
                ) : sessions.length > 0 ? (
                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                        {sessions.map((session, index) => (
                            <SessionCard key={session._id} session={session} index={index} />
                        ))}
                    </div>
                ) : (
                    <div className="grid place-items-center py-20 text-center">
                        <p className="pixel text-[24px] text-[#d8dade]">Nothing archived yet</p>
                        <p className="micro mt-2">Solved sessions will live here.</p>
                    </div>
                )}
            </div>
        </section>
    );
}
export default RecentSessions;
