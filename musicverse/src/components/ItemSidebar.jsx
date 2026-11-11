"use client";
import React from "react";
import Link from "next/link";

const ItemSidebar = ({ icon: Icon, title, href = "#" }) => {
    return (
        <>
            <Link href={href}>
                <li className="flex items-center gap-3 hover:bg-roxo/25 p-6 rounded-xl">
                    <Icon className="w-5"></Icon>
                    <p>{title}</p>
                </li>
            </Link>
        </>
    )
}

export default ItemSidebar;