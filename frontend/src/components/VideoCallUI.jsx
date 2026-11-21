import {
    CallControls,
    CallingState,
    SpeakerLayout,
    useCallStateHooks,
} from "@stream-io/video-react-sdk";
import { Loader2Icon, MessageSquareIcon, SendIcon, UsersIcon, XIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";

import "@stream-io/video-react-sdk/dist/css/styles.css";

function SessionChat({ channel, chatClient }) {
    const [messages, setMessages] = useState([]);
    const [draft, setDraft] = useState("");
    const listRef = useRef(null);

    useEffect(() => {
        if (!channel) return;
        let active = true;

        const load = async () => {
            try {
                const result = await channel.query({ messages: { limit: 50 } });
                if (active) setMessages(result.messages || []);
            } catch (error) {
                console.error("Failed to load chat messages:", error);
            }
        };
        load();

        const onNewMessage = (event) => {
            if (!event.message) return;
            setMessages((current) => [
                ...current.filter((message) => message.id !== event.message.id),
                event.message,
            ]);
        };
        channel.on("message.new", onNewMessage);

        return () => {
            active = false;
            channel.off("message.new", onNewMessage);
        };
    }, [channel]);

    useEffect(() => {
        if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
    }, [messages]);

    const handleSend = async (event) => {
        event.preventDefault();
        const text = draft.trim();
        if (!text || !channel) return;

        setDraft("");
        try {
            await channel.sendMessage({ text });
        } catch (error) {
            console.error("Failed to send message:", error);
            setDraft(text);
        }
    };

    return (
        <div className="flex min-h-0 flex-1 flex-col bg-[#0d0f12]">
            <div ref={listRef} className="min-h-0 flex-1 space-y-3 overflow-y-auto p-4">
                {messages.length === 0 ? (
                    <p className="micro leading-relaxed">
                        No messages yet. Say hello to your partner.
                    </p>
                ) : (
                    messages.map((message) => {
                        const mine = message.user?.id === chatClient?.userID;
                        return (
                            <div key={message.id} className={mine ? "text-right" : "text-left"}>
                                <div className="micro mb-1 !text-[9px]">
                                    {mine ? "You" : message.user?.name || "Member"} ·{" "}
                                    {message.created_at
                                        ? new Date(message.created_at).toLocaleTimeString([], {
                                              hour: "2-digit",
                                              minute: "2-digit",
                                          })
                                        : ""}
                                </div>
                                <div
                                    className={`inline-block max-w-[90%] break-words border px-3 py-2 text-left font-mono text-[11px] leading-relaxed ${
                                        mine
                                            ? "border-[rgba(232,255,58,0.3)] bg-[rgba(232,255,58,0.07)] text-[#e6f3a8]"
                                            : "border-[var(--line)] bg-[#131518] text-[#d8dade]"
                                    }`}
                                >
                                    {message.text}
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            <form onSubmit={handleSend} className="flex gap-2 border-t border-[var(--line)] p-3">
                <input
                    className="input min-w-0 flex-1"
                    value={draft}
                    onChange={(event) => setDraft(event.target.value)}
                    placeholder="Type a message..."
                    aria-label="Message"
                />
                <button className="btn btn-primary !px-3" type="submit" disabled={!draft.trim()}>
                    <SendIcon className="size-3.5" />
                    Send
                </button>
            </form>
        </div>
    );
}

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
                    className={`flex min-h-0 flex-col overflow-hidden border-[var(--line)] bg-[#0d0f12] transition-[width,opacity] duration-200 ${
                        isChatOpen ? "w-80 border opacity-100" : "w-0 border-transparent opacity-0"
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
                            <SessionChat channel={channel} chatClient={chatClient} />
                        </>
                    )}
                </div>
            )}
        </div>
    );
}
export default VideoCallUI;
