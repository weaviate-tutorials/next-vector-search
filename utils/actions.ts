"use server";

import weaviate from "weaviate-client";
import { TrackType } from "../types.ts";


export async function vectorSearch(searchTerm: string) {
  const client = await weaviate.connectToWeaviateCloud(process.env.WCS_URL!!, {
    authCredentials: new weaviate.ApiKey(process.env.WCS_API_KEY!!),
    headers: {
      "X-OpenAI-Api-Key": process.env.OPENAI_APIKEY!!,
    },
  });
    
    const myCollection = client.collections.get<TrackType>('CalvinHarris')

    const response = await myCollection.query.nearText(searchTerm,{
        limit: 5
    })

    console.log('yoooo',response)
    return response
  }

// export async function findQuotesByArgument(searchTerm: string, alpha: number) {
//   const cachedResult = await kv.get<QuoteType[]>(searchTerm + alpha.toString());

//   if (cachedResult) {
//     return filterQuotes(cachedResult);
//   }

//   const collection = await client.collections.get<Omit<QuoteType, "distance">>(
//     "QuoteFinder"
//   );

//   const { objects } = await collection.query.hybrid(searchTerm, {
//     limit: 20,
//     alpha: alpha,
//     returnMetadata: ["score", "explainScore"],
//     returnProperties: ["quote", "author"],
//   });

//   const quotesAndAuthorsArray: QuoteType[] = objects.map((quote) => ({
//     ...quote.properties,
//     distance: quote.metadata?.score!!,
//   }));

//   await kv.set(
//     searchTerm + alpha.toString(),
//     JSON.stringify(quotesAndAuthorsArray)
//   );

//   return filterQuotes(quotesAndAuthorsArray);
// }

// const filterQuotes = (quotes: QuoteType[]) => {
//   const filterWhitespaceErrors = (quotes: QuoteType[]) => {
//     const regex = new RegExp(/[a-z][A-Z]|[.,?!][A-Z]/g);

//     const filteredQuotes = quotes.filter((quote) => {
//       const errors = quote.quote.match(regex);
//       return errors === null;
//     });

//     return filteredQuotes;
//   };

//   const filterQuotesWithLength = (quotes: QuoteType[]) => {
//     const filteredQuotes = quotes.filter((quote) => {
//       return quote.quote.length <= 400;
//     });

//     return filteredQuotes;
//   };

//   const filterQuotesWithAuthorLength = (quotes: QuoteType[]) => {
//     const filteredQuotes = quotes.filter((quote) => {
//       return quote.author.length <= 200;
//     });

//     return filteredQuotes;
//   };

//   const filteredQuotes = filterQuotesWithAuthorLength(
//     filterWhitespaceErrors(filterQuotesWithLength(quotes))
//   );

//   return filteredQuotes;
// };
