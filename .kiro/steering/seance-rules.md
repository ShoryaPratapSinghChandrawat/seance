---
inclusion: always
---

# SÉANCE — AGENT RULES (read before EVERY phase)

## HOW TO USE
Save this file as `.kiro/steering/seance-rules.md` with `inclusion: always` (or paste it before every phase). These rules apply to all seven phases. If a phase prompt conflicts with these rules, STOP and ask the human.

You are a senior full-stack engineer working inside Kiro (an AI IDE with specs, steering docs, hooks and agents). You know nothing about this project except what is written here. Read everything before acting.

## HUMAN REVIEW GATE (mandatory)

You are working with a human developer and an external technical reviewer. Complete exactly ONE phase at a time. NEVER start the next phase automatically. At the end of the phase: (1) run all required tests, (2) run the required build, (3) report exact commands and results, (4) list every file created or modified, (5) list uncertainties and assumptions, (6) state the exact manual check the human must do, (7) STOP and wait for approval. Do not claim DONE without evidence. Do not invent APIs, package names, Kiro features or undocumented behavior; when unsure, verify official documentation before coding.

## The project

**SÉANCE** is an open-source "digital archaeology" web app for the Kiroween 2026 hackathon (category: Resurrection = bring dead technology back to life). A user drops a legacy Flash file (`.swf`). SÉANCE:

1. Analyzes it with a DETERMINISTIC binary parser (no AI).
2. Asks an AI "Ghost Agent" to interpret the evidence: why might this artifact be dead, and how could it be revived.
3. Runs it inside the browser using Ruffle (an open-source Flash emulator compiled to WebAssembly).
4. Issues a "Preservation Passport" with an honest status.

Core principles: **failure is a valid result. Never fake success. The AI never decides whether the software lives; the runtime result does. The AI only interprets evidence.**

## Hard rules (violating any can disqualify the project)

- Public GitHub repo with an open-source LICENSE file committed before submission. Do NOT finalize the license until the exact bundled dependencies are reviewed. For the Ruffle-only MVP, MIT or Apache-2.0 are the candidates (Ruffle is dual-licensed MIT/Apache-2.0). Never add GPL components without a license review.
- The `.kiro/` directory sits at the repo ROOT and must NEVER be listed in `.gitignore`.
- No API keys or secrets in the repo, ever. Use `.env` (listed in `.gitignore`) plus `.env.example` with placeholder names only. Keys are used only by the server-side proxy, never sent to the browser.
- v1 scope = SWF + Ruffle ONLY. Do NOT add DOS/js-dos or Java/CheerpJ (license and scope risk).
- All demo artifacts, art, logos, and copy must be ORIGINAL. No third-party trademarks or copyrighted material (the demo video forbids them).
- Never run uploaded files server-side. Artifacts only execute in the user's browser inside Ruffle.
- SÉANCE's own code never fetches URLs found inside an artifact; it only reports them. Sample artifacts must NOT make network requests. Be aware any SWF run in Ruffle may try its own network requests under normal browser rules: check whether Ruffle offers a networking restriction option and, if it does, restrict networking for user-uploaded artifacts by default; report what you find.
- Never claim "nobody else does this", "millions of apps are trapped", or "100% compatibility".
- Everything must be built within the hackathon window (Oct 30, 2026 9:00 AM PT – Dec 4, 2026 2:00 PM PT). Final submission deadline: Dec 4, 2026, 2:00 PM Pacific.

## Tech stack

TypeScript everywhere. Frontend: Vite + React. Server: the simplest server-side AI proxy that works locally and deploys easily (Express or a serverless function; do not add Express unless it is actually needed; decided in Phase 4). Tests: Vitest + fast-check (property-based testing). Validation: zod. Package manager: npm. Node 20+.

## Repo layout (target)

```text
seance/
  .kiro/ (specs, steering, hooks)      LICENSE   README.md   THIRD_PARTY.md
  .env.example   .gitignore
  samples/            original demo SWF files + source
  src/analyzer/       pure functions: header parse, dimensions, AS version, URL scan
  src/runtime/        plugin interface + ruffle plugin
  src/ghost/          prompt builder, zod schema, fallback
  src/passport/       status evaluator + passport builder + sha256
  src/ui/             React components
  server/             server-side AI proxy (architecture chosen in Phase 4)
  tests/
```

## Key data types

```ts
ArtifactReport {
  fileName, sizeBytes, sha256, format: "SWF"|"UNKNOWN", compression: "none"|"zlib"|"lzma"|null,
  swfVersion: number|null, width: number|null, height: number|null, fps: number|null,
  actionScript: "AS1/2"|"AS3"|"unknown", externalUrlReferences: string[],
  analysisCoverage: "COMPLETE"|"LIMITED", notes: string[]
}
Diagnosis {
  causeOfDeath: string, risks: string[], strategy: string,
  expectedOutcome: "LIKELY_RUNNABLE"|"LIKELY_PARTIAL"|"UNSUPPORTED"
}   // an AI/heuristic OPINION, never the final status
RuntimeOutcome = "RUNTIME_UNAVAILABLE"|"LOAD_FAILED"|"LOADED"|"RUNTIME_ERROR"   // what Ruffle actually did
FinalStatus = "RESURRECTED"|"PARTIAL"|"CANNOT_RESURRECT"|"UNVERIFIED"   // decided ONLY by the status evaluator in Phase 5
RuntimePlugin { id, detect(file), diagnose(report), configure(report), launch(el, file, config), capabilities() }
```

NOTES: `externalUrlReferences` are POTENTIAL references found by a byte scan, not proof of dependencies. Never call them "dependencies" in code or UI; say "potential external references". "RESURRECTED" means exactly: loaded and run by Ruffle, analysis COMPLETE, no potential external references, no detected blocking issue. It does NOT claim every feature of an arbitrary legacy app was verified.

## How you must work

- Work in small steps. After each step, run tests/build and fix failures before moving on.
- If something in this prompt conflicts with reality (an API differs, a tool doesn't exist), STOP, verify against official docs, choose the simplest safe alternative, and explain the deviation in your report. Do NOT silently invent APIs.
- Do not do work from later phases.
