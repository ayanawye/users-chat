"use client";
import React, { FC, useState, useRef } from "react";
import s from "./Chat.module.scss";
import { useGetMessageQuery } from "@/services/messaggeApi";
import { IMessagge } from "@/models/IMessagge";

interface ChatProps {
  id: string | null;
}
interface GroupedMessages {
  [date: string]: IMessagge[];
}

const Chat: FC<ChatProps> = ({ id }) => {
  const { data: messages } = useGetMessageQuery(id);
  const [inputValue, setInputValue] = useState("");
  const contentRef = useRef<HTMLDivElement>(null);

  const handleInputChange = () => {
    if (contentRef.current) {
      setInputValue(contentRef.current.textContent || "");
    }
  };

  const handleFocus = () => {
    if (!inputValue) {
      contentRef.current?.setAttribute("data-placeholder", "Type message...");
    }
  };

  const handleBlur = () => {
    contentRef.current?.removeAttribute("data-placeholder");
  };

  const sortedMessages = messages?.response
    ?.slice()
    ?.sort((a, b) => a.created_at - b.created_at);

    console.log(sortedMessages);
    
  const groupedMessages: GroupedMessages = {};

  sortedMessages?.forEach((message) => {
    const date = new Date(message.created_at * 1000).toLocaleDateString(
      "en-US"
    );
    if (!groupedMessages[date]) {
      groupedMessages[date] = [];
    }
    groupedMessages[date].push(message);
  });

  return (
    <div className={s.chat}>
      {messages?.response?.length !== undefined && (
        <>
          {Object.keys(groupedMessages).map((date) => (
            <div key={date}>
              <h3 className={s.data}>{date}</h3>
              {groupedMessages[date]
                .filter((message) => !message.is_new)
                .map((message) => (
                  <div
                    className={
                      message?.user.you === true
                        ? s.chat_my__message
                        : s.chat_message
                    }
                    key={message.id}
                  >
                    {message?.user.you !== true && (
                      <img src={message?.user?.avatar} alt="avatar" />
                    )}
                    <div>
                      {message?.user.you !== true && (
                        <h3 className="mb-1">{message?.user?.name}</h3>
                      )}
                      <div
                        className={`${
                          message?.user.you === true ? s.chat_my_text : ""
                        } ${
                          message?.message.length >= 40
                            ? s.chat_width
                            : s.chat_width2
                        }`}
                      >
                        <p>{message?.message}</p>
                        <p
                          className={
                            message?.message.length >= 40
                              ? s.chat_time
                              : s.chat_time2
                          }
                        >
                          {new Date(message?.created_at * 1000)
                            .toLocaleString()
                            .slice(12, 17)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              {groupedMessages[date].some((message) => message.is_new) && (
                <>
                  <h3 className={s.new_message}>New Messages</h3>
                  {groupedMessages[date]
                    .filter((message) => message.is_new)
                    .map((message) => (
                      <div
                        className={
                          message?.user.you === true
                            ? s.chat_my__message
                            : s.chat_message
                        }
                        key={message.id}
                      >
                        {message?.user.you !== true && (
                          <img src={message?.user?.avatar} alt="avatar" />
                        )}
                        <div>
                          {message?.user.you !== true && (
                            <h3 className="mb-1">{message?.user?.name}</h3>
                          )}
                          <div
                            className={`${
                              message?.user.you === true ? s.chat_my_text : ""
                            } ${
                              message?.message.length >= 40
                                ? s.chat_width
                                : s.chat_width2
                            }`}
                          >
                            <p>{message?.message}</p>
                            <p
                              className={
                                message?.message.length >= 40
                                  ? s.chat_time
                                  : s.chat_time2
                              }
                            >
                              {new Date(message?.created_at * 1000)
                                .toLocaleString()
                                .slice(12, 17)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                </>
              )}
            </div>
          ))}
          <div className={s.messageInputContainer}>
            <div className={s.textareaContainer}>
              <div
                className={`${s.styledTextarea} ${
                  !inputValue ? s.placeholderActive : ""
                }`}
                contentEditable
                ref={contentRef}
                onInput={handleInputChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
              <div className="flex justify-between mt-1">
                <img src="/add.svg" alt="add" className="pl-1" />
                <img src="/arrow.svg" alt="send" />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Chat;
