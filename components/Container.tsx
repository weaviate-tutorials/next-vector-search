"use client";

import React from "react";
import { ReactNode } from "react";


export default function Container({children} : 
    { children: ReactNode } ) {

    return (
       <div className="items-center justify-center">
        {children}
       </div>
    )
}



