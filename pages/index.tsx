import React from "react";
import { useRouter } from "next/router";
import * as Tabs from "@radix-ui/react-tabs";

const TabsDemo = () => {
  const router = useRouter();
  const initialTab = router.query.tab as string;
  const [activeTab, setActiveTab] = React.useState(initialTab || "tab1");

  const handleTabChange = (value: string) => {
    //update the state
    setActiveTab(value);
    // update the URL query parameter
    router.push({ query: { tab: value } });
  };

  // if the query parameter changes, update the state
  React.useEffect(() => {
    setActiveTab(router.query.tab as string);
  }, [router.query.tab]);

  return (
    <Tabs.Root
      value={activeTab}
      defaultValue="tab1"
      onValueChange={handleTabChange}
      className="border max-w-5xl"
    >
      <Tabs.List className="flex items-center divide-x divide-white border-b border-white">
        <Tabs.Trigger
          className="bg-slate-200 px-4 grow p-2 data-[state=active]:bg-blue-200"
          value="tab1"
        >
          Delegated validators
        </Tabs.Trigger>
        <Tabs.Trigger
          className="bg-slate-200 grow px-4 p-2 data-[state=active]:bg-blue-200"
          value="tab2"
        >
          Validators in era
        </Tabs.Trigger>
        <Tabs.Trigger
          className="bg-slate-200 grow px-4 p-2 data-[state=active]:bg-blue-200"
          value="tab3"
        >
          Bonded
        </Tabs.Trigger>
        <Tabs.Trigger
          className="bg-slate-200 grow px-4 p-2 data-[state=active]:bg-blue-200"
          value="tab4"
        >
          Changes of bonded
        </Tabs.Trigger>
        <Tabs.Trigger
          className="bg-slate-200 grow px-4 p-2 data-[state=active]:bg-blue-200"
          value="tab5"
        >
          Reward
        </Tabs.Trigger>
      </Tabs.List>


      <Tabs.Content className="bg-green-100 px-4 p-2" value="tab1">
        Tab 1 content
      </Tabs.Content>
      <Tabs.Content className="bg-yellow-100 px-4 p-2" value="tab2">
        Tab 2 content
      </Tabs.Content>
      <Tabs.Content className="bg-blue-100 px-4 p-2" value="tab3">
        Tab 3 content
      </Tabs.Content>
      <Tabs.Content className="bg-red-100 px-4 p-2" value="tab4">
        Tab 3 content
      </Tabs.Content>
      <Tabs.Content className="bg-gray-100 px-4 p-2" value="tab5">
        Tab 3 content
      </Tabs.Content>
    </Tabs.Root>
  );
};

export default function Home() {
  return (
    <div className="bg-white h-screen">
      <h2>Test project for @polkadot/api</h2>
      <TabsDemo />
    </div>
  );
}
