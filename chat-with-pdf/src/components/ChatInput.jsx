import React from "react";
import { useState } from "react";
import { useRef } from "react";
import { Button } from "antd";
import { useBearStore } from "../store/store";

const ChatInput = ({ onMessageSubmit, isLoading }) => {
  const [textAreaHeight, setTextAreaHeight] = useState("9vh");
  const [boxAreaHeight, setBoxAreaHeight] = useState("9.5vh");
  const [userInput, setUserInput] = useState("");
  const chatLoading = useBearStore((state) => state.chatLoading);
  const setChatLoading = useBearStore((state) => state.setChatLoading);

  const textAreaRef = useRef(null);
  const handleTextAreaChange = (event) => {
    setUserInput(event.target.value);
    if (event.target.value === "") {
      setTextAreaHeight("9vh");
      setBoxAreaHeight("9.5vh");
    } else {
      const newHeight = Math.min(textAreaRef.current.scrollHeight, 6 * 16);
      setTextAreaHeight(`${newHeight}px`);
      setBoxAreaHeight(`${newHeight + 5}px`);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && !isLoading) {
      onMessageSubmit(userInput); // Trigger submission
      setChatLoading(true); 
      setUserInput(""); // Clear input field
    }
  };

  return (
    <div
      className="absolute bottom-3 left-1/2 -translate-x-1/2 h-[6vh] md:h-[9vh] border-2 shadow-md w-[80vw] md:w-[60vw] rounded-xl flex z-20"
      style={{ height: boxAreaHeight }}
    >
      <textarea
        className="flex-1 resize-none p-4 rounded-l-xl focus:outline-none z-20"
        style={{ height: textAreaHeight }}
        ref={textAreaRef}
        onChange={handleTextAreaChange}
        value={userInput}
        onKeyPress={handleKeyPress}
      />
      <div className="flex items-center z-20">
        <Button
          loading={isLoading}
          className="mx-4 px-3 py-2 text-white hover:scale-105 flex items-center gap-2 rounded-xl"
          style={{
            background:
              "linear-gradient(180deg, #0fa958 0%, #0fa958 100%, #0fa958 100%)",
            boxShadow:
              "0px 2px 5px #0fa958, inset 0px -2px 0.3px #0fa958, inset 0px 2px 1px #0fa958",
          }}
        >
          <p className="text-sm font-bold">Send</p>
        </Button>
      </div>
    </div>
  );
};

export default ChatInput;
