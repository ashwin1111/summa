import React from "react";
import { useState } from "react";
import Header from "./Header";
import "./App.css";
import background from "./assets/background2.svg";
import upload from "./assets/upload.svg";
import { Modal, Button, Input, Form } from "antd";

const Home = () => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
      className="h-[100vh] w-[100vw] max-h-[100vh] max-w-[100vw]"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Header />
      <div className="mt-[3rem] min-w-[100vw] flex justify-center items-center">
        <p
          className="title text-[3rem] md:text-[4rem]"
          style={{
            fontFamily: "Tilt Warp",
            fontWeight: "100",
            fontStyle: "normal",
          }}
        >
          Chat with Pdf .
        </p>
      </div>
      <div className="mt-24 md:mt-8 flex justify-center items-center">
        <div className="glass h-[30vh] w-[70vw] md:h-[40vh] md:w-[40vw] flex justify-center items-center cursor-pointer">
          <div>
            <div className="flex justify-center">
              <img
                src={upload}
                alt="pdf-icon"
                className="h-[10vh] md:h-[15vh]"
              />
            </div>
            <div className="flex mt-4 text-md md:text-xl">
              <p className="font-bold text-[#299d75] ">Cilck to Upload</p>
              <p>&nbsp;or drag and drop</p>
            </div>
            <div className="mt-3 flex justify-center items-center">
              <p>(Max File size: 25 MB)</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 flex justify-center items-center">
        <button className="bg-[#141736] text-white px-5 py-3 rounded-xl font-semibold text-lg shadow-md hover:scale-105 transition-transform">
          Enter as a guest
        </button>
        <p className="mx-6 text-lg">or</p>
        <button
          className="bg-[#141736] text-white px-5 py-3 rounded-xl font-semibold text-lg shadow-md hover:scale-105 transition-transform"
          onClick={showModal}
        >
          Login
        </button>
        <Modal
           title="Login"
           open={open} // Use 'open' instead of 'visible'
           onOk={handleOk} 
           onCancel={handleCancel}
           confirmLoading={confirmLoading}
           footer={[ // Add the footer
             <Button key="login" type="primary" style={{ backgroundColor: 'black', color: 'white' }} onClick={handleLogin}>
               Login
             </Button>,
           ]}
        >
            <Form layout="vertical" form={form}> {/* Attach the form instance */}
                <Form.Item label="Email">
                <Input placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </Form.Item>
                <Form.Item label="Password">
                <Input.Password placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </Form.Item>
            </Form>
        </Modal>
      </div>
    </div>
  );
};

export default Home;
