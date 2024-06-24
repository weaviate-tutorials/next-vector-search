import { GenerativeReturn, type WeaviateGenericObject } from "weaviate-client"

export type Wiki = {
  title: string,
  url: string,
  text: string
}


export type SearchRes = {
  response : GenerativeReturn<Wiki>
}

  
