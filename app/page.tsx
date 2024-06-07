import Search from "../components/Search.tsx";
import React from 'react';
// import Image from "next/image";
import { vectorSearch } from "../utils/actions.ts";
// import Link from "next/link";
// import { parse } from "path";

export default async function Home({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {

  // console.log(response.objects)

  async function handleSearch() {
    const response = await vectorSearch('summer')
    
  }

  // const searchTerm: string = searchParams.search as string;

  // const initialSearchResults = searchTerm
  //   ? await vectorSearch(
  //       searchTerm,
  //     )
  //   : undefined;

  return (
    <div className=" ">
      
      <main>
    <div className="items-center justify-center flex pt-12">
      <p className="text-9xl mt-8">
        🕵🏾‍♂️
      </p>
    </div>
    <h1 className="text-4xl pt-5 font-bold text-black text-center">
      Keyword Search Demo
    </h1>

    <div className="items-center pb-6 pt-10 p-8">
      <h2 className="sr-only">Steps</h2>

      <div className="items-center flex justify-center">
        <p className="text-center text-m">
          Search through what ever you want!
        </p>
      </div>
    </div>

    

    <Search />

  </main>
    </div>
  );
}
