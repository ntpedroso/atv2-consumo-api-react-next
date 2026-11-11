"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const ItemSidebar = ({ icon: Icon, title, href = "#" }) => {
    const pathname = usePathname();
    const ativo = href !== "#" && pathname === href;

    return (
        <li>
            <Link
                href={href}
                aria-current={ativo ? "page" : undefined}
                className={`flex items-center gap-3 py-4 px-6 transition-colors duration-200
                    ${ativo
                        ? "bg-roxo/25 text-roxo border-l-4 border-roxo"
                        : "text-white hover:bg-roxo/25"
                    }`}
            >
                <Icon className="w-5 h-5 shrink-0" />
                <span>{title}</span>
            </Link>
        </li>
    );
};

export default ItemSidebar;
