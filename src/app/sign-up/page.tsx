"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import toast, { Toaster } from "react-hot-toast";
import { SignUpSchema, SignUpType } from "@/schemas/user.schema";
import { signUpAction } from "@/actions/user.actions";

export default function SignUpPage() {
  const router = useRouter();
  const handleSubmit = async (formData: FormData) => {
    const userData = Object.fromEntries(formData);
    const validatedUserData = SignUpSchema.safeParse(userData);

    if (!validatedUserData.success) {
      const errors = validatedUserData.error.issues;
      toast.dismiss();
      toast.error(errors[0].message);
    } else {
      const res = await signUpAction(validatedUserData.data);

      if (!res.success) {
        toast.dismiss();
        toast.error(res.message);
      } else {
        toast.dismiss();
        router.push("/sign-in");
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-[100vh]">
      <Toaster />
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Blog404</CardTitle>
          <CardDescription>Create an account to start blogging</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={handleSubmit}>
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="firstname">First name</Label>
                  <Input id="firstname" name="firstname" placeholder="Max" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="lastname">Last name</Label>
                  <Input id="lastname" name="lastname" placeholder="Robinson" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input id="username" name="username" placeholder="max123" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="text"
                  placeholder="m@example.com"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="password"
                />
              </div>
            </div>

            <div className="mt-4 text-center text-sm">
              <Button type="submit" className="w-full mb-2">
                Create an account
              </Button>
              Already have an account?{" "}
              <Link href="/sign-in" className="underline">
                Sign in
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
