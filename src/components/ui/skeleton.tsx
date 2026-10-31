/**
 * The loading placeholder for content that the browser draws (charts, maps, tables). Put
 * it inside a position-relative element that has the content's final height; the plugin
 * wrappers in src/components/plugins render it themselves until they are ready.
 * Styles: scss/3-components/_skeleton.scss.
 */
export function Skeleton() {
  return (
    <div className="skeleton placeholder-glow" aria-hidden="true">
      <span className="placeholder" />
    </div>
  );
}
