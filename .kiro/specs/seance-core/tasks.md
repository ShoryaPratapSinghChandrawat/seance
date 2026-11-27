# Tasks — SÉANCE core (v1)

Work one phase at a time. Stop at the end of each phase for human review.

## Phase 1 — Foundation
- [ ] 1.1 Scaffold Vite + React + TypeScript with only frontend, validation and test dependencies
- [ ] 1.2 Folder layout, .gitignore (.kiro NOT ignored), .env.example (names only)
- [ ] 1.3 THIRD_PARTY.md, README stub, npm scripts (dev, build, test), toolchain smoke tests
- [ ] 1.4 License: wait for the human to confirm MIT or Apache-2.0 and the copyright holder name; do not create LICENSE before that confirmation

## Phase 2 — Ruffle vertical slice (critical path)
- [ ] 2.1 Smoke-test SWF built with an open-source toolchain (shape, movement, one button)
- [ ] 2.2 Verify Ruffle integration path for Vite and self-host it
- [ ] 2.3 Ruffle runtime plugin and minimal page with a "Summon sample" button
- [ ] 2.4 Human confirms the SWF runs and responds in the browser

## Phase 3 — Analyzer
- [ ] 3.1 Header, decompression, RECT, fps, tags, ActionScript detection
- [ ] 3.2 URL scan, SHA-256, size and decompression limits, analysisCoverage
- [ ] 3.3 Unit tests and property tests (R9)

## Phase 4 — Ghost Agent and proxy
- [ ] 4.1 Schemas, deterministic fallback, prompt
- [ ] 4.2 Server-side proxy with validation, rate limit, timeout, fallback
- [ ] 4.3 Client, tests, secret scan

## Phase 5 — Status and Passport
- [ ] 5.1 Second sample SWF (constructed PARTIAL fixture, no network requests)
- [ ] 5.2 Status evaluator and RuntimeOutcome detection; derive FinalStatus exclusively from ArtifactReport, RuntimeOutcome and analysisCoverage, without using Diagnosis
- [ ] 5.3 Passport builder, JSON export, tests

## Phase 6 — UI/UX
- [ ] 6.1 Home, autopsy steps, stage, passport card, failure screens
- [ ] 6.2 Ghost narrator with functional copy; accessibility and reduced motion

## Phase 7 — Deploy and submit
- [ ] 7.1 Deploy frontend and proxy; test public URL
- [ ] 7.2 Security sweep; README, THIRD_PARTY.md, KIRO_USAGE.md
- [ ] 7.3 Devpost text, demo video (< 3:00), final checklist, submit early

## Optional, only if everything above is done
- [ ] Kiro Crew app in a separate repo; second runtime after license review
