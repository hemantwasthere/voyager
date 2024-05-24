import { NextPage } from "next";

import TransactionsTable from "@/components/TransactionsTable";

const Home: NextPage = () => {
  return (
    <main className="bg-[#121212] px-4 py-10">
      <div className="rounded-md bg-[#1b1b1b] text-white p-8 min-h-screen w-full mx-auto max-w-7xl h-full">
        <h1 className="text-2xl text-white font-normal align-baseline">
          Transactions
        </h1>
        <p className="mt-2 text-sm font-light text-[#cacaca] leading-[1.4]">
          A list of transactions on starknet
        </p>

        <div className="mt-8">
          <TransactionsTable />
        </div>
      </div>
    </main>
  );
};

export default Home;
