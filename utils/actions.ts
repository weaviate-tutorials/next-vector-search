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
  return client
}


export async function vectorSearch(searchTerm: string) {
  client = await initClient()

  const myCollection = client.collections.get('Wikipedia')

  const response = await myCollection.generate.nearText(searchTerm, {
    singlePrompt: `please translate {title} to french`
  },{ limit: 5 })

  return response

}

export async function RAG(searchTerm: string) {
  client = await initClient()

  const myCollection = client.collections.get('Wikipedia')

  const response = await myCollection.generate.nearText(searchTerm, {
    groupedTask: `write a haiku about these items in japanese`,
  },{ limit: 5 })

  return response

}

