import SideBar from "@/components/SideBar";

import Header from "@/components/Header";

export default function UserLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      <SideBar />
      <main className="flex flex-col w-full">
        <header className="sticky top-0 z-10">
          <Header />
        </header>
        <section>{children}</section>
      </main>
    </div>
  );
}
