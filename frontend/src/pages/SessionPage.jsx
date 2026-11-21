import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
    useEndSession,
    useJoinSession,
    useSessionById,
    useSetSessionProblem,
} from "../hooks/useSessions";
import { PROBLEMS } from "../data/problems";
import { executeCode } from "../lib/piston";
import AppShell from "../components/AppShell";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { getDifficultyBadgeClass } from "../lib/utils";
import {
    CheckIcon,
    ChevronRightIcon,
    ClockIcon,
    Loader2Icon,
    LogOutIcon,
    PhoneOffIcon,
} from "lucide-react";
import CodeEditorPanel from "../components/CodeEditorPanel";
import OutputPanel from "../components/OutputPanel";

import useStreamClient from "../hooks/useStreamClient";
import { StreamCall, StreamVideo } from "@stream-io/video-react-sdk";
import VideoCallUI from "../components/VideoCallUI";

function HostProblemPicker({ problems, selectedProblemId, onSelect, onConfirm, onCancel, isPending, hasProblem }) {
    const selected = problems.find((p) => p.id === selectedProblemId) || problems[0];

    return (
        <div className="relative h-full overflow-y-auto bg-[#0c0f15] p-6 lg:p-8">
            <div className="relative mx-auto w-full max-w-lg">
                <span className="inline-flex items-center gap-2 rounded-full border border-[rgba(216,185,138,0.25)] bg-[rgba(216,185,138,0.07)] px-4 py-2">
                    <span className="size-1.5 rounded-full bg-[var(--lime)]" />
                    <span className="micro !text-[10px]">Host controls</span>
                </span>

                <h2 className="pixel mt-5 text-4xl text-[#f3efe6]">
                    {hasProblem ? "Change the problem" : "Choose a problem"}
                </h2>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-[#8d919b]">
                    Only you can see this panel. Your partner will see the problem as soon as you
                    confirm it.
                </p>

                <div className="panel mt-8 p-6">
                    <label className="micro !tracking-[0.16em] !text-[#888d97]">Problem set</label>
                    <select
                        className="select mt-3 w-full !rounded-xl"
                        value={selectedProblemId}
                        onChange={(e) => onSelect(e.target.value)}
                    >
                        {problems.map((problem) => (
                            <option key={problem.id} value={problem.id}>
                                {problem.title} — {problem.difficulty}
                            </option>
                        ))}
                    </select>

                    {selected && (
                        <div className="mt-4 flex items-center justify-between gap-4 rounded-xl border border-[var(--line)] bg-white/[0.02] p-4">
                            <div className="min-w-0">
                                <p className="truncate text-sm font-semibold text-[#f0ece3]">
                                    {selected.title}
                                </p>
                                <p className="mt-1 text-xs text-[#8d919b]">{selected.category}</p>
                            </div>
                            <span className={`badge shrink-0 ${getDifficultyBadgeClass(selected.difficulty)}`}>
                                {selected.difficulty}
                            </span>
                        </div>
                    )}

                    <div className="mt-6 flex gap-3">
                        {hasProblem && (
                            <button
                                className="btn btn-ghost flex-1 text-sm text-[#9a9da6]"
                                onClick={onCancel}
                                disabled={isPending}
                            >
                                Cancel
                            </button>
                        )}
                        <button
                            className="btn btn-primary flex-1 gap-2"
                            onClick={onConfirm}
                            disabled={isPending || !selected}
                        >
                            {isPending ? (
                                <Loader2Icon className="size-4 animate-spin" />
                            ) : (
                                <CheckIcon className="size-4" strokeWidth={2.2} />
                            )}
                            {hasProblem ? "Update problem" : "Set problem"}
                        </button>
                    </div>
                </div>

                <p className="mt-5 text-center text-xs text-[#6f747e]">
                    {problems.length} curated problems available
                </p>
            </div>
        </div>
    );
}

function WaitingForProblem() {
    return (
        <div className="grid h-full place-items-center bg-[#0c0f15] p-8 text-center">
            <div>
                <span className="mx-auto mb-6 grid size-20 place-items-center rounded-full border border-[var(--line)] bg-white/[0.02]">
                    <ClockIcon className="size-8 text-[var(--cyan)]" strokeWidth={1.3} />
                </span>
                <span className="micro">Almost ready</span>
                <h2 className="pixel mt-3 text-3xl text-[#f3efe6]">Waiting for the host</h2>
                <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-[#8d919b]">
                    The host is choosing a problem. It will appear here as soon as they confirm it.
                </p>
                <div className="mt-6 flex items-center justify-center gap-2 text-xs text-[#6f747e]">
                    <span className="dot size-1.5 rounded-full bg-[var(--lime)]" />
                    Watching for updates…
                </div>
            </div>
        </div>
    );
}

function SessionPage() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { user } = useUser();
    const [output, setOutput] = useState(null);
    const [isRunning, setIsRunning] = useState(false);

    const { data: sessionData, isLoading: loadingSession, refetch } = useSessionById(id);

    const joinSessionMutation = useJoinSession();
    const endSessionMutation = useEndSession();

    const session = sessionData?.session;
    const isHost = session?.host?.clerkId === user?.id;
    const isParticipant = session?.participant?.clerkId === user?.id;

    const { call, channel, chatClient, isInitializingCall, streamClient } = useStreamClient(
        session,
        loadingSession,
        isHost,
        isParticipant
    );

    // find the problem data based on session problem title
    const problemData = session?.problem
        ? Object.values(PROBLEMS).find((p) => p.title === session.problem)
        : null;
    const problems = Object.values(PROBLEMS);

    const [selectedProblemId, setSelectedProblemId] = useState(
        problemData?.id || problems[0]?.id
    );
    const [isEditingProblem, setIsEditingProblem] = useState(false);
    const setProblemMutation = useSetSessionProblem(id);

    // keep the picker in sync when the host changes the problem
    useEffect(() => {
        if (problemData?.id) setSelectedProblemId(problemData.id);
    }, [problemData?.id]);

    const handleSetProblem = () => {
        const problem = problems.find((p) => p.id === selectedProblemId);
        if (!problem) return;

        setProblemMutation.mutate(
            {
                problem: problem.title,
                difficulty: problem.difficulty.toLowerCase(),
            },
            { onSuccess: () => setIsEditingProblem(false) }
        );
    };

    const [selectedLanguage, setSelectedLanguage] = useState("javascript");
    const [code, setCode] = useState(problemData?.starterCode?.[selectedLanguage] || "");

    // auto-join session if user is not already a participant and not the host
    useEffect(() => {
        if (!session || !user || loadingSession) return;
        if (isHost || isParticipant) return;

        joinSessionMutation.mutate(id, { onSuccess: refetch });

        // remove the joinSessionMutation, refetch from dependencies to avoid infinite loop
    }, [session, user, loadingSession, isHost, isParticipant, id]);

    // redirect the "participant" when session ends
    useEffect(() => {
        if (!session || loadingSession) return;

        if (session.status === "completed") navigate("/dashboard");
    }, [session, loadingSession, navigate]);

    // update code when problem loads or changes
    useEffect(() => {
        if (problemData?.starterCode?.[selectedLanguage]) {
            setCode(problemData.starterCode[selectedLanguage]);
        }
    }, [problemData, selectedLanguage]);

    const handleLanguageChange = (e) => {
        const newLang = e.target.value;
        setSelectedLanguage(newLang);
        // use problem-specific starter code
        const starterCode = problemData?.starterCode?.[newLang] || "";
        setCode(starterCode);
        setOutput(null);
    };

    const handleRunCode = async () => {
        setIsRunning(true);
        setOutput(null);

        const result = await executeCode(selectedLanguage, code);
        setOutput(result);
        setIsRunning(false);
    };

    const handleEndSession = () => {
        if (confirm("Are you sure you want to end this session? All participants will be notified.")) {
            // this will navigate the HOST to dashboard
            endSessionMutation.mutate(id, { onSuccess: () => navigate("/dashboard") });
        }
    };

    return (
        <AppShell
            flush
            topbarActions={
                isHost && session?.status === "active" ? (
                    <button
                        onClick={handleEndSession}
                        disabled={endSessionMutation.isPending}
                        className="inline-flex items-center gap-2 border border-[rgba(255,61,129,0.4)] bg-[rgba(255,61,129,0.08)] px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-[#ff87ae] transition-colors hover:bg-[rgba(255,61,129,0.18)]"
                    >
                        {endSessionMutation.isPending ? (
                            <Loader2Icon className="size-3.5 animate-spin" />
                        ) : (
                            <LogOutIcon className="size-3.5" />
                        )}
                        End session
                    </button>
                ) : null
            }
        >
            <div className="h-full">
                <PanelGroup direction="horizontal">
                    {/* LEFT PANEL - CODE EDITOR & PROBLEM DETAILS */}
                    <Panel defaultSize={50} minSize={30}>
                        <PanelGroup direction="vertical">
                            {/* PROBLEM DSC PANEL */}
                            <Panel defaultSize={50} minSize={20}>
                                {isHost && (!session?.problem || isEditingProblem) ? (
                                    <HostProblemPicker
                                        problems={problems}
                                        selectedProblemId={selectedProblemId}
                                        onSelect={setSelectedProblemId}
                                        onConfirm={handleSetProblem}
                                        onCancel={() => setIsEditingProblem(false)}
                                        isPending={setProblemMutation.isPending}
                                        hasProblem={!!session?.problem}
                                    />
                                ) : !session?.problem ? (
                                    <WaitingForProblem />
                                ) : (
                                <div className="h-full overflow-y-auto bg-[#0c0f15]">
                                    {/* HEADER SECTION */}
                                    <div className="border-b border-[var(--line)] bg-[#0e1118] px-6 py-6">
                                        <div className="mb-3 flex items-start justify-between gap-4">
                                            <div>
                                                <span className="micro">Problem brief</span>
                                                <h1 className="pixel mt-2 text-[34px] leading-tight text-[#f3efe6]">
                                                    {session?.problem || "Loading..."}
                                                </h1>
                                                {problemData?.category && (
                                                    <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-[#7f838d]">
                                                        {problemData.category}
                                                    </p>
                                                )}
                                                <p className="mt-3 text-xs text-[#8d919b]">
                                                    Host:{" "}
                                                    <span className="text-[#c9c6bf]">
                                                        {session?.host?.name || "Loading..."}
                                                    </span>{" "}
                                                    · {session?.participant ? 2 : 1}/2 participants
                                                </p>
                                            </div>

                                            <div className="flex items-center gap-3">
                                                {session?.difficulty && (
                                                    <span
                                                        className={`badge ${getDifficultyBadgeClass(
                                                            session.difficulty
                                                        )}`}
                                                    >
                                                        {session.difficulty.slice(0, 1).toUpperCase() +
                                                            session.difficulty.slice(1)}
                                                    </span>
                                                )}
                                                {isHost && session?.problem && (
                                                    <button
                                                        onClick={() => setIsEditingProblem(true)}
                                                        className="inline-flex items-center gap-1.5 rounded-full border border-[var(--line)] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#b9b6af] transition-colors hover:border-[var(--cyan)] hover:text-[var(--lime)]"
                                                    >
                                                        Change
                                                        <ChevronRightIcon className="size-3.5" />
                                                    </button>
                                                )}
                                                {session?.status === "completed" && (
                                                    <span className="badge badge-ghost">Completed</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-6 space-y-6">
                                        {/* problem desc */}
                                        {problemData?.description && (
                                            <div className="rounded-2xl border border-[var(--line)] bg-white/[0.018] p-5">
                                                <h2 className="micro mb-4 !tracking-[0.18em]">Description</h2>
                                                <div className="space-y-3 text-base leading-relaxed">
                                                    <p className="text-base-content/90">{problemData.description.text}</p>
                                                    {problemData.description.notes?.map((note, idx) => (
                                                        <p key={idx} className="text-base-content/90">
                                                            {note}
                                                        </p>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* examples section */}
                                        {problemData?.examples && problemData.examples.length > 0 && (
                                            <div className="rounded-2xl border border-[var(--line)] bg-white/[0.018] p-5">
                                                <h2 className="micro mb-4 !tracking-[0.18em]">Examples</h2>

                                                <div className="space-y-4">
                                                    {problemData.examples.map((example, idx) => (
                                                        <div key={idx}>
                                                            <div className="flex items-center gap-2 mb-2">
                                                                <span className="badge badge-sm">{idx + 1}</span>
                                                                <p className="font-semibold text-base-content">Example {idx + 1}</p>
                                                            </div>
                                                            <div className="space-y-2 rounded-xl border border-[var(--line)] bg-[#080a0f]/70 p-4 font-mono text-[13px]">
                                                                <div className="flex gap-2">
                                                                    <span className="min-w-[62px] text-[var(--lime)]">
                                                                        Input
                                                                    </span>
                                                                    <span>{example.input}</span>
                                                                </div>
                                                                <div className="flex gap-2">
                                                                    <span className="min-w-[62px] text-[#93ada6]">
                                                                        Output
                                                                    </span>
                                                                    <span>{example.output}</span>
                                                                </div>
                                                                {example.explanation && (
                                                                    <div className="pt-2 border-t border-base-300 mt-2">
                                                                        <span className="text-base-content/60 font-sans text-xs">
                                                                            <span className="font-semibold">Explanation:</span>{" "}
                                                                            {example.explanation}
                                                                        </span>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Constraints */}
                                        {problemData?.constraints && problemData.constraints.length > 0 && (
                                            <div className="rounded-2xl border border-[var(--line)] bg-white/[0.018] p-5">
                                                <h2 className="micro mb-4 !tracking-[0.18em]">Constraints</h2>
                                                <ul className="space-y-2 text-base-content/90">
                                                    {problemData.constraints.map((constraint, idx) => (
                                                        <li key={idx} className="flex gap-2">
                                                            <span className="text-[var(--lime)]">•</span>
                                                            <code className="text-sm">{constraint}</code>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                )}
                            </Panel>

                            <PanelResizeHandle className="h-1.5 bg-[var(--line)] transition-colors hover:bg-[var(--cyan)] cursor-row-resize" />

                            <Panel defaultSize={50} minSize={20}>
                                <PanelGroup direction="vertical">
                                    <Panel defaultSize={70} minSize={30}>
                                        <CodeEditorPanel
                                            selectedLanguage={selectedLanguage}
                                            code={code}
                                            isRunning={isRunning}
                                            onLanguageChange={handleLanguageChange}
                                            onCodeChange={(value) => setCode(value)}
                                            onRunCode={handleRunCode}
                                        />
                                    </Panel>

                                    <PanelResizeHandle className="h-1.5 bg-[var(--line)] transition-colors hover:bg-[var(--cyan)] cursor-row-resize" />

                                    <Panel defaultSize={30} minSize={15}>
                                        <OutputPanel output={output} />
                                    </Panel>
                                </PanelGroup>
                            </Panel>
                        </PanelGroup>
                    </Panel>

                    <PanelResizeHandle className="w-1.5 bg-[var(--line)] transition-colors hover:bg-[var(--cyan)] cursor-col-resize" />

                    {/* RIGHT PANEL - VIDEO CALLS & CHAT */}
                    <Panel defaultSize={50} minSize={30}>
                        <div className="h-full overflow-auto bg-[#0c0f15] p-4">
                            {isInitializingCall ? (
                                <div className="h-full flex items-center justify-center">
                                    <div className="text-center">
                                        <Loader2Icon className="mx-auto mb-4 size-10 animate-spin text-[var(--lime)]" strokeWidth={1.5} />
                                        <p className="micro">Connecting to video call</p>
                                    </div>
                                </div>
                            ) : !streamClient || !call ? (
                                <div className="h-full flex items-center justify-center">
                                    <div className="panel max-w-md p-8 text-center">
                                        <div className="mx-auto mb-5 grid size-20 place-items-center rounded-full border border-[rgba(217,142,136,0.25)] bg-[rgba(217,142,136,0.08)]">
                                            <PhoneOffIcon className="size-8 text-[#e6a49f]" strokeWidth={1.5} />
                                        </div>
                                        <h2 className="pixel text-3xl text-[#f3efe6]">Connection failed</h2>
                                        <p className="mt-2 text-sm text-[#8d919b]">
                                            We couldn't connect to the video call. Try rejoining the session.
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <div className="h-full">
                                    <StreamVideo client={streamClient}>
                                        <StreamCall call={call}>
                                            <VideoCallUI chatClient={chatClient} channel={channel} />
                                        </StreamCall>
                                    </StreamVideo>
                                </div>
                            )}
                        </div>
                    </Panel>
                </PanelGroup>
            </div>
        </AppShell>
    );
}

export default SessionPage;