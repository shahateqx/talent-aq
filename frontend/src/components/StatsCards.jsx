function StatCard({ label, value, tag, dot, accent }) {
    return (
        <div className="panel panel-hover flex min-h-[190px] flex-col justify-between p-6">
            <div className="flex items-start justify-between">
                <span className="micro">{label}</span>
                <i className={`dot ${dot}`} />
            </div>
            <div className="pixel text-[58px] leading-none" style={{ color: accent }}>
                {String(value).padStart(2, "0")}
            </div>
            <span className="tag w-fit">{tag}</span>
        </div>
    );
}

function StatsCards({ activeSessionsCount, recentSessionsCount }) {
    return (
        <div className="grid gap-4 lg:col-span-1">
            <StatCard
                label="Live rooms"
                value={activeSessionsCount}
                tag="Open now"
                dot="dot-green"
                accent="var(--lime)"
            />
            <StatCard
                label="Total sessions"
                value={recentSessionsCount}
                tag="Archived"
                dot="dot-cyan"
                accent="var(--text)"
            />
        </div>
    );
}
export default StatsCards;
