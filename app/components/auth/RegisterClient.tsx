"use client"
import { useForm, SubmitHandler, FieldValues } from "react-hook-form"
import { FaGoogle } from 'react-icons/fa'
import AuthContainer from "../containers/AuthContainer"
import Button from "../general/Button"
import Heading from "../general/Headaing"
import Input from "../general/Input"
import Link from "next/link"
import axios from "axios"
import toast from "react-hot-toast"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { User } from "@prisma/client"
import { useEffect, useState } from "react"

interface RegisterClientProps {
  currentUser: User | null | undefined
}

const RegisterClient: React.FC<RegisterClientProps> = ({ currentUser }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setLoading(true);
    try {
      await axios.post('/api/register', data);
      toast.success('Kullanıcı Oluşturuldu...');
      
      const callback = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false
      });

      if (callback?.ok) {
        router.push('/cart');
        router.refresh();
        toast.success('Login İşlemi Başarılı...');
      } else if (callback?.error) {
        toast.error(callback.error);
      }
    } catch (error) {
      console.error('Kayıt işlemi sırasında bir hata oluştu:', error);
      toast.error('Kayıt işlemi sırasında bir hata oluştu!');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (currentUser) {
      router.push('/cart');
      router.refresh();
    }
  }, [currentUser, router]);

  return (
    <AuthContainer>
      <div className="w-full md:w-[500px] p-3 shadow-lg rounded-md">
        <Heading text="Register" center />
        <Input placeholder="Ad" type="text" id="name" register={register} errors={errors} required />
        <Input placeholder="Email" type="email" id="email" register={register} errors={errors} required />
        <Input placeholder="Parola" type="password" id="password" register={register} errors={errors} required />
        <Button text={loading ? "Yükleniyor..." : "Kayıt Ol"} onClick={handleSubmit(onSubmit)} disabled={loading} />
        
        <div className="text-center my-2 text-sm text-red-500">
          Daha Önceden Kayıt Olduysan <Link className="underline" href="/login">buraya tıkla</Link>
        </div>

        <div className="text-center my-2 font-bold text-lg">OR</div>
        <Button text="Google İle Üye Ol" icon={FaGoogle} outline onClick={() => signIn('google')} />
      </div>
    </AuthContainer>
  );
}

export default RegisterClient;
