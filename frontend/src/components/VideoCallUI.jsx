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
                    <Loader2Icon
                        className="mx-auto mb-4 size-10 animate-spin text-[var(--gold)]"
                        strokeWidth={1.5}
                    />
                    <p className="eyebrow">Joining call</p>
                </div>
            </div>
        );
    }

    return (
        <div className="str-video relative flex h-full gap-3">
            <div className="flex min-w-0 flex-1 flex-col gap-3">
                <div className="flex items-center justify-between rounded-2xl border border-[var(--line)] bg-white/[0.025] px-4 py-3">
                    <div className="flex items-center gap-2.5">
                        <UsersIcon className="size-4 text-[var(--gold)]" strokeWidth={1.6} />
                        <span className="text-[13px] font-medium text-[#d7d4cc]">
                            {participantCount}{" "}
                            {participantCount === 1 ? "participant" : "participants"}
                        </span>
                    </div>
                    {chatClient && channel && (
                        <button
                            onClick={() => setIsChatOpen(!isChatOpen)}
                            className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] transition-all ${
                                isChatOpen
                                    ? "border-[rgba(216,185,138,0.4)] bg-[rgba(216,185,138,0.12)] text-[var(--gold-bright)]"
                                    : "border-[var(--line)] text-[#9a9da6] hover:border-[var(--line-strong)] hover:text-[#e9e6df]"
                            }`}
                            title={isChatOpen ? "Hide chat" : "Show chat"}
                        >
                            <MessageSquareIcon className="size-3.5" />
                            Chat
                        </button>
                    )}
                </div>

                <div className="relative min-h-0 flex-1 overflow-hidden rounded-2xl border border-[var(--line)] bg-[#0b0e14]">
                    <SpeakerLayout />
                </div>

                <div className="flex justify-center rounded-2xl border border-[var(--line)] bg-white/[0.025] px-3 py-2">
                    <CallControls onLeave={() => navigate("/dashboard")} />
                </div>
            </div>

            {chatClient && channel && (
                <div
                    className={`flex flex-col overflow-hidden rounded-2xl border border-[var(--line)] bg-[#0d1016] shadow-[0_24px_60px_-40px_rgba(0,0,0,1)] transition-all duration-300 ease-in-out ${
                        isChatOpen ? "w-80 opacity-100" : "w-0 border-transparent opacity-0"
                    }`}
                >
                    {isChatOpen && (
                        <>
                            <div className="flex items-center justify-between border-b border-[var(--line)] bg-[#10131a] px-4 py-3">
                                <span className="eyebrow !text-[10px]">Session chat</span>
                                <button
                                    onClick={() => setIsChatOpen(false)}
                                    className="grid size-7 place-items-center rounded-full text-[#8d919b] transition-colors hover:bg-white/[0.06] hover:text-[#e9e6df]"
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
