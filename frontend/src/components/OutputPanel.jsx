function OutputPanel({ output }) {
    return (
        <div className="flex h-full flex-col bg-[#0b0e14]">
            <div className="flex items-center justify-between border-b border-[var(--line)] bg-[#0e1118] px-4 py-2.5">
                <div className="flex items-center gap-2.5">
                    <span className="flex gap-1.5">
                        <span className="size-2 rounded-full bg-[#d98e88]/60" />
                        <span className="size-2 rounded-full bg-[#d9b877]/60" />
                        <span className="size-2 rounded-full bg-[#8cc5a2]/60" />
                    </span>
                    <span className="eyebrow !text-[10px] !tracking-[0.18em] !text-[#8d919b]">
                        Console
                    </span>
                </div>
                {output && (
                    <span
                        className={`flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] ${
                            output.success ? "text-[#a5dcb9]" : "text-[#e6a49f]"
                        }`}
                    >
                        <span
                            className={`size-1.5 rounded-full ${
                                output.success ? "bg-[#8cc5a2]" : "bg-[#d98e88]"
                            }`}
                        />
                        {output.success ? "Passed" : "Error"}
                    </span>
                )}
            </div>

            <div className="min-h-0 flex-1 overflow-auto p-5 font-mono text-[13px] leading-relaxed">
                {output === null ? (
                    <p className="font-sans text-sm text-[#666b75]">
                        Run your code to see the output here.
                    </p>
                ) : output.success ? (
                    <pre className="whitespace-pre-wrap text-[#a5dcb9]">{output.output}</pre>
                ) : (
                    <div className="space-y-3">
                        {output.output && (
                            <pre className="whitespace-pre-wrap text-[#b6b3ac]">{output.output}</pre>
                        )}
                        <pre className="whitespace-pre-wrap text-[#e6a49f]">{output.error}</pre>
                    </div>
                )}
            </div>
        </div>
    );
}
export default OutputPanel;
