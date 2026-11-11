import Banner from "@/components/Banner";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex-1 px-4 sm:px-6 lg:px-8 py-6">
        <section>
          <Banner></Banner>
        </section>
      </div>
    </div>
  );
}
