import {
    ArrowRightIcon,
    Code2Icon,
    CrownIcon,
    LoaderIcon,
    RadioIcon,
    UsersIcon,
} from "lucide-react";
import { Link } from "react-router";
import { getDifficultyBadgeClass } from "../lib/utils";

function SessionRow({ session, index, isUserInSession }) {
    const isFull = session.participant && !isUserInSession(session);

    return (
        <div className="group flex items-center gap-4 border-b border-[var(--line)] px-5 py-4 last:border-b-0 hover:bg-[#14171a]">
            <span className="w-8 shrink-0 font-mono text-[10px] text-[#5d6269]">
                {String(index + 1).padStart(3, "0")}
            </span>
            <span className="relative grid size-10 shrink-0 place-items-center border border-[var(--line)] bg-[#15171a]">
                <Code2Icon className="size-4 text-[var(--lime)]" strokeWidth={1.6} />
                <span className="absolute -right-1 -top-1 dot dot-green" />
            </span>
            <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                    <h3 className="truncate text-sm font-semibold text-[var(--text)]">
                        {session.problem || "Problem to be chosen"}
                    </h3>
                    {session.difficulty && (
                        <span className={`badge ${getDifficultyBadgeClass(session.difficulty)}`}>
                            {session.difficulty}
                        </span>
                    )}
                </div>
                <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 micro">
                    <span className="inline-flex items-center gap-1.5">
                        <CrownIcon className="size-3" /> {session.host?.name}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                        <UsersIcon className="size-3" /> {session.participant ? "2 / 2" : "1 / 2"}
                    </span>
                </div>
            </div>
            {isFull ? (
                <span className="tag shrink-0">Full</span>
            ) : (
                <Link
                    to={`/session/${session._id}`}
                    className="btn btn-lime-outline shrink-0 gap-2 !px-4 !py-2"
                >
                    {isUserInSession(session) ? "Rejoin" : "Join"}
                    <ArrowRightIcon className="size-3.5" />
                </Link>
            )}
        </div>
    );
}

function ActiveSessions({ sessions, isLoading, isUserInSession }) {
    return (
        <section className="panel flex h-full flex-col overflow-hidden lg:col-span-2">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--line)] px-5 py-5">
                <div>
                    <div className="micro mb-2">Happening now</div>
                    <h2 className="pixel text-[30px] text-[var(--text)]">Live sessions</h2>
                </div>
                <div className="flex items-center gap-2">
                    <i className="dot dot-green blink" />
                    <span className="micro micro-bright">{sessions.length} active</span>
                </div>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto" style={{ maxHeight: 440 }}>
                {isLoading ? (
                    <div className="grid place-items-center py-20">
                        <LoaderIcon className="size-7 animate-spin text-[var(--lime)]" strokeWidth={1.5} />
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
                    <div className="grid place-items-center px-6 py-20 text-center">
                        <RadioIcon className="mb-4 size-9 text-[#4d5259]" strokeWidth={1.2} />
                        <p className="pixel text-[24px] text-[#d8dade]">No live rooms</p>
                        <p className="micro mt-2">Create one and invite a partner.</p>
                    </div>
                )}
            </div>

            <div className="panel-bar">
                <span>SYS / ROOMS</span>
                <span>{String(sessions.length).padStart(3, "0")} ENTRIES</span>
            </div>
        </section>
    );
}
export default ActiveSessions;
