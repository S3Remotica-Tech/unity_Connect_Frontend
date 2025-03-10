/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';

   

    function Transactions() {


  // useEffect = (() => {
  //   dispatch({ type: 'GETTRANSACTIONS' })
  // }, [])

  const statements = [
    { transactions: "Repayment Apr 2024", dateTime: "16 Apr 2024, 10:00 AM", transactionId: "SBI0056123", amount: "+₹5,000", status: "Success" },
    { transactions: "Repayment Apr 2024", dateTime: "16 May 2024, 11:30 AM", transactionId: "SBI0056123", amount: "-₹4,000", status: "Success" },
    { transactions: "Repayment Apr 2024", dateTime: "16 Jun 2024, 01:00 PM", transactionId: "SBI0056123", amount: "+₹3,000", status: "Success" },
    { transactions: "Repayment Apr 2024", dateTime: "16 Jul 2024, 03:45 PM", transactionId: "SBI0056123", amount: "-₹2,000", status: "Failed" },
    { transactions: "Repayment Apr 2024", dateTime: "16 Aug 2024, 05:15 PM", transactionId: "SBI0056123", amount: "-₹1,000", status: "Failed" },
    { transactions: "Repayment Apr 2024", dateTime: "16 Sept 2024, 07:00 PM", transactionId: "SBI0056123", amount: "+₹500", status: "Failed" },
    { transactions: "Repayment Apr 2024", dateTime: "16 Oct 2024, 09:30 PM", transactionId: "SBI0056123", amount: "+₹0", status: "Failed" },
  ];

  return (
    <div className="p-4">

      <div className="bg-blue-50 shadow-md rounded-xl overflow-hidden">

        <div className="overflow-y-auto">
          <table className="w-full text-left border-collapse min-w-max">
            <thead>
              <tr style={{ color: "#939393" }} className="bg-blue-50 border-b font-light text-sm font-Gilroy">

                <th className="p-4 font-Gilroy">Transactions</th>
                <th className="p-4 font-Gilroy">Date & Time</th>
                <th className="p-4 font-Gilroy">Transaction Id</th>
                <th className="p-4 font-Gilroy">Amount</th>
                <th className="p-4 font-Gilroy">Status</th>

              </tr>
            </thead>
            <tbody>
              {statements.map((item, index) => (
                <tr key={index} className="">

                  <td className="p-4 font-Gilroy">{item.transactions}</td>
                  <td className="p-4">
                    <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm font-Gilroy">
                      {item.dateTime}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="bg-orange-200 text-gray-700 px-3 py-1 rounded-full text-sm font-Gilroy">
                      {item.transactionId}
                    </span>
                  </td>
                  <td className="p-4 font-Gilroy">{item.amount}</td>
                  <td className="p-4 font-Gilroy">
                    <span
                      className={`px-3 py-1 text-sm rounded-full font-Gilroy ${item.status === "Success"
                        ? "bg-green-200 text-green-700"
                        : "bg-red-100 text-red-700"
                        }`}
                    >
                      {item.status}
                    </span>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
const mapsToProps = (stateInfo) => {
  return {
    state: stateInfo,
  };
};

Transactions.propTypes = {
  state: PropTypes.object,
};

export default connect(mapsToProps)(Transactions);
