import React, { useState } from "react";
import { Form, Input } from "@heroui/react";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  return (
    <>
      <h2>Register</h2>
      <Form>
        <Input>
            
        </Input>
      </Form>
    </>
  );
}

export default Register;
