"use server";

import weaviate from "weaviate-client";
import { TrackType } from "../types.ts";


export async function vectorSearch(searchTerm: string) {
  const client = await weaviate.connectToWeaviateCloud(process.env.WEAVIATE_HOST_URL!!, {
    authCredentials: new weaviate.ApiKey(process.env.WEAVIATE_API_KEY!!),
    headers: {
      "X-OpenAI-Api-Key": process.env.OPENAI_APIKEY!!,
    },
  });
    
    const myCollection = client.collections.get<TrackType>('CalvinHarris')

    const response = await myCollection.query.nearText(searchTerm,{
        limit: 5
    })

    return response
  }
