const pages = [
  { path: "/", views: "38,420", visitors: "24,310", time: "1:52", bounce: 38 },
  {
    path: "/pricing",
    views: "21,980",
    visitors: "15,240",
    time: "2:41",
    bounce: 29,
  },
  {
    path: "/docs/getting-started",
    views: "17,560",
    visitors: "9,870",
    time: "4:18",
    bounce: 22,
  },
  {
    path: "/blog/dark-mode-with-bootstrap-5",
    views: "12,730",
    visitors: "10,950",
    time: "3:36",
    bounce: 61,
  },
  {
    path: "/features",
    views: "9,840",
    visitors: "7,120",
    time: "1:47",
    bounce: 44,
  },
  {
    path: "/docs/components",
    views: "8,310",
    visitors: "5,460",
    time: "3:05",
    bounce: 27,
  },
  {
    path: "/blog",
    views: "6,920",
    visitors: "5,830",
    time: "1:24",
    bounce: 52,
  },
  {
    path: "/contact",
    views: "4,150",
    visitors: "3,690",
    time: "0:58",
    bounce: 47,
  },
];

/** The most visited pages */
export function TablePages() {
  return (
    <div className="card flex-fill">
      <div className="card-header">
        <h2 className="card-title mb-0">Top Pages</h2>
      </div>
      <table className="table table-hover my-0">
        <thead>
          <tr>
            <th>Page</th>
            <th className="text-end">Views</th>
            <th className="text-end d-none d-xl-table-cell">Visitors</th>
            <th className="text-end d-none d-xl-table-cell">Avg. time</th>
            <th className="text-end d-none d-md-table-cell">Bounce rate</th>
          </tr>
        </thead>
        <tbody>
          {pages.map((page) => (
            <tr key={page.path}>
              <td className="text-break">{page.path}</td>
              <td className="text-end">{page.views}</td>
              <td className="text-end d-none d-xl-table-cell">
                {page.visitors}
              </td>
              <td className="text-end d-none d-xl-table-cell">{page.time}</td>
              <td className="text-end d-none d-md-table-cell">
                {page.bounce}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
