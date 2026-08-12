---
name: karpathy-guidelines
description: >-
  Behavioral guidelines to reduce common LLM coding mistakes.
  Use when writing, reviewing, or refactoring code to avoid overcomplication,
  make surgical changes, surface assumptions, and define verifiable success criteria.
  Derived from Andrej Karpathy's observations on LLM coding pitfalls.
license: MIT
source: https://github.com/multica-ai/andrej-karpathy-skills
---

# Karpathy Guidelines

Behavioral guidelines to reduce common LLM coding mistakes, derived from
[Andrej Karpathy's observations](https://x.com/karpathy/status/2015883857489522876)
on LLM coding pitfalls.

> **Tradeoff:** These guidelines bias toward caution over speed.
> For trivial tasks, use judgment.

---

## 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing anything:

- **State assumptions explicitly** — If uncertain, ask rather than guess.
- **Present multiple interpretations** — Don't pick silently when ambiguity exists.
- **Push back when warranted** — If a simpler approach exists, say so.
- **Stop when confused** — Name what's unclear and ask for clarification.

> ❌ WRONG: Pick an interpretation silently and run with it.
> ✅ CORRECT: "I see two approaches: A (simple) and B (flexible). Given your context, I'd recommend A. Confirm?"

---

## 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

Combat the tendency toward overengineering:

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

**The test:** Would a senior engineer say this is overcomplicated? If yes, simplify.

> ❌ WRONG: Abstract a helper for something used once.
> ✅ CORRECT: Inline it. Optimize only when needed.

---

## 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:

- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, **mention it — don't delete it**.

When your changes break something unrelated:

- Fix the breakage, but don't cascade into broader refactors.
- Isolate and explain what happened.

> ❌ WRONG: Reformat surrounding code while fixing a bug.
> ✅ CORRECT: Touch only the lines that need changing.

---

## 4. Goal-Driven Execution

**Define success criteria before writing code. Verify before declaring done.**

Before implementation:

- Define what "done" looks like — in tests, outputs, or observable behavior.
- Write tests or assertions first when possible (TDD mindset).
- Identify the minimal path to verifiable success.

After implementation:

- Run the tests or simulate the success criteria.
- If something can't be verified, say so explicitly.
- Don't declare "done" without evidence it works.

> ❌ WRONG: "Here's the code, it should work."
> ✅ CORRECT: "I've added X. Here's how to verify: run `npm test` and check Y."

---

## Applying These Guidelines

| Situation | Guideline to Apply |
|-----------|-------------------|
| Vague request | **#1** — Clarify before coding |
| Adding a "nice to have" | **#2** — Resist. Ask first. |
| Editing existing file | **#3** — Touch only what's needed |
| Finishing a task | **#4** — Define and verify success |
| Reviewing AI-generated code | All four — in order |
