import Editor from "@monaco-editor/react";
import { Loader2Icon, PlayIcon } from "lucide-react";
import { LANGUAGE_CONFIG } from "../data/problems";

function defineStudioTheme(monaco) {
    monaco.editor.defineTheme("talent-override", {
        base: "vs-dark",
        inherit: true,
        rules: [
            { token: "", foreground: "E4E6E8", background: "0C0E11" },
            { token: "comment", foreground: "5D6269", fontStyle: "italic" },
            { token: "keyword", foreground: "E8FF3A" },
            { token: "string", foreground: "22D3EE" },
            { token: "number", foreground: "FF6B9F" },
            { token: "delimiter", foreground: "8B9097" },
            { token: "type", foreground: "7EE7F8" },
            { token: "identifier", foreground: "E4E6E8" },
        ],
        colors: {
            "editor.background": "#0C0E11",
            "editor.foreground": "#E4E6E8",
            "editorLineNumber.foreground": "#3D4249",
            "editorLineNumber.activeForeground": "#E8FF3A",
            "editor.selectionBackground": "#E8FF3A33",
            "editor.lineHighlightBackground": "#FFFFFF08",
            "editorCursor.foreground": "#E8FF3A",
            "editorIndentGuide.background1": "#FFFFFF0D",
            "editorGutter.background": "#0C0E11",
            "scrollbarSlider.background": "#FFFFFF14",
            "scrollbarSlider.hoverBackground": "#FFFFFF26",
        },
    });
    monaco.editor.setTheme("talent-override");
}

function CodeEditorPanel({
    selectedLanguage,
    code,
    isRunning,
    onLanguageChange,
    onCodeChange,
    onRunCode,
}) {
    const language = LANGUAGE_CONFIG[selectedLanguage];

    return (
        <div className="flex h-full flex-col bg-[#0c0e11]">
            <div className="flex items-center justify-between border-b border-[var(--line)] bg-[#0e1013] px-4 py-2.5">
                <div className="flex items-center gap-3">
                    <img src={language.icon} alt={language.name} className="size-5 opacity-90" />
                    <select
                        className="select !min-h-8 !w-auto !min-w-[112px] !border-transparent !bg-transparent !px-1 !pr-6 !text-[11px] uppercase tracking-[0.06em] hover:!border-[var(--line)]"
                        value={selectedLanguage}
                        onChange={onLanguageChange}
                    >
                        {Object.entries(LANGUAGE_CONFIG).map(([key, lang]) => (
                            <option key={key} value={key} className="bg-[#111316]">
                                {lang.name}
                            </option>
                        ))}
                    </select>
                    <span className="h-4 w-px bg-[var(--line)]" />
                    <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-[#5d6269]">
                        main.{selectedLanguage === "python" ? "py" : selectedLanguage === "java" ? "java" : "js"}
                    </span>
                </div>

                <button
                    className="btn btn-primary gap-2 !px-4 !py-2"
                    disabled={isRunning}
                    onClick={onRunCode}
                >
                    {isRunning ? (
                        <Loader2Icon className="size-3.5 animate-spin" />
                    ) : (
                        <PlayIcon className="size-3.5" fill="currentColor" />
                    )}
                    {isRunning ? "Running…" : "Run code"}
                </button>
            </div>

            <div className="min-h-0 flex-1">
                <Editor
                    height="100%"
                    language={language.monacoLang}
                    value={code}
                    onChange={onCodeChange}
                    theme="talent-override"
                    beforeMount={defineStudioTheme}
                    options={{
                        fontSize: 14,
                        fontFamily: "'Space Mono', monospace",
                        lineNumbers: "on",
                        scrollBeyondLastLine: false,
                        automaticLayout: true,
                        minimap: { enabled: false },
                        padding: { top: 18, bottom: 18 },
                        renderLineHighlight: "line",
                        smoothScrolling: true,
                        cursorBlinking: "smooth",
                        bracketPairColorization: { enabled: true },
                        scrollbar: { verticalScrollbarSize: 8, horizontalScrollbarSize: 8 },
                        tabSize: 4,
                    }}
                />
            </div>
        </div>
    );
}
export default CodeEditorPanel;
