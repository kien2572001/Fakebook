import React from "react";
import MainLayout from "~/components/layouts/MainLayout";
import Group from "~/components/Group";
import ListPost from "~/components/layouts/ListPost";

export default function GroupPage() {
  return (
    <MainLayout>
        <div className="flex laptop:flex-row flex-col">
        <Group />
        <ListPost />
        </div>
    </MainLayout>
  );
}