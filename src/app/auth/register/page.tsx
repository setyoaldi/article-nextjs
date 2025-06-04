"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-md">
        <div className="flex justify-center mb-6">
          <Image src="/logoipsum-biru.png" alt="Logo" width={140} height={40} />
        </div>

        <form className="space-y-4">
          <div>
            <label className="block text-sm ">Username</label>
            <Input placeholder="Input username" className="mt-1" />
          </div>

          <div className="relative">
            <label className="block text-sm ">Password</label>
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Input password"
              className="mt-1 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-muted-foreground"
            >
              {mounted &&
                (showPassword ? <EyeOff size={18} /> : <Eye size={18} />)}
            </button>
          </div>

          <div>
            <label className="block text-sm ">Role</label>
            <select className="mt-1 w-full rounded-md border px-3 py-2 text-sm">
              <option>Select Role</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>

          <Button
            type="submit"
            className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white"
          >
            Register
          </Button>

          <p className="text-center text-sm mt-2 text-neutral-600">
            Already have an account?{" "}
            <a href="/auth/login" className="text-blue-600 hover:underline">
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
