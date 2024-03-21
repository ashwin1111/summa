import React, { useEffect } from "react";
import { useState, useRef } from "react";
import { Modal, Button, Spin, Flex } from "antd";
import logo from "../assets/logo.svg";
import { IoMdAddCircleOutline, IoMdDocument } from "react-icons/io";
import { MdHistory } from "react-icons/md";
import chatBackground from "../assets/chat-background1.svg";
import UserChatBubble from "./UserChatBubble";
import AiChatBubble from "./AiChatBubble";
import axios from "axios";
import { useBearStore } from "../store/store";
import Search from "./Search";
import IndividualChatHistory from "./IndividualChatHistory";
import ChatInput from "./ChatInput";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";

const ChatSection = () => {
  const documents = useBearStore((state) => state.documents);
  const setDocuments = useBearStore((state) => state.setDocuments);
  const chatContainerRef = useRef(null);
  const [openDocumentsModal, setOpenDocumentsModal] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [text, setText] = useState(null);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [fileError, setFileError] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  // const [chatMessages, setChatMessages] = useState([]);
  const chatMessages = useBearStore((state) => state.chatMessages);
  const setChatMessages = useBearStore((state) => state.setChatMessages);
  const chatNewMessage = useBearStore((state) => state.chatNewMessage);
  const setChatNewMessage = useBearStore((state) => state.setChatNewMessage);
  const [chatLocal, setChatLocal] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const currentDocument = useBearStore((state) => state.currentDocument);
  const chatLoading = useBearStore((state) => state.chatLoading);
  const setChatLoading = useBearStore((state) => state.setChatLoading);
  const setCurrentDocument = useBearStore((state) => state.setCurrentDocument);
  const handleSend = async (message) => {
    // setChatMessages([...chatMessages, { text: message, type: "user" }]);
    //  setChatMessages([...chatMessages, { text: message, type: "user" }]);

    setChatLocal({
      created_at: new Date().toISOString(),
      document_id: currentDocument.id,
      id: uuidv4(),
      prompt: message,
      response: "",
    });

    event.preventDefault();
    setIsLoading(true);

    try {
      const user_id = localStorage.getItem("user_id");
      const API_URL = `${
        import.meta.env.VITE_BACKEND_URL
      }/response/${user_id}/${currentDocument.id}`;
      const response = await axios.post(
        API_URL,
        {
          document: currentDocument.link,
          prompt: message,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setChatLocal({
        created_at: new Date().toISOString(),
        document_id: currentDocument.id,
        id: Math.random(),
        prompt: message,
        response: response.data.response,
      });
      toast.info("Scroll to bottom to see the response.");
      setChatLoading(false);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      // setUserInput("");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInitialMessages();
  }, [chatLocal]);

  const fetchInitialMessages = async () => {
    try {
      const user_id = localStorage.getItem("user_id");
      const API_URL = `${
        import.meta.env.VITE_BACKEND_URL
      }/requests/${user_id}/${currentDocument.id}`;
      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setChatMessages(response.data);
    } catch (error) {
      console.error("Error fetching initial messages:", error);
    }
  };

  useEffect(() => {
    fetchInitialMessages();
  }, [currentDocument]);

  useEffect(() => {
    // Scroll to the bottom of the chat container when chatMessages change
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const fileInputRef = useRef(null);

  const handleClickUploadArea = () => {
    fileInputRef.current.click();
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];


    if (file.type !== "application/pdf") {
      setFileError("Please select a PDF file only.");
      return;
    }

    setFileError(null);
    setSelectedFile(file);
  };

  const handleOk = async () => {
    setConfirmLoading(true);
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const API_URL = `${
        import.meta.env.VITE_BACKEND_URL
      }/upload?user_id={user_id}`;
      const user_id = localStorage.getItem("user_id");

      try {
        const response = await axios.post(
          API_URL.replace("{user_id}", user_id),
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setDocuments(response.data.documents);
        setCurrentDocument(
          response.data.documents[response.data.documents.length - 1]
        );
      } catch (error) {
        console.error("Error uploading file:", error.response || error);
      } finally {
        setSelectedFile(null);
        setFileError(null);
        setOpen(false);
        setConfirmLoading(false);
      }
    } else {
      setFileError("Please select a file to upload");
      setConfirmLoading(false);
    }
  };

  const handleDocumentClick = (document) => {
    console.log("Clicked document:", document);
    setCurrentDocument(document);
    setOpenDocumentsModal(false);
  };

  return (
    <div className="chat-section min-h-[95vh] border-2 max-h-[95vh] min-w-[100vw] max-w-[100vw] md:min-w-[80vw] md:max-w-[80vw] bg-white shadow-sm rounded-3xl overflow-hidden relative flex flex-col items-center">
      <div
        className="py-4 px-8 flex justify-between items-center min-w-full z-20"
        style={{ boxShadow: "0 2px 12px -6px gray" }}
      >
        <div>
          <img src={logo} alt="" className="h-8" />
        </div>
        <button
          className="max-h-10 px-3 py-2 text-white hover:scale-105 flex items-center gap-2 rounded-2xl md:hidden"
          style={{
            background:
              "linear-gradient(180deg, #0fa958 0%, #0fa958 100%, #0fa958 100%)",
            boxShadow:
              "0px 2px 5px #0fa958, inset 0px -2px 0.3px #0fa958, inset 0px 2px 1px #0fa958",
          }}
          onClick={() => setOpenDocumentsModal(true)}
        >
          <MdHistory size={20} />
          <p className="font-bold text-sm">History</p>
        </button>
        {documents.length > 10 && (
          <div>
            <p className="hidden md:block text-[red]">
              {" "}
              More than 10 documents added remove docs to add
            </p>
          </div>
        )}
        <Button
          className="max-h-10 px-3 py-2 text-white hover:scale-105 flex items-center gap-2 rounded-lg"
          {...(documents.length > 10 && { disabled: true })}
          style={{
            background:
              "linear-gradient(180deg, #0fa958 0%, #0fa958 100%, #0fa958 100%)",
            boxShadow:
              "0px 2px 5px #0fa958, inset 0px -2px 0.3px #0fa958, inset 0px 2px 1px #0fa958",
            fontSize: "1rem",
            padding: "1rem 1rem",
          }}
          onClick={() => setOpen(true)}
        >
          <IoMdAddCircleOutline size={20} />
          <p className="font-bold text-md">Upload Pdf</p>
        </Button>
      </div>
      {documents.length > 10 && (
        <div className="block mt-3 md:hidden">
          <p className="text-[red]">
            {" "}
            More than 10 documents added remove docs to add
          </p>
        </div>
      )}
      <div className="text-left mt-10 w-[98%] flex flex-col justify-center items-center">
        <div className="md:min-w-[60vw] md:max-w-[60vw] min-w-[60vw] max-w-[60vw]">
          <p className="text-xl font-bold">{currentDocument?.name}</p>
          <p className="text-sm">Start asking questions on this pdf</p>
        </div>
      </div>
      <div className="w-[98%] h-[60vh] flex flex-col items-center overflow-x-hidden overflow-y-scroll z-20">
        <div className="max-w-[80vw] md:max-w-[60vw] min-w-[80vw] md:min-w-[60vw]">
          {chatMessages?.map((message, index) => (
            <React.Fragment key={index}>
              <UserChatBubble key={uuidv4()} text={message.prompt} />
              <AiChatBubble key={uuidv4()} text={message.response} />
            </React.Fragment>
          ))}
          {chatLocal?.length > 0 &&
            chatLocal?.map((message, index) => (
              <React.Fragment key={index}>
                <UserChatBubble key={uuidv4()} text={message.prompt} />
                <AiChatBubble key={uuidv4()} text={message.response} />
              </React.Fragment>
            ))}

          {chatLoading ? (
            <Flex align="center" gap="middle">
              <Spin tip="Loading..." size="large" />
              <div>Loading...</div>
            </Flex>
          ) : (
            <></>
          )}
        </div>
      </div>
      <ChatInput onMessageSubmit={handleSend} isLoading={isLoading} />
      <div className="absolute -bottom-44 md:left-[70%] md:-translate-x-1/2 right-0 w-full">
        <img className="h-[100vh] object-cover" src={chatBackground} alt="" />
      </div>
      <Modal
        title="Title"
        open={open}
        confirmLoading={confirmLoading}
        onOk={handleOk}
        onCancel={() => setOpen(false)}
        okButtonProps={{ style: { backgroundColor: "black", color: "white" } }}
      >
        <div className="flex flex-col items-center">
          {" "}
          {/* Main container */}
          {fileError && ( // Display error if it exists
            <div className="text-red-500 text-center"> {fileError} </div>
          )}
          {/* Always show the file upload area */}
          <div
            className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 p-6 rounded-lg min-h-[100px]"
            onClick={handleClickUploadArea}
          >
            <IoMdAddCircleOutline size={40} className="text-gray-400" />
            <p className="text-center text-gray-500">
              Click or drag file to upload
            </p>
            <input
              type="file"
              id="fileInput"
              className="hidden"
              onChange={handleFileUpload}
              ref={fileInputRef}
              accept=".pdf"
            />
          </div>
          {selectedFile && (
            <div className="mt-2">
              {" "}
              {/* Show selected file details */}
              <p className="font-bold">File Selected:</p>
              <p>{selectedFile.name}</p>
            </div>
          )}
        </div>
      </Modal>
      <Modal
        title="Select Document"
        open={openDocumentsModal}
        confirmLoading={false} // No loading state needed here
        onCancel={() => setOpenDocumentsModal(false)}
        onOk={() => setOpenDocumentsModal(false)} // Close on click
      >
        <Search />
        <ul>
          {documents.map((document) => (
            <IndividualChatHistory
              key={document.id}
              document={document}
              onClick={() => handleDocumentClick(document)}
            />
          ))}
        </ul>
      </Modal>
    </div>
  );
};

export default ChatSection;
