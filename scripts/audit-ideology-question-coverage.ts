import { auditIdeologyQuestionCoverage } from "../src/ideology-question-coverage";

const report = auditIdeologyQuestionCoverage();
const output = process.argv.includes("--summary")
  ? {
      generatedAt: report.generatedAt,
      canonicalTargetCount: report.canonicalTargetCount,
      structuralChecks: report.structuralChecks,
      failures: report.failures,
      openGaps: report.openGaps,
      validationErrorCount: report.validationErrors.length,
    }
  : report;

process.stdout.write(JSON.stringify(output, null, 2) + "\n");
const structuralCheckFailed = Object.values(report.structuralChecks).some((check) => !check);
if (report.validationErrors.length > 0 || report.failures.length > 0 || structuralCheckFailed) process.exitCode = 1;
