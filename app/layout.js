import { Toaster } from "react-hot-toast";
import { EdgeStoreProvider } from "@/lib/edgestore";
import "./globals.css";

export const metadata = {
  title: "SMS",
  description: "Student Management System by bondok.dev",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={` bg-slate-100`}>
        <main>
          <EdgeStoreProvider>{children}</EdgeStoreProvider>
        </main>
        <Toaster />
      </body>
    </html>
  );
}
