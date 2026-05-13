"use client";

import { useState } from "react";
import { conversations, users } from "@/data/mockData";
import { Search, MoreVertical, Phone, Video, Send, Image, Paperclip, Smile, Code, Info } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ChatPage() {
  const [activeChat, setActiveChat] = useState(conversations[0]);
  const [message, setMessage] = useState("");

  const mockMessages = [
    { id: 1, senderId: "u2", text: "Chào mọi người, có ai làm tool FB không?", time: "10:00 AM", isMe: false },
    { id: 2, senderId: "me", text: "Mình đang làm nhé. Bạn cần hỗ trợ phần nào?", time: "10:05 AM", isMe: true },
    { id: 3, senderId: "u2", text: "Mình bị lỗi check point khi login qua API.", time: "10:06 AM", isMe: false },
    { id: 4, senderId: "u3", text: "Dạo này FB quét mạnh, cậu dùng proxy dân cư xem sao.", time: "10:10 AM", isMe: false },
    { id: 5, senderId: "me", text: "Đúng rồi, mình cũng toàn dùng proxy.", time: "10:15 AM", isMe: true },
    { id: 6, senderId: "u2", text: "Cảm ơn các bác nhé! Để thử.", time: "10:20 AM", isMe: false },
  ];

  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden bg-background">
      {/* Left Column: Conversation List */}
      <div className="w-full md:w-80 border-r border-border/50 flex flex-col bg-card/50">
        <div className="p-4 border-b border-border/50">
          <h2 className="text-2xl font-bold mb-4">Chat</h2>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Tìm kiếm tin nhắn..." 
              className="w-full pl-9 pr-4 py-2 rounded-full bg-secondary/50 border-none outline-none focus:ring-2 focus:ring-primary/20 text-sm"
            />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {conversations.map(conv => (
            <div 
              key={conv.id}
              onClick={() => setActiveChat(conv)}
              className={cn(
                "p-3 flex items-center gap-3 cursor-pointer transition-colors border-l-2",
                activeChat.id === conv.id ? "bg-primary/5 border-primary" : "border-transparent hover:bg-secondary/30"
              )}
            >
              <div className="relative">
                <img src={conv.avatar} alt={conv.name} className="w-12 h-12 rounded-full object-cover" />
                {conv.online && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></div>}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <h4 className="font-semibold text-sm truncate">{conv.name}</h4>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">{conv.time}</span>
                </div>
                <div className="flex items-center justify-between">
                  <p className={cn("text-xs truncate", conv.unread > 0 ? "text-foreground font-semibold" : "text-muted-foreground")}>
                    {conv.lastMessage}
                  </p>
                  {conv.unread > 0 && (
                    <span className="bg-primary text-primary-foreground text-[10px] font-bold px-1.5 py-0.5 rounded-full ml-2">
                      {conv.unread}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Middle Column: Chat Window */}
      <div className="hidden md:flex flex-1 flex-col bg-background relative">
        <div className="h-16 border-b border-border/50 flex items-center justify-between px-6 bg-card/30 backdrop-blur-md absolute top-0 inset-x-0 z-10">
          <div className="flex items-center gap-3">
            <img src={activeChat.avatar} alt={activeChat.name} className="w-10 h-10 rounded-full" />
            <div>
              <h3 className="font-semibold">{activeChat.name}</h3>
              <p className="text-xs text-green-500 font-medium">Đang hoạt động</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 text-muted-foreground hover:bg-secondary rounded-full"><Phone className="w-5 h-5" /></button>
            <button className="p-2 text-muted-foreground hover:bg-secondary rounded-full"><Video className="w-5 h-5" /></button>
            <button className="p-2 text-muted-foreground hover:bg-secondary rounded-full lg:hidden"><Info className="w-5 h-5" /></button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 pt-24 space-y-4 flex flex-col">
          {mockMessages.map(msg => (
            <div key={msg.id} className={cn("flex max-w-[70%]", msg.isMe ? "self-end" : "self-start")}>
              {!msg.isMe && (
                <img src={users.find(u => u.id === msg.senderId)?.avatar || "https://i.pravatar.cc/150"} alt="Avatar" className="w-8 h-8 rounded-full mr-2 self-end mb-1" />
              )}
              <div>
                <div className={cn(
                  "px-4 py-2.5 rounded-2xl text-sm",
                  msg.isMe 
                    ? "bg-primary text-white rounded-br-none" 
                    : "bg-secondary text-foreground rounded-bl-none"
                )}>
                  {msg.text}
                </div>
                <div className={cn("text-[10px] text-muted-foreground mt-1", msg.isMe ? "text-right" : "text-left")}>
                  {msg.time}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-border/50 bg-card/30 backdrop-blur-md">
          <div className="flex items-end gap-2 bg-secondary/50 rounded-2xl p-2 border border-border/50 focus-within:border-primary/50 transition-colors">
            <div className="flex items-center gap-1 pb-1 px-1">
              <button className="p-1.5 text-muted-foreground hover:text-primary rounded-lg transition-colors"><Image className="w-5 h-5" /></button>
              <button className="p-1.5 text-muted-foreground hover:text-primary rounded-lg transition-colors"><Paperclip className="w-5 h-5" /></button>
              <button className="p-1.5 text-muted-foreground hover:text-primary rounded-lg transition-colors"><Code className="w-5 h-5" /></button>
            </div>
            <textarea 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Nhập tin nhắn..." 
              className="flex-1 bg-transparent resize-none max-h-32 outline-none p-2 text-sm"
              rows={1}
            />
            <div className="flex items-center gap-1 pb-1">
              <button className="p-1.5 text-muted-foreground hover:text-primary rounded-lg"><Smile className="w-5 h-5" /></button>
              <button className="p-2 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors">
                <Send className="w-4 h-4 ml-0.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Chat Info */}
      <div className="hidden lg:flex w-72 border-l border-border/50 flex-col bg-card/30">
        <div className="p-6 flex flex-col items-center border-b border-border/50">
          <img src={activeChat.avatar} alt={activeChat.name} className="w-24 h-24 rounded-full mb-4 shadow-lg ring-4 ring-background" />
          <h3 className="font-bold text-lg text-center mb-1">{activeChat.name}</h3>
          <p className="text-sm text-muted-foreground mb-4">{activeChat.type === 'group' ? 'Nhóm • 120 thành viên' : 'Developer'}</p>
          <div className="flex gap-2 w-full">
            <button className="flex-1 bg-secondary hover:bg-secondary/80 py-2 rounded-lg text-sm font-medium transition-colors">Trang cá nhân</button>
            <button className="flex-1 bg-secondary hover:bg-secondary/80 py-2 rounded-lg text-sm font-medium transition-colors">Tìm kiếm</button>
          </div>
        </div>

        <div className="p-4 space-y-6 flex-1 overflow-y-auto">
          <div>
            <h4 className="font-semibold text-sm mb-3">File phương tiện & Link</h4>
            <div className="grid grid-cols-3 gap-2">
              {[1,2,3,4,5,6].map(i => (
                <div key={i} className="aspect-square bg-secondary rounded-lg overflow-hidden group cursor-pointer">
                  <img src={`https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=150&h=150`} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                </div>
              ))}
            </div>
          </div>

          {activeChat.type === 'group' && (
            <div>
              <h4 className="font-semibold text-sm mb-3">Thành viên (120)</h4>
              <div className="space-y-3">
                {users.slice(0,4).map(u => (
                  <div key={u.id} className="flex items-center gap-3">
                    <img src={u.avatar} alt={u.name} className="w-8 h-8 rounded-full" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{u.name}</p>
                    </div>
                  </div>
                ))}
                <button className="text-sm text-primary font-medium hover:underline w-full text-left">Xem tất cả</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
