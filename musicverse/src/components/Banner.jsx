import Image from "next/image";
import { Play } from "lucide-react";

import Bruno from "@/assets/bruno.png";

const Banner = () => {
  return (
      <div className="grid grid-cols-2 bg-roxo rounded-xl overflow-hidden min-h-64 hover:scale-102 transition-transform duration-300">
        <div className="flex flex-col justify-end p-8 gap-5">
          <div className="text-white">
            <h1 className="text-4xl font-bold">Bruno Mars</h1>

            <p className="text-sm mt-2">Ouça os maiores sucessos do momento.</p>
          </div>

          <button
            type="button"
            aria-label="Reproduzir Bruno Mars"
            className="flex items-center justify-center self-start bg-amarelo rounded-full p-3 hover:bg-amarelo/80 transition-colors cursor-pointer"
          >
            <Play size={20} className="text-roxo" fill="currentColor" />
          </button>
        </div>
        <div className="flex items-end justify-end">
          <Image
            src={Bruno}
            alt="Bruno Mars"
            className="w-auto h-64 object-contain object-bottom"
          />
        </div>
      </div>
  );
};

export default Banner;
