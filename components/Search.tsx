"use client";

import { vectorSearch } from "../utils/actions.ts";
import { useState, useTransition } from "react";
import React from "react";
import { WeaviateReturn, type WeaviateObject } from "weaviate-client";
import Skeleton from "./Skeleton.tsx";
import { TrackType } from "../types.ts";


export default function Search(

) {
    const [searchTerm, setSearchTerm] = useState("");
    const [search, setSearch] = useState(false);
    const [trackResponse, setTrackResponse] = useState<
        WeaviateReturn<TrackType>
    >(undefined);


    const [isPending, startTransition] = useTransition();

    const handleSubmit = async () => {
        setSearch(false)
        if (searchTerm.length > 0) {
            startTransition(async () => {
                const trackResponse = await vectorSearch(
                    searchTerm,
                );

                // console.log(trackResponse);

                setTrackResponse(trackResponse);
                setSearch(true)


            });
        }
    };

    return (
        <div className="justify-center items-center">
            <div className="flex items-center justify-center pt-3">
                <label className="sr-only"> Search </label>

                <input type="text" id="SearchTerm" placeholder="what are you looking for?"
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.currentTarget.value)
                    }}
                    className="w-2/3 rounded-md border-gray-200 bg-slate-300 py-2.5 pl-4 pe-10 shadow-sm sm:text-sm placeholder:text-gray-800" />
            </div>
            <p className="item-center flex justify-center text-xs text-gray-600 pt-2 pb-4">
                try and search for "posts on animals"
            </p>

            <div className="flex items-start justify-center pt-3 gap-2">

                <button
                    className="inline-block rounded border border-white bg-black px-12 py-3 text-sm font-medium text-lime-500 transition hover:border-black hover:bg-lime-500 hover:text-black focus:outline-none focus:ring focus:ring-yellow-400"
                    onClick={(e) => {
                        e.preventDefault();
                        handleSubmit()
                    }}>
                    Search
                </button>
            </div>

            <div v-if="searchResult" className="flex items-start justify-center">
                <div
                    className="item-start absolute flex z-10 mt-2 w-[750px] divide-y divide-gray-100 rounded-md border border-gray-100 bg-slate-200 shadow-lg"
                    role="menu">
                        {search &&
                    <div className="p-2">
                        <strong className="block p-2 text-xs font-bold uppercase text-black">
                            results
                        </strong>
                        <div>
                        </div>

                        
                            <div>
                                {
                                    trackResponse.objects.map((result) => (
                                        <div key={result.uuid} className="space-y-4">
                                            <details className="group [&_summary::-webkit-details-marker]:hidden" open>
                                                <summary
                                                    className="flex cursor-pointer items-center justify-between gap-1.5 rounded-lg text-sm p-4 text-gray-900">
                                                    <h1>
                                                        {result.properties.title}
                                                    </h1>
                                                    <p>
                                                        {result.properties.artist}
                                                    </p>
                                                </summary>
                                            </details>
                                        </div>
                                    ))
                                }

                            </div>
                        

                    </div>
}
                </div>
            </div>

        </div>
    )
}