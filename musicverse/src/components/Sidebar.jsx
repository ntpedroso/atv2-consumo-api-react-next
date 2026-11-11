"use client";
import React from "react";
import ItemSidebar from "./ItemSidebar";
import { House, Search, Heart, Music2, User } from "lucide-react";

const Sidebar = () => {
    return (
        <>
            <aside className="bg-black flex flex-col gap-y-6 text-white py-12 px-8">
                <div className="flex items-center gap-4">
                    <span>Logo</span>
                    <h3 className="text-lg">Olá, <b>Natasha!</b></h3>
                </div>

                <ul className="flex flex-col">
                        <ItemSidebar
                            icon={House}
                            title="Início"
                        ></ItemSidebar>
                        <ItemSidebar
                            icon={Search}
                            title="Buscar"
                        ></ItemSidebar>
                        <ItemSidebar
                            icon={Heart}
                            title="Favoritos"
                        ></ItemSidebar>
                        <ItemSidebar
                            icon={Music2}
                            title="Playlists"
                        ></ItemSidebar>
                        <ItemSidebar
                            icon={User}
                            title="Artistas"
                        ></ItemSidebar>
                </ul>

                <div className="flex flex-col border-t-1 border-t-roxo py-6">
                    <h2 className="mb-6">Suas Playlists</h2>

                    <ul className="flex flex-col">
                            <ItemSidebar
                                icon={House}
                                title="Mais ouvidas"
                            ></ItemSidebar>
                            <ItemSidebar
                                icon={House}
                                title="Pop Internacional"
                            ></ItemSidebar>
                            <ItemSidebar
                                icon={House}
                                title="Academia"
                            ></ItemSidebar>
                            <ItemSidebar
                                icon={House}
                                title="Rock Anos 2000"
                            ></ItemSidebar>
                    </ul>
                </div>
            </aside>
        </>
    )
}

export default Sidebar;