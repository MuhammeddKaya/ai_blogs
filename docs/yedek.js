var seoAudits = ["crawlable-anchors", "image-alt", "structured-data", "viewport", "document-title", "meta-description", "http-status-code", 
"link-text", "is-crawlable", "hreflang", "font-size", "plugins", "tap-targets", "robots-txt", "canonical"];

var bestPractices = [
"image-size-responsive", "csp-xss",   "js-libraries", "is-on-https", "deprecations", "paste-preventing-inputs",  "geolocation-on-start",
"notification-on-start", "image-aspect-ratio","doctype", "charset",  "no-unload-listeners","errors-in-console",    "inspector-issues",
"valid-source-maps","preload-fonts", "third-party-cookies"
];
var performanceAudits = ["largest-contentful-paint-element", "mainthread-work-breakdown", "bootup-time", "third-party-facades", "render-blocking-resources", 
"lcp-lazy-loaded", "unused-css-rules", "layout-shift-elements", "third-party-summary", "unminified-css", "modern-image-formats", "unsized-images", "uses-long-cache-ttl", 
"font-display", "legacy-javascript", "unused-javascript", "server-response-time", "non-composited-animations", "total-byte-weight", "dom-size", "critical-request-chains",
"long-tasks", "offscreen-images", "unminified-javascript", "uses-optimized-images", "uses-rel-preconnect", "redirects", "uses-rel-preload", "efficient-animated-content", 
"duplicated-javascript", "prioritize-lcp-image", "user-timings", "uses-passive-event-listeners", "no-document-write", "viewport", "uses-text-compression", "uses-responsive-images"];

var accessibilityAudits = ["button-name", "image-alt", "link-name", "color-contrast", "heading-order", "focusable-controls", "interactive-element-affordance", "logical-tab-order", 
"visual-order-follows-dom", "focus-traps", "managed-focus", "use-landmarks", "offscreen-content-hidden", "custom-controls-labels", "custom-controls-roles", "aria-hidden-body", 
"meta-viewport", "aria-hidden-focus", "document-title", "html-has-lang", "valid-lang", "image-redundant-alt", "accesskeys", "aria-allowed-attr", "aria-allowed-role", "aria-command-name",
"aria-dialog-name", "aria-input-field-name", "aria-meter-name", "aria-required-children", "aria-progressbar-name", "aria-required-attr", "aria-required-parent", "aria-roles", "aria-text", 
"aria-toggle-field-name", "aria-valid-attr", "aria-tooltip-name", "aria-treeitem-name", "duplicate-id-aria", "aria-valid-attr-value", "bypass", "definition-list", "dlitem", 
"duplicate-id-active", "form-field-multiple-labels", "html-xml-lang-mismatch", "input-button-name", "input-image-alt", "label", "link-in-text-block", "list", "listitem", "meta-refresh", 
"object-alt", "select-name", "skip-link", "tabindex", "table-duplicate-name", "td-headers-attr", "th-has-data-cells", "video-caption", "empty-heading", "identical-links-same-purpose",
"target-size", "label-content-name-mismatch", "table-fake-caption", "td-has-header", "html-lang-valid", "frame-title"];






// mobile side



var seoAudits = ["crawlable-anchors", "image-alt", "structured-data", "viewport", "document-title", "meta-description", "http-status-code", 
"link-text", "is-crawlable", "hreflang", "font-size", "plugins", "tap-targets", "robots-txt", "canonical"];

var bestPractices = [
"image-size-responsive", "csp-xss",   "js-libraries", "is-on-https", "deprecations", "paste-preventing-inputs",  "geolocation-on-start",
"notification-on-start", "image-aspect-ratio","doctype", "charset",  "no-unload-listeners","errors-in-console",    "inspector-issues",
"valid-source-maps","preload-fonts", "third-party-cookies"
];
var performanceAudits = ["largest-contentful-paint-element", "mainthread-work-breakdown", "bootup-time", "third-party-facades", "render-blocking-resources", 
"lcp-lazy-loaded", "unused-css-rules", "layout-shift-elements", "third-party-summary", "unminified-css", "modern-image-formats", "unsized-images", "uses-long-cache-ttl", 
"font-display", "legacy-javascript", "unused-javascript", "server-response-time", "non-composited-animations", "total-byte-weight", "dom-size", "critical-request-chains",
"long-tasks", "offscreen-images", "unminified-javascript", "uses-optimized-images", "uses-rel-preconnect", "redirects", "uses-rel-preload", "efficient-animated-content", 
"duplicated-javascript", "prioritize-lcp-image", "user-timings", "uses-passive-event-listeners", "no-document-write", "viewport", "uses-text-compression", "uses-responsive-images"];

var accessibilityAudits = ["button-name", "image-alt", "link-name", "color-contrast", "heading-order", "focusable-controls", "interactive-element-affordance", "logical-tab-order", 
"visual-order-follows-dom", "focus-traps", "managed-focus", "use-landmarks", "offscreen-content-hidden", "custom-controls-labels", "custom-controls-roles", "aria-hidden-body", 
"meta-viewport", "aria-hidden-focus", "document-title", "html-has-lang", "valid-lang", "image-redundant-alt", "accesskeys", "aria-allowed-attr", "aria-allowed-role", "aria-command-name",
"aria-dialog-name", "aria-input-field-name", "aria-meter-name", "aria-required-children", "aria-progressbar-name", "aria-required-attr", "aria-required-parent", "aria-roles", "aria-text", 
"aria-toggle-field-name", "aria-valid-attr", "aria-tooltip-name", "aria-treeitem-name", "duplicate-id-aria", "aria-valid-attr-value", "bypass", "definition-list", "dlitem", 
"duplicate-id-active", "form-field-multiple-labels", "html-xml-lang-mismatch", "input-button-name", "input-image-alt", "label", "link-in-text-block", "list", "listitem", "meta-refresh", 
"object-alt", "select-name", "skip-link", "tabindex", "table-duplicate-name", "td-headers-attr", "th-has-data-cells", "video-caption", "empty-heading", "identical-links-same-purpose",
"target-size", "label-content-name-mismatch", "table-fake-caption", "td-has-header", "html-lang-valid", "frame-title"];