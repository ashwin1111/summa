import React from 'react'
import { useState } from 'react'
import { Form, Input } from 'antd';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const HomeForm = () => {
  const [loginActive, setLoginActive] = useState(true);

  return (
    <div className="h-max m-4 glass rounded-lg border-2 shadow-md p-4" style={{boxShadow: "0 0 0 0 #000000"}}>
            <div className="flex justify-center py-4">
              <div className="grid grid-cols-2 text-[0.8rem] bg-gray-300 rounded-lg font-semibold cursor-pointer">
                <div
                  className={`px-4 py-2 text-center ${
                    loginActive ? "bg-[#141736] text-white rounded-l-lg" : ""
                  }`}
                  onClick={() => {
                    setLoginActive(!loginActive);
                  }}
                >
                  Login
                </div>
                <div
                  className={`px-4 py-2 ${
                    !loginActive
                      ? "bg-[#141736] text-white rounded-r-lg"
                      : "text-black"
                  }`}
                  onClick={() => {
                    setLoginActive(!loginActive);
                  }}
                >
                  Register
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center">
              {loginActive ? (
                <LoginForm/>
              ):(
                <RegisterForm/>
              )}
            </div>
          </div>
  )
}

export default HomeForm
