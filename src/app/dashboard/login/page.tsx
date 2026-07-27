"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Crown, Lock, Mail, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-charcoal flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full gradient-gold flex items-center justify-center mx-auto mb-4 shadow-xl shadow-gold/30">
            <Crown className="w-8 h-8 text-white" />
          </div>
          <h1 className="font-serif text-2xl font-bold text-white">
            Royal Palace Marquee
          </h1>
          <p className="text-gray-400 text-sm mt-2">Owner Dashboard Login</p>
        </div>

        <Card className="border-0 shadow-2xl">
          <CardContent className="p-8">
            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gold" />
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@royalpalace.pk"
                  defaultValue="admin@royalpalace.pk"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-gold" />
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    defaultValue="demo1234"
                    className="pr-10"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-charcoal cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <Button type="submit" size="lg" className="w-full">
                Sign In to Dashboard
              </Button>

              <p className="text-center text-xs text-gray-400">
                Demo credentials are pre-filled. Just click Sign In.
              </p>
            </form>
          </CardContent>
        </Card>

        <p className="text-center text-gray-500 text-xs mt-6">
          &copy; 2026 Royal Palace Marquee. Admin Portal.
        </p>
      </motion.div>
    </div>
  );
}
