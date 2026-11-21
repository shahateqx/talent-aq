import { Link, useLocation } from "react-router";
import {
    ArrowUpRightIcon,
    BookOpenIcon,
    Code2Icon,
    LayoutGridIcon,
    PlusIcon,
    SearchIcon,
} from "lucide-react";
import { SignInButton, SignOutButton, useUser } from "@clerk/clerk-react";

function BrandMark() {
    return (
        <svg viewBox="0 0 24 24" className="size-[19px]" aria-hidden="true">
            <polyline points="9.5,7 4.5,12 9.5,17" fill="none" stroke="#22d3ee" strokeWidth="2.4" strokeLinecap="square" strokeLinejoin="miter" />
            <polyline points="14.5,7 19.5,12 14.5,17" fill="none" stroke="#e8ff3a" strokeWidth="2.4" strokeLinecap="square" strokeLinejoin="miter" />
            <line x1="13.8" y1="5.5" x2="10.2" y2="18.5" stroke="#ff3d81" strokeWidth="2.2" strokeLinecap="square" />
        </svg>
    );
}

function NavItem({ to, icon, label, active }) {
    return (
        <Link to={to} className={`nav-item ${active ? "active" : ""}`}>
            {icon}
            <span className="nav-label">{label}</span>
        </Link>
    );
}

function AppShell({ children, flush = false, topbarActions = null }) {
    const location = useLocation();
    const { isSignedIn, user } = useUser();
    const isActive = (path) => location.pathname === path || location.pathname.startsWith(`${path}/`);

    return (
        <div className={`app-shell ${flush ? "shell-fixed" : ""}`}>
            <aside className="sidebar">
                <Link to="/" className="brand">
                    <span className="brand-mark">
                        <BrandMark />
                    </span>
                    <span className="brand-copy">
                        <span className="brand-name block">
                            PAIR
                            <br />
                            <span className="text-[var(--lime)]">//</span>STACK
                        </span>
                        <span className="brand-sub block">LIVE CODING STUDIO</span>
                    </span>
                </Link>

                {isSignedIn && (
                    <>
                        <div className="nav-group-label">Workspace</div>
                        <NavItem to="/dashboard" icon={<LayoutGridIcon className="size-4 shrink-0" strokeWidth={1.8} />} label="Dashboard" active={isActive("/dashboard")} />
                        <NavItem to="/problems" icon={<BookOpenIcon className="size-4 shrink-0" strokeWidth={1.8} />} label="Problems" active={isActive("/problems") || isActive("/problem")} />
                    </>
                )}

                <div className="nav-group-label">Elsewhere</div>
                <a
                    href="https://github.com/shahateqx/talent-aq"
                    target="_blank"
                    rel="noreferrer"
                    className="nav-item"
                >
                    <Code2Icon className="size-4 shrink-0" strokeWidth={1.8} />
                    <span className="nav-label">Source</span>
                </a>
                <Link to="/" className="nav-item">
                    <ArrowUpRightIcon className="size-4 shrink-0" strokeWidth={1.8} />
                    <span className="nav-label">About</span>
                </Link>

                <div className="sidebar-bottom">
                    {isSignedIn ? (
                        <>
                            <Link to="/dashboard" className="btn-cyan">
                                <PlusIcon className="size-4" strokeWidth={2.2} />
                                <span>New session</span>
                            </Link>
                            <SignOutButton>
                                <button className="btn-void w-full">
                                    <span>Sign out</span>
                                </button>
                            </SignOutButton>
                        </>
                    ) : (
                        <>
                            <SignInButton mode="modal">
                                <button className="btn-cyan w-full">
                                    <span>Get started</span>
                                </button>
                            </SignInButton>
                            <SignInButton mode="modal">
                                <button className="btn-void w-full">
                                    <span>Sign in</span>
                                </button>
                            </SignInButton>
                        </>
                    )}
                </div>
            </aside>

            <div className="shell-main">
                <header className="topbar">
                    <div className="topbar-status micro">
                        <span><i className="dot dot-pink" /> Live collaboration</span>
                        <span className="hidden sm:inline-flex"><i className="dot dot-yellow" /> Judge0 execution</span>
                        <span className="hidden md:inline-flex"><i className="dot dot-green" /> 10 problems loaded</span>
                    </div>
                    <div className="flex items-center gap-4">
                        {topbarActions}
                        {isSignedIn && (
                            <span className="micro hidden lg:inline">
                                HI, {(user?.firstName || "DEV").toUpperCase()}
                            </span>
                        )}
                        <Link to="/problems" className="text-[#8b9097] transition-colors hover:text-[var(--lime)]" aria-label="Browse problems">
                            <SearchIcon className="size-[17px]" strokeWidth={1.7} />
                        </Link>
                        <span className="micro hidden sm:inline">V1.0 / SX9</span>
                    </div>
                </header>

                <main className={`shell-content ${flush ? "flush" : ""}`}>{children}</main>
            </div>
        </div>
    );
}
export default AppShell;
