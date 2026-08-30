import { auditIdeologyQuestionCoverage } from "../src/ideology-question-coverage";

const report = auditIdeologyQuestionCoverage();
const output = process.argv.includes("--summary")
  ? {
      generatedAt: report.generatedAt,
      canonicalTargetCount: report.canonicalTargetCount,
      routeVariantCount: report.rows.reduce((count, row) => count + row.routeVariantCoverage.length, 0),
      routeVariantStatuses: report.rows
        .flatMap((row) => row.routeVariantCoverage)
        .reduce<Record<string, number>>((counts, route) => ({
          ...counts,
          [route.status]: (counts[route.status] ?? 0) + 1,
        }), {}),
      structuralChecks: report.structuralChecks,
      failures: report.failures,
      openGaps: report.openGaps,
      validationErrorCount: report.validationErrors.length,
    }
  : report;

process.stdout.write(JSON.stringify(output, null, 2) + "\n");
// A false `allCanonicalLayersHaveSourceBackedTrace` value is expected when a
// broad-family layer is explicitly `not-established`. Those open gaps are
// emitted for review and must not be converted into a failed process status;
// blocking structural defects are already represented in `failures`.
if (report.validationErrors.length > 0 || report.failures.length > 0) process.exitCode = 1;
