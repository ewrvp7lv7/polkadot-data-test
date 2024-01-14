import React from "react";
import { useRouter } from "next/router";
import * as Tabs from "@radix-ui/react-tabs";
import { AddressForm } from './form';

export const TabsDemo = () => {
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
          Validators in the era
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
          Rewards
        </Tabs.Trigger>
      </Tabs.List>

      <Tabs.Content className="px-4 p-2" value="tab0">
        <AddressForm value="tab0" caption="Validators list which nominator delegated" />
      </Tabs.Content>
      <Tabs.Content className="px-4 p-2" value="tab1">
        <AddressForm value="tab1" caption="Validators which worked in the era by the nominator" />
      </Tabs.Content>
      <Tabs.Content className="px-4 p-2" value="tab2">
        <AddressForm value="tab2" caption="Bonded balances by the nominator (Validator : Value)" />
      </Tabs.Content>
      <Tabs.Content className="px-4 p-2" value="tab3">
        <AddressForm value="tab3" caption="Changes of bonded balances for 5 last eras" />
      </Tabs.Content>
      <Tabs.Content className="px-4 p-2" value="tab4">
        <AddressForm value="tab4" caption="Rewards from validators for the era (Validator : Reward (All rewards))" />
      </Tabs.Content>
    </Tabs.Root>
  );
};
