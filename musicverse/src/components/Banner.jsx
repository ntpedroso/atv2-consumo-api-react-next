import React from "react";
import { Play } from "lucide-react";

//assets
import Bruno from "@/assets/bruno.png";

const Banner = () => {
    return (
        <div className="flex bg-roxo rounded-xl">
            <div className="p-8">
                <h1>Bruno Mars</h1>
                <button className="flex bg-roxo-claro rounded-full p-2">
                    <Play size={18} className="text-gray-800"></Play>
                </button>
            </div>

            <div className="h-full ">
                <img src={Bruno.src || Bruno}></img>
            </div>
        </div>
    )
}

export default Banner;