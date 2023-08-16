import { Suspense } from "react";
import { SignInButton, UserButton } from "@clerk/nextjs";

import { CreatePostForm, PostList } from "./posts";
import { Test } from "./test";

export default function HomePage() {
  return (
    <main className="flex h-screen flex-col items-center bg-gradient-to-b from-[#57a339] to-[#3e4395] text-white">
      <div className="container mt-12 flex flex-col items-center justify-center gap-4 px-4 py-8">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          The <span className="text-pink-400">Bank</span> Brew
        </h1>

        <div>
          <Test />
          <UserButton afterSignOutUrl="/" />
          <SignInButton />
        </div>

        <CreatePostForm />

        <Suspense fallback={<span className="animate-bounce">Loading...</span>}>
          <PostList />
        </Suspense>
      </div>
    </main>
  );
}
