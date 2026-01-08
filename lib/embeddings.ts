import { embed, embedMany } from "ai";
import { openai } from '@ai-sdk/openai';

//  https://ai-sdk.dev/docs/ai-sdk-core/embeddings
export async function generateEmbedding(text: string): Promise<number[]> {
  const input = text.replaceAll("\n", " ");

  const { embedding } = await embed({
    model: openai.embedding('text-embedding-3-small'),
    value: input,
  });

  return embedding;
}

export async function generateEmbeddings(texts: string[]): Promise<number[][]> {
  const inputs = texts.map((text) => text.replaceAll("\n", " "));

  const { embeddings } = await embedMany({
    model: openai.embedding('text-embedding-3-small'),
    values: inputs,
  });

  return embeddings;
}