"use client";

import React from "react";
import { ReactNode } from "react";


export default function InputCover({children} : 
    { children: ReactNode }) {

    return (
        <div>
            <div className="flex items-center justify-center pt-3">
            {children}
            </div>
            <p className="item-center flex justify-center text-xs text-gray-600 pt-2 pb-4">
                try and search for "posts on animals"
            </p>
        </div>
    )
}



