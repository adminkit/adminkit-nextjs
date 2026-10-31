"use client";

import { Send } from "lucide-react";
import {
  createContext,
  type FormEvent,
  type ReactNode,
  use,
  useRef,
  useState,
} from "react";
import { CloseButton } from "@/components/bootstrap/close-button";
import { Modal } from "@/components/bootstrap/modal";

type Context = {
  showSend: boolean;
  setShowSend: (show: boolean) => void;
  /** The "Sent to …" events added in this visit, newest first */
  sent: { id: number; email: string }[];
  addSent: (email: string) => void;
};

const InvoiceContext = createContext<Context | null>(null);

const useInvoice = () => {
  const context = use(InvoiceContext);
  if (!context) {
    throw new Error("Invoice parts must be inside an <InvoiceProvider>");
  }
  return context;
};

/** Connects the Send invoice button, its dialog and the activity list */
export function InvoiceProvider({ children }: { children: ReactNode }) {
  const [showSend, setShowSend] = useState(false);
  const [sent, setSent] = useState<Context["sent"]>([]);
  const nextId = useRef(0);

  const addSent = (email: string) => {
    const id = nextId.current++;
    setSent((list) => [{ id, email }, ...list]);
  };

  return (
    <InvoiceContext value={{ showSend, setShowSend, sent, addSent }}>
      {children}
    </InvoiceContext>
  );
}

/**
 * Print and Download PDF open the print dialog, which can also save the invoice as a PDF;
 * the print styles leave out the sidebar, navbar, actions and activity
 */
export function InvoicePrintButton({ children }: { children: ReactNode }) {
  return (
    <button
      type="button"
      className="btn btn-outline-primary"
      onClick={() => window.print()}
    >
      {children}
    </button>
  );
}

export function InvoiceSendButton({ children }: { children: ReactNode }) {
  const { setShowSend } = useInvoice();

  return (
    <button
      type="button"
      className="btn btn-primary"
      onClick={() => setShowSend(true)}
    >
      {children}
    </button>
  );
}

/** The activity list: the events sent from the dialog, then the invoice's own events */
export function InvoiceActivity({ children }: { children: ReactNode }) {
  const { sent } = useInvoice();

  return (
    <ul className="list-group list-group-flush invoice-activity">
      {sent.map(({ id, email }) => (
        <li key={id} className="list-group-item d-flex gap-3">
          <Send className="text-body-secondary flex-shrink-0" />
          <div>
            <div>Sent to {email}</div>
            <div className="text-body-secondary small">Just now</div>
          </div>
        </li>
      ))}
      {children}
    </ul>
  );
}

const defaultMessage = `Hi Ashton,

Please find attached invoice INV-2026-0148 for $9,579.60, due November 13, 2026.

Thanks,
Charles`;

/** Demo only: "sending" closes the dialog and adds the event to the activity list */
export function InvoiceSendModal() {
  const { showSend, setShowSend, addSent } = useInvoice();
  // The dialog keeps what was typed when it closes, as Bootstrap's modal does
  const [to, setTo] = useState("ashton.cox@example.com");
  const [subject, setSubject] = useState("Invoice INV-2026-0148 from AdminKit");
  const [message, setMessage] = useState(defaultMessage);
  const [attach, setAttach] = useState(true);
  const hide = () => setShowSend(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    addSent(to);
    hide();
  };

  return (
    <Modal
      show={showSend}
      onHide={hide}
      id="invoice-send"
      aria-labelledby="invoice-send-title"
      dialogClassName="modal-dialog-centered"
      contentAs="form"
      contentProps={{ onSubmit }}
    >
      <div className="modal-header">
        <h2 className="modal-title h5" id="invoice-send-title">
          Send invoice
        </h2>
        <CloseButton onClick={hide} />
      </div>
      <div className="modal-body">
        <div className="mb-3">
          <label className="form-label" htmlFor="invoice-send-to">
            To
          </label>
          <input
            type="email"
            className="form-control"
            id="invoice-send-to"
            value={to}
            onChange={(event) => setTo(event.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="invoice-send-subject">
            Subject
          </label>
          <input
            type="text"
            className="form-control"
            id="invoice-send-subject"
            value={subject}
            onChange={(event) => setSubject(event.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="invoice-send-message">
            Message
          </label>
          <textarea
            className="form-control"
            id="invoice-send-message"
            rows={6}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          />
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id="invoice-send-pdf"
            checked={attach}
            onChange={(event) => setAttach(event.target.checked)}
          />
          <label className="form-check-label" htmlFor="invoice-send-pdf">
            Attach the invoice as a PDF
          </label>
        </div>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-light" onClick={hide}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          Send
        </button>
      </div>
    </Modal>
  );
}
