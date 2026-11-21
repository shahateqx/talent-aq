import { useUser } from "@clerk/clerk-react";
import { ArrowUpRightIcon, PlusIcon } from "lucide-react";

function WelcomeSection({ onCreateSession }) {
    const { user } = useUser();

    return (
        <section className="panel relative overflow-hidden p-7 sm:p-9">
            <div className="pointer-events-none absolute right-6 top-6 hidden items-center gap-2 sm:flex">
                <span className="tag tag-cyan">Workspace</span>
                <span className="tag">Active</span>
            </div>

            <div className="micro mb-5 flex items-center gap-3">
                <span className="h-px w-8 bg-[var(--lime)]" />
                Your dashboard
            </div>

            <h1 className="pixel max-w-3xl text-[42px] text-[var(--text)] sm:text-[58px]">
                Welcome back,
                <br />
                <span className="text-[var(--lime)]">{user?.firstName || "developer"}.</span>
            </h1>

            <p className="mt-5 max-w-xl text-[13px] leading-relaxed text-[#8b9097]">
                Every great conversation starts with a problem worth solving. Open a room, choose a
                challenge, and build something together.
            </p>

            <button onClick={onCreateSession} className="btn-cyan mt-7">
                <PlusIcon className="size-4" strokeWidth={2.2} />
                Create session
                <ArrowUpRightIcon className="size-4" />
            </button>
        </section>
    );
}
export default WelcomeSection;
