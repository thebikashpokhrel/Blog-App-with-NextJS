"use client";
import { signInAction } from "@/actions/user.actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SignInSchema } from "@/schemas/user.schema";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";

export default function SigninPage() {
  const handleSignin = async function (formData: FormData) {
    const userData = Object.fromEntries(formData);
    const validatedUserData = SignInSchema.safeParse(userData);
    if (!validatedUserData.success) {
      const errors = validatedUserData.error.issues;
      toast.dismiss();
      toast.error(errors[0].message);
    } else {
      const res = await signInAction(validatedUserData.data);
      if (!res.success) {
        toast.dismiss();
        toast.error(res.message);
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-[100vh]">
      <Toaster />
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <form action={handleSignin}>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                name="password"
                placeholder="password"
              />
            </div>
            <div className="mt-4 text-center text-sm">
              <Button className="w-full mb-4" type="submit">
                Sign in
              </Button>
              <Link href="/sign-up" className="underline">
                Create a new account
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
