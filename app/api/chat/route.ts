import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  streamText,
  tool,
  toUIMessageStream,
  UIMessage,
} from "ai"
import { google, GoogleLanguageModelOptions } from "@ai-sdk/google"
import z from "zod"

export const maxDuration = 30

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json()

  console.log(messages)

  const result = streamText({
    model: google("gemini-3.8-flash"),
    instructions: "You are a helpful assistant.",
    messages: await convertToModelMessages(messages),
    providerOptions: {
      google: {
        thinkingConfig: {
          includeThoughts: true,
          thinkingLevel: "low",
        },
      } satisfies GoogleLanguageModelOptions,
    },
    tools: {
      weather: tool({
        description: "Get the weather in location (celcius)",
        inputSchema: z.object({
          location: z.string().describe("The location to get the weather for"),
        }),
        execute: async ({ location }) => {
          const temperature = Math.round(Math.random() * (90 - 32) + 32)
          return {
            location,
            temperature,
          }
        },
      }),
    },
  })

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({
      stream: result.stream,
      sendReasoning: true,
      sendSources: true,
      messageMetadata({ part }) {
        if (part.type === "start") {
          return {
            createdAt: Date.now(),
            model: "gemini-3.8-flash",
          }
        }
        if (part.type === "finish") {
          return {
            totalTokens: part.totalUsage.totalTokens,
          }
        }
      },
    }),
  })
}
