# QA Scenarios — Macro/Meso/Micro Ideology Taxonomy

| ID | Scenario | Expected result |
|---|---|---|
| TAX-01 | Load methodology disclosure | The disclosure shows the audited 9/33/58 canonical inventory, the secondary registry, and the macro catalog without presenting either as a respondent judgment. |
| TAX-02 | Complete enough descriptive items for a scored libertarian anchor | The neighbor card shows a canonical breadcrumb ending at the scored node and its taxonomy level. |
| TAX-03 | Inspect a hybrid node such as Ecosocialism | The node has no exclusive canonical parent and exposes separate `hybrid-of` relations to Socialism and Ecologism. |
| TAX-04 | Inspect National Conservatism | Exactly one canonical micro node exists under Conservative Nationalism; the label is not duplicated under Conservatism or Nationalism. |
| TAX-05 | Inspect Republicanism | Historical Republicanism and Contemporary Neo-Republicanism are separate meso nodes with a typed overlap relation. |
| TAX-06 | Inspect contextual/historical entries | Conservative New Right, Deep Ecology, Bioregionalism, and historical national Fascist cases resolve in the secondary registry and are not scored neighbors. |
| TAX-07 | Remove a node referenced by a parent or relation | `validateDataset` returns a hard data error. |
| TAX-08 | Add a catalog-only node without an anchor | The build and validation pass; the node is not returned as a neighbor. |
| TAX-09 | Run the existing quiz, restart, and share flows | Existing coverage, restart, and share contracts are unchanged. |
