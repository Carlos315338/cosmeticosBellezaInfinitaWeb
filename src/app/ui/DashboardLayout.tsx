// app/ui/DashboardLayout.tsx
"use client";

import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { useAuth } from "@/context/AuthContext";

interface Props {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: Props) {

  const { user } = useAuth();

  return (
    <div className="contenedor">
      <div className="row">
        <Header userName={user?.nombreUsuario ?? "Usuario"} />
      </div>
      <div className="row">
        <div className="col-md-2 col-sm-12 g-0">
          <Sidebar />
        </div>
        <div className="col-md-10 col-sm-12">{children}</div>
      </div>
      <div className="row footer">
        <Footer />
      </div>
    </div>
  );
}
