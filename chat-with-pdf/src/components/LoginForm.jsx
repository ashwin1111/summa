import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/login",
        {
          email: email,
          password: password,
        }
      );


      setEmail("");
      setPassword("");
      setLoading(false);
      navigate("/dashboard");
      toast.success("Login successful!");
      localStorage.setItem("token", response.data.access_token);
      localStorage.setItem("user_id", JSON.stringify(response.data.user_id));
      localStorage.setItem("username", response.data.username);
    } catch (error) {
      // Handle error
      if (error.response) {
        const statusCode = error.response.status;
        const errorMessage = error.response.data.message || "Login failed";
        switch (statusCode) {
          case 401:
            toast.error("Invalid email or password");
            break;
          default:
            toast.error(errorMessage);
        }
      } else {
        toast.error(
          "Network error. Please check your connection and try again."
        );
      }
      console.error("Error logging in:", error);
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
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input.Password
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        {/* <button
          className=" mt-3 py-2 px-4 bg-[#141736] rounded-md text-white"
          onClick={handleSubmit}
        >
          <p>Submit</p>
        </button> */}
        <Button
          loading={loading}
          className=" mt-3 px-4 bg-[#141736] rounded-md text-white hover:border-2 hover:border-black"
          onClick={handleSubmit}
          style={{ height: "2.5rem", fontSize: "1.1rem" }}
        >
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
