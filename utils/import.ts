import weaviate, { WeaviateClient } from "weaviate-client";
import 'dotenv/config'

import * as fs from 'fs';
import { join } from 'path';
import * as readline from 'readline';


let client: WeaviateClient | null = null;

async function initClient() {
  if (!client) {
    client = await weaviate.connectToWeaviateCloud(process.env.WEAVIATE_HOST_URL!!, {
      authCredentials: new weaviate.ApiKey(process.env.WEAVIATE_ADMIN_KEY!!),
      headers: {
        "X-Cohere-Api-Key": process.env.COHERE_API_KEY!!,
        "X-OpenAI-Api-Key": process.env.OPENAI_API_KEY!!,
      },
    });
  }

  const ready = await client.isReady()
  console.info('Client is ready?', ready)
  return client
}

async function createCollection() {
    client = await initClient()
  
    const response = await client.collections.create({
        name: "WikipediaData",
        vectorizers: weaviate.configure.vectorizer.text2VecCohere({
            model: 'embed-multilingual-v3.0',
            sourceProperties: ['title', 'text']
        }),
        generative: weaviate.configure.generative.openAI()
    })

    console.info('Connection created', response)

  }


async function importData(fileName: string, collectionName: string) {
    client = await initClient();

    const filePath = join(process.cwd(), `./utils/${fileName}`)
    const file = readline.createInterface({ input: fs.createReadStream(filePath), output: process.stdout, terminal: false });

    const wiki = client.collections.get(collectionName)
    let itemsToInsert = []
    let counter = 0;

    for await (const line of file) {
        counter++;
        if(counter % 1000 == 0)
            console.log(`Import: ${counter}`)

        const item = JSON.parse(line)

        // prepare objects to insert
        itemsToInsert.push({
            title: item.title,
            text: item.text,
            url: item.url
        })

        // insert data in batches of 2k objects
        if(itemsToInsert.length == 2000) {
            const response = await wiki.data.insertMany(itemsToInsert)
            itemsToInsert = []

            if(response.hasErrors) {
                throw new Error(
                    "Something went wrong in import!"
                )
            }
        }
    }

    // insert the remaining objects
    if(itemsToInsert.length > 0) {
        const response = await wiki.data.insertMany(itemsToInsert)

        if(response.hasErrors) {
            throw new Error(
                "Something went wrong in import!"
            )
        }
    }

    return { status: "Import Complete"}
}

await createCollection();
await importData('wiki-10k.jsonp', 'WikipediaData');