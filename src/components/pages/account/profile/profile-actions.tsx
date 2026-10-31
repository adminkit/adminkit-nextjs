"use client";

import { Copy } from "lucide-react";
import { type ReactNode, useEffect, useRef, useState } from "react";

/** Copies the page URL and says so on the button for two seconds */
export function ProfileCopyLink() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  return (
    <button
      className="btn btn-outline-primary"
      type="button"
      onClick={() => {
        if (!navigator.clipboard) return;
        navigator.clipboard
          .writeText(window.location.href)
          .then(() => setCopied(true));
      }}
    >
      <Copy className="align-middle me-1" />{" "}
      <span>{copied ? "Link copied" : "Copy profile link"}</span>
    </button>
  );
}

/**
 * The older activity, hidden behind a button. Showing it removes the button and moves
 * focus to the first heading of the older activity.
 */
export function ProfileOlderActivity({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  const [shown, setShown] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (shown) {
      heading.current?.focus();
    }
  }, [shown]);

  return (
    <>
      <div id="profile-older-activity" hidden={!shown}>
        <h3 ref={heading} className="h6 text-body-secondary mb-3" tabIndex={-1}>
          {title}
        </h3>
        {children}
      </div>

      {!shown && (
        <button
          className="btn btn-light border w-100"
          type="button"
          aria-controls="profile-older-activity"
          onClick={() => setShown(true)}
        >
          Show older activity
        </button>
      )}
    </>
  );
}
