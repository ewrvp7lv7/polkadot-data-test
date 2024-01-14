import React from "react";
import { TabsDemo } from '../components/tabs';
import { activeEra } from '../components/substrate';

export default function Home() {
  const [activeEraState, setActiveEraState] = React.useState(0);

  React.useEffect(() => {
    (async () => {
      setActiveEraState(await activeEra());
      console.debug(`State updated`);
    })()
  }, []);

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
        Current era: <span className="bg-blue-100 font-semibold me-2 px-2.5 py-0.5 ms-2">{activeEraState}</span>
      </h5>
      <TabsDemo />
    </div>
  );
}
