"use client";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import toast from "react-hot-toast";

import AuthContainer from "../containers/AuthContainer";
import Heading from "../general/Headaing"; 
import Input from "../general/Input";
import Button from "../general/Button";
import { User } from "next-auth";

interface LoginClientProps {
  currentUser: User | null | undefined;
}
const LoginClient :React.FC<LoginClientProps>= ({currentUser}) => {
   const router = useRouter();
  const { data: session } = useSession();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback) => {
      if (callback?.ok) {
        router.push("/cart");
        toast.success("Login işlemi başarılı...");
      }

      if (callback?.error) {
        toast.error(callback.error);
      }
    });
  };

  useEffect(() => {
    if (session?.user) {
      router.push("/cart");
    }
  }, [session]);

useEffect(() => {
  if (currentUser) {
    router.push("/cart");
  }
}, [currentUser]);

  return (
    <AuthContainer>
      <div className="w-full md:w-[500px] p-3 shadow-lg rounded-md">
        <Heading text="Login" center />
        <Input
          placeholder="Email"
          type="text"
          id="email"
          register={register}
          errors={errors}
          required
        />
        <Input
          placeholder="Parola"
          type="password"
          id="password"
          register={register}
          errors={errors}
          required
        />

        <Button text="Giriş Yap" onClick={handleSubmit(onSubmit)} />

        <div className="text-center my-2 text-sm text-red-500">
          Daha Önceden Kayıt Olmadıysan{" "}
          <Link className="underline" href="/register">
            Buraya Tıkla
          </Link>
        </div>

        <div className="text-center my-2 font-bold text-lg">OR</div>

        <Button text="Google İle Giriş Yap" icon={FaGoogle} outline onClick={() => signIn("google")} />
      </div>
    </AuthContainer>
  );
};

export default LoginClient;
