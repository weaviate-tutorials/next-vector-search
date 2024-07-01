"use server";

import weaviate, { WeaviateClient } from "weaviate-client";
import { Wiki } from "../types.ts";

let client: WeaviateClient | null = null;

async function initClient() {
  if (!client) {
    client = await weaviate.connectToWeaviateCloud(process.env.WEAVIATE_HOST_URL!!, {
      authCredentials: new weaviate.ApiKey(process.env.WEAVIATE_API_KEY!!),
      headers: {
        "X-Cohere-Api-Key": process.env.COHERE_KEY!!,
        "X-OpenAI-Api-Key": process.env.OPENAI_APIKEY!!,
      },
    });
  }
  console.log('client', client)
  return client
}


export async function vectorSearch(searchTerm: string) {
  client = await initClient()

  const myCollection = client.collections.get<Wiki>('Wikipedia')

  const response = await myCollection.query.nearText(searchTerm, {
    limit: 5
  })

  return response
}

export async function RAG(searchTerm: string) {
  const client = await initClient()

  const myCollection = client.collections.get<Wiki>('Wikipedia')

  const response = await myCollection.generate.nearText(searchTerm, {
    groupedTask: `you are a middle school teacher, use the information below to answer ${searchTerm} and use 
  simple words`
  }, {
    limit: 5
  })

  return response
}
