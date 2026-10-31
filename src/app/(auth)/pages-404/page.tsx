import Link from "next/link";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata("/pages-404");

export default function Page() {
  return (
    <div className="text-center">
      <h1 className="display-1 fw-bold">404</h1>
      <p className="h2">Page not found.</p>
      <p className="lead fw-normal mt-3 mb-4">
        The page you are looking for might have been removed.
      </p>
      <Link href="/" className="btn btn-primary btn-lg">
        Return to website
      </Link>
    </div>
  );
}
