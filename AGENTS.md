# Design Work Rules

1. Never claim something "looks good," "feels premium," "is polished," or "is more trendy now" — these are visual judgments you cannot make without actually seeing the rendered page. State only what you can prove: a computed number, a grep match, a token reference. Anything else is HUMAN VERIFICATION NEEDED.

2. Every color, spacing, font-size, radius, shadow, and duration value must trace to a token defined in Sprint D0. If you're about to write a raw hex code, raw px value, or raw ms duration inline, stop — add it to the token system first. Do not improvise a one-off value.

3. Apply exactly what a sprint specifies — do not layer in additional "nice to have" visual flourishes you think would look good. An unrequested addition is a form of skipping the actual instruction.

4. State explicitly, at the start of each sprint, whether you have a screenshot or browser-preview tool available. If yes, use it before claiming any visually-dependent step is done. If no, say so plainly and hand every visual check back to the human — never describe what a page "would look like."