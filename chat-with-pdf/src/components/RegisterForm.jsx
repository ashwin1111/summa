import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import axios from "axios";
import { toast } from "react-toastify";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      if(email === "" || password === "" || username === ""){
        toast.error("Please fill in all fields");
        return;
      }
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/register`, {
        email,
        password,
        username,
      });
      
      console.log("Login successful:", response.data);
      toast.success("Registration successful!");
      setEmail("");
      setPassword("");
      setUsername("");
    } catch (error) {
      console.error("Error logging in:", error);
      if (error.response && error.response.status === 400) {
        toast.error("Email already registered");
      } else {
        toast.error("Registration failed. Please try again."); // Generic error 
      }
    }
    finally {
      setIsLoading(false);
    }
  };

  return (
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      style={{
        maxWidth: 600,
      }}
      autoComplete="off"
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: "Please input your email!",
          },
        ]}
      >
        <Input value={email} onChange={(e) => setEmail(e.target.value)} />
      </Form.Item>

      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <Input value={username} onChange={(e) => setUsername(e.target.value)} />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input.Password value={password} onChange={(e) => setPassword(e.target.value)} />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button loading={isLoading} className=" mt-3 px-4 bg-[#141736] rounded-md text-white hover:border-2 hover:border-black" onClick={handleSubmit} style={{height:'2.5rem', fontSize:"1.1rem"}}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegisterForm;
