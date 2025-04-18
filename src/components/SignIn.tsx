"use client"
import { SignIn, useUser } from '@clerk/nextjs'
import React from 'react'
import { dark } from '@clerk/themes'
import { useSearchParams } from 'next/navigation';

const SignInComponant = () => {
    const searchParams = useSearchParams();
    const { user } = useUser();
    const isCheckoutPage = searchParams.get("showSignUp") !== null;
    const courseId = searchParams.get("id");
    const signUpUrl = isCheckoutPage ? `/checkout?step=1&id=${courseId}&showSignUp=true` : "/signup";
    console.log(isCheckoutPage)
    const getRedirectUrl = () => {
        if (isCheckoutPage) {
            return `/checkout?step=2&id=${courseId}`
            
        }
        const userType = user?.publicMetadata?.userType as string;
        if (userType === "teacher") {
            return "/teacher/courses"
        }
        return "/user/courses"
    }
    return <SignIn appearance={{
        layout: {
            unsafe_disableDevelopmentModeWarnings: true,
        },
        elements: {
            formFieldLabel: "text-white-50 font-normal",
            rootBox: "flex justify-center items-center py-5",
            cardBox: "shadow-none ",
            card: "bg-customgreys-secondarybg w-full shadow-none",
            footer: {
                background: "#25262F",
                padding: "0rem 2.5rem",
            },
            formButtonPrimary: "bg-primary-750 text-white-100  hover:bg-primary-700 !shadow-none",
            formFieldInput: "bg-customgreys-primarybg text-white-50 !shadow-none",
            footerActionLink: "text-primary-750 hover:text-primary-700"


        },
        baseTheme: dark,
    }}
        signUpUrl={signUpUrl}
        forceRedirectUrl={getRedirectUrl()}
        afterSignOutUrl={"/"}
        routing='hash'
    />
}

export default SignInComponant
