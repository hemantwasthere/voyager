import { NextPage } from "next";

import TransactionsTable from "@/components/TransactionsTable";

const Home: NextPage = () => {
  return (
    <>
      <h1 className="text-2xl text-white font-normal align-baseline">
        Transactions
      </h1>
      <p className="mt-2 text-sm font-light text-[#cacaca] leading-[1.4]">
        A list of transactions on starknet
      </p>

      <div className="mt-8">
        <TransactionsTable />
      </div>
    </>
  );
};

export default Home;
