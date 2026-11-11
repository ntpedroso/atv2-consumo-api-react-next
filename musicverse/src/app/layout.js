
import { Poppins } from "next/font/google";
import Sidebar from "@/components/Sidebar";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata = {
  title: "MusicVerse",
  description: "Descubra suas músicas favoritas",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className={`${poppins.variable} font-sans`}>
        <div className="min-h-screen bg-background text-text-primary">
          <Sidebar />

          <main className="min-w-0 min-h-screen lg:ml-64">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
