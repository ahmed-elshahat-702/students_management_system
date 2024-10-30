import { EdgeStoreProvider } from "@/lib/edgestore";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import { SidebarProvider } from "@/components/ui/sidebar";

export const metadata = {
  title: "SMS",
  description: "Student Management System by bondok.dev",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className="bg-secondary text-foreground"
        suppressHydrationWarning={true}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider>
            <main className="w-full">
              <EdgeStoreProvider>{children}</EdgeStoreProvider>
            </main>
          </SidebarProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
