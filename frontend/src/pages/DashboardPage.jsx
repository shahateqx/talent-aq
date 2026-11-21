import { useUser } from "@clerk/clerk-react";
import { useActiveSessions, useMyRecentSessions } from "../hooks/useSessions";
import { useOpenCreateSession } from "../context/sessionModal";

import AppShell from "../components/AppShell";
import WelcomeSection from "../components/WelcomeSection";
import StatsCards from "../components/StatsCards";
import ActiveSessions from "../components/ActiveSessions";
import RecentSessions from "../components/RecentSessions";

function DashboardPage() {
    const { user } = useUser();
    const openCreateSession = useOpenCreateSession();

    const { data: activeSessionsData, isLoading: loadingActiveSessions } = useActiveSessions();
    const { data: recentSessionsData, isLoading: loadingRecentSessions } = useMyRecentSessions();

    const activeSessions = activeSessionsData?.sessions || [];
    const recentSessions = recentSessionsData?.sessions || [];

    const isUserInSession = (session) => {
        if (!user?.id) return false;

        return session.host?.clerkId === user.id || session.participant?.clerkId === user.id;
    };

    return (
        <AppShell>
            <div className="space-y-4">
                <WelcomeSection onCreateSession={openCreateSession} />

                <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                    <StatsCards
                        activeSessionsCount={activeSessions.length}
                        recentSessionsCount={recentSessions.length}
                    />
                    <ActiveSessions
                        sessions={activeSessions}
                        isLoading={loadingActiveSessions}
                        isUserInSession={isUserInSession}
                    />
                </div>

                <RecentSessions sessions={recentSessions} isLoading={loadingRecentSessions} />
            </div>
        </AppShell>
    );
}

export default DashboardPage;
