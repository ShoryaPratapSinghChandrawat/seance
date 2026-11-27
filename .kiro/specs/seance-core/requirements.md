# Requirements — SÉANCE core (v1)

Scope: Flash (.swf) artifacts, revived in the browser with Ruffle. No other runtimes in v1.

## R1 Upload and identify
As a user, I drop a .swf file so SÉANCE identifies it.
- WHEN a file is dropped THEN the system SHALL read its signature (FWS/CWS/ZWS) and report format and SWF version.
- IF the signature is not a SWF THEN the system SHALL report format UNKNOWN with a plain-language reason.

## R2 Deterministic analysis
- The system SHALL extract stage size, frame rate, ActionScript version and potential external URL references into an ArtifactReport.
- IF the ActionScript version cannot be established from reliable evidence THEN it SHALL be "unknown".
- IF analysis is incomplete (LZMA not decoded, malformed or truncated file, size limit hit) THEN analysisCoverage SHALL be LIMITED.
- Size limits SHALL apply to the uploaded file AND to the decompressed output.
- Malformed input SHALL NOT crash the app, and the analyzer SHALL NOT fetch any URL it finds.

## R3 Ghost Agent interpretation
- The system SHALL send only the ArtifactReport (never the raw file) to the server-side proxy, which asks an AI to interpret the evidence.
- The result SHALL be a schema-validated Diagnosis: causeOfDeath, risks, strategy, expectedOutcome (an opinion, never the final status).
- IF the AI response is invalid, slow or unavailable THEN the system SHALL fall back to a deterministic diagnosis.

## R4 Runtime
- The system SHALL load the artifact in Ruffle in the user's browser, self-hosted (no runtime CDN).
- The system SHALL record a RuntimeOutcome: RUNTIME_UNAVAILABLE, LOAD_FAILED, LOADED or RUNTIME_ERROR, based on real Ruffle behavior.

## R5 Final status
- Final status SHALL be computed only by a deterministic status evaluator from the ArtifactReport (including analysisCoverage) and the RuntimeOutcome:
  - RUNTIME_UNAVAILABLE => UNVERIFIED
  - format UNKNOWN, LOAD_FAILED or RUNTIME_ERROR => CANNOT_RESURRECT
  - LOADED with potential external references, or analysisCoverage LIMITED => PARTIAL
  - LOADED, analysisCoverage COMPLETE, no potential external references => RESURRECTED
- The Diagnosis and its expectedOutcome SHALL be displayed separately and SHALL NOT alter FinalStatus. FinalStatus SHALL be determined exclusively by the status evaluator using ArtifactReport, RuntimeOutcome and analysisCoverage.
- RESURRECTED SHALL NOT claim that every feature of the artifact was verified.

## R6 Preservation Passport
- The system SHALL show and offer a JSON download of a passport: filename, SHA-256, format/version, stage size, fps, ActionScript version, runtime and version, potential external references (labelled "not verified as required by the application"), runtimeOutcome, analysisCoverage, diagnosis, status, timestamp.

## R7 Demo path
- The system SHALL offer one-click "Summon sample artifact" buttons for two ORIGINAL samples: one that should reach RESURRECTED and one constructed fixture that reaches PARTIAL. The PARTIAL sample SHALL NOT make network requests and SHALL be described as a constructed example.

## R8 Safety
- Uploaded files SHALL stay in the browser and never execute server-side.
- The AI API key SHALL exist only in the server environment, never in the repo, responses, logs or client bundle.

## R9 Quality
- Property-based tests SHALL cover the analyzer (never throws, truncation, non-SWF, URL list rules, decompression bomb) and the status evaluator (RESURRECTED never occurs when references exist, coverage is LIMITED, or the outcome is not LOADED).
