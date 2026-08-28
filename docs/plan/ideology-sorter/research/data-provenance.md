# Data, Provenance, and Reuse Research

## MVP posture

The first release is a hand-authored interpretive dataset. It is not a statistical estimate of identity, a psychological instrument, a voting recommendation, or a claim about what any person "really is".

Every question and anchor record will carry:

- an internal stable ID;
- a layer and domain;
- the facet effects used by the scorer;
- a plain-language editorial note;
- `sourceType` and source references;
- a version number.

The initial source posture is `inspired_by`, not `copied_from`. This makes the influence of other projects visible without importing their item banks or asserting that their mappings are objectively correct.

## Future external position data

The [Manifesto Project Dataset 2025a](https://gitlab.manifesto-project.wzb.eu/datasets/MPDS2025a) is a maintained party-preference dataset with documented versions and a public codebook. The [Manifesto Project overview](https://manifesto-project.wzb.eu/information/documents/information) describes its scope as party manifesto analysis across countries and time.

It is recorded as a future research input only. Parties and manifestos are not interchangeable with ideological traditions, and adding current or historical actors would require a separate scope decision, country/time coverage policy, and provenance review.

## Licensing boundary

- Preserve attribution links for inspiration sources in the methodology page.
- Do not copy source question wording, logos, images, or implementation code into the MVP.
- If a later import is approved, pin the exact source revision and store its license alongside the imported records.
- Keep original item wording and editorial anchor notes under this project's own version history.
