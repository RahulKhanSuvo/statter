import { Outlet } from "react-router";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

function Main() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Main;
