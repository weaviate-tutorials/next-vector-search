"use client";

import React from "react";
import { ReactNode } from "react";

export default function Grid({children} : 
    { children: ReactNode }) {

    return (
       <div className="grid grid-cols-3">
        {children}
       </div>
    )
}



