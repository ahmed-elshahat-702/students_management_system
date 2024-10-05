import SideBar from "@/components/SideBar";
import Header from "@/components/Header";
import { SidebarProvider } from "@/components/SidebarProvider";

export default function UserLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      <SidebarProvider>
        <SideBar />

        <main className={`flex flex-col w-full lg:pl-72`}>
          <Header />
          <section className={`pt-20 sm:pt-32`}>{children}</section>
        </main>
      </SidebarProvider>
    </div>
  );
}
