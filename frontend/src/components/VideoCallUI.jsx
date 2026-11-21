import {
    CallControls,
    CallingState,
    SpeakerLayout,
    useCallStateHooks,
} from "@stream-io/video-react-sdk";
import { Loader2Icon, MessageSquareIcon, UsersIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Channel, Chat, MessageInput, MessageList, Thread, Window } from "stream-chat-react";

import "@stream-io/video-react-sdk/dist/css/styles.css";
import "stream-chat-react/dist/css/index.css";

function VideoCallUI({ chatClient, channel }) {
    const navigate = useNavigate();
    const { useCallCallingState, useParticipantCount } = useCallStateHooks();
    const callingState = useCallCallingState();
    const participantCount = useParticipantCount();
    const [isChatOpen, setIsChatOpen] = useState(false);

    if (callingState === CallingState.JOINING) {
        return (
            <div className="grid h-full place-items-center">
                <div className="text-center">
                    <Loader2Icon className="mx-auto mb-4 size-9 animate-spin text-[var(--lime)]" strokeWidth={1.5} />
                    <p className="micro">Joining call…</p>
                </div>
            </div>
        );
    }

    return (
        <div className="str-video relative flex h-full gap-3">
            <div className="flex min-w-0 flex-1 flex-col gap-3">
                <div className="flex items-center justify-between border border-[var(--line)] bg-[#0f1114] px-4 py-3">
                    <div className="flex items-center gap-2.5">
                        <UsersIcon className="size-4 text-[var(--lime)]" strokeWidth={1.6} />
                        <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-[#d8dade]">
                            {participantCount} {participantCount === 1 ? "participant" : "participants"}
                        </span>
                    </div>
                    {chatClient && channel && (
                        <button
                            onClick={() => setIsChatOpen(!isChatOpen)}
                            className={`tag ${isChatOpen ? "tag-lime" : ""}`}
                            title={isChatOpen ? "Hide chat" : "Show chat"}
                        >
                            <MessageSquareIcon className="size-3.5" />
                            Chat
                        </button>
                    )}
                </div>

                <div className="relative min-h-0 flex-1 overflow-hidden border border-[var(--line)] bg-[#0b0c0e]">
                    <SpeakerLayout />
                </div>

                <div className="flex justify-center border border-[var(--line)] bg-[#0f1114] px-3 py-2">
                    <CallControls onLeave={() => navigate("/dashboard")} />
                </div>
            </div>

            {chatClient && channel && (
                <div
                    className={`flex flex-col overflow-hidden border border-[var(--line)] bg-[#0d0f12] transition-all duration-200 ${
                        isChatOpen ? "w-80 opacity-100" : "w-0 border-transparent opacity-0"
                    }`}
                >
                    {isChatOpen && (
                        <>
                            <div className="flex items-center justify-between border-b border-[var(--line)] bg-[#0e1013] px-4 py-3">
                                <span className="micro micro-bright">Session chat</span>
                                <button
                                    onClick={() => setIsChatOpen(false)}
                                    className="text-[var(--muted)] transition-colors hover:text-[var(--lime)]"
                                    title="Close chat"
                                >
                                    <XIcon className="size-4" />
                                </button>
                            </div>
                            <div className="min-h-0 flex-1 overflow-hidden stream-chat-dark">
                                <Chat client={chatClient} theme="str-chat__theme-dark">
                                    <Channel channel={channel}>
                                        <Window>
                                            <MessageList />
                                            <MessageInput />
                                        </Window>
                                        <Thread />
                                    </Channel>
                                </Chat>
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}
export default VideoCallUI;
