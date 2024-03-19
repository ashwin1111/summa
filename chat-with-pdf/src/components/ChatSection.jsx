import React from "react";
import { useState, useRef } from "react";
import logo from "../assets/logo.svg";
import { IoMdAddCircleOutline } from "react-icons/io";
import chatBackground from "../assets/chat-background1.svg";
import UserChatBubble from "./UserChatBubble";
import AiChatBubble from "./AiChatBubble";

const ChatSection = () => {
  const [textAreaHeight, setTextAreaHeight] = useState("9vh");
  const [boxAreaHeight, setBoxAreaHeight] = useState("9.5vh");
  const textAreaRef = useRef(null);
  const handleTextAreaChange = (event) => {
    if (event.target.value === '') {
      setTextAreaHeight('9vh');
      setBoxAreaHeight('9.5vh');
    } else {
      const newHeight = Math.min(textAreaRef.current.scrollHeight, 6 * 16);
      setTextAreaHeight(`${newHeight}px`);
      setBoxAreaHeight(`${newHeight + 5}px`);
    }
  };
  return (
    <div className="chat-section min-h-[95vh] border-2 max-h-[95vh] min-w-[78vw] max-w-[78vw] bg-white shadow-sm rounded-3xl overflow-hidden relative flex flex-col items-center">
      <div
        className="py-4 px-8 flex justify-between items-center min-w-full z-20"
        style={{ boxShadow: "0 2px 12px -6px gray" }}
      >
        <div>
          <img src={logo} alt=""className="h-8" />
        </div>
        <button
          className="max-h-20 p-3 text-white hover:scale-105 flex items-center gap-2 rounded-2xl"
          style={{
            background:
              "linear-gradient(180deg, #0fa958 0%, #0fa958 100%, #0fa958 100%)",
            boxShadow:
              "0px 2px 5px #0fa958, inset 0px -2px 0.3px #0fa958, inset 0px 2px 1px #0fa958",
          }}
        >
          <IoMdAddCircleOutline size={20} />
          <p className="font-bold text-sm">Upload Pdf</p>
        </button>
      </div>
      <div className="w-[60vw] h-[70vh] flex flex-col items-center overflow-x-hidden overflow-y-scroll z-20">
        <UserChatBubble/>
        <AiChatBubble/>
        <UserChatBubble/>
        <AiChatBubble/>
        <UserChatBubble/>
        <AiChatBubble/>
        <UserChatBubble/>
        <AiChatBubble/>
      </div>
      <div
        className="absolute bottom-3 left-1/2 -translate-x-1/2 h-[9vh] border-2 shadow-md w-[60vw] rounded-xl flex z-20"
        style={{ height: boxAreaHeight }}
      >
        <textarea
          className="flex-1 resize-none p-4 rounded-l-xl focus:outline-none"
          style={{ height: textAreaHeight }}
          ref={textAreaRef}
          onChange={handleTextAreaChange}
        />
        <div className="flex items-center">
          <button
            className="mx-4 px-3 py-2 text-white hover:scale-105 flex items-center gap-2 rounded-xl"
            style={{
              background:
                "linear-gradient(180deg, #0fa958 0%, #0fa958 100%, #0fa958 100%)",
              boxShadow:
                "0px 2px 5px #0fa958, inset 0px -2px 0.3px #0fa958, inset 0px 2px 1px #0fa958",
            }}
          >
            <p>Send</p>
          </button>
        </div>
      </div>
      <div className="absolute -bottom-44 left-[70%] -translate-x-1/2 right-0 w-full z-10">
        <img className="h-[100vh] object-cover" src={chatBackground} alt="" />
      </div>
    </div>
  );
};

export default ChatSection;
