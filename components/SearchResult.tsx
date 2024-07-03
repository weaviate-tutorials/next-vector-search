"use client";

import { vectorSearch } from "../utils/actions.ts";
import Loading from "@/components/Loading.tsx"
import { useState, useTransition } from "react";
import React from "react";
import { WeaviateReturn } from "weaviate-client";
import { Wiki } from "../types.ts";
import Container from "./Container.tsx";
import Cover from "./Cover.tsx";
import InputCover from "./InputCover.tsx";
import VectorSearchResult from "./VectorSearchResult.tsx";

export default function SearchResult() {
    const [searchTerm, setSearchTerm] = useState("");
    const [search, setSearch] = useState(false);
    const [loading, setLoading] = useState(false);
    const [searchResponse, setSearchResponse] = useState<
        WeaviateReturn<Wiki> | null
    >(null);

    const [isPending, startTransition] = useTransition();

    const handleSubmit = async () => {
        setSearch(false)
        setLoading(true)
        if (searchTerm.length > 0) {
            startTransition(async () => {
                const searchResponse = await vectorSearch(
                    searchTerm,
                );
                setSearchResponse(searchResponse);
                setSearch(true)
                setLoading(false)
            });
        }
    };

    return (
        <Container>
            <InputCover>
                <input type="text" id="SearchTerm" placeholder="what are you looking for?"
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.currentTarget.value)
                    }}
                    className="input-main" />
            </InputCover>
            <Cover>
                <button
                    className="btn-primary"
                    onClick={(e) => {
                        e.preventDefault();
                        handleSubmit()
                    }}>
                    Search
                </button>
            </Cover>
            {search && searchResponse &&
               <VectorSearchResult response={searchResponse} />
            }
            {loading &&
                <Loading />
                }
        </Container>
    )
}