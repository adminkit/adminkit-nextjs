import {
  Briefcase,
  Calendar,
  File,
  Mail,
  MapPin,
  Phone,
  Users,
} from "lucide-react";
import { Fragment, type ReactNode } from "react";
import {
  ProfileCopyLink,
  ProfileOlderActivity,
} from "@/components/pages/account/profile/profile-actions";
import { PageTitle } from "@/components/ui/page-title";
import { projects, team } from "@/mocks/profile";
import { cx } from "@/lib/cx";
import { asset, pageMetadata } from "@/lib/site";

export const metadata = pageMetadata("/pages-profile");

const skills = [
  "Figma",
  "Design systems",
  "Prototyping",
  "User research",
  "Accessibility",
  "HTML & CSS",
  "Usability testing",
];

/** An event in the activity feed: who, what, when and an optional comment or files */
function ActivityItem({
  avatar,
  dateTime,
  time,
  note,
  extra,
  children,
}: {
  avatar: string;
  dateTime: string;
  time: string;
  /** A comment quoted under the event */
  note?: string;
  /** Other content under the event, such as uploaded files */
  extra?: ReactNode;
  children: ReactNode;
}) {
  return (
    <li className="d-flex gap-3">
      <img
        src={asset(`/img/avatars/${avatar}`)}
        className="rounded-circle flex-shrink-0"
        alt=""
        width="36"
        height="36"
      />
      <div className="flex-grow-1">
        <div className="d-flex justify-content-between gap-2">
          <p className="mb-0">{children}</p>
          <time
            className="small text-body-secondary text-nowrap"
            dateTime={dateTime}
          >
            {time}
          </time>
        </div>
        {note && (
          <p className="border rounded small text-body-secondary px-3 py-2 mt-2 mb-0">
            {note}
          </p>
        )}
        {extra}
      </div>
    </li>
  );
}

function FileLink({ name, size }: { name: string; size: string }) {
  return (
    <a
      className="d-inline-flex align-items-center gap-2 border rounded px-2 py-1 small text-reset text-decoration-none"
      href="#"
    >
      <File className="text-body-secondary" />
      <span className="text-break">{name}</span>
      <span className="text-body-secondary">{size}</span>
    </a>
  );
}

export default function Page() {
  return (
    <>
      <PageTitle title="Profile" badge="Get more page examples" />

      <div className="card">
        <div className="card-body">
          <div className="row g-3 align-items-center">
            <div className="col-auto">
              <img
                src={asset("/img/avatars/avatar.jpg")}
                alt="Charles Hall"
                className="rounded-circle profile-avatar"
                width="96"
                height="96"
              />
            </div>
            <div className="col">
              <h2 className="h3 mb-1">Charles Hall</h2>
              <p className="text-body-secondary mb-2">
                Senior Product Designer, Design team
              </p>
              <ul className="list-inline small text-body-secondary mb-0">
                <li className="list-inline-item me-3">
                  <MapPin className="lucide-sm align-text-bottom me-1" />
                  San Francisco, CA
                </li>{" "}
                <li className="list-inline-item me-3">
                  <Calendar className="lucide-sm align-text-bottom me-1" />
                  Joined March 2022
                </li>
              </ul>
            </div>
            <div className="col-12 col-md-auto d-flex flex-wrap gap-2">
              <ProfileCopyLink />
            </div>
          </div>
        </div>
        <div className="card-body border-top">
          <dl className="row row-cols-2 row-cols-md-4 g-3 mb-0">
            <div className="col">
              <dt className="small fw-normal text-body-secondary">
                Active projects
              </dt>
              <dd className="h3 mb-0">6</dd>
            </div>
            <div className="col">
              <dt className="small fw-normal text-body-secondary">
                Tasks done in October
              </dt>
              <dd className="h3 mb-0">148</dd>
            </div>
            <div className="col">
              <dt className="small fw-normal text-body-secondary">
                Hours logged in October
              </dt>
              <dd className="h3 mb-0">126</dd>
            </div>
            <div className="col">
              <dt className="small fw-normal text-body-secondary">
                Delivered on time
              </dt>
              <dd className="h3 mb-0">94%</dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="row">
        <div className="col-xl-4">
          <div className="card">
            <div className="card-header">
              <h2 className="card-title mb-0">About</h2>
            </div>
            <div className="card-body">
              <p>
                I look after the design system and work with the developers on
                the CRM and the customer portal. Before joining the team I spent
                six years designing booking tools for travel companies.
              </p>
              <ul className="list-unstyled mb-0">
                <li className="d-flex align-items-center gap-2 mb-2">
                  <Mail className="text-body-secondary flex-shrink-0" />
                  <a
                    className="text-break"
                    href="mailto:charles.hall@example.com"
                  >
                    charles.hall@example.com
                  </a>
                </li>
                <li className="d-flex align-items-center gap-2 mb-2">
                  <Phone className="text-body-secondary flex-shrink-0" />
                  <a href="tel:+14155550132">+1 415 555 0132</a>
                </li>
                <li className="d-flex align-items-center gap-2 mb-2">
                  <Users className="text-body-secondary flex-shrink-0" />
                  <span>Reports to Sharon Lessman</span>
                </li>
                <li className="d-flex align-items-center gap-2">
                  <Briefcase className="text-body-secondary flex-shrink-0" />
                  <span>Full time, Pacific Time (UTC&minus;7)</span>
                </li>
              </ul>
            </div>
            <div className="card-body border-top">
              <h3 className="h6 card-title">Skills</h3>
              <ul className="list-inline mb-0">
                {skills.map((skill) => (
                  <Fragment key={skill}>
                    <li className="list-inline-item badge badge-primary-light me-1 my-1">
                      {skill}
                    </li>{" "}
                  </Fragment>
                ))}
              </ul>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h2 className="card-title mb-0">Team</h2>
            </div>
            <ul className="list-group list-group-flush">
              {team.map((member) => (
                <li
                  key={member.name}
                  className="list-group-item d-flex align-items-center gap-3"
                >
                  <img
                    src={asset(`/img/avatars/${member.avatar}`)}
                    className="rounded-circle flex-shrink-0"
                    alt=""
                    width="40"
                    height="40"
                  />
                  <div className="flex-grow-1">
                    <div className="fw-semibold">{member.name}</div>
                    <div className="small text-body-secondary">
                      {member.role}
                    </div>
                  </div>
                  <a
                    className="btn btn-sm btn-light border"
                    href={`mailto:${member.email}`}
                    aria-label={`Email ${member.name}`}
                  >
                    <Mail className="align-middle" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="col-xl-8">
          <div className="card">
            <div className="card-header">
              <h2 className="card-title mb-0" id="profile-projects-title">
                Projects
              </h2>
            </div>
            <div
              className="table-responsive"
              role="region"
              tabIndex={0}
              aria-labelledby="profile-projects-title"
            >
              <table className="table my-0">
                <thead>
                  <tr>
                    <th>Project</th>
                    <th>Status</th>
                    <th className="d-none d-md-table-cell w-25">Progress</th>
                    <th className="d-none d-sm-table-cell text-nowrap">
                      Due date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((project) => (
                    <tr key={project.name}>
                      <td>
                        <div className="fw-semibold">{project.name}</div>
                        <div className="small text-body-secondary">
                          {project.role}
                        </div>
                      </td>
                      <td>
                        <span className={`badge badge-${project.color}-light`}>
                          {project.status}
                        </span>
                      </td>
                      <td className="d-none d-md-table-cell">
                        <div className="d-flex align-items-center gap-2">
                          <div
                            className="progress progress-sm flex-grow-1"
                            role="progressbar"
                            aria-label={`${project.name} progress`}
                            aria-valuenow={project.progress}
                            aria-valuemin={0}
                            aria-valuemax={100}
                          >
                            <div
                              className={cx(
                                "progress-bar",
                                project.progress === 100 && "bg-success"
                              )}
                              style={{ width: `${project.progress}%` }}
                            ></div>
                          </div>
                          <span className="small text-body-secondary profile-progress-value">
                            {project.progress}%
                          </span>
                        </div>
                      </td>
                      <td className="d-none d-sm-table-cell text-nowrap">
                        {project.due}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h2 className="card-title mb-0">Activity</h2>
            </div>
            <div className="card-body">
              <h3 className="h6 text-body-secondary mb-3">Today</h3>
              <ul className="list-unstyled vstack gap-4 mb-4">
                <ActivityItem
                  avatar="avatar-4.jpg"
                  dateTime="2026-10-28T09:42"
                  time="9:42 am"
                  note="The A2 export looks right now. Can you send the print files to the agency before Friday?"
                >
                  <strong>Christina Mason</strong> commented on Company posters
                </ActivityItem>
                <ActivityItem
                  avatar="avatar.jpg"
                  dateTime="2026-10-28T09:05"
                  time="9:05 am"
                  extra={
                    <div className="d-flex flex-wrap gap-2 mt-2">
                      <FileLink name="posters-a2-final.pdf" size="4.2 MB" />
                      <FileLink name="posters-a3-final.pdf" size="2.8 MB" />
                    </div>
                  }
                >
                  <strong>You</strong> uploaded 2 files to Company posters
                </ActivityItem>
                <ActivityItem
                  avatar="avatar-3.jpg"
                  dateTime="2026-10-28T08:17"
                  time="8:17 am"
                >
                  <strong>Sharon Lessman</strong> assigned you Review the
                  onboarding screens in Upgrade CRM software
                </ActivityItem>
              </ul>

              <h3 className="h6 text-body-secondary mb-3">Yesterday</h3>
              <ul className="list-unstyled vstack gap-4 mb-4">
                <ActivityItem
                  avatar="avatar-2.jpg"
                  dateTime="2026-10-27T16:30"
                  time="4:30 pm"
                  note="Parking this until the brand workshop on November 12. We'll pick it up with the new brief."
                >
                  <strong>William Harris</strong> moved New company logo to{" "}
                  <span className="badge badge-danger-light">On hold</span>
                </ActivityItem>
                <ActivityItem
                  avatar="avatar.jpg"
                  dateTime="2026-10-27T14:12"
                  time="2:12 pm"
                >
                  <strong>You</strong> completed 4 tasks in Upgrade CRM software
                </ActivityItem>
                <ActivityItem
                  avatar="avatar-5.jpg"
                  dateTime="2026-10-27T10:48"
                  time="10:48 am"
                  note="7 of 8 people finished the new checkout without help. Most of the trouble was on the address step."
                >
                  <strong>Vanessa Tucker</strong> shared the results of
                  usability test round 3
                </ActivityItem>
              </ul>

              <ProfileOlderActivity title="Monday, October 26">
                <ul className="list-unstyled vstack gap-4 mb-4">
                  <ActivityItem
                    avatar="avatar.jpg"
                    dateTime="2026-10-26T15:20"
                    time="3:20 pm"
                  >
                    <strong>You</strong> published version 2.4 of the design
                    system
                  </ActivityItem>
                  <ActivityItem
                    avatar="avatar-4.jpg"
                    dateTime="2026-10-26T09:02"
                    time="9:02 am"
                  >
                    <strong>Christina Mason</strong> added you to Upgrade CRM
                    software
                  </ActivityItem>
                </ul>
              </ProfileOlderActivity>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
