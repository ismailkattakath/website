---
title: "De-tracing: recovering the design system inside an auto-traced logo"
role: "Case study — methodology"
period: "2026"
summary: "A client logo arrived as auto-traced vector soup: 92 wobbly segments, no symmetry, stroke widths wandering 30–37 units. Instead of redrawing it, I ran an analysis-by-synthesis loop — measure, fit closed-form, render, diff — down to a 14-primitive parametric rebuild with 0.0000u mirror-symmetry deviation."
order: 1
---

## The proof, first

This is the final deliverable of the verification pipeline: a symmetric-difference map of the
original logo against the parametric rebuild, computed in-browser by SVG cross-masking. Blue is
agreement.

**Segments → primitives: 92 → 14 · Mirror-symmetry deviation: 0.0000u · Hypotheses falsified: 3 ·
Final residual, all declared: 1.5%**

## Analysis by synthesis, run by hand and critic

The method hypothesizes a parametric model, renders it, compares against the source raster, and
lets the residual drive the next update — coordinate descent over components (walls, then lips,
then bottom topology, then letters), each verified locally before the next.

## Fifteen constants were hiding in the wobble

Cross-sections of the traced walls fit straight lines with slopes 0.5506 and 0.5510 — the designer
meant 0.55. The midline sat at 255.3 on a 512 canvas — they meant 256. Perpendicular stroke
thickness clustered around 32; what looked like noise was a handful of intended constants buried in
auto-trace error.

## Three hypotheses died. That is the point.

Gradient methods tune a hypothesis; they cannot reject one. This loop did, three times — each
caught by measurement or by looking, each replacing a model class, not a parameter:

- **Falsified 01 — bottom topology.** Modeled: one continuous bottom stroke. Measured: the source's
  bottom edge terminates into the letters — the left piece becomes the S, the right piece rises as
  the I, and the gap around the C cuts through to white.
- **Falsified 02 — the lip "curl".** Modeled: an arc with a descending tail. Row-profile measurement
  showed the lip occupies exactly one stroke-width vertically — it is a horizontal bar with a round
  cap; the "curl" was the cap's curvature.
- **Falsified 03 — containment proof.** A clip-path "proof" checked the arc midspan and missed that
  its own sharp corners leaked 42 units past the stroke. The render caught it; the corrected clip
  follows the fillet arcs.

## The failure catalog is the finding

Three defects passed every numerical assertion and fell only to a vision check in the real
rendering context: a WebKit thumbnail bug that dropped an element `cairosvg` rendered fine, and
blind probe points that sampled gaps a human eye caught immediately. That boundary is directly
load-bearing for production document-AI: OCR training loops can self-evaluate (render → rasterize →
recognize → compare gives free ground truth), while layout fidelity and rendering QA still need a
vision critic exactly where metrics go blind.

## Ledger

Method framing, honestly calibrated: this is human-in-the-loop iterative refinement with
closed-form fits and an AI vision critic — one documented execution of a method, not a theory.

The logo was the vehicle. The method is the product: measurement before modeling, closed-form over
curve-fitting, verification as a deliverable, and a vision critic exactly where metrics go blind.
