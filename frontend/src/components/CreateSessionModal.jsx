import { LoaderIcon, PlusIcon, SparklesIcon, XIcon } from "lucide-react";

function CreateSessionModal({ isOpen, onClose, onCreateRoom, isCreating }) {
    if (!isOpen) return null;

    return (
        <div className="modal modal-open">
            <div className="modal-box relative max-w-lg !p-0">
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
                    <p className="mt-1.5 text-sm leading-relaxed text-[#8d919b]">
                        Set up the room first. As the host, you'll choose the coding problem once
                        you're inside.
                    </p>
                </div>

                <div className="relative px-7 py-7">
                    <div className="rounded-2xl border border-[rgba(216,185,138,0.2)] bg-[rgba(216,185,138,0.06)] p-5">
                        <div className="mb-4 flex items-center gap-3">
                            <span className="grid size-9 place-items-center rounded-full border border-[rgba(216,185,138,0.25)]">
                                <SparklesIcon className="size-4 text-[var(--gold)]" strokeWidth={1.5} />
                            </span>
                            <span className="eyebrow">What happens next</span>
                        </div>
                        <ul className="space-y-2.5 text-sm text-[#b6b3ac]">
                            <li>· Your private room is created instantly</li>
                            <li>· Only you can see and choose the problem</li>
                            <li>· Share the room so a partner can join the live call</li>
                        </ul>
                    </div>
                </div>

                <div className="relative flex items-center justify-end gap-3 border-t border-[var(--line)] px-7 py-5">
                    <button className="btn btn-ghost rounded-full px-6 text-sm text-[#9a9da6]" onClick={onClose}>
                        Cancel
                    </button>
                    <button
                        className="btn btn-primary gap-2 px-7 text-sm"
                        onClick={onCreateRoom}
                        disabled={isCreating}
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
