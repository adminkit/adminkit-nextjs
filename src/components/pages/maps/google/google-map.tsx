// Google's embed URLs need no API key. The Maps JavaScript API does: without one it only
// shows an error (ApiProjectMapError) and logs it to the console.
const center = "40.712784,-74.005941";

const maps = {
  default: `ll=${center}&z=14&t=m&output=embed`,
  hybrid: `ll=${center}&z=14&t=h&output=embed`,
};

/** One of the Google Maps examples, embedded without an API key */
export function GoogleMap({
  id,
  type,
  title,
}: {
  id: string;
  type: keyof typeof maps;
  title: string;
}) {
  return (
    <div id={id} style={{ height: 300 }}>
      <iframe
        className="d-block w-100 h-100 border-0"
        src={`https://maps.google.com/maps?${maps[type]}`}
        title={title}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  );
}
