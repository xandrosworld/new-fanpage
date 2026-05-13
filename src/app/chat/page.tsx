"use client";

import { useState } from "react";
import { conversations, users } from "@/data/mockData";
import { Code, Image, Info, Paperclip, Phone, Search, Send, Smile, Video } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ChatPage() {
  const [activeChat, setActiveChat] = useState(conversations[0]);
  const [message, setMessage] = useState("");

  const mockMessages = [
    { id: 1, senderId: "u2", text: "Chào mọi người, có ai đang làm tool Facebook không?", time: "10:00 AM", isMe: false },
    { id: 2, senderId: "me", text: "Mình đang làm. Bạn cần hỗ trợ phần nào?", time: "10:05 AM", isMe: true },
    { id: 3, senderId: "u2", text: "Mình bị checkpoint khi login qua API.", time: "10:06 AM", isMe: false },
    { id: 4, senderId: "u3", text: "Dạo này quét mạnh, thử thêm proxy dân cư và retry queue nhé.", time: "10:10 AM", isMe: false },
    { id: 5, senderId: "me", text: "Đúng rồi, mình cũng tách session theo proxy.", time: "10:15 AM", isMe: true },
  ];

  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden bg-background">
      <aside className="flex w-full flex-col border-r border-white/5 bg-white/[0.025] md:w-80">
        <div className="border-b border-white/5 p-4">
          <h1 className="display-title mb-4 text-3xl">Chat</h1>
          <div className="glass relative rounded-[8px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Tìm tin nhắn..."
              className="w-full bg-transparent py-3 pl-9 pr-4 text-sm outline-none"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-2">
          {conversations.map((conv) => (
            <button
              key={conv.id}
              onClick={() => setActiveChat(conv)}
              className={cn(
                "flex w-full items-center gap-3 rounded-[8px] p-3 text-left transition-colors",
                activeChat.id === conv.id ? "border border-primary/20 bg-primary/10" : "hover:bg-white/[0.04]"
              )}
            >
              <div className="relative">
                <img src={conv.avatar} alt={conv.name} className="h-12 w-12 rounded-[8px] object-cover" />
                {conv.online && <span className="absolute -bottom-1 -right-1 h-3 w-3 rounded-[3px] border-2 border-background bg-green-500" />}
              </div>
              <div className="min-w-0 flex-1">
                <div className="mb-1 flex items-center justify-between gap-2">
                  <h4 className="truncate text-sm font-extrabold">{conv.name}</h4>
                  <span className="text-xs text-muted-foreground">{conv.time}</span>
                </div>
                <p className={cn("truncate text-xs", conv.unread ? "font-bold text-foreground" : "text-muted-foreground")}>
                  {conv.lastMessage}
                </p>
              </div>
              {conv.unread > 0 && (
                <span className="rounded-[6px] bg-primary px-1.5 py-0.5 text-[10px] font-bold text-primary-foreground">
                  {conv.unread}
                </span>
              )}
            </button>
          ))}
        </div>
      </aside>

      <main className="relative hidden flex-1 flex-col md:flex">
        <div className="absolute inset-x-0 top-0 z-10 flex h-16 items-center justify-between border-b border-white/5 bg-background/70 px-6 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <img src={activeChat.avatar} alt={activeChat.name} className="h-10 w-10 rounded-[8px] object-cover" />
            <div>
              <h2 className="font-extrabold">{activeChat.name}</h2>
              <p className="text-xs font-bold text-primary">Đang hoạt động</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {[Phone, Video, Info].map((Icon) => (
              <button data-magnetic key={Icon.name} className="btn-quiet flex h-9 w-9 items-center justify-center text-muted-foreground">
                <Icon className="h-5 w-5" />
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-6 pt-24">
          {mockMessages.map((msg) => (
            <div key={msg.id} className={cn("flex max-w-[72%]", msg.isMe ? "self-end" : "self-start")}>
              {!msg.isMe && (
                <img
                  src={users.find((user) => user.id === msg.senderId)?.avatar || "https://i.pravatar.cc/150"}
                  alt="Avatar"
                  className="mb-1 mr-2 h-8 w-8 self-end rounded-[8px] object-cover"
                />
              )}
              <div>
                <div
                  className={cn(
                    "rounded-[8px] px-4 py-2.5 text-sm leading-6",
                    msg.isMe ? "bg-primary text-primary-foreground" : "border border-white/5 bg-white/[0.05]"
                  )}
                >
                  {msg.text}
                </div>
                <div className={cn("mt-1 text-[10px] text-muted-foreground", msg.isMe ? "text-right" : "text-left")}>
                  {msg.time}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-white/5 bg-background/70 p-4 backdrop-blur-xl">
          <div className="glass flex items-end gap-2 rounded-[8px] p-2">
            <div className="flex items-center gap-1 pb-1 px-1">
              {[Image, Paperclip, Code].map((Icon) => (
                <button data-magnetic key={Icon.name} className="btn-quiet flex h-8 w-8 items-center justify-center text-muted-foreground">
                  <Icon className="h-4 w-4" />
                </button>
              ))}
            </div>
            <textarea
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Nhập tin nhắn..."
              className="max-h-32 flex-1 resize-none bg-transparent p-2 text-sm outline-none"
              rows={1}
            />
            <button data-magnetic className="btn-quiet flex h-8 w-8 items-center justify-center text-muted-foreground">
              <Smile className="h-4 w-4" />
            </button>
            <button data-magnetic className="btn-artisan h-9 w-9 p-0">
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
