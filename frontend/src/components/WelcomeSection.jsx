import { useUser } from "@clerk/clerk-react";
import { ArrowRightIcon, PlusIcon } from "lucide-react";

function WelcomeSection({ onCreateSession }) {
    const { user } = useUser();

    return (
        <header className="relative overflow-hidden border-b border-[var(--line)]">
            <div className="glow-orb -top-40 right-[12%] size-[420px] bg-[rgba(163,126,72,0.16)]" />
            <div className="glow-orb top-10 left-[-10%] size-[380px] bg-[rgba(102,91,145,0.12)]" />

            <div className="relative max-w-7xl mx-auto px-6 py-14 lg:py-16">
                <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                    <div className="animate-rise">
                        <div className="mb-4 flex items-center gap-3">
                            <span className="h-px w-8 bg-[var(--gold)]" />
                            <span className="eyebrow">Your workspace</span>
                        </div>

                        <h1 className="display-serif text-[42px] leading-[1.05] text-[#f3efe6] sm:text-5xl lg:text-[56px]">
                            Welcome back,{" "}
                            <span className="italic text-[var(--gold-bright)]">
                                {user?.firstName || "there"}.
                            </span>
                        </h1>

                        <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-[#9296a0]">
                            Every great conversation starts with a problem worth solving.
                            Pick one, invite a partner, and make something brilliant together.
                        </p>
                    </div>

                    <button
                        onClick={onCreateSession}
                        className="group relative inline-flex shrink-0 items-center gap-4 overflow-hidden rounded-full border border-[rgba(255,255,255,0.28)] bg-gradient-to-br from-[#f0d7b0] to-[#cfac79] py-2 pl-2 pr-6 text-[#1a140c] shadow-[0_18px_45px_-18px_rgba(216,185,138,0.85)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_55px_-18px_rgba(216,185,138,1)]"
                    >
                        <span className="grid size-11 place-items-center rounded-full bg-[#17130d]/10 ring-1 ring-[#17130d]/15">
                            <PlusIcon className="size-5" strokeWidth={2} />
                        </span>
                        <span className="text-[15px] font-semibold tracking-wide">Create session</span>
                        <ArrowRightIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                </div>
            </div>
        </header>
    );
}
export default WelcomeSection;
