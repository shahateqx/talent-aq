import { Link, useLocation } from "react-router";
import { BookOpenIcon, LayoutDashboardIcon, SparklesIcon } from "lucide-react";
import { UserButton } from "@clerk/clerk-react";

function Navbar() {
    const location = useLocation();

    const isActive = (path) =>
        location.pathname === path || location.pathname.startsWith(`${path}/`);

    return (
        <nav className="sticky top-0 z-50 border-b border-[var(--line)] bg-[#0a0d13]/85 backdrop-blur-xl">
            <div className="max-w-7xl mx-auto px-5 h-[72px] flex items-center justify-between">
                <Link to="/dashboard" className="group flex items-center gap-3">
                    <span className="relative size-10 rounded-xl border border-[var(--line-strong)] bg-gradient-to-br from-[#2b261d] to-[#12151c] grid place-items-center shadow-[0_10px_30px_-16px_rgba(216,185,138,0.6)] transition-transform duration-300 group-hover:scale-105">
                        <SparklesIcon className="size-[18px] text-[var(--gold-bright)]" strokeWidth={1.6} />
                    </span>
                    <span className="flex flex-col leading-none">
                        <span className="display-serif text-[22px] tracking-wide text-[#f3efe6]">
                            Talent <span className="text-[var(--gold-bright)] italic">AQ</span>
                        </span>
                        <span className="mt-1 text-[9px] font-semibold uppercase tracking-[0.28em] text-[#7d818c]">
                            An sX9 Project
                        </span>
                    </span>
                </Link>

                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 rounded-full border border-[var(--line)] bg-white/[0.02] p-1">
                        <Link
                            to="/problems"
                            className={`relative flex items-center gap-2 rounded-full px-4 py-2 text-sm transition-all duration-200 ${
                                isActive("/problems")
                                    ? "bg-[rgba(216,185,138,0.12)] text-[var(--gold-bright)]"
                                    : "text-[#9a9da6] hover:bg-white/[0.04] hover:text-[#e9e6df]"
                            }`}
                        >
                            <BookOpenIcon className="size-4" strokeWidth={1.7} />
                            <span className="hidden font-medium sm:inline">Problems</span>
                            {isActive("/problems") && (
                                <span className="absolute bottom-1 left-1/2 size-1 -translate-x-1/2 rounded-full bg-[var(--gold)]" />
                            )}
                        </Link>

                        <Link
                            to="/dashboard"
                            className={`relative flex items-center gap-2 rounded-full px-4 py-2 text-sm transition-all duration-200 ${
                                isActive("/dashboard")
                                    ? "bg-[rgba(216,185,138,0.12)] text-[var(--gold-bright)]"
                                    : "text-[#9a9da6] hover:bg-white/[0.04] hover:text-[#e9e6df]"
                            }`}
                        >
                            <LayoutDashboardIcon className="size-4" strokeWidth={1.7} />
                            <span className="hidden font-medium sm:inline">Dashboard</span>
                            {isActive("/dashboard") && (
                                <span className="absolute bottom-1 left-1/2 size-1 -translate-x-1/2 rounded-full bg-[var(--gold)]" />
                            )}
                        </Link>
                    </div>

                    <div className="ml-2 border-l border-[var(--line)] pl-4">
                        <UserButton />
                    </div>
                </div>
            </div>
        </nav>
    );
}
export default Navbar;
