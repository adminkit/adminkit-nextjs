import { MessageSquare } from "lucide-react";
import {
  Dropdown,
  DropdownMenu,
  DropdownToggle,
} from "@/components/bootstrap/dropdown";
import { asset } from "@/lib/site";

const messages = [
  {
    avatar: "/img/avatars/avatar-5.jpg",
    name: "Vanessa Tucker",
    text: "Nam pretium turpis et arcu. Duis arcu tortor.",
    time: "15m ago",
  },
  {
    avatar: "/img/avatars/avatar-2.jpg",
    name: "William Harris",
    text: "Curabitur ligula sapien euismod vitae.",
    time: "2h ago",
  },
  {
    avatar: "/img/avatars/avatar-4.jpg",
    name: "Christina Mason",
    text: "Pellentesque auctor neque nec urna.",
    time: "4h ago",
  },
  {
    avatar: "/img/avatars/avatar-3.jpg",
    name: "Sharon Lessman",
    text: "Aenean tellus metus, bibendum sed, posuere ac, mattis non.",
    time: "5h ago",
  },
];

export function NavbarMessages() {
  return (
    <Dropdown as="li" className="nav-item dropdown" display="static">
      <DropdownToggle
        className="nav-icon dropdown-toggle"
        aria-label="Messages"
      >
        <div className="position-relative">
          <MessageSquare className="align-middle" />
        </div>
      </DropdownToggle>
      <DropdownMenu className="dropdown-menu-lg dropdown-menu-end py-0">
        <div className="dropdown-menu-header">
          <div className="position-relative">4 New Messages</div>
        </div>
        <div className="list-group">
          {messages.map((message) => (
            <a href="#" className="list-group-item" key={message.name}>
              <div className="row g-0 align-items-center">
                <div className="col-2">
                  <img
                    src={asset(message.avatar)}
                    className="avatar img-fluid rounded-circle"
                    alt={message.name}
                    width={40}
                    height={40}
                  />
                </div>
                <div className="col-10 ps-2">
                  <div className="text-dark">{message.name}</div>
                  <div className="text-body-secondary small mt-1">
                    {message.text}
                  </div>
                  <div className="text-body-secondary small mt-1">
                    {message.time}
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
        <div className="dropdown-menu-footer">
          <a href="#" className="text-body-secondary">
            Show all messages
          </a>
        </div>
      </DropdownMenu>
    </Dropdown>
  );
}
