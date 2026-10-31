import Link from "next/link";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata("/pages-sign-in");

export default function Page() {
  return (
    <>
      <div className="text-center mt-4">
        <h1 className="h2">Welcome back!</h1>
        <p className="lead">Sign in to your account to continue</p>
      </div>

      <div className="card">
        <div className="card-body">
          <div className="m-sm-3">
            <form>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  className="form-control form-control-lg"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  className="form-control form-control-lg"
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                />
              </div>
              <div>
                <div className="form-check align-items-center">
                  <input
                    id="customControlInline"
                    type="checkbox"
                    className="form-check-input"
                    value="remember-me"
                    name="remember-me"
                    defaultChecked
                  />
                  <label
                    className="form-check-label text-small"
                    htmlFor="customControlInline"
                  >
                    Remember me
                  </label>
                </div>
              </div>
              <div className="d-grid gap-2 mt-3">
                <Link href="/" className="btn btn-lg btn-primary">
                  Sign in
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
      <p className="text-center mb-3">
        Don&apos;t have an account? <Link href="/pages-sign-up">Sign up</Link>
      </p>
    </>
  );
}
