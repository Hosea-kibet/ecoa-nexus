import {signIn, useSession} from "next-auth/react";
import {useEffect} from "react";
import {useRouter} from "next/router";
import Image from 'next/image';

function Login() {
    const router = useRouter();
    const { status } = useSession();
    useEffect  (() => {
        if (status === "authenticated") {
            void router.push("/");
        }
    }, [status]);
    return (
        <div className="w-screen h-screen relative flex flex-col justify-end font-['Noto_Sans']">
            <div className="absolute -z-50 inset h-full w-full bg-hero bg-center bg-cover" />
            <div className="absolute -z-40 h-full w-full inset bg-gradient-to-r from-[rgba(4,21,43,1)] to-[rgba(245,132,38,0)]" />
            <div className="h-full flex flex-col justify-between lg:w-max lg:ml-24">
                <div className="flex flex-col gap-10 flex-1 justify-center items-center">
                    <div className="h-24 w-56 bg-elec bg-contain no-repeat bg-center" />
                    <h1 className="text-[46px] font-bold text-white">Sign In</h1>
                    <div className="p-4 bg-white w-max rounded-3xl lg:p-8">
                        <a 
                            href={`/api/auth/signin`}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                signIn("azure-ad");
                                            }}
                            className="bg-white px-4 py-2 lg:px-8  text-[21px] font-semibold text-black flex items-center w-max border rounded-xl">
                            <span className="h-[33.46px] w-[33.46px] inline-block mr-2 [background:url(https://uortjlczjmucmpaqqhqm.supabase.co/storage/v1/object/public/firejet-converted-images/12534/3a3a39147e4c947ae91d35cf450e9037d1c8cefc:0.webp)_no-repeat_center_/_contain]" />
                            Microsoft Account Login
                        </a>
                    </div>
                </div>
                <p className="block z-10 font-normal text-white mb-10 text-center">
                    By clicking ‘sign in’ I accept the Ecoa Nexus
                    &nbsp;<span className="font-bold text-[rgba(245,132,38,1)]">Terms of Service</span> and
                    &nbsp;<span className="font-bold text-[rgba(245,132,38,1)]">privacy Notice</span>
                </p>
            </div>
            
        </div>

    )
}

export default Login;
