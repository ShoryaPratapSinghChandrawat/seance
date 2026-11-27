# Third-party software

Direct dependencies below are recorded at the exact versions in `package-lock.json`; the package metadata lists these licenses. The lockfile captures the transitive dependency tree. A complete transitive license and bundled-asset review remains a release prerequisite before treating the project's MIT license as a final legal review.

| Package | Locked version | Role | License |
|---|---:|---|---|
| `react` | 19.3.1 | Frontend runtime | MIT |
| `react-dom` | 19.3.1 | Browser DOM renderer | MIT |
| `zod` | 4.6.7 | Runtime schema validation | MIT |
| `vite` | 7.3.8 | Dev server and frontend build | MIT |
| `@vitejs/plugin-react` | 5.2.0 | React integration for Vite | MIT |
| `typescript` | 5.9.3 | Type checking | Apache-2.0 |
| `vitest` | 4.1.12 | Test runner | MIT |
| `fast-check` | 4.11.0 | Property-based testing | MIT |
| `@types/react` | 19.3.3 | React TypeScript declarations | MIT |
| `@types/react-dom` | 19.3.0 | React DOM TypeScript declarations | MIT |

Ruffle is not included in Phase 1; it will be listed after its integration and exact bundled version are reviewed in Phase 2. No third-party font or runtime CDN is used by the foundation UI.
