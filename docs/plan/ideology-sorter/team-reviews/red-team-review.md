# Red-Team Review — Ideology Layer Sorter

## Scope and disposition

This is a plan-level adversarial review of `spec.md`, `research.md`, `interview.md`, and `docs/domain-dictionary.md`. It is not runtime evidence: the plan says the repository is still empty of application code (`spec.md:38-40`). The boundary-setting is useful—client-only state, no party or candidate matching, no scientific or identity claim, and explicit `no-view` handling (`spec.md:60-68`; `interview.md:18-24`)—but the stated mitigations do not yet close the main editorial, coercion, privacy, parser, and accessibility failure modes. Treat the following as implementation gates rather than optional polish.

## 1. Editorial bias and construct ambiguity

### Finding: “Original” and “non-scientific” do not make the instrument neutral

The product separates descriptive, normative, and prescriptive claims, but the separation itself is an editorial model. The UI translations “Diagnosis / what is true,” “Values / what is good,” and “Practice / what to do” (`docs/domain-dictionary.md:12-25`) can imply that the descriptive layer is objective, that normative claims have one shared account of “good,” or that prescriptive answers are a direct consequence of the first two layers. A descriptive item can smuggle in a causal premise; a normative item can assume whose interests, rights, or time horizon count; a prescriptive item can combine an end, an institutional mechanism, and an implementation constraint in one statement.

The anchor contract is especially vulnerable. Anchors are manually authored and approximate (`spec.md:130-143`; `docs/domain-dictionary.md:52-55`), while `sourceRefs` record sources but not who made the mapping, what alternatives were rejected, where the mapping is contested, or which facets are absent. Weighted item effects and weighted squared distance then turn those unrecorded editorial choices into an apparently mechanical result (`spec.md:87-95`, `spec.md:153-157`). A source-inspired structure can therefore reproduce a taxonomy’s blind spots while appearing more transparent than it is.

Required controls:

- Add an editorial record for every question and anchor: author/editor, date, source rationale, intended claim, population/scope/time assumptions, plausible alternative readings, excluded readings, and unresolved disagreement. A URL alone is not sufficient provenance.
- Require a claim decomposition review before an item is eligible: one empirical claim, one value claim, or one institutional choice. If an item intentionally combines claims, label the combination and explain why.
- Expose the anchor’s status as “editorial approximation” next to the label, not only inside a methodology panel. Do not let `internal fit` or “most influenced facets” imply that the mapping was discovered from respondents.
- Keep documented item review as a real boundary. The synthesized review is a design aid, not scientific evidence or canonical authority; preserve the wording decision, source rationale, and unresolved risks for each revision.
- Add an adversarial item review for leading language, asymmetric examples, moralized adjectives, omitted alternatives, culturally narrow assumptions, and causal claims presented without an uncertainty or evidence note.

### Finding: `Mixed / depends` is not the same thing as midpoint or neutrality

The interaction offers `Mixed / depends`, but the answer contract only distinguishes numeric answers from `no-view` (`spec.md:146-151`), and the scoring scale maps directional answers to `-2` through `+2` (`spec.md:87-94`). If `Mixed / depends` becomes `0`, a conditional view, ambivalence, qualified disagreement, and genuine midpoint are collapsed. That can change facet means and make a respondent look moderate even when they reject the premise or hold sharply conditional views. The research correctly rejects treating unanswered items as moderation (`research.md:20-25`), but the same protection is needed for mixed answers.

Required controls:

- Represent `mixed/depends` as a named state, not merely numeric zero, and preserve its count per layer and facet.
- Define whether mixed responses contribute to coverage and facet means. If they contribute, disclose the rule and run a sensitivity calculation that compares “mixed as midpoint” with “mixed excluded.” If they do not, call the resulting measure answered-direction coverage rather than overall coverage.
- If the user selects `depends`, offer an optional non-persistent qualifier such as “depends on context,” without making that qualifier a hidden classifier input. If qualifiers are out of scope, make the loss of information explicit.

## 2. Taxonomy density and scoring bias

Family balancing is a display rule, not proof that the taxonomy or distance function is balanced. The plan selects one nearest anchor per family and then fills remaining slots (`spec.md:87-95`), and the research says this prevents a dense family from dominating the neighbor list (`research.md:13-18`). It does not prevent a dense family from dominating the underlying fit, from contributing more correlated facets, from receiving more editorial attention, or from occupying the remaining slots after the first pass. The dictionary defines `family` as a safeguard but does not define a density audit (`docs/domain-dictionary.md:57-60`).

The question contract permits an arbitrary `effects` map (`spec.md:114-127`). Duplicate or highly correlated facets, unequal numbers of items per facet, and different weight magnitudes can make some concepts count several times. Normalizing distance against a maximum over observed facets does not correct for duplicated information or arbitrary weight selection. An anchor also contains profiles for all layers (`spec.md:133-143`), which can encourage a single label to appear as a coherent tradition across layers even when the data supports only a layer-specific resemblance.

Required controls:

- Maintain a versioned facet registry with definitions, direction, allowed range, layer ownership, item count, weight rationale, and a duplicate/correlation review. Reject unknown facets, zero-information facets, out-of-range effects, and unreviewed weights at build time.
- Report per-layer item density and per-facet answered density. Do not present a family-balanced neighbor list as a family-balanced measurement.
- Define a deterministic policy for family membership, empty families, duplicate labels, and ties within a tolerance. If the taxonomy cannot supply the requested number of distinct families, show fewer neighbors and say why; never pad with repeats or silently change the cap.
- Add leave-one-facet-out and leave-one-question-out sensitivity tests. A label that changes materially when one facet or one duplicated item is removed must be shown as unstable or withheld.
- Distinguish “global nearest anchors” from “one-per-family display neighbors.” Show when a family cap changed the visible list, and do not imply that the visible three are the three strongest matches overall.
- Give each layer an explicit “not represented by this taxonomy” outcome. A nearest available anchor is not evidence that the taxonomy contains an adequate neighbor.

## 3. Coercive or persuasive use

The non-goals exclude persuasion and current political actor matching (`spec.md:60-68`), but the product still produces prescriptive institutional signals, ranked-looking neighbors, and facet explanations. Those outputs can be used as a persuasion aid or as a proxy for political profiling even if the MVP has no accounts or analytics. The educator/facilitator stakeholder (`spec.md:22-28`) increases the risk of a person being asked to complete the tool in a classroom, workshop, campaign, workplace, or shared device. A disclaimer cannot make a compelled disclosure voluntary.

Required controls:

- Make completion optional in the interaction itself: provide a clear exit, a “skip this item” path through `no-view`, and a reset that clears in-memory answers and any visible share state. Do not describe a missing answer as a failure to cooperate.
- Do not use moralized labels, “normal” or “extreme” language, action prompts, persuasion copy, political calls to action, or recommendations. “Interpretive neighbor” is safer than “result,” but it must not be paired with imperative language or a single winner treatment.
- State in the methodology view that outputs must not be used for employment, admission, benefits, discipline, eligibility, political targeting, or decisions about another person. This is a use boundary, not a claim that client-side code can enforce it.
- Do not add post-MVP targeting hooks, referral parameters, event analytics, cohort storage, or facilitator exports without a new privacy and coercion review. The current no-analytics boundary is a safety property, not merely a scope decision (`spec.md:40`, `spec.md:66`).
- Before sharing, show exactly what the link contains and warn that anyone who receives it may infer political views. Never auto-copy or auto-open a share link. A manual fallback should be selectable without sending telemetry.
- On results, show uncertainty, coverage, ties, and missing domains before labels. A user should be able to leave with “the taxonomy was insufficient” rather than being steered toward a political identity.

## 4. Privacy and sensitive answer exposure

No API, database, authentication, or analytics is in scope (`spec.md:38-40`), and the browser keeps temporary answers in local state with an optional URL hash (`spec.md:30-36`). This limits server-side collection but does not make answers private. Political answers are sensitive: they can appear in browser history, synced tabs, screenshots, clipboard managers, chat messages, screen recordings, accessibility-tree captures, shared-device sessions, or browser extensions. A URL fragment is not encryption, access control, or a promise that client-side scripts and future instrumentation cannot read the payload.

Required controls:

- Define the share payload as a versioned, bounded, schema-validated record. It should contain only the minimum answer state needed for an explicitly requested reconstruction; never include names, free text, timestamps, stable user identifiers, device data, or derived labels that can be mistaken for authoritative classifications.
- Display a plain-language warning before creation: the link is a bearer artifact, anyone with it can inspect or reconstruct the answer pattern, and the user should not share it where political privacy matters. Provide a one-click “remove share data from this URL” action.
- Do not claim “private,” “anonymous,” or “secure” merely because the hash is local. Document browser-history, clipboard, screenshot, and shared-device risks. Avoid `localStorage` or other persistence unless separately justified and paired with a clear-data control; the stated in-process boundary should remain the default.
- Keep answer data out of URLs until the user explicitly activates sharing. On initial load, a valid link may be decoded, but the app should be able to replace the address with a clean URL after import so accidental history retention is reduced.
- Make the no-network claim testable as a strict allowlist: static app assets and deliberately opened methodology sources may be remote, but there must be no answer, hash, analytics, error-reporting, or fingerprint endpoint. Do not log raw hashes during development or production.
- Add a retention and deletion statement for in-memory answers, browser history, clipboard contents, and optional share links. If the public deployment has jurisdiction-specific privacy obligations, obtain a separate legal review rather than implying compliance from the architecture.

## 5. Malformed, stale, or adversarial share hashes

The current behavior says that a malformed hash returns to the intro (`spec.md:171-184`; `interview.md:50-54`), but it does not define what “malformed” means or prevent a parser from producing a plausible but altered result. A safe fallback must reject before scoring, not catch an exception after partial state has been accepted.

The parser contract should require all of the following:

- A fixed marker, explicit dataset/schema version, strict base64url or equivalent encoding, and a maximum raw and decoded length. Reject malformed percent escapes, invalid UTF-8, oversized payloads, decompression, and recursive or unexpectedly nested structures.
- An exact object schema. Accept only known question IDs from the matching dataset version; reject unknown IDs, duplicate IDs, duplicate object keys, arrays where objects are expected, prototype-like keys, nullish surprises, floats, `NaN`, `Infinity`, out-of-range integers, and answer strings other than the enumerated states.
- No trusted fields for layers, facets, effects, anchors, fit values, labels, HTML, or scoring rules. The hash may carry answers and version metadata only; all other data must come from the bundled, verified dataset.
- A fail-closed version policy. If the dataset version is unsupported, the app must show “link unavailable or from an older version,” clear the invalid state, and not silently remap IDs or recompute a result with changed questions.
- A distinction between valid partial state and a valid completed result. Partial links should resume or show coverage warnings; they must never cause missing items to become zero, neutral, or an implicit `no-view` without disclosure.
- Generic user-facing errors and no raw-payload logging. Render untrusted values as text only; never interpolate decoded hash content into HTML, attributes, selectors, or error markup.
- Tests for truncated hashes, extra fields, repeated keys, invalid encodings, very large inputs, version mismatch, unknown question IDs, malicious strings, valid partial answers, and exact round-trip canonicalization. The test suite should assert both “no result” and “no exception/crash.”

If importing a valid hash changes the URL, do so only after validation and use a history replacement rather than creating a chain of sensitive history entries. A rejected hash must not create an automatic retry loop.

## 6. Keyboard, screen-reader, and mobile accessibility

The current scenarios require keyboard reachability and a mobile layout without horizontal overflow (`spec.md:171-184`), but those checks are too weak to catch common custom-control failures. A five-choice scale plus `Mixed / depends` and `No view yet` is particularly easy to make visually clear while being semantically ambiguous.

Required controls:

- Implement each answer set as a native `fieldset` with a `legend` containing the complete question, layer, and any context. Use native radio inputs and labels where possible; preserve arrow-key selection, checked state, and an explicit accessible name for `No view yet`.
- Provide a skip link, visible `:focus-visible` styling, logical tab order, sufficient contrast, non-color indicators, and focus movement to the new question or result heading after Next/Back. Do not place focus on a decorative progress element.
- Announce layer transitions and validation errors through a restrained live region. Do not re-announce the whole 48-item questionnaire on every answer. Keep the current layer, item number, answered count, and coverage status available to assistive technology.
- Make methodology and source notes keyboard-operable with correct dialog/disclosure semantics, Escape handling where appropriate, and no focus trap that strands a keyboard or screen-reader user. The share and restart actions must have confirmation text and must not rely on clipboard success.
- Test at narrow widths including 320 CSS pixels, 200% and 400% text zoom, landscape and portrait orientations, software-keyboard open state, safe-area insets, and long translated-or-source-note text even though multilingual content is deferred. No fixed-height container may hide the active answer or navigation controls.
- Keep answer targets comfortably tappable, separate adjacent choices, support touch and keyboard without hover-only explanations, and preserve scroll position when the question changes. The long fixed flow needs a visible resume position and an easy way to review or revise prior answers.
- Include reduced-motion behavior, high-contrast behavior, and a screen-reader pass in addition to Playwright assertions. Automated browser tests can verify DOM state; they cannot by themselves establish usable keyboard or assistive-technology interaction.
- Treat the “must respond before Next” rule as a navigation invariant, not a pressure tactic. `No view yet` must be equally reachable, clearly explained, and never visually de-emphasized.

## 7. Safe-failure policy

The central safe-failure rule should be: when the input, taxonomy, provenance, or rendering state is not trustworthy, produce no interpretive label and preserve user control. The following cases should be explicit acceptance tests:

| Failure condition | Safe behavior | Unsafe behavior to prohibit |
|---|---|---|
| Invalid, stale, oversized, or adversarial share hash | Clear the imported state, return to intro or a neutral unavailable-state screen, and show a generic recoverable message | Partial decoding, silent ID remapping, raw hash in the DOM, crash, or retry loop |
| Valid but incomplete layer | Show answered/available counts and `insufficient information`; allow resume or restart | Treating missing items as zero, moderation, agreement, or a forced neighbor |
| Many `mixed/depends` responses | Preserve the state and disclose its separate count; use the declared sensitivity policy | Collapsing every mixed response into a confident midpoint without disclosure |
| Missing, duplicate, out-of-range, or unreviewed data record | Fail the build or withhold the affected layer/anchor from results | Applying a default effect, weight, label, family, or source note |
| `NaN`, overflow, negative distance, or non-finite normalized fit | Withhold the affected result and expose a developer-visible diagnostic without answer data | Rendering `0%`, `100%`, a random anchor, or a stale prior result |
| Tie or near-tie across anchors | Show a tie/cluster and the uncertainty reason; fewer neighbors are acceptable | Arbitrary ordering presented as a meaningful ranking |
| Family cap cannot be satisfied | Show the available families and the cap explanation | Repeating anchors or claiming the list is representative of all traditions |
| Provenance or license posture is incomplete | Keep the record out of the public result or mark it explicitly unreviewed | Publishing an anchor because it has a label and a URL |
| Clipboard unavailable or denied | Present a selectable link and a non-clipboard explanation | Repeated permission prompts, hidden copying, or telemetry containing the link |
| Rendering error or unavailable source panel | Keep a non-persuasive recovery path with restart/clear controls; preserve no sensitive payload in error output | Blank screen, blocked completion, or an error message that repeats political answers |
| User wants to stop or is being observed | Make exit, clear, and no-view choices obvious; do not preserve answers by default | Treating completion as required or revealing a result on a shared screen without an explicit action |

## Review conclusion

The plan’s strongest safety decisions are the separation of claim layers, the rejection of identity/probability language, the distinction between `no-view` and neutrality, the no-remote-answer boundary, and the intention to show ties and coverage. The main red-team concern is that these are currently framing statements and test labels, not yet enforceable data and runtime contracts. Before treating the MVP as safe for public or facilitated use, add the provenance/authorial-disagreement fields, a distinct mixed-response state, density and sensitivity checks, a bearer-link privacy contract, strict hash validation, and semantic accessibility tests. If any of those safeguards cannot be implemented, the safe fallback is to withhold the affected result or keep the tool in an inspectable local prototype mode rather than present a confident interpretive neighbor.

## Dictionary Updates

Add or revise the following terms in `docs/domain-dictionary.md`:

- **Mixed / depends** (`mixed-depends`): A substantive conditional, qualified, or ambivalent response. It is not `no-view`, not neutrality, and not automatically a numeric midpoint. Define whether it contributes to coverage and facet means, and expose its count.
- **Share hash / share payload** (`share-hash`): A user-created, versioned URL-fragment representation of answer state. It is a bearer artifact that may disclose sensitive political views; it is not private, encrypted, authenticated, or authoritative.
- **Dataset version** (`dataset-version`): The exact question, facet, anchor, and scoring bundle required to interpret a share payload. An unsupported version is stale/incompatible, not silently migratable.
- **Stale or incompatible result** (`stale-result`): A payload whose version, question IDs, or schema does not match the bundled dataset. It produces no interpretive result and must explain the recovery path without echoing untrusted data.
- **Taxonomy density** (`taxonomy-density`): Unequal numbers of anchors, facets, items, or correlated effects that can influence measurement or display independent of a user’s answers. It is distinct from family balancing.
- **Family balancing** (`family-balancing`): A display-selection constraint that limits family concentration in the visible neighbor list. It does not prove that the underlying scoring, taxonomy, or representation is balanced.
- **Editorial anchor** (`editorial-anchor`): A manually authored, approximate mapping from a layer/facet profile to an ideological tradition, including its authorial rationale, uncertainty, omissions, and disagreement status.
- **Sensitive political data** (`sensitive-political-data`): Answers or derived profiles that can reveal political beliefs or affiliations. Client-only processing reduces collection but does not eliminate disclosure through URLs, history, clipboard, screenshots, or shared devices.
- **Fail closed** (`fail-closed`): When validation, provenance, coverage, scoring, or rendering integrity is insufficient, withhold interpretive output and preserve a recoverable, non-persuasive user path.
- **Coverage** (`coverage`): Separate overall response coverage, directional-answer coverage, mixed-response count, and facet-observed coverage. Do not let one percentage hide which epistemic states were included in scoring.
- **Internal fit** (`internal-fit`): A bounded, dataset-relative distance signal that is absent—not zero or certain—when inputs are invalid, taxonomy coverage is inadequate, or a tie remains unresolved.
