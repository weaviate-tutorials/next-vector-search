"use client";

import React from "react";
import Markdown from 'react-markdown'
import { GenerativeReturn } from "weaviate-client";
import { Wiki } from "@/types";

export default function GenResult({ response } : {
    response: GenerativeReturn<Wiki> }) {

    return (
        <div className="flex items-start justify-center col-span-3 pt-4">
        <div
            className="item-start flex z-10 mt-2 w-[750px] divide-y divide-gray-100 rounded-md border border-gray-100 bg-slate-200 shadow-s"
            role="menu">
            <div className="p-2">
                <Markdown>{response.generated}</Markdown>
                <div>
                </div>
            </div>
        </div>
    </div>
    )
}






