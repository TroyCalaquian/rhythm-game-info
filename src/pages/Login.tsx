import React, { useState } from "react";
import supabase from "../helper/supabaseClient";
import { Form, Input, Button } from "@heroui/react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      setMessage(error.message);
      return;
    }

    if (data) {
      navigate("/dashboard");
      return null;
    }

    setEmail("");
    setPassword("");
  };

  return (
    <>
      <h2 className="text-xl font-semibold">Log in</h2>
      <br />
      {message && <span className="text-sm text-red-500">{message}</span>}

      <Form className="w-full max-w-xs flex flex-col gap-4" onSubmit={onSubmit}>
        <Input
          isRequired
          errorMessage="Please enter a valid email"
          name="email"
          placeholder="Enter your email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          isRequired
          errorMessage="Please enter a valid password"
          name="password"
          placeholder="Enter your password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="flex gap-2">
          <Button color="primary" type="submit">
            Log in
          </Button>
        </div>
      </Form>
    </>
  );
}

export default Login;
