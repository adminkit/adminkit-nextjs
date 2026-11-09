import { Bell, CircleExclamationPoint, House, UserPlus } from "lucide-react";
import {
  Dropdown,
  DropdownMenu,
  DropdownToggle,
} from "@/components/bootstrap/dropdown";

const notifications = [
  {
    icon: <CircleExclamationPoint className="text-danger" />,
    title: "Update completed",
    text: "Restart server 12 to complete the update.",
    time: "30m ago",
  },
  {
    icon: <Bell className="text-warning" />,
    title: "Lorem ipsum",
    text: "Aliquam ex eros, imperdiet vulputate hendrerit et.",
    time: "2h ago",
  },
  {
    icon: <House className="text-primary" />,
    title: "Login from 192.186.1.8",
    time: "5h ago",
  },
  {
    icon: <UserPlus className="text-success" />,
    title: "New connection",
    text: "Christina accepted your request.",
    time: "14h ago",
  },
];

export function NavbarNotifications() {
  return (
    <Dropdown as="li" className="nav-item dropdown" display="static">
      <DropdownToggle className="nav-icon dropdown-toggle">
        <div className="position-relative">
          <span className="visually-hidden">Notifications</span>
          <Bell className="align-middle" />
          <span className="indicator">4</span>
        </div>
      </DropdownToggle>
      <DropdownMenu className="dropdown-menu-lg dropdown-menu-end py-0">
        <div className="dropdown-menu-header">4 New Notifications</div>
        <div className="list-group">
          {notifications.map((notification) => (
            <a href="#" className="list-group-item" key={notification.title}>
              <div className="row g-0 align-items-center">
                <div className="col-2">{notification.icon}</div>
                <div className="col-10">
                  <div className="text-dark">{notification.title}</div>
                  {notification.text && (
                    <div className="text-body-secondary small mt-1">
                      {notification.text}
                    </div>
                  )}
                  <div className="text-body-secondary small mt-1">
                    {notification.time}
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
        <div className="dropdown-menu-footer">
          <a href="#" className="text-body-secondary">
            Show all notifications
          </a>
        </div>
      </DropdownMenu>
    </Dropdown>
  );
}
