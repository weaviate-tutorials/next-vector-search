# Generative Search with [Weaviate](https://weaviate.io/), Next.js and [Open AI](https://openai.com/)

This repo should help get you started developing with Weaviate and React.

![Weaviate](/public/cover.png)

## Installation 

1. Clone the repo with the following command
    ```
    git clone https://github.com/weaviate-tutorials/next-vector-search
    ```

2. Install the necessary project dependencies with the following command
    ```
    yarn install
    ```
3. Create a Weaviate instance on Weaviate Cloud Services as described in [this guide](https://weaviate.io/developers/weaviate/quickstart#step-2-create-an-instance)

4. Create a `.env` file and add the following keys
    - your Open AI API key as `OPENAI_API_KEY` (you can get this in your [Open AI settings](https://platform.openai.com/account/api-keys))
    - your Cohere API key as `COHERE_API_KEY` (you can get this in your [Cohere settings](https://dashboard.cohere.com/api-keys))
    - your Weaviate API key as `WEAVIATE_ADMIN_KEY` (you can get this in your [Weaviate dashboard](https://console.weaviate.cloud/dashboard) under sandbox details)
    - your Weaviate host URL as `WEAVIATE_HOST_URL` (you can get this in your [Weaviate dashboard](https://console.weaviate.cloud/dashboard) under sandbox details)
  
5. Import your data and initialize your collections with the following command
   ```
   yarn run import
   ``` 
5. Start your app with the following command
    ```
    yarn dev
    ```

6. Search away!!

💫you can tweak the prompt for the generative search by [editing this line of code]()

## 📚 Resources
Learn more about Weaviate applications
- [Weaviate Generative Search](https://weaviate.io/developers/weaviate/modules/reader-generator-modules/generative-openai)
- [Vector Search](https://weaviate.io/developers/weaviate/search/similarity)
  
## 🤷🏾‍♂️ Troubleshooting
- Check out the [Weaviate Docs](https://weaviate.io/developers/weaviate)
- Open an [Issue](https://github.com/malgamves/vue-vector-search-demo/issues/new)
   
