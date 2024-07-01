import { GenerativeReturn } from "weaviate-client"

export type Wiki = {
  title: string,
  url: string,
  text: string
}


export type SearchResponse = {
  response?: GenerativeReturn<Wiki>
}
