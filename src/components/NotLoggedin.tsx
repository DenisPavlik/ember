'use client'

import { signIn } from "next-auth/react";

export default function NotLoggedin() {
  return (
    <div className="text-center my-56 text-xl leading-8">
        You are not logged in. <br />
        Press{" "}
        <button className="text-gray-600 underline" onClick={() => signIn("google")}>here</button>
        {" "}for login.
      </div>
  )
}