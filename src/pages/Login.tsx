import React, { useState } from "react";
import supabase from "../helper/supabaseClient";
import { Form, Input, Button, Card, CardHeader, CardBody, CardFooter, Divider } from "@heroui/react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");
    setLoading(true);

    try {
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
    } catch (err) {
      setMessage("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }

    setEmail("");
    setPassword("");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <Card className="border-none shadow-lg">
          <CardHeader className="text-center pb-0">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Admin Login</h2>
            <p className="text-gray-600 mt-2">Sign in to access the admin dashboard</p>
          </CardHeader>
          
          <CardBody className="p-6">
            {message && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{message}</p>
              </div>
            )}

            <Form className="space-y-4" onSubmit={onSubmit}>
              <Input
                isRequired
                label="Email Address"
                name="email"
                placeholder="Enter your email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                variant="bordered"
                size="lg"
                startContent={
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                }
              />

              <Input
                isRequired
                label="Password"
                name="password"
                placeholder="Enter your password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                variant="bordered"
                size="lg"
                startContent={
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                }
              />

              <Button 
                color="primary" 
                type="submit" 
                className="w-full font-semibold"
                size="lg"
                isLoading={loading}
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign In"}
              </Button>
            </Form>
          </CardBody>

          <CardFooter className="pt-0">
            <div className="w-full text-center">
              <p className="text-sm text-gray-600">
                Admin access only. Contact administrator for credentials.
              </p>
            </div>
          </CardFooter>
        </Card>

        <div className="mt-6 text-center">
          <Button 
            color="default" 
            variant="flat" 
            size="sm"
            onPress={() => navigate("/")}
          >
            ← Back to Song Database
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Login;
