import React from "react";
import Layout from "../components/layout";
import Loans_table from "../components/loanstable/Loanstable"

const Loans = () => {
  return (
    <Layout>
      {/* <div className="flex justify-center font-bold mt-80 text-xl text-[rgb(245,132,38,0.93)]"> */}
      <div className="flex w-full flex-col h-full ">
        <h1 className="font-bold text-2xl  mx-1.5 mb-3">LOAN PRODUCTS</h1>
        <div className="h-full ">
        < Loans_table/>
        </div>
      </div>
    </Layout>
  );
};

export default Loans;
