import { useState, useEffect, useRef } from "react";
import { StreamChat } from "stream-chat";
import toast from "react-hot-toast";
import { initializeStreamClient, disconnectStreamClient } from "../lib/stream";
import { sessionApi } from "../api/sessions";

function useStreamClient(session, loadingSession, isHost, isParticipant) {
    const [streamClient, setStreamClient] = useState(null);
    const [call, setCall] = useState(null);
    const [chatClient, setChatClient] = useState(null);
    const [channel, setChannel] = useState(null);
    const [isInitializingCall, setIsInitializingCall] = useState(true);

    // The session query polls every few seconds; only re-join when something
    // that actually affects the call changes.
    const sessionRef = useRef(session);
    sessionRef.current = session;

    useEffect(() => {
        const activeSession = sessionRef.current;
        let videoCall = null;
        let chatClientInstance = null;

        const initCall = async () => {
            if (!activeSession?.callId) return;
            if (!isHost && !isParticipant) return;
            if (activeSession.status === "completed") return;

            try {
                const { token, userId, userName, userImage } = await sessionApi.getStreamToken();

                const client = await initializeStreamClient(
                    {
                        id: userId,
                        name: userName,
                        image: userImage,
                    },
                    token
                );

                setStreamClient(client);

                videoCall = client.call("default", activeSession.callId);
                await videoCall.join({ create: true });
                setCall(videoCall);

                const apiKey = import.meta.env.VITE_STREAM_API_KEY;
                chatClientInstance = StreamChat.getInstance(apiKey);

                if (chatClientInstance.userID !== userId) {
                    if (chatClientInstance.userID) {
                        await chatClientInstance.disconnectUser();
                    }
                    await chatClientInstance.connectUser(
                        {
                            id: userId,
                            name: userName,
                            image: userImage,
                        },
                        token
                    );
                }
                
                setChatClient(chatClientInstance);

                const chatChannel = chatClientInstance.channel("messaging", activeSession.callId);
                await chatChannel.watch();
                setChannel(chatChannel);
            } catch (error) {
                console.error("Error init call details:", error);
                toast.error(`Failed to join video call: ${error.message || "Unknown error"}`);
            } finally {
                setIsInitializingCall(false);
            }
        };

        if (activeSession && !loadingSession) initCall();

        // cleanup - performance reasons
        return () => {
            // iife
            (async () => {
                try {
                    if (videoCall) await videoCall.leave();
                    if (chatClientInstance) await chatClientInstance.disconnectUser();
                    await disconnectStreamClient();
                } catch (error) {
                    console.error("Cleanup error:", error);
                }
            })();
        };
    }, [session?._id, session?.callId, session?.status, loadingSession, isHost, isParticipant]);

    return {
        streamClient,
        call,
        chatClient,
        channel,
        isInitializingCall,
    };
}

export default useStreamClient;