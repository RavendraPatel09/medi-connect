import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input, Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@medicycle/ui";
import { Pill, Mail, Lock, User } from "lucide-react";
import { motion } from "framer-motion";

const Register = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4 relative overflow-hidden">
      <div className="absolute top-1/3 right-1/4 h-96 w-96 rounded-full bg-success/20 blur-[120px]" />
      <div className="absolute bottom-1/3 left-1/4 h-96 w-96 rounded-full bg-primary/20 blur-[120px]" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="z-10 w-full max-w-md"
      >
        <Card glass className="border-white/10 p-8 shadow-glass">
          <CardHeader className="text-center pb-6">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-success to-primary shadow-glow-success">
              <Pill className="text-white" size={28} />
            </div>
            <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
            <CardDescription>Join MediCycle to buy and sell medicines securely</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="text"
                  placeholder="Full Name"
                  leftIcon={<User size={18} />}
                  required
                />
              </div>
              <div className="space-y-2">
                <Input
                  type="email"
                  placeholder="Email address"
                  leftIcon={<Mail size={18} />}
                  required
                />
              </div>
              <div className="space-y-2">
                <Input
                  type="password"
                  placeholder="Password"
                  leftIcon={<Lock size={18} />}
                  required
                />
              </div>
              <Button type="submit" className="w-full mt-6" variant="primary" isLoading={isLoading}>
                Create Account
              </Button>
            </form>
          </CardContent>
          <CardFooter className="justify-center pt-6 text-sm text-gray-400">
            Already have an account?{" "}
            <Link to="/login" className="ml-1 font-medium text-success hover:text-success-hover transition-colors">
              Log in
            </Link>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default Register;
