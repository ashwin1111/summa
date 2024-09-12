import React from "react";
import { useState, useEffect } from "react";
import { Flex, Spin } from "antd";
import { useBearStore } from "./store/store";
import Search from "./components/Search";
import userProfile from "./assets/user-profile.jpeg";
import ChatHistory from "./components/ChatHistory";
import ChatSection from "./components/ChatSection";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Dashboard = () => {
  // const [documents, setDocuments] = useState();

  const documents = useBearStore((state) => state.documents);
  const currentDocument = useBearStore((state) => state.currentDocument);
  const setCurrentDocument = useBearStore((state) => state.setCurrentDocument);
  const loadingGlobal = useBearStore((state) => state.loadingGlobal);
  const setLoadingGlobal = useBearStore((state) => state.setLoadingGlobal);
  const setDocuments = useBearStore((state) => state.setDocuments);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  useEffect(() => {
    setLoadingGlobal(false);
    axios
      .get(import.meta.env.VITE_BACKEND_URL + `/chat`,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("secret")}`,
        },
      })
      .then((response) => {
        setDocuments([
          {
            id: 1,
            'title': 'Chat 1',
          },
          {
            id: 2,
            'title': 'Chat 2',
          },
        ]);
        // setCurrentDocument(response.data.documents[0]);
        setLoadingGlobal(false);
      })
      .catch((error) => {
        setDocuments([
          {
            id: 1,
            'title': 'Chat 1',
          },
          {
            id: 2,
            'title': 'Chat 2',
          },
        ]);
      });
  }, []);

  const handleLogout = () => {
    toast.success("Logged out successfully");
    localStorage.removeItem("user_id");
    localStorage.removeItem("username");
    navigate("/");
  };

  return (
    <div className="min-h-[100vh] min-w-[100vw] max-h-[100vh] max-w-[100vw] bg-[#f7f8fa] flex overflow-hidden">
      <div className="side-tab hidden md:block md:absolute left-0 min-h-[100vh] min-w-[16vw] max-w-[16vw]">
        <div className="mt-[5vh] flex justify-start items-center gap-6 ml-6">
          <img src={userProfile} alt="" className="h-12 w-auto rounded-full" />
          <p
            className="font-bold text-[1.3rem] overflow-hidden whitespace-nowrap "
            style={{ maxWidth: "10vw", textOverflow: "ellipsis" }}
          >
            {localStorage.getItem("username")}
          </p>
        </div>

        <div className="mt-5 flex flex-col justify-center items-center mb-6 overflow-hidden">
          <Search />
          
        </div>
        {documents.length === 0 ? (
          <>
            <div className="flex justify-center items-center h-full">
              <p className="text-[0.8rem]">No documents added till now</p>
            </div>
          </>
        ) : (
          <ChatHistory documents={documents} setDocuments={setDocuments} />
        )}
      </div>
      <div className="hidden md:block md:min-h-[100vh] md:min-w-[17vw]"></div>
      <div className="h-[100vh] flex items-center overflow-hidden">
        {loadingGlobal ? (
          <div className="min-w-[80vw] flex justify-center">
            <Flex align="center" gap="middle">
              <Spin tip="Loading..." size="large" />
              <div>Loading...</div>
            </Flex>
          </div>
        ) : (
          <ChatSection />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
