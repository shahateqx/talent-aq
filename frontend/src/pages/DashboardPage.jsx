import { useNavigate } from "react-router";
import { useUser } from "@clerk/clerk-react";
import { useState } from "react";
import { useActiveSessions, useCreateSession, useMyRecentSessions } from "../hooks/useSessions";

import AppShell from "../components/AppShell";
import WelcomeSection from "../components/WelcomeSection";
import StatsCards from "../components/StatsCards";
import ActiveSessions from "../components/ActiveSessions";
import RecentSessions from "../components/RecentSessions";
import CreateSessionModal from "../components/CreateSessionModal";

function DashboardPage() {
    const navigate = useNavigate();
    const { user } = useUser();
    const [showCreateModal, setShowCreateModal] = useState(false);

    const createSessionMutation = useCreateSession();

    const { data: activeSessionsData, isLoading: loadingActiveSessions } = useActiveSessions();
    const { data: recentSessionsData, isLoading: loadingRecentSessions } = useMyRecentSessions();

    const handleCreateRoom = () => {
        createSessionMutation.mutate(undefined, {
            onSuccess: (data) => {
                setShowCreateModal(false);
                navigate(`/session/${data.session._id}`);
            },
        });
    };

    const activeSessions = activeSessionsData?.sessions || [];
    const recentSessions = recentSessionsData?.sessions || [];

    const isUserInSession = (session) => {
        if (!user?.id) return false;

        return session.host?.clerkId === user.id || session.participant?.clerkId === user.id;
    };

    return (
        <>
            <AppShell>
                <div className="space-y-4">
                    <WelcomeSection onCreateSession={() => setShowCreateModal(true)} />

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

            <CreateSessionModal
                isOpen={showCreateModal}
                onClose={() => setShowCreateModal(false)}
                onCreateRoom={handleCreateRoom}
                isCreating={createSessionMutation.isPending}
            />
        </>
    );
}

export default DashboardPage;