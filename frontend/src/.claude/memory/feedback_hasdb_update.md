---
name: hasDB flag update rule
description: When adding a country's drug DB to symptomData.ts, also flip hasDB to true in countryDetect.ts
type: feedback
---

When adding a new country's drug database entries to symptomData.ts, always also update that country's `hasDB: false` to `hasDB: true` in countryDetect.ts. This removes the "준비중/Coming soon" badge from the country selection screen.

**Why:** User wants the "준비중" badge to automatically disappear when the DB is ready, not as a separate step.

**How to apply:** Every time drug entries for a new country (TH, PH, ID, etc.) are added to the DRUGS record and mapped in SYMPTOM_CATEGORIES, find the corresponding country in SUPPORTED_COUNTRIES array in countryDetect.ts and change `hasDB: false` to `hasDB: true`.
