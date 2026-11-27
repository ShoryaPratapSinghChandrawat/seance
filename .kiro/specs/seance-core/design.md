# Design — SÉANCE core (v1)

Principle: the analyzer reports evidence, the Ghost Agent interprets it, Ruffle provides the real runtime result, and a status evaluator decides. The AI never decides whether the software lives. The Diagnosis and its expectedOutcome are displayed separately and do not alter FinalStatus; the status evaluator determines FinalStatus exclusively from ArtifactReport, RuntimeOutcome and analysisCoverage.

## Pipeline
Upload -> Analyzer (deterministic) -> ArtifactReport -> Ghost Agent (AI or fallback) -> Diagnosis
       -> Runtime (Ruffle) -> RuntimeOutcome -> Status Evaluator -> Preservation Passport

## Modules
- `src/analyzer/`: parse header, RECT, fps, tags; ActionScript detection; URL scan; SHA-256; limits and coverage.
- `src/runtime/`: RuntimePlugin interface (detect, diagnose, configure, launch, capabilities) and the Ruffle plugin.
- `src/ghost/`: zod schemas, prompt builder, deterministic fallback, client.
- `src/passport/`: status evaluator (pure function), passport builder, JSON export.
- `server/`: server-side AI proxy, POST /diagnose; architecture (Express or serverless) chosen in Phase 4.
- `src/ui/`: DropZone, Autopsy steps, GhostNarrator, ArtifactStage, PassportCard.

## Data types
ArtifactReport { fileName, sizeBytes, sha256, format, compression, swfVersion, width, height, fps, actionScript, externalUrlReferences[], analysisCoverage, notes[] }
Diagnosis { causeOfDeath, risks[], strategy, expectedOutcome: LIKELY_RUNNABLE | LIKELY_PARTIAL | UNSUPPORTED }
RuntimeOutcome: RUNTIME_UNAVAILABLE | LOAD_FAILED | LOADED | RUNTIME_ERROR
FinalStatus: RESURRECTED | PARTIAL | CANNOT_RESURRECT | UNVERIFIED

## Key decisions
- URLs found in a file are "potential external references", never "dependencies".
- Ruffle is self-hosted; integration path verified against Ruffle's docs before use.
- The server receives only the ArtifactReport JSON, validated by zod.
- Every stage returns a Result type; the UI shows a ghost message plus a next action for each failure.

## Testing
Vitest unit tests per module; fast-check properties per requirement R9.
