// Piston's public API (emkc.org) became whitelist-only on 2026-02-15, so it now
// returns 401 for projects like this one. Judge0 CE's public demo accepts the
// same kind of code submissions with no API key and allows browser requests.
const JUDGE0_API = "https://ce.judge0.com";

const LANGUAGE_IDS = {
  javascript: 93, // Node.js 18.15.0
  python: 92, // Python 3.11.2
  java: 91, // OpenJDK 17.0.6
};

const ACCEPTED_STATUS_ID = 3;

/**
 * @param {string} language - programming language
 * @param {string} code - source code to execute
 * @returns {Promise<{success:boolean, output?:string, error?: string}>}
 */
export async function executeCode(language, code) {
  try {
    const languageId = LANGUAGE_IDS[language];

    if (!languageId) {
      return {
        success: false,
        error: `Unsupported language: ${language}`,
      };
    }

    const response = await fetch(
      `${JUDGE0_API}/submissions?base64_encoded=false&wait=true`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          language_id: languageId,
          source_code: code,
        }),
        signal: AbortSignal.timeout(30000),
      }
    );

    if (!response.ok) {
      return {
        success: false,
        error: `HTTP error! status: ${response.status}`,
      };
    }

    const data = await response.json();

    const output = data.stdout || "";
    const error = data.compile_output || data.stderr || data.message || "";

    if (data.status?.id !== ACCEPTED_STATUS_ID) {
      return {
        success: false,
        output,
        error: error || data.status?.description || "Execution failed",
      };
    }

    return {
      success: true,
      output: output || "No output",
    };
  } catch (error) {
    return {
      success: false,
      error: `Failed to execute code: ${error.message}`,
    };
  }
}
