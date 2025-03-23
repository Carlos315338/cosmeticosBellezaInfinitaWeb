//'use client';
//
//import React from 'react';
//import Sidebar from './Sidebar';
//import Header from './Header';
//import Footer from './Footer';
//
//interface Props {
//  children: React.ReactNode;
//}
//
//const DashboardLayout: React.FC<Props> = ({ children }) => {
//  return (
//    <div className="flex flex-col min-h-screen bg-pink-50 font-sans">
//      <Header />
//      <div className="flex flex-1">
//        <Sidebar />
//        <main className="flex-1 p-4 overflow-y-auto">{children}</main>
//      </div>
//      <Footer />
//    </div>
//  );
//};
//
//export default DashboardLayout;
