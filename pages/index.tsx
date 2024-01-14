import React from "react";
import { useRouter } from "next/router";
import * as Tabs from "@radix-ui/react-tabs";

const TabsDemo = () => {
  const router = useRouter();
  const initialTab = router.query.tab as string;
  const [activeTab, setActiveTab] = React.useState(initialTab || "tab0");

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
      defaultValue="tab0"
      onValueChange={handleTabChange}
      className="border max-w-5xl"
    >
      <Tabs.List className="flex items-center divide-x divide-white border-b border-white">
        <Tabs.Trigger
          className="bg-slate-200 px-4 grow p-2 data-[state=active]:bg-blue-200"
          value="tab0"
        >
          Delegated validators
        </Tabs.Trigger>
        <Tabs.Trigger
          className="bg-slate-200 grow px-4 p-2 data-[state=active]:bg-blue-200"
          value="tab1"
        >
          Validators in era
        </Tabs.Trigger>
        <Tabs.Trigger
          className="bg-slate-200 grow px-4 p-2 data-[state=active]:bg-blue-200"
          value="tab2"
        >
          Bonded
        </Tabs.Trigger>
        <Tabs.Trigger
          className="bg-slate-200 grow px-4 p-2 data-[state=active]:bg-blue-200"
          value="tab3"
        >
          Changes of bonded
        </Tabs.Trigger>
        <Tabs.Trigger
          className="bg-slate-200 grow px-4 p-2 data-[state=active]:bg-blue-200"
          value="tab4"
        >
          Reward
        </Tabs.Trigger>
      </Tabs.List>


      <Tabs.Content className="bg-green-100 px-4 p-2" value="tab0">
        Tab 1 content
      </Tabs.Content>
      <Tabs.Content className="bg-yellow-100 px-4 p-2" value="tab1">
        Tab 2 content
      </Tabs.Content>
      <Tabs.Content className="bg-blue-100 px-4 p-2" value="tab2">
        Tab 3 content
      </Tabs.Content>
      <Tabs.Content className="bg-red-100 px-4 p-2" value="tab3">
        Tab 3 content
      </Tabs.Content>
      <Tabs.Content className="bg-gray-100 px-4 p-2" value="tab4">
        Tab 3 content
      </Tabs.Content>
    </Tabs.Root>
  );
};

export default function Home() {
  return (
    <div className="bg-white h-full p-2">
      <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Test project for @polkadot/api</span>
      </h1>
      <h5 id="drawer-left-label" className="inline-flex items-center mb-4 text-base font-semibold text-gray-500 dark:text-gray-400">
        <svg className="w-4 h-4 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
        </svg>
        Connected to <span className="bg-blue-100 font-semibold me-2 px-2.5 py-0.5 ms-2">wss://rpc.polkadot.io</span>
      </h5>
      <TabsDemo />
    </div>
  );
}
