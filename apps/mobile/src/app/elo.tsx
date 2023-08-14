import { useState } from "react";
import {
  Alert,
  Button,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useRouter } from "expo-router";
import { SignedIn, SignedOut } from "@clerk/clerk-expo";
import { FlashList } from "@shopify/flash-list";

import { api } from "~/utils/api";
import type { RouterOutputs } from "~/utils/api";

function PostCard(props: {
  post: RouterOutputs["transaction"]["all"][number];
  onDelete: () => void;
}) {
  const router = useRouter();

  return (
    <View className="flex flex-row rounded-lg bg-white/10 p-4">
      <View className="flex-grow">
        <TouchableOpacity onPress={() => router.push(`/post/${props.post.id}`)}>
          <Text className="text-xl font-semibold text-pink-400">
            {props.post.title}
          </Text>
          <Text className="mt-2 text-white">{props.post.amount}</Text>
        </TouchableOpacity>
      </View>
      <SignedIn>
        <Text>You are Signed in</Text>
      </SignedIn>
      <SignedOut>
        <Text>You are Signed out</Text>
      </SignedOut>
      <TouchableOpacity onPress={props.onDelete}>
        <Text className="font-bold uppercase text-pink-400">Delete</Text>
      </TouchableOpacity>
    </View>
  );
}

function CreatePost() {
  const utils = api.useContext();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState(0);

  const { mutate, error } = api.transaction.create.useMutation({
    async onSuccess() {
      setTitle("");
      setContent(0);
      await utils.transaction.all.invalidate();
    },
  });

  return (
    <View className="mt-4">
      <TextInput
        className="mb-2 rounded bg-white/10 p-2 text-white"
        placeholderTextColor="rgba(255, 255, 255, 0.5)"
        value={title}
        onChangeText={setTitle}
        placeholder="Title"
      />
      {error?.data?.zodError?.fieldErrors.title && (
        <Text className="mb-2 text-red-500">
          {error.data.zodError.fieldErrors.title}
        </Text>
      )}
      <TextInput
        className="mb-2 rounded bg-white/10 p-2 text-white"
        placeholderTextColor="rgba(255, 255, 255, 0.5)"
        value={content.toString()}
        keyboardType="numeric"
        onChangeText={(value) => setContent(Number(value))}
        placeholder="Content"
      />
      {error?.data?.zodError?.fieldErrors.content && (
        <Text className="mb-2 text-red-500">
          {error.data.zodError.fieldErrors.content}
        </Text>
      )}
      <TouchableOpacity
        className="rounded bg-pink-400 p-2"
        onPress={() => {
          mutate({
            title: title,
            amount: content,
            recipientClerkUserId: "1",
          });
        }}
      >
        <Text className="font-semibold text-white">Publish post</Text>
      </TouchableOpacity>
    </View>
  );
}

const Index = () => {
  const utils = api.useContext();

  const postQuery = api.transaction.allNot.useQuery();

  return (
    <SafeAreaView className="bg-[#4c5218]">
      <Stack.Screen options={{ title: "Bank Page" }} />

      <View className="h-full w-full p-4">
        <Text className="mx-auto pb-2 text-5xl font-bold text-white">
          The <Text className="text-pink-400">Bank</Text> Brew
        </Text>

        <Button
          onPress={() => void utils.transaction.all.invalidate()}
          title="Refresh posts"
          color={"#f472b6"}
        />

        <View className="py-2">
          <Text className="font-semibold italic text-white">
            Press on a post
          </Text>
        </View>

        <FlashList
          data={postQuery.data}
          estimatedItemSize={20}
          ItemSeparatorComponent={() => <View className="h-2" />}
          renderItem={(p) => (
            <PostCard
              post={p.item}
              onDelete={() => Alert.alert(p.item.title ?? "")}
            />
          )}
        />

        <CreatePost />
      </View>
    </SafeAreaView>
  );
};

export default Index;
