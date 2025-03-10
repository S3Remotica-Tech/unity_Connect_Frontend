/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, connect } from "react-redux";
import { FiMoreVertical } from "react-icons/fi";
import PropTypes from 'prop-types';
import ProfileIcon from '../../Asset/Icons/ProfileIcon.svg';
import editIcon from "../../Asset/Icons/edit_blue.svg";
import trashRed from "../../Asset/Icons/trashRed.svg";
import RecordPayment from "../../Asset/Icons/RecordPayment.svg";
import moment from "moment";


function Statement({ state }) {

  
  const dispatch = useDispatch();
  const popupRef = useRef(null);

  const statementList = state.Statement.StatementList;

  const formattingDate = moment(statementList?.loan_date).format("DD-MM-YYYY");
  const formattingDueDate = moment(statementList?.Due_Date).format("DD-MM-YYYY");

  const [menuOpen, setMenuOpen] = useState(null);


  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    dispatch({ type: 'STATEMENTLIST' });
  }, []);

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setMenuOpen(null);
    }
  };

  const toggleMenu = (index) => {
    setMenuOpen(menuOpen === index ? null : index);
  };

  return (
    <div className="w-full p-4 bg-white rounded-xl">
      <h2 className="font-Gilroy font-semibold text-xl md:text-2xl mb-4 mt-1 ml-12 lg:ml-3 ">Statements</h2>

      <div className="flex gap-2 md:gap-4 mb-4">
        <button
          className="font-Gilroy font-semibold px-2 md:px-4 py-2 text-gray-800"
        >
          Loan statement
        </button>
      </div>

      <div className="relative overflow-hidden overflow-x-hidden rounded-3xl">
        <div className="overflow-x-auto overflow-y-scroll max-h-[400px] rounded-3xl">
          <table className="w-full bg-[#f4f7ff] shadow-md text-xs md:text-sm min-w-[800px]">
            <thead className="p-3 font-Gilroy font-medium text-gray-600 text-left border-b border-gray-300 sticky top-0 bg-[#f4f7ff] z-10">
              <tr>
                <th className="p-3 pl-5">Member Name</th>
                <th className="pl-5">Loan ID</th>
                <th className="pl-10 min-w-[120px] md:min-w-[150px]">Loan Date</th>
                <th className="pl-1">Loan Amount</th>
                <th className="pl-8 min-w-[120px] md:min-w-[150px]">Due Date</th>
                <th className="pl-6">Due</th>
                <th className="pl-8">Status</th>
                <th className=""> </th>
              </tr>
            </thead>


            <tbody>
              {statementList.map((item, index) => (
                <tr key={index} className="p-3 hover:bg-gray-100 border-b font-Gilroy">
                  <td className="p-3 flex items-center gap-2 truncate">
                    <img src={ProfileIcon} alt="avatar" className="w-6 h-6 rounded-full" />
                    <span className="truncate">{item.User_Name}</span>
                  </td>
                  <td className="p-4">
                    <span className="bg-orange-200 text-gray-700 px-3 py-2 rounded-full text-sm font-Gilroy">
                      {item.Loan_id}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="bg-gray-200 text-gray-700 px-3 py-2 rounded-full text-sm font-Gilroy">
                      {formattingDate}
                    </span>


                  </td>

                  <td className="p-2">{item.Loan_Amount}</td>
                  <td className="p-4">
                    <span className="bg-gray-200 text-gray-700 px-3 py-2 rounded-full text-sm font-Gilroy">
                      {formattingDueDate}
                    </span>
                  </td>
                  <td className="p-2 text-center">{item.Due}</td>
                  <td className="p-2 text-center">
                    <span className={`px-3 py-2 rounded-full text-black ${item.Status === "Paid" ? "bg-green-200" : "bg-red-200"}`}>
                      {item.Status}
                    </span>
                  </td>
                  <td className="p-2 relative">
                    <button onClick={() => toggleMenu(index)} className="text-gray-600 bg-white rounded-full p-2 shadow">
                      <FiMoreVertical size={16} />
                    </button>
                    {menuOpen === index && (
                      <div
                        ref={popupRef}
                        className="absolute right-4 top-10 bg-white border-t border-b border-gray-200 rounded-lg shadow-lg z-10 w-[180px]"
                      >
                        <div>
                          <button className="flex items-center gap-2 w-full px-3 py-2 font-Gilroy border-b border-gray-200">
                            <img src={RecordPayment} alt="Record Payment" className="h-4 w-4" />
                            Record Payment
                          </button>
                          <button className="flex items-center gap-2 w-full px-3 py-2 font-Gilroy border-b border-gray-200">
                            <img src={editIcon} alt="Edit" className="h-4 w-4" />
                            Edit
                          </button>
                          <button className="flex items-center gap-2 w-full px-3 py-2 text-red-600 font-Gilroy">
                            <img src={trashRed} alt="Delete" className="h-4 w-4" />
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
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

Statement.propTypes = {
  state: PropTypes.object,
};

export default connect(mapsToProps)(Statement);




