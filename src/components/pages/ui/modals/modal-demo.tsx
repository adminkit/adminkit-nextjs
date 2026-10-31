"use client";

import { useCallback, useState } from "react";
import { CloseButton } from "@/components/bootstrap/close-button";
import { Modal } from "@/components/bootstrap/modal";

/** A button that opens a demo modal */
export function ModalDemo({
  id,
  label,
  title,
  buttonClassName,
  modalClassName,
  dialogClassName,
  closeClassName,
  saveClassName,
}: {
  /** The modal's id; its title is `${id}Label` */
  id: string;
  /** The button text */
  label: string;
  /** The modal title */
  title: string;
  buttonClassName: string;
  modalClassName?: string;
  dialogClassName?: string;
  closeClassName: string;
  saveClassName: string;
}) {
  const [show, setShow] = useState(false);
  const hide = useCallback(() => setShow(false), []);

  return (
    <>
      <button
        type="button"
        className={buttonClassName}
        onClick={() => setShow(true)}
      >
        {label}
      </button>
      <Modal
        show={show}
        onHide={hide}
        id={id}
        className={modalClassName}
        dialogClassName={dialogClassName}
        aria-labelledby={`${id}Label`}
      >
        <div className="modal-header">
          <h2 className="modal-title h5" id={`${id}Label`}>
            {title}
          </h2>
          <CloseButton onClick={hide} />
        </div>
        <div className="modal-body m-3">
          <p className="mb-0">
            Use Bootstrap’s JavaScript modal plugin to add dialogs to your site
            for lightboxes, user notifications, or completely custom content.
          </p>
        </div>
        <div className="modal-footer">
          <button type="button" className={closeClassName} onClick={hide}>
            Close
          </button>
          <button type="button" className={saveClassName}>
            Save changes
          </button>
        </div>
      </Modal>
    </>
  );
}
