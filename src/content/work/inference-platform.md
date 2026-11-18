---
title: "One inference layer, three providers"
role: "GenAI infrastructure"
period: "Oct 2017 — Jul 2024"
summary: "Provider-abstracted inference, RAG and MCP implementations, and a unified model-and-tools gateway. Multi-GPU inference serving on vLLM/Kubernetes with measured cost and latency reductions on that platform; identical generation code runs free-local (Ollama) or managed-cloud (LiteLLM proxy)."
order: 3
---

- Multi-GPU inference serving on vLLM / Kubernetes — ~25% cost and ~40% latency reduction *on that
  platform* (self-measured, single environment — see `/resume.json` for the source claim)
- One provider switch across local Ollama and a LiteLLM proxy — identical generation code runs
  free-local or managed-cloud
- Optimized image-manipulation pipelines serving 80+ app vendors
- Snowflake AI agents with granular access control and data-residency compliance
- Multi-agent orchestration and human-in-the-loop review UIs, productionized with IaC and CI/CD
