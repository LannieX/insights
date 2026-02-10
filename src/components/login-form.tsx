"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation"; 
import { useState } from "react";
import { message } from "antd";
import { signIn } from "next-auth/react"; 
import { toast } from "sonner";

const ERROR_LOGIN: Record<string, string> = {
  CredentialsSignin: "อีเมลหรือรหัสผ่านไม่ถูกต้อง",
  Default: "เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ",
};

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        redirect: false,
        username,
        password,
      });

      if (result?.error) {
        console.error("Login Failed:", result.error);
        toast.error("อีเมลหรือรหัสผ่านไม่ถูกต้อง"); 
        
        setLoading(false);
        return;
      }

      if (result?.ok) {
        toast.success("เข้าสู่ระบบสำเร็จ");
        router.push("/main/overview");
        router.refresh();
      }

    } catch (error) {
      toast.error("เกิดข้อผิดพลาดในการเชื่อมต่อ");
      setLoading(false);
    }
  };

return (
    <form 
      onSubmit={onSubmit} 
      className={cn("flex flex-col gap-6", className)} 
      {...props}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Login to your account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter your username below to login to your account
          </p>
        </div>
        
        <Field>
          <FieldLabel htmlFor="username">username</FieldLabel>
          <Input 
            id="username"  
            required 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={loading}
          />
        </Field>
        <Field>
          <div className="flex items-center">
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
          <Input 
            id="password" 
            type="password" 
            required 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
        </Field>
        <Field>
          <Button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>
        </Field>
        <FieldSeparator>Or continue with</FieldSeparator>
        <Field>
          <FieldDescription className="text-center">
            Don&apos;t have an account?{" "}
            <a href="#" className="underline underline-offset-4">
              Sign up
            </a>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
