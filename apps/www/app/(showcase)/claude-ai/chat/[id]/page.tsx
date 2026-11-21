import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { ChatView } from "@/components/claude-ai/chat-view"
import { CHATS, getChat, type Chat } from "@/components/claude-ai/data"

const NEW: Chat = { id: "new", title: "", updated: "now", turns: [] }

const find = (id: string) => (id === "new" ? NEW : getChat(id))

export function generateStaticParams() {
  return [...CHATS.map((chat) => ({ id: chat.id })), { id: "new" }]
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const chat = find((await params).id)
  return chat ? { title: chat.title || "New chat" } : {}
}

export default async function ChatPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const chat = find((await params).id)
  if (!chat) notFound()
  return <ChatView key={chat.id} chat={chat} />
}
