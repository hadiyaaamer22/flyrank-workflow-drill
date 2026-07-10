# Workflow Drill Comparison

## Correctness & Edge Cases
In Round One, the vague prompt resulted in basic form infrastructure but left significant gaps in robust correctness. The initial JavaScript code mixed validation objects together blindly, which resulted in compilation failures, broken syntax brackets, and duplicate logic patterns. 

Conversely, Round Two used an explicit engineering prompt specifying data constraints. It correctly implemented precise edge case coverage, checking that full names were not just empty whitespace strings (`.trim()`), ensuring the email strictly followed a complete alphanumeric structure, and requiring passwords to be a minimum of 8 characters containing at least one digit via regular expressions (`/\d/`).

## Accessibility (a11y)
Accessibility features were entirely overlooked in the initial code block generation. Inputs were not structurally or descriptively bound to clear semantic labels. 

In the precise engineering iteration (Round Two), accessibility was treated as a foundational element. All inputs utilize explicit `<label>` tags linked directly via matching `for` and `id` attributes. Additionally, the error messaging layer introduces `aria-live="polite"` containers so screen readers instantly broadcast validation adjustments. Lastly, the JavaScript loop actively intercepts failures and moves the keyboard cursor focus directly to the first invalid control group item using `.focus()` to keep navigation seamless for all users.

## Review Effort & AI Mistakes Caught
The precise prompt process proved that LLMs still require engineering oversight. During the generation of the unified workflow, the AI completely broke the JavaScript file structure. It generated overlapping field definitions (`validators` versus `fields`), duplicated regular expression checks, and misplaced closing brackets that caused severe syntax errors. 

Because we used a plan-first mindset, we easily caught these compilation mistakes. We manually stripped out the duplicate loops and refactored the broken objects into a clean, systematic orchestration architecture.

## Conclusion
Vague prompts make the development cycle longer because you spend your time fixing chaotic, overlapping logic. Specifying exact UI behavior and validation rules upfront keeps the code modular, making verification and fixes much simpler.