in the landing page this is the issue:

## Error Type

Console Error

## Error Message

A tree hydrated but some attributes of the server rendered HTML didn't match the client properties. This won't be patched up. This can happen if a SSR-ed Client Component used:

- A server/client branch `if (typeof window !== 'undefined')`.
- Variable input such as `Date.now()` or `Math.random()` which changes each time it's called.
- Date formatting in a user's locale which doesn't match the server.
- External changing data without sending a snapshot of it along with the HTML.
- Invalid HTML tag nesting.

It can also happen if the client has a browser extension installed which messes with the HTML before React loaded.

https://react.dev/link/hydration-mismatch

...
<HotReload globalError={[...]} webSocket={WebSocket} staticIndicatorState={{pathname:null, ...}}>
<AppDevOverlayErrorBoundary globalError={[...]}>
<ReplaySsrOnlyErrors>
<DevRootHTTPAccessFallbackBoundary>
<HTTPAccessFallbackBoundary notFound={<NotAllowedRootHTTPFallbackError>}>
<HTTPAccessFallbackErrorBoundary pathname="/" notFound={<NotAllowedRootHTTPFallbackError>} ...>
<RedirectBoundary>
<RedirectErrorBoundary router={{...}}>
<Head>
<**next_root_layout_boundary**>
<SegmentViewNode type="layout" pagePath="layout.tsx">
<SegmentTrieNode>
<link>
<script>
<script>
<RootLayout>
<html
lang="en"
className="h-full antialiased geist_a71539c9-module**T19VSG**variable geist_mono_8d43a2aa-mo..."

-                         data-calm-mode="off"
-                         data-dyslexia-font="off"
-                         data-colorblind-mode="off"
-                         data-large-text="off"
-                         data-reduce-motion="off"
-                         data-mute-sounds="off"
-                         data-high-contrast="off"
                        >
                  ...

  at html (<anonymous>:null:null)
  at RootLayout (src\app\layout.tsx:39:5)

## Code Frame

37 | }>) {
38 | return (

> 39 | <html

     |     ^

40 | lang="en"
41 | className={cn(
42 | "h-full",

Next.js version: 16.2.11 (Turbopack)

======================
from the accesibility settings there is no option to go back to the previous screen

===================  
dual language support to parent section. should be there
