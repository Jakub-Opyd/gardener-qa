# Accessibility Bug Report - A11Y-003 - Register page contains invalid main landmark structure

## Summary

The Register page contains multiple `<main>` landmarks, including a nested `<main>` element. This violates WCAG landmark requirements and causes screen readers and assistive technologies to incorrectly identify the primary page content.

---

## Environment

| Field        | Value                 |
| ------------ | --------------------- |
| Frontend URL | http://localhost:4173 |
| Browser      | Chromium              |
| OS           | Windows 10            |
| Date Found   | 2026-06-17            |

---

## Severity

* [ ] Critical
* [ ] Major
* [x] Minor

---

## Status

* [x] New
* [ ] In Progress
* [ ] Fixed
* [ ] Closed

---

## Affected Page

Page: `registerPage` & `loginPage`

Theme:

* [x] Light
* [x] Dark

---

## Accessibility Details

| Field          | Value    |
| -------------- | -------- |
| WCAG Criterion |    1.3.1 Info and Relationships      |
| WCAG Level     |     A     |
| Tool           | axe-core |
| Impact         |    moderate      |
| Affected Users |     Screen reader users, keyboard users     |

---

## Expected Result

The page should contain exactly one top-level `<main>` landmark representing the primary content of the page.

---

## Actual Result

The page contains multiple `<main>` landmarks and one main landmark is nested inside another landmark.

---

## Axe Findings

### Rule Violations
-   landmark-main-is-top-level
-   landmark-no-duplicate-main
-   landmark-unique

### Element

```html
<main class="flex-grow relative z-10 flex items-start justify-center pt-24 px-4">
```

---

## Notes

The page should contain only one top-level `<main>` landmark. Additional content sections should use alternative semantic elements such as `<section>`, `<article>`, or `<div>`.