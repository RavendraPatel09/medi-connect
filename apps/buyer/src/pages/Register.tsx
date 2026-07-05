import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input, Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@medicycle/ui";
import { Pill, Mail, Lock, User } from "lucide-react";
import { motion } from "framer-motion";
import { useRegister } from "@medicycle/hooks";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const registerMutation = useRegister();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    registerMutation.mutate(
      { full_name: name, email, password, role: "buyer" },
      {
        onSuccess: () => {
          navigate("/dashboard");
        },
      }
    );
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
                  placeholder="John Doe" 
                  leftIcon={<User size={16} />}
                  value={name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Input 
                  type="email" 
                  placeholder="john@example.com" 
                  leftIcon={<Mail size={16} />}
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Input 
                  type="password" 
                  placeholder="••••••••" 
                  leftIcon={<Lock size={16} />}
                  value={password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button 
                type="submit" 
                className="w-full mt-6" 
                variant="primary" 
                disabled={registerMutation.isPending}
              >
                {registerMutation.isPending ? "Creating account..." : "Create Account"}
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
