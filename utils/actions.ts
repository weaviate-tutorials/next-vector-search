"use server";

import weaviate, { WeaviateClient } from "weaviate-client";
import { Wiki } from "../types.ts";

let client: WeaviateClient | null = null;

async function initClient() {
  if (!client) {
    client = await weaviate.connectToLocal({
      authCredentials: new weaviate.ApiKey('YOUR-WEAVIATE-API-KEY'),
      headers: {
        "X-Cohere-Api-Key": process.env.COHERE_API_KEY!!,
        "X-OpenAI-Api-Key": process.env.OPENAI_API_KEY!!,
      },
  });
  }
  console.log('client', client)
  return client
}


export async function vectorSearch(searchTerm: string) {
  client = await initClient()

  const myCollection = client.collections.use<Wiki>('WikipediaData')

  const response = await myCollection.query.hybrid(searchTerm, {
    limit: 5,
    alpha: 0.9
  })

  return response
}

export async function RAG(searchTerm: string) {
  const client = await initClient()

  const myCollection = client.collections.use<Wiki>('WikipediaData')

  const response = await myCollection.generate.hybrid(searchTerm, {
    groupedTask: `you are my teacher, guide me through the answer to this question : ${searchTerm} like my personal helper. 
    only give me an answer if you get information in the context i give`,
  }, {
    limit: 5
  })

  return response
}


// Prompts 
// you are my teacher, guide me through the answer to this question : ${searchTerm} like my personal helper

// use this ${searchTerm} to teach me a small language lesson in dutch