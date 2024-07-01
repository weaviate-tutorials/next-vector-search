
"use client";

import React from "react";
import { GenerativeReturn } from "weaviate-client";
import { Wiki } from "@/types";


export default function References({ response } : {
    response: GenerativeReturn<Wiki> }) {

    return (
        <div className="flex justify-center col-span-3 translate-y-[1rem] pb-10">
        <div
            className="flex z-10 mt-2 w-[750px] divide-gray-100 rounded-md border border-gray-100 bg-slate-200 shadow-s"
            role="menu">
            <div className="p-2">
                <p className="pt-2 font-bold">ℹ️ Sources (Results from Vector Search)</p>
                <p className="pb-2"> Find out what powered the response from your LLM</p>
                {
                    response.objects.map((result) => (
                        <ol >
                            <li className="space-y-4">
                                <a className="underline" href="result.properties.url" target="_blank"> {result.properties.title} </a>
                            </li>
                        </ol>
                    ))
                }
            </div>
        </div>
    </div>
    )
}






