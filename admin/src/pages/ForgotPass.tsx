import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z
  .object({
    email: z.string().email({
      message: "Invalid email address",
    }),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters long",
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof formSchema>;

const ForgotPass = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [steps, setSteps] = useState(1);
  const [loading, setLoading] = useState(false);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    setLoading(true);
    try {
      toast({
        title: "Account created",
        description: "You have successfully created an account",
      });
      form.reset();
      navigate("/login");
    } catch (error: any) {
      toast({
        title: "An error occurred",
        description: error.response.data,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const stepsValidation = async () => {
    const stepFields: any = {
      1: ["email"],
      2: ["password", "confirmPassword"],
    };

    const fieldsToValidate = stepFields[steps] || [];
    const result = await form.trigger(fieldsToValidate);

    if (result) {
      setSteps(steps + 1);
    } else {
      toast({
        title: "Fill in the required fields",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <div className="flex w-full h-screen items-center justify-center bg-gray-100">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-[400px] space-y-2 max-h-[900px]"
        >
          <div className="mb-6 w-full space-y-2">
            <h1 className="text-center font-semibold text-3xl  text-black">
             Please confirm your email{" "}
            </h1>
            <p className="text-center text-gray-500 text-sm">
              {steps === 1
                ? "Let's start with your name, email and password"
                : "Now we need some more information"}
            </p>
            <Progress value={steps === 1 ? 0 : loading ? 100 : 100} />
          </div>

          {steps === 1 && (
            <>
              <FormField
                disabled={loading}
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          {steps === 2 && (
            <>
              <FormField
                disabled={loading}
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                disabled={loading}
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          {steps === 1 && (
            <div>
              <Button
                onClick={() => {
                  stepsValidation();
                }}
              >
                Next
              </Button>
            </div>
          )}
          {steps === 2 && (
            <div className="flex justify-between w-full gap-5 ">
              <Button
                variant={"secondary"}
                disabled={loading}
                onClick={() => {
                  setSteps(1);
                }}
              >
                Back
              </Button>
              <Button disabled={loading} className="w-full" type="submit">
                {loading ? (
                  <div className="dotFlashing"></div>
                ) : (
                  <p>Reset Password"</p>
                )}
              </Button>
            </div>
          )}
        </form>
      </div>
    </Form>
  );
};

export default ForgotPass;
