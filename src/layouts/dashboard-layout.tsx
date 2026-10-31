import type { ReactNode } from "react";
import { Navbar } from "@/components/navbar/navbar";
import { Sidebar } from "@/components/sidebar/sidebar";
import { Footer } from "@/components/ui/footer";
import { LayoutProvider } from "@/contexts/layout-context";

/** The sidebar layout: sidebar, navbar, page content and footer */
export function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <LayoutProvider>
      <div className="wrapper">
        <Sidebar />

        <div className="main">
          <Navbar />

          <main className="content reveal-cards">
            <div className="container-fluid p-0">{children}</div>
          </main>

          <Footer />
        </div>
      </div>
    </LayoutProvider>
  );
}
