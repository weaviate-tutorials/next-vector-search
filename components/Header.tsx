"use client";

import React from "react";


export default function Header({text}: {
  text: string} ) {

    return (
       <div>
        <h1 className="text-4xl pt-5 font-bold text-black text-center">
          {text}
        </h1>

        <div className="items-center pb-6 pt-10 p-8">

          <div className="items-center flex justify-center">
            <p className="text-center text-m">
              Search through what ever you want!
            </p>
          </div>
        </div>
       </div>
    )
}



