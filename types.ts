import { GenerativeReturn, type WeaviateGenericObject } from "weaviate-client"

export type TrackType =  {
    title: string,
    artist: string,
    album: string,
    year: number,
    rank: number
  };


export type SearchRes = {
  response : GenerativeReturn<TrackType>
}

  
