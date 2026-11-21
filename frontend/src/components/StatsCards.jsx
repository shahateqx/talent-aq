import { TrophyIcon, UsersIcon } from "lucide-react";

function StatCard({ icon, value, label, accent, live }) {
    return (
        <div className="surface surface-hover relative overflow-hidden p-6">
            <div
                className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent to-[var(--gold)]"
                style={{ opacity: accent }}
            />
            <div className="mb-6 flex items-start justify-between">
                <span className="grid size-12 place-items-center rounded-full border border-[var(--line)] bg-white/[0.03]">
                    {icon}
                </span>
                {live && (
                    <span className="flex items-center gap-2 rounded-full border border-[rgba(140,197,162,0.2)] bg-[rgba(140,197,162,0.08)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#a5dcb9]">
                        <span className="pulse-dot size-1.5 rounded-full bg-[#8cc5a2]" />
                        Live
                    </span>
                )}
            </div>
            <div className="display-serif text-5xl text-[#f3efe6]">{value}</div>
            <div className="eyebrow mt-2 !tracking-[0.16em] !text-[#858a94]">{label}</div>
        </div>
    );
}

function StatsCards({ activeSessionsCount, recentSessionsCount }) {
    return (
        <div className="grid gap-5 lg:col-span-1">
            <StatCard
                icon={<UsersIcon className="size-5 text-[var(--gold)]" strokeWidth={1.5} />}
                value={activeSessionsCount}
                label="Active sessions"
                accent={0.6}
                live
            />
            <StatCard
                icon={<TrophyIcon className="size-5 text-[var(--gold)]" strokeWidth={1.5} />}
                value={recentSessionsCount}
                label="Total sessions"
                accent={0.4}
            />
        </div>
    );
}
export default StatsCards;
