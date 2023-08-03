"use client";
import React, { FC, useState } from "react";
import s from "./ChatItemList.module.scss";
import { useGetChatsQuery } from "@/services/chatApi";
import Chat from "./Chat";
import Header from "../Header";

const ChatItemList: FC = () => {
  const { data: chats } = useGetChatsQuery("");
  const [selectedChat, setSelectedChat] = useState<string | null>(null)
 
  const handleChatClick = (id: string) => {
    setSelectedChat(id)
  }

  return (
    <main className={s.main}>
      <aside className={s.aside}>
        <div>
          <h2 className="font-bold">All chats</h2>
          <div>
            {chats?.response?.length !== 0 &&
              chats?.response.map((chat) => (
                <div onClick={() => handleChatClick(chat?.id)} className={chat.id === selectedChat ? `${s.active} ${s.aside_chat}` : s.aside_chat} key={chat.id}>
                  <img
                    src={chat?.avatar}
                    className="rounded-lg"
                    alt={chat.title}
                  />
                  <div>
                    <div className="flex justify-between">
                      <h3>
                        {chat?.title.length >= 27
                          ? chat.title.slice(0, 27).concat("...")
                          : chat.title}
                      </h3>
                      <p>
                        {new Date(chat.last_message.created_at * 1000)
                          .toLocaleString()
                          .slice(12, 17)}
                      </p>
                    </div>
                    <p className={s.aside_chat__message}>
                      {chat.last_message.message}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </aside>
      <div className="w-full">
        <Header />
        <Chat id={selectedChat} />
      </div>
    </main>
  );
};

export default ChatItemList;
