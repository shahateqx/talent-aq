import { Code2Icon, LoaderIcon, PlusIcon, XIcon } from "lucide-react";
import { PROBLEMS } from "../data/problems";

function CreateSessionModal({
    isOpen,
    onClose,
    roomConfig,
    setRoomConfig,
    onCreateRoom,
    isCreating,
}) {
    const problems = Object.values(PROBLEMS);

    if (!isOpen) return null;

    return (
        <div className="modal modal-open">
            <div className="modal-box relative max-w-xl !p-0">
                <div className="glow-orb -right-20 -top-24 size-64 bg-[rgba(163,126,72,0.14)]" />

                <div className="relative border-b border-[var(--line)] px-7 py-6">
                    <button
                        onClick={onClose}
                        className="absolute right-5 top-5 grid size-8 place-items-center rounded-full border border-[var(--line)] text-[#8d919b] transition-colors hover:border-[var(--line-strong)] hover:text-[#e9e6df]"
                        aria-label="Close"
                    >
                        <XIcon className="size-4" />
                    </button>
                    <span className="eyebrow">New room</span>
                    <h3 className="display-serif mt-2 text-3xl text-[#f3efe6]">Create a session</h3>
                    <p className="mt-1.5 text-sm text-[#8d919b]">
                        Choose a problem, then share the room with your partner.
                    </p>
                </div>

                <div className="relative px-7 py-7">
                    <label className="mb-2 block">
                        <span className="eyebrow !tracking-[0.16em] !text-[#888d97]">Select problem</span>
                    </label>
                    <select
                        className="select w-full !rounded-xl !bg-[#0a0d13]/80"
                        value={roomConfig.problem}
                        onChange={(e) => {
                            const selectedProblem = problems.find((p) => p.title === e.target.value);
                            setRoomConfig({
                                difficulty: selectedProblem.difficulty,
                                problem: e.target.value,
                            });
                        }}
                    >
                        <option value="" disabled>
                            Choose a coding problem…
                        </option>
                        {problems.map((problem) => (
                            <option key={problem.id} value={problem.title}>
                                {problem.title} · {problem.difficulty}
                            </option>
                        ))}
                    </select>

                    {roomConfig.problem && (
                        <div className="mt-6 flex gap-4 rounded-2xl border border-[rgba(216,185,138,0.2)] bg-[rgba(216,185,138,0.06)] p-5">
                            <span className="grid size-10 shrink-0 place-items-center rounded-full border border-[rgba(216,185,138,0.25)]">
                                <Code2Icon className="size-4 text-[var(--gold)]" />
                            </span>
                            <div className="text-sm">
                                <p className="eyebrow mb-2 !tracking-[0.16em]">Room summary</p>
                                <p className="text-[#d9d5cd]">
                                    Problem <span className="text-[var(--gold-bright)]">{roomConfig.problem}</span>
                                </p>
                                <p className="mt-1 text-[#8d919b]">1-on-1 session · up to 2 participants</p>
                            </div>
                        </div>
                    )}
                </div>

                <div className="relative flex items-center justify-end gap-3 border-t border-[var(--line)] px-7 py-5">
                    <button className="btn btn-ghost rounded-full px-6 text-sm text-[#9a9da6]" onClick={onClose}>
                        Cancel
                    </button>
                    <button
                        className="btn btn-primary gap-2 px-7 text-sm"
                        onClick={onCreateRoom}
                        disabled={isCreating || !roomConfig.problem}
                    >
                        {isCreating ? (
                            <LoaderIcon className="size-4 animate-spin" />
                        ) : (
                            <PlusIcon className="size-4" strokeWidth={2.2} />
                        )}
                        {isCreating ? "Creating…" : "Create session"}
                    </button>
                </div>
            </div>
            <div className="modal-backdrop" onClick={onClose}></div>
        </div>
    );
}
export default CreateSessionModal;
