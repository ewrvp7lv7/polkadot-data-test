import React from "react";
import { useRouter } from "next/router";
import * as Tabs from "@radix-ui/react-tabs";
import Layout from '../components/layout';
// import Contact from '../components/form';

const TabsDemo = () => {
  const router = useRouter();
  const initialTab = router.query.tab;
  const [activeTab, setActiveTab] = React.useState(initialTab || "tab1");

  const handleTabChange = (value) => {
    //update the state
    setActiveTab(value);
    // update the URL query parameter
    router.push({ query: { tab: value } });
  };

  // if the query parameter changes, update the state
  React.useEffect(() => {
    setActiveTab(router.query.tab);
  }, [router.query.tab]);

  return (
    <Tabs.Root
      value={activeTab}
      defaultValue="tab1"
      onValueChange={handleTabChange}
      className="border max-w-md"
    >
      <Tabs.List className=" hite">
        <Tabs.Trigger
          className="button data-[state=active]:bg-blue"
          value="tab1"
        >
         Tab 1
        </Tabs.Trigger>
        <Tabs.Trigger
          className="button data-[state=active]:bg-blue"
          value="tab2"
        >
          Tab 2
        </Tabs.Trigger>
        <Tabs.Trigger
          className="button data-[state=active]:bg-blue"
          value="tab3"
        >
          Tab 3
        </Tabs.Trigger>
      </Tabs.List>

      <Tabs.Content className="bg-green-100 px-4 p-2" value="tab1">
      <Layout> Tab 1 content </Layout>
      </Tabs.Content>
      <Tabs.Content className="bg-yellow-100 px-4 p-2" value="tab2">
      Tab 2 content
      </Tabs.Content>
      <Tabs.Content className="bg-red-100 px-4 p-2" value="tab3">
        Tab 3 content
      </Tabs.Content>
    </Tabs.Root>

    
  );
};

export default function Home() {
  return (
    <div className="bg-white h-screen">
      <TabsDemo />
    </div>
  );
}
