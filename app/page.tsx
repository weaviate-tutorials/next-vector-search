import Search from "../components/Search.tsx";
import React from 'react';
import Image from "next/image";

export default async function Home({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {

  return (
    <div>

      <main>
        <div className="items-center justify-center flex pt-12">
          <Image
            className="w-48"
            src="/logo.png"
            alt="Weaviate Logo"
            height={360}
            width={360}
          />
        </div>
        <h1 className="text-4xl pt-5 font-bold text-black text-center">
        Semantic Search with Weaviate
        </h1>

        <div className="items-center pb-6 pt-10 p-8">

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
