// Ambient declarations for browser APIs not (yet) in the standard TypeScript DOM lib.

// Chrome built-in AI (Prompt / Summarizer) globals — Gemini Nano.
declare const LanguageModel: any;
declare const Summarizer: any;

// File System Access API entry point (used by files.ts).
interface Window {
  showDirectoryPicker?: (options?: any) => Promise<any>;
}
