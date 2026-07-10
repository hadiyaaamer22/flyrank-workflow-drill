# Project Rules for Front-End Engineering

1. **Explicit Error Architecture**: Always render field validation errors directly beneath their respective input elements using distinct, dedicated semantic containers rather than relying on browser alerts.
2. **Accessible Form Foundations**: Every input component must be bound explicitly to an accessible `<label>` tag using matching `id` and `for` attributes, utilizing `aria-live="polite"` regions for dynamic validation text.
3. **Strict Content Ingestion**: Always clean strings using `.trim()` before assessing validation rules to catch empty-space inputs, and use explicit regular expression match testing for email structural integrity.