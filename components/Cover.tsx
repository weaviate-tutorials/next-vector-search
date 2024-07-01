"use client";

import React from "react";
import { ReactNode } from "react";


export default function Cover({children} : 
    { children: ReactNode }) {

    return (
       <div className="flex items-start justify-center pt-3">
        {children}
       </div>
    )
}



