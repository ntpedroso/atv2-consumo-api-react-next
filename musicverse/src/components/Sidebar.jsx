
"use client";

import { useState } from "react";
import ItemSidebar from "./ItemSidebar";
import { House, Search, Heart, Music2, User, Menu, X } from "lucide-react";

const Sidebar = () => {
    const [menuAberto, setMenuAberto] = useState(false);

    const fecharMenu = () => {
        setMenuAberto(false);
    };

    return (
        <>
            <button
                type="button"
                onClick={() => setMenuAberto((anterior) => !anterior)}
                aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
                aria-expanded={menuAberto}
                aria-controls="sidebar-menu"
                className="fixed top-4 left-4 z-50 lg:hidden bg-roxo text-white p-3 rounded-xl cursor-pointer"
            >
                {menuAberto ? <X size={24} /> : <Menu size={24} />}
            </button>

            {menuAberto && (
                <div
                    className="fixed inset-0 bg-black/60 z-30 lg:hidden"
                    onClick={fecharMenu}
                    aria-hidden="true"
                />
            )}

            <aside
                id="sidebar-menu"
                aria-label="Menu lateral"
                className={`
                    fixed top-0 left-0 z-40
                    bg-black flex flex-col gap-y-6
                    text-white pt-20 pb-8 lg:py-12
                    w-64 h-screen overflow-y-auto
                    transition-transform duration-300
                    ${menuAberto ? "translate-x-0" : "-translate-x-full"}
                    lg:translate-x-0
                `}
            >
                <div className="flex items-center gap-4 px-6">
                    <span>Logo</span>
                </div>

                <nav aria-label="Menu principal">
                    <ul className="flex flex-col">
                        <ItemSidebar
                            icon={House}
                            title="Início"
                            href="/"
                        />

                        <ItemSidebar
                            icon={Search}
                            title="Buscar"
                            href="/buscar"
                        />

                        <ItemSidebar
                            icon={Heart}
                            title="Favoritos"
                            href="/favoritos"
                        />

                        <ItemSidebar
                            icon={Music2}
                            title="Playlists"
                            href="/playlists"
                        />

                        <ItemSidebar
                            icon={User}
                            title="Artistas"
                            href="/artistas"
                        />
                    </ul>
                </nav>

                <div className="flex flex-col border-t border-roxo py-6">
                    <h2 className="px-6 mb-4 font-semibold">
                        Suas Playlists
                    </h2>

                    <nav aria-label="Suas playlists">
                        <ul className="flex flex-col">
                            <ItemSidebar
                                icon={Music2}
                                title="Mais ouvidas"
                                href="/playlists/mais-ouvidas"
                            />

                            <ItemSidebar
                                icon={Music2}
                                title="Pop Internacional"
                                href="/playlists/pop-internacional"
                            />

                            <ItemSidebar
                                icon={Music2}
                                title="Academia"
                                href="/playlists/academia"
                            />

                            <ItemSidebar
                                icon={Music2}
                                title="Rock Anos 2000"
                                href="/playlists/rock-anos-2000"
                            />
                        </ul>
                    </nav>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
