import { Pen, Trash } from "lucide-react";
import type { ReactNode } from "react";
import { PageTitle } from "@/components/ui/page-title";
import { asset, pageMetadata } from "@/lib/site";

export const metadata = pageMetadata("/tables-bootstrap");

const people: {
  name: string;
  phone: string;
  birthday: string;
  /** In public/img/avatars, for the hoverable rows */
  avatar?: string;
}[] = [
  {
    name: "Vanessa Tucker",
    phone: "864-348-0485",
    birthday: "June 21, 1961",
    avatar: "avatar-5.jpg",
  },
  {
    name: "William Harris",
    phone: "914-939-2458",
    birthday: "May 15, 1948",
    avatar: "avatar-2.jpg",
  },
  {
    name: "Sharon Lessman",
    phone: "704-993-5435",
    birthday: "September 14, 1965",
    avatar: "avatar-3.jpg",
  },
  {
    name: "Christina Mason",
    phone: "765-382-8195",
    birthday: "April 2, 1971",
    avatar: "avatar-4.jpg",
  },
  {
    name: "Robin Schneiders",
    phone: "202-672-1407",
    birthday: "October 12, 1966",
  },
];

const systems = [
  { name: "Windows", users: "8,232", share: "38.0%" },
  { name: "macOS", users: "4,108", share: "19.0%" },
  { name: "Android", users: "3,950", share: "18.3%" },
  { name: "iOS", users: "3,317", share: "15.3%" },
  { name: "Linux", users: "1,184", share: "5.5%" },
  { name: "ChromeOS", users: "642", share: "3.0%" },
  { name: "Other", users: "205", share: "0.9%" },
];

function TableCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="col-12 col-xl-6">
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">{title}</h2>
          <p className="h6 card-subtitle text-body-secondary">{subtitle}</p>
        </div>
        {children}
      </div>
    </div>
  );
}

/** The people with edit and delete actions; `rowClassNames` colors rows by name */
function PeopleTable({
  className,
  rowClassNames = {},
}: {
  className: string;
  rowClassNames?: Record<string, string>;
}) {
  return (
    <table className={className}>
      <thead>
        <tr>
          <th style={{ width: "40%" }}>Name</th>
          <th style={{ width: "25%" }}>Phone Number</th>
          <th className="d-none d-md-table-cell" style={{ width: "25%" }}>
            Date of Birth
          </th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {people.map((person) => (
          <tr key={person.name} className={rowClassNames[person.name]}>
            <td>{person.name}</td>
            <td>{person.phone}</td>
            <td className="d-none d-md-table-cell">{person.birthday}</td>
            <td className="table-action">
              <a href="#" aria-label="Edit">
                <Pen className="align-middle" />
              </a>{" "}
              <a href="#" aria-label="Delete">
                <Trash className="align-middle" />
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function Page() {
  return (
    <>
      <PageTitle title="Tables" badge="Get DataTables examples" />

      <div className="row">
        <TableCard
          title="Basic Table"
          subtitle="Using the most basic table markup, here’s how .table-based tables look in Bootstrap."
        >
          <PeopleTable className="table" />
        </TableCard>

        <TableCard
          title="Striped Rows"
          subtitle={
            <>
              Use <code>.table-striped</code> to add zebra-striping to any table
              row within the <code>&lt;tbody&gt;</code>.
            </>
          }
        >
          <PeopleTable className="table table-striped" />
        </TableCard>

        <TableCard
          title="Condensed Table"
          subtitle={
            <>
              Add <code>.table-sm</code> to make tables more compact by cutting
              cell padding in half.
            </>
          }
        >
          <table className="table table-striped table-sm">
            <thead>
              <tr>
                <th>Operating system</th>
                <th className="text-end">Users</th>
                <th className="text-end">Share</th>
              </tr>
            </thead>
            <tbody>
              {systems.map((system) => (
                <tr key={system.name}>
                  <td>{system.name}</td>
                  <td className="text-end">{system.users}</td>
                  <td className="text-end">{system.share}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableCard>

        <TableCard
          title="Hoverable Rows"
          subtitle={
            <>
              Add <code>.table-hover</code> to enable a hover state on table
              rows within a <code>&lt;tbody&gt;</code>.
            </>
          }
        >
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone Number</th>
                <th>Date of Birth</th>
              </tr>
            </thead>
            <tbody>
              {people
                .filter((person) => person.avatar)
                .map((person) => (
                  <tr key={person.name}>
                    <td>
                      <img
                        src={asset(`/img/avatars/${person.avatar}`)}
                        width="48"
                        height="48"
                        className="rounded-circle me-2"
                        alt=""
                      />{" "}
                      {person.name}
                    </td>
                    <td>{person.phone}</td>
                    <td>{person.birthday}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </TableCard>

        <TableCard
          title="Bordered Table"
          subtitle={
            <>
              Add <code>.table-bordered</code> for borders on all sides of the
              table and cells.
            </>
          }
        >
          <PeopleTable className="table table-bordered" />
        </TableCard>

        <TableCard
          title="Contextual Classes"
          subtitle="Use contextual classes to color table rows or individual cells."
        >
          <PeopleTable
            className="table"
            rowClassNames={{
              "William Harris": "table-primary",
              "Christina Mason": "table-success",
            }}
          />
        </TableCard>

        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h2 className="card-title" id="table-responsive-title">
                Always responsive
              </h2>
              <p className="h6 card-subtitle text-body-secondary">
                Across every breakpoint, use <code>.table-responsive</code> for
                horizontally scrolling tables.
              </p>
            </div>
            <div
              className="table-responsive"
              role="region"
              tabIndex={0}
              aria-labelledby="table-responsive-title"
            >
              <table className="table mb-0">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    {Array.from({ length: 9 }, (_, index) => (
                      <th scope="col" key={index}>
                        Heading
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[1, 2, 3].map((row) => (
                    <tr key={row}>
                      <th scope="row">{row}</th>
                      {Array.from({ length: 9 }, (_, index) => (
                        <td key={index}>Cell</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
