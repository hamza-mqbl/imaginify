import Header from "@/components/shared/Header";
import React from "react";
import { transformationTypes } from "@/constants";
import TransformationForm from "@/components/shared/TransformationForm";
import { auth } from "@clerk/nextjs/server";
import { getUserById } from "@/lib/actions/user.action";
import { redirect } from "next/navigation";
const AddTransformationTypePage = async ({
  params: { type },
}: SearchParamProps) => {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");
  const user = await getUserById(userId);
  console.log("🚀 ~ user:", user);
  const transformation = transformationTypes[type];
  console.log("🚀 ~ transformation: line no 16", transformation.type);
  return (
    <>
      <Header title={transformation.title} subtitle={transformation.subTitle} />
      <section className=" mt-10">
        <TransformationForm
          action="Add"
          userId={user._id}
          type={transformation.type as TransformationTypeKey}
          creditBalance={user.creditBalance}
        />
      </section>
    </>
  );
};

export default AddTransformationTypePage;
