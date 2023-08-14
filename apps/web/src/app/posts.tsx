"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";

import { api } from "~/utils/api";
import type { RouterOutputs } from "~/utils/api";

export function CreatePostForm() {
  const context = api.useContext();

  const { user } = useUser();

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState(0);

  const [recipientClerkUserId, setRecipientClerkUserId] = useState<
    string | null
  >(null);

  const { mutateAsync: createPost, error } = api.transaction.create.useMutation(
    {
      async onSuccess() {
        setTitle("");
        setAmount(0);

        await context.transaction.all.invalidate();
      },
    },
  );

  const { data } = api.user.users.useQuery();

  return (
    <form
      className="flex w-full max-w-2xl flex-col p-4"
      onSubmit={async (e) => {
        e.preventDefault();

        if (!recipientClerkUserId) {
          alert("Please select a recipient");
          return;
        }

        await createPost({
          title,
          amount,
          recipientClerkUserId,
        });

        setTitle("");
        setAmount(0);
        await context.transaction.all.invalidate();
      }}
    >
      <p>Send money to: {recipientClerkUserId}</p>
      <select
        className="bg-pink-700"
        value={recipientClerkUserId ?? "Please select"}
        placeholder="Recipient"
        onChange={(event) => {
          setRecipientClerkUserId(event.target.value);
        }}
      >
        {data
          ?.filter((u) => u.id !== user?.id)
          .map((user) => (
            <option key={user.id} value={user.id}>
              {user.id} ={user.emailAddresses?.[0]?.emailAddress}
            </option>
          ))}
      </select>
      <input
        className="mb-2 rounded bg-white/10 p-2 text-white"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      {error?.data?.zodError?.fieldErrors.title && (
        <span className="mb-2 text-red-500">
          {error.data.zodError.fieldErrors.title}
        </span>
      )}
      <input
        className="mb-2 rounded bg-white/10 p-2 text-white"
        value={amount}
        type="number"
        onChange={(e) => setAmount(Number(e.target.value))}
        placeholder="Amount"
      />
      {error?.data?.zodError?.fieldErrors.content && (
        <span className="mb-2 text-red-500">
          {error.data.zodError.fieldErrors.content}
        </span>
      )}
      <button type="submit" className="rounded bg-pink-400 p-2 font-bold">
        Create
      </button>
    </form>
  );
}

export function PostList() {
  const { data } = api.transaction.all.useQuery();

  return (
    <div className="w-full max-w-2xl">
      {data?.length === 0 ? (
        <span>There are no transactions!</span>
      ) : (
        <div className="flex h-[40vh] justify-center overflow-y-scroll px-4 text-2xl">
          <div className="flex w-full flex-col gap-4">
            {data?.map((p) => {
              return <PostCard key={p.id} post={p} />;
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function PostCard(props: {
  post: RouterOutputs["transaction"]["all"][number];
}) {
  // const context = api.useContext();

  return (
    <div className="flex flex-row rounded-lg bg-white/10 p-4 transition-all hover:scale-[101%]">
      <div className="flex-grow">
        <h2 className="text-2xl font-bold text-pink-400">{props.post.title}</h2>
        <p className="mt-2 text-sm">UID: {props.post.id}</p>
        <p className="mt-2 text-sm">Amount: {props.post.amount}</p>
        <p className="mt-2 text-sm">From: {props.post.senderClerkUserId}</p>
        <p className="mt-2 text-sm">To: {props.post.recipientClerkUserId}</p>
      </div>
      <div>
        <button
          className="cursor-pointer text-sm font-bold uppercase text-pink-400"
          // onClick={async () => {
          //   await deletePost.mutateAsync(props.post.id);
          //   await context.post.all.invalidate();
          // }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
