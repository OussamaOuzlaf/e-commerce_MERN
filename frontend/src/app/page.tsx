"use client"
import { Navbar } from "@/components/Navbar";
import { HomePage } from "./Home/page";
import { AuthProvider } from "@/context/Auth/AuthProvider";



export default function Home() {
  return (
    <div>
      <Navbar />
      <HomePage />
    </div>
  );
}
