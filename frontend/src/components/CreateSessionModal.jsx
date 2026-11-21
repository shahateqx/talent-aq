import { LoaderIcon, PlusIcon, XIcon } from "lucide-react";

function CreateSessionModal({ isOpen, onClose, onCreateRoom, isCreating }) {
    if (!isOpen) return null;

    return (
        <div className="modal modal-open">
            <div className="modal-box relative max-w-lg !p-0">
                <div className="flex items-start justify-between border-b border-[var(--line)] px-6 py-5">
                    <div>
                        <div className="micro mb-2">New room / 001</div>
                        <h3 className="pixel text-[32px] text-[var(--text)]">Create a session</h3>
                    </div>
                    <button
                        onClick={onClose}
                        className="grid size-8 place-items-center border border-[var(--line)] text-[var(--muted)] transition-colors hover:text-[var(--lime)]"
                        aria-label="Close"
                    >
                        <XIcon className="size-4" />
                    </button>
                </div>

                <div className="px-6 py-6">
                    <p className="text-[13px] leading-relaxed text-[#9ba0a7]">
                        Your room is created instantly. As the host, you choose the coding problem
                        once you're inside — your partner sees it after you confirm.
                    </p>

                    <div className="mt-6 border border-[var(--line)] bg-[#0b0c0e] p-5">
                        <div className="micro mb-4 text-[var(--lime)]">What happens next</div>
                        <ul className="space-y-2.5 font-mono text-[11px] leading-relaxed text-[#b7bbc1]">
                            <li>› Private room with live video and chat</li>
                            <li>› Host-only problem picker</li>
                            <li>› Judge0 execution in three languages</li>
                        </ul>
                    </div>
                </div>

                <div className="flex items-center justify-end gap-3 border-t border-[var(--line)] px-6 py-5">
                    <button className="btn-void" onClick={onClose}>Cancel</button>
                    <button className="btn-cyan" onClick={onCreateRoom} disabled={isCreating}>
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
