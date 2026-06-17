import AxeBuilder from "@axe-core/playwright";
import { expect, Page } from "@playwright/test";
import fs from "fs";
import path from 'path';

export async function checkAccessibility(
    page: Page,
    pageName: string
) {
    const results = await new AxeBuilder({ page }).analyze();
    const reportDir = "a11y-reports";

    if (results.violations.length > 0) {
        const timestamp = new Date().toISOString().split("T")[0];


        fs.mkdirSync(reportDir, { recursive: true });

        const markdown: string[] = [];

        for (const violation of results.violations) {
            markdown.push(`# Accessibility Report`);
            markdown.push("");
            markdown.push(`Page: ${pageName}`);
            markdown.push(`Generated: ${timestamp}`);
            markdown.push("");
            markdown.push(`# ${violation.id}`);
            markdown.push(`Rule: ${violation.help}`);
            markdown.push("");
            markdown.push(`Impact: ${violation.impact}`);
            markdown.push(`Description: ${violation.description}`);
            markdown.push("");

            for (const node of violation.nodes) {
                markdown.push("## Element");
                markdown.push("```html");
                markdown.push(node.html);
                markdown.push("```");
                markdown.push("");

                markdown.push("### Axe Output");
                markdown.push(node.failureSummary ?? "No summary available");
                markdown.push("");
            }

            markdown.push("---");
            markdown.push("");
        }

        fs.writeFileSync(
            path.join(
                reportDir,
                `${pageName}-${timestamp}.md`
            ),
            markdown.join("\n")
        );

        await page.screenshot({
            path: path.join(
                reportDir,
                `${pageName}-${timestamp}.png`
            ),
            fullPage: true,
        });
    }

    expect(
        results.violations,
        `Accessibility violations found. Report saved in ${reportDir}`
    ).toEqual([]);
}