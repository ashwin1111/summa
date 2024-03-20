import React from "react";
import { useState } from "react";
import Header from "./Header";
import "./App.css";
import background from "./assets/background2.svg";
import upload from "./assets/upload.svg";
import {
  Modal,
  Button,
  Input,
  Form,
  Segmented,
  ConfigProvider,
  theme,
} from "antd";
import logo from "./assets/logo.svg";
import HomeForm from "./components/HomeForm";

const Home = () => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");

  const [form] = Form.useForm();
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  const handleLogin = async () => {
    console.log(email, password);
  };
  return (
    <div
      className="h-[100vh] w-[100vw] max-h-[100vh] max-w-[100vw] overflow-hidden flex flex-col justify-center items-center"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Header />
      <div className="mt-8 flex justify-center items-center">
        <div className="glass min-w-[80vw] md:min-w-[60vw] md:max-h-[60vh] min-h-[60vh] grid grid-rows-4 md:grid-cols-2 md:grid-rows-0">
          <div className="flex row-span-1 md:row-span-4 md:flex-col flex-row justify-center items-center">
            <img src={logo} alt="" className="h-16 md:h-[13vh]" />
          </div>
          <div className="row-span-4 flex justify-center items-center">
            <HomeForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
