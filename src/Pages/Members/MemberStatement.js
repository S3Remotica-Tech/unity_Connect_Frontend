/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, connect } from "react-redux";
import PropTypes from 'prop-types';
import RecordPaymentIcon from "../../Asset/Icons/RecordPayment.svg";
import CloseCircle from "../../Asset/Icons/close-circle.svg";
import { MdError } from "react-icons/md";

function MemberStatements({ state, member }) {




  const dispatch = useDispatch();
  const popupRef = useRef(null);

  const Statement = state.Member.getStatement;


  const [showOptions, setShowOptions] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [loanAmount, setLoanAmount] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [paidAmount, setPaidAmount] = useState('');
  const [pendingAmount, setPendingAmount] = useState('');
  const [loanId] = useState('');
  const [status, setStatus] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (member?.Id) {
      dispatch({
        type: "GETSTATEMENT",
        payload: { id: member.Id },
      });
    }
  }, [member?.Id]);

  useEffect(() => {
    if (state.Member.statusCodeForRecordPayment === 200) {
      setIsModalOpen(false);
      dispatch({ type: "CLEAR_STATUS_CODES_RECORD_PAYMENT" });
    }
  }, [state.Member.statusCodeForRecordPayment])

  const handleInputChange = (field, value) => {
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }

    if (field === "loanAmount") {
      setLoanAmount(value);
    } else if (field === "dueDate") {
      setDueDate(value);
    } else if (field === "paidAmount") {
      setPaidAmount(value);
    } else if (field === "pendingAmount") {
      setPendingAmount(value);
    } else if (field === "status") {
      setStatus(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!loanAmount) newErrors.loanAmount = "Loan amount is required";
    if (!dueDate) newErrors.dueDate = "Due date is required";
    if (!paidAmount) newErrors.paidAmount = "Paid amount is required";
    if (!pendingAmount) newErrors.pendingAmount = "Pending amount is required";
    if (!status) newErrors.status = "Status is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const payload = {
        loan_amount: loanAmount,
        due_date: dueDate,
        pending_amount: pendingAmount,
        status: status,
        loan_id: loanId,
      };

      dispatch({
        type: 'ADDRECORDPAYMENT',
        payload: payload,
      });

      setLoanAmount("");
      setDueDate("");
      setPaidAmount("");
      setPendingAmount("");
      setStatus("");
      setIsModalOpen(false);
    }
  };


  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold font-Gilroy">Loan Statements</h2>

      </div>
      <div className="bg-blue-50 shadow-md rounded-xl overflow-hidden">
        <div className="overflow-y-auto h-[300px]">
          <table className="w-full text-left border-collapse min-w-max">
            <thead>
              <tr style={{ color: "#939393" }} className="bg-blue-50 border-b font-light text-sm font-Gilroy">
                <th className="p-4">
                  <input
                    type="checkbox"
                    className="w-[18px] h-[18px] appearance-none bg-blue-50 border border-gray-400 rounded-md checked:bg-blue-500 checked:border-transparent focus:ring-2 focus:ring-blue-300"
                  />
                </th>
                <th className="p-4 font-Gilroy">Statement</th>
                <th className="p-4 font-Gilroy">Due Date</th>
                <th className="p-4 font-Gilroy">Loan Amount</th>
                <th className="p-4 font-Gilroy">Pending</th>
                <th className="p-4 font-Gilroy">Paid Amount</th>
                <th className="p-4 font-Gilroy">Status</th>
                <th className="p-4 font-Gilroy "></th>
              </tr>
            </thead>
            <tbody>
              {Statement.map((item, index) => (
                <tr key={index}>
                  <td className="p-4">
                    <input
                      type="checkbox"
                      className="w-[18px] h-[18px] appearance-none bg-blue-50 border border-gray-400 rounded-md checked:bg-blue-500 checked:border-transparent focus:ring-2 focus:ring-blue-300"
                    />
                  </td>
                  <td className="p-4 font-Gilroy">{`Repayment ${item.Due_Date}`}</td>
                  <td className="p-4">
                    <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm font-Gilroy">
                      {item.Due_Date}
                    </span>
                  </td>
                  <td className="p-4 font-Gilroy">{item.Loan_Amount}</td>
                  <td className="p-4 font-Gilroy">{item.Pending_Amount}</td>
                  <td className="p-4 font-Gilroy">{item.Paid_Amount}</td>
                  <td className="p-4 font-Gilroy">
                    <span
                      className={`px-3 py-1 text-sm rounded-full font-Gilroy ${item.Status === "Paid"
                        ? "bg-green-200 text-green-700"
                        : "bg-red-200 text-red-700"
                        }`}
                    >
                      {item.Status}
                    </span>
                  </td>
                  <td className="p-4 relative">
                    <button
                      className="text-gray-600 text-xl"
                      onClick={() => setShowOptions(!showOptions)}
                    >
                      ⋮
                    </button>

                    {showOptions && (
                      <div
                        ref={popupRef}
                        className="absolute mt-2 bg-white shadow-lg rounded w-40 z-10">
                        <button
                          className="flex items-center gap-2 w-full px-3 py-2 font-Gilroy border-b border-gray-200"
                          onClick={() => setIsModalOpen(true)}
                        >
                          <img src={RecordPaymentIcon} alt="Record Payment" className="h-4 w-4" />
                          Record Payment
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
      </div>

      {isModalOpen && (

        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50 font-Gilroy">
          <div className="bg-white rounded-lg w-[90%] max-w-md p-4 shadow-lg rounded-3xl">
            <div className="flex justify-between items-center mb-4 border-b border-gray-300 pb-2">
              <p className="text-lg font-semibold text-center text-black">
                Record payment
              </p>
              <button onClick={handleClose} className="text-gray-500 hover:text-black">
                <img src={CloseCircle} className="w-6 h-6" alt="CloseIcon" />
              </button>
            </div>

            <div className="font-Gilroy max-h-[300px] sm:max-h-[400px] overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-sm font-semibold">Loan Amount</label>
                  <input
                    type="text"
                    value={loanAmount}
                    onChange={(e) => handleInputChange("loanAmount", e.target.value)}
                    placeholder="Enter amount"
                    className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-none"
                  />
                  {errors.loanAmount && (
                    <div className="flex items-center text-red-500 text-xs mt-1 font-Gilroy">
                      <MdError className="mr-1 text-xs" />
                      {errors.loanAmount}
                    </div>
                  )}
                </div>

                <div>
                  <label className="text-sm font-semibold">Due Date</label>
                  <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => handleInputChange("dueDate", e.target.value)}
                    className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-none"
                  />
                  {errors.dueDate && (
                    <div className="flex items-center text-red-500 text-xs mt-1 font-Gilroy">
                      <MdError className="mr-1 text-xs" />
                      {errors.dueDate}
                    </div>
                  )}
                </div>

                <div>
                  <label className="text-sm font-semibold">Paid Amount</label>
                  <input
                    type="text"
                    value={paidAmount}
                    onChange={(e) => handleInputChange("paidAmount", e.target.value)}
                    placeholder="Enter amount"
                    className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-none"
                  />
                  {errors.paidAmount && (
                    <div className="flex items-center text-red-500 text-xs mt-1 font-Gilroy">
                      <MdError className="mr-1 text-xs" />
                      {errors.paidAmount}
                    </div>
                  )}
                </div>

                <div>
                  <label className="text-sm font-semibold">Pending</label>
                  <input
                    type="text"
                    value={pendingAmount}
                    onChange={(e) => handleInputChange("pendingAmount", e.target.value)}
                    placeholder="Enter pending amount"
                    className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-none"
                  />
                  {errors.pendingAmount && (
                    <div className="flex items-center text-red-500 text-xs mt-1 font-Gilroy">
                      <MdError className="mr-1 text-xs" />
                      {errors.pendingAmount}
                    </div>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="text-sm font-semibold">Status</label>
                  <select
                    value={status}
                    onChange={(e) => handleInputChange("status", e.target.value)}
                    className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-none"
                  >
                    <option value="">Select status</option>
                    <option value="Paid">Paid</option>
                    <option value="Unpaid">Unpaid</option>
                  </select>
                  {errors.status && (
                    <div className="flex items-center text-red-500 text-xs mt-1 font-Gilroy">
                      <MdError className="mr-1 text-xs" />
                      {errors.status}
                    </div>
                  )}
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition-colors"
                onClick={handleSubmit}
              >
                Record payment
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

const mapsToProps = (stateInfo) => {
  return { state: stateInfo };
};

MemberStatements.propTypes = {
  state: PropTypes.object,
  member: PropTypes.object
};

export default connect(mapsToProps)(MemberStatements);

