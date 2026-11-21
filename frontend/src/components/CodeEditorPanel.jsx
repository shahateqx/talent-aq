import Editor from "@monaco-editor/react";
import { Loader2Icon, PlayIcon } from "lucide-react";
import { LANGUAGE_CONFIG } from "../data/problems";

function defineNoirTheme(monaco) {
    monaco.editor.defineTheme("talent-noir", {
        base: "vs-dark",
        inherit: true,
        rules: [
            { token: "", foreground: "D9D5CC", background: "0E1117" },
            { token: "comment", foreground: "6E7580", fontStyle: "italic" },
            { token: "keyword", foreground: "D8B98A" },
            { token: "string", foreground: "9FC9B0" },
            { token: "number", foreground: "C4A9D6" },
            { token: "delimiter", foreground: "8A909B" },
            { token: "type", foreground: "8FB6C9" },
            { token: "identifier", foreground: "D9D5CC" },
        ],
        colors: {
            "editor.background": "#0E1117",
            "editor.foreground": "#D9D5CC",
            "editorLineNumber.foreground": "#454B55",
            "editorLineNumber.activeForeground": "#D8B98A",
            "editor.selectionBackground": "#D8B98A33",
            "editor.lineHighlightBackground": "#FFFFFF07",
            "editorCursor.foreground": "#D8B98A",
            "editorIndentGuide.background1": "#FFFFFF0D",
            "editorIndentGuide.activeBackground1": "#D8B98A33",
            "editorGutter.background": "#0E1117",
            "editorWhitespace.foreground": "#FFFFFF12",
            "scrollbarSlider.background": "#FFFFFF14",
            "scrollbarSlider.hoverBackground": "#FFFFFF26",
            "scrollbarSlider.activeBackground": "#D8B98A44",
            "editorOverviewRuler.border": "#00000000",
        },
    });
    monaco.editor.setTheme("talent-noir");
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
        <div className="flex h-full flex-col bg-[#0e1117]">
            <div className="flex items-center justify-between border-b border-[var(--line)] bg-[#0e1118] px-4 py-2.5">
                <div className="flex items-center gap-3">
                    <img src={language.icon} alt={language.name} className="size-5 opacity-90" />
                    <select
                        className="select select-sm !rounded-lg !bg-transparent !border-transparent !pl-1 text-[13px] font-medium text-[#d7d4cc] hover:!border-[var(--line)]"
                        value={selectedLanguage}
                        onChange={onLanguageChange}
                    >
                        {Object.entries(LANGUAGE_CONFIG).map(([key, lang]) => (
                            <option key={key} value={key} className="bg-[#11151d]">
                                {lang.name}
                            </option>
                        ))}
                    </select>
                    <span className="hidden h-4 w-px bg-[var(--line)] sm:block" />
                    <span className="hidden font-mono text-[11px] text-[#626772] sm:block">
                        main.{selectedLanguage === "python" ? "py" : selectedLanguage === "java" ? "java" : "js"}
                    </span>
                </div>

                <button
                    className="btn btn-primary btn-sm gap-2 !px-5 !text-xs"
                    disabled={isRunning}
                    onClick={onRunCode}
                >
                    {isRunning ? (
                        <>
                            <Loader2Icon className="size-3.5 animate-spin" />
                            Running…
                        </>
                    ) : (
                        <>
                            <PlayIcon className="size-3.5" fill="currentColor" />
                            Run code
                        </>
                    )}
                </button>
            </div>

            <div className="min-h-0 flex-1">
                <Editor
                    height="100%"
                    language={language.monacoLang}
                    value={code}
                    onChange={onCodeChange}
                    theme="talent-noir"
                    beforeMount={defineNoirTheme}
                    options={{
                        fontSize: 14,
                        fontFamily: "'DM Sans', ui-monospace, monospace",
                        fontLigatures: true,
                        lineNumbers: "on",
                        scrollBeyondLastLine: false,
                        automaticLayout: true,
                        minimap: { enabled: false },
                        padding: { top: 18, bottom: 18 },
                        renderLineHighlight: "line",
                        smoothScrolling: true,
                        cursorBlinking: "smooth",
                        cursorSmoothCaretAnimation: "on",
                        bracketPairColorization: { enabled: true },
                        guides: { indentation: true, bracketPairs: false },
                        scrollbar: { verticalScrollbarSize: 8, horizontalScrollbarSize: 8 },
                        tabSize: 4,
                    }}
                />
            </div>
        </div>
    );
}
export default CodeEditorPanel;
