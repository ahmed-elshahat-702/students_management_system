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
      <body className="bg-gray-200" suppressHydrationWarning={true}>
        <main>
          <EdgeStoreProvider>{children}</EdgeStoreProvider>
        </main>
        <Toaster />
      </body>
    </html>
  );
}
