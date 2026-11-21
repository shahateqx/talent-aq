function OutputPanel({ output }) {
    return (
        <div className="flex h-full flex-col bg-[#0b0c0e]">
            <div className="flex items-center justify-between border-b border-[var(--line)] bg-[#0e1013] px-4 py-2.5">
                <div className="flex items-center gap-3">
                    <span className="flex gap-1.5">
                        <span className="dot dot-pink" />
                        <span className="dot dot-yellow" />
                        <span className="dot dot-green" />
                    </span>
                    <span className="micro micro-bright">Console</span>
                </div>
                {output && (
                    <span className={`tag ${output.success ? "tag-cyan" : "tag-pink"}`}>
                        {output.success ? "Passed" : "Error"}
                    </span>
                )}
            </div>

            <div className="min-h-0 flex-1 overflow-auto p-5 font-mono text-[12px] leading-relaxed">
                {output === null ? (
                    <p className="text-[12px] text-[#5d6269]">
                        Run your code to see the output here.
                    </p>
                ) : output.success ? (
                    <pre className="whitespace-pre-wrap text-[#8ee6a8]">{output.output}</pre>
                ) : (
                    <div className="space-y-3">
                        {output.output && (
                            <pre className="whitespace-pre-wrap text-[#b7bbc1]">{output.output}</pre>
                        )}
                        <pre className="whitespace-pre-wrap text-[#ff87ae]">{output.error}</pre>
                    </div>
                )}
            </div>
        </div>
    );
}
export default OutputPanel;
