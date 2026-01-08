"use client";

import {
  Message,
  MessageContent,
  MessageResponse,
} from "@/components/ai-elements/message";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Loader } from "@/components/ai-elements/loader";
import { PromptInput, PromptInputBody, PromptInputFooter, PromptInputMessage, PromptInputSelect, PromptInputSubmit, PromptInputTextarea, PromptInputTools } from "@/components/ai-elements/prompt-input";
import { useState, Fragment } from "react";
import { useChat } from "@ai-sdk/react";
import { ModelSelector } from "@/components/ai-elements/model-selector";


function RAGChatBot() {
  const [input, setInput] = useState("");
  const { messages, sendMessage, status } = useChat();

  const handleSubmit = (message: PromptInputMessage) => {
    if(message.text) return;
    sendMessage({
        text: message.text,
    });
    setInput("");
  }

  return (
    <div className="max-w-4xl mx-auto p-6 relative size-full h-[calc(97vh)]">
        <div className="flex flex-col h-full mb-0">
            <Conversation className="h-full bottom-5">
                <ConversationContent>
                    {messages.map((message) => (
                        <div key={message.id}>
                            { message.parts.map((part, i) => {
                                switch(part.type) {
                                    case "text":
                                        return (
                                            <Fragment key={`${message.id}-${i}`}>
                                                <Message from={message.role}>
                                                    <MessageContent>
                                                        <MessageResponse>{part.text}</MessageResponse>
                                                    </MessageContent>
                                                </Message>
                                            </Fragment>
                                        );
                                    default:
                                        return null;
                                }
                            })}
                        </div>
                    ))}
                    { (status === "submitted" || status === "streaming") && <Loader /> }
                </ConversationContent>
                <ConversationScrollButton />
            </Conversation>
            <PromptInput className="mt-4" onSubmit={handleSubmit}>
                <PromptInputBody>
                    <PromptInputTextarea value={input} onChange={(e) => setInput(e.target.value)} />
                </PromptInputBody>
                <PromptInputFooter>
                    <PromptInputTools>
                    {/* Model selector, web search etc */}
                    <ModelSelector>

                    </ModelSelector>
                    </PromptInputTools>
                    <PromptInputSubmit disabled={!input && !status} status={status} />
                </PromptInputFooter>
            </PromptInput>
        </div>
    </div>
  )
}

export default RAGChatBot