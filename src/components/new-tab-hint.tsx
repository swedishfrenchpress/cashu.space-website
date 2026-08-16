/**
 * The screen-reader half of a `target="_blank"` link.
 *
 * The site announced new tabs on all 13 links in the wallet directory and on
 * none of the 14 on the homepage, so the same gesture behaved one way in the
 * registry and another everywhere else. Announcing everywhere is the version
 * that keeps: the registry's `Open` slabs are the case that most needs it,
 * and having decided a new tab is worth mentioning there, it is worth
 * mentioning in the hero too.
 *
 * Use this only where the link's accessible name comes from its visible text.
 * **An `aria-label` replaces child content entirely**, so a control that
 * carries one — the masthead's GitHub mark, the footer marks, the directory's
 * `Open` — has to put the phrase inside the label string instead; dropping
 * this element in beside an `aria-label` renders it and announces nothing.
 *
 * The leading space matters: it separates the hint from the label in the
 * flattened accessible name.
 */
export default function NewTabHint() {
  return <span className="sr-only"> (opens in a new tab)</span>;
}
