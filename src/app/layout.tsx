import type { Metadata } from "next";
import "@/styles/globals.css";
import { Navigation } from "@/components/navigation";

export const metadata: Metadata = {
  title: "Closter House Dashboard",
  description: "Shared household dashboard for 130 Durie Ave"
};

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <div className="app-shell">
          <header className="site-header">
            <div>
              <p className="eyebrow">Closter Home</p>
              <h1 className="site-title">130 Durie Ave Dashboard</h1>
            </div>
            <Navigation />
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
