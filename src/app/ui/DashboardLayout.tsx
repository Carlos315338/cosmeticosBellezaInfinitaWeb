// app/ui/DashboardLayout.tsx
'use client';

import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

interface Props {
  children: React.ReactNode;
  userName: string;
}

export default function DashboardLayout({ children, userName }: Props) {
  return (
    <div className="contenedor container-fluid">
      <div className="row">
        <Header userName={userName} />
      </div>
      <div className="row">
        <div className="col-md-2 col-sm-12 g-0">
          <Sidebar />
        </div>
        <div className="col-md-10 col-sm-12">
          {children}
        </div>
      </div>
      <div className="row">
        <Footer />
      </div>
    </div>
  );
}