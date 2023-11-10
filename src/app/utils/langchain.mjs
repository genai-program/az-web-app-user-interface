import { OpenAI } from "langchain/llms/openai";
import { RetrievalQAChain } from "langchain/chains";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";

//import * as config from "./config.js";

export const oaiInstanceName = "genai-acn-dev";
export const baseUrl = "genai-acn-dev.openai.azure.com";

const oaiDeploymentId = {
  "gpt-35-turbo-dev": "gpt-35-turbo-dev",
  "gpt-4-32k-dev": "gpt-4-32k-dev",
  "text-embedding-ada-002-dev": "text-embedding-ada-002",
};

const oaiModelName = {
  "gpt-35-turbo-dev": "gpt-35-turbo",
  "gpt-4-32k-dev": "gpt-4-32k",
  "text-embedding-ada-002-dev": "text-embedding-ada-002",
};

const oaiApiVersion = "2023-08-01-preview";

const oaiApiKey = "653ece376dbb4b869add16e29a5a3bc6";
const baseUrl = "genai-acn-dev.openai.azure.com/openai/deployments";

const model = new ChatOpenAI({
  modelName: "gpt-35-turbo",
  temperature: 0.9,
  azureOpenAIApiKey: oaiApiKey,
  azureOpenAIApiVersion: oaiApiVersion,
  azureOpenAIApiInstanceName: oaiInstanceName,
  azureOpenAIApiDeploymentName: "gpt-35-turbo-dev",
  azureOpenAIBasePath: baseUrl,
});

const embeddings = new OpenAIEmbeddings();

const vectorStore = await MemoryVectorStore.fromDocuments(
  splitDocs,
  embeddings
);

const chain = RetrievalQAChain.fromLLM(model, vectorStore.asRetriever());

const response = await chain.call({
  query: "What is task frontend web development?",
});

console.log(response);
