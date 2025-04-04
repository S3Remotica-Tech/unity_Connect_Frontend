/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import CloseCircleIcon from '../../Asset/Icons/close-circle.svg';
import { useDispatch } from "react-redux";
import img1 from "../../Asset/Images/Memberone.svg";
import tick from '../../Asset/Icons/tick-circle.svg';
import { MdError } from "react-icons/md";

import Select from "react-select";
import { ClipLoader } from "react-spinners";



function AddLoanForm({ state }) {
  const dispatch = useDispatch();

  const statusCode = state.Loan.statusCodeLoans;
  const members = state.Member?.ActiveMemberdata || [];


  const [loans, setLoans] = useState(state.Loan?.getLoanTab || []);


  const loanGetSetting = state;


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [vitDetails, setVitDetails] = useState({});
  const [memberId, setMemberId] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [selectedWitnesses, setSelectedWitnesses] = useState([]);

  const [isWitnessModalOpen, setIsWitnessModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Active loan");

  const [isApprovePopupOpen, setIsApprovePopupOpen] = useState(false);
  const [memberLoanType, setMemberLoanType] = useState("");
  const [eligibleLoanAmount, setEligibleLoanAmount] = useState("");

  const [approve, setApprove] = useState("");
  const [loading, setLoading] = useState(true);

  const [interesttype, setInterestType] = useState("");

  const [loanTypeError, setLoanTypeError] = useState("");

  const [loanAmountError, setLoanAmountError] = useState("");
  const [memberError, setMemberError] = useState("");
  const [witnessError, setWitnessError] = useState("");
  const [initialWitnesses, setInitialWitnesses] = useState([]);

  const [isRejectPopupOpen, setisRejectPopupOpen] = useState(false);
  const [rejectLoanData, setRejectLoanData] = useState('');

  const [currentPageActive, setCurrentPageActive] = useState(1);
  const [currentPageApproved, setCurrentPageApproved] = useState(1);
  const itemsPerPage = 6;
  const indexOfLastApproved = currentPageApproved * itemsPerPage;
  const indexOfFirstApproved = indexOfLastApproved - itemsPerPage;



  const handleSubmit = (e) => {
    e.preventDefault();

    let isValid = true;

    if (!memberId) {
      setMemberError("Please select a member");
      isValid = false;
    } else {
      setMemberError("");
    }

    if (selectedWitnesses.length === 0) {
      setWitnessError("Please select at least one witness");
      isValid = false;
    } else {
      setWitnessError("");
    }

    if (!loanAmount) {
      setLoanAmountError("Please enter the loan amount");
      isValid = false;
    } else {
      setLoanAmountError("");
    }

    if (!isValid) return;



    const payload = {
      member_id: parseInt(memberId),
      widness_ids: selectedWitnesses.length > 0 ? selectedWitnesses : [],
      loan_amount: parseFloat(loanAmount)
    };

    dispatch({
      type: "LOAN_ADD",
      payload,
    });

    setLoanAmountError('');
    setWitnessError('');
    setMemberError('');
  };

  useEffect(() => {
    setLoans(state?.Loan?.getLoanTab)
    setpaginatedActiveLoans(state.Loan?.getLoanTab?.filter(loan => !loan.Loan_Type && !loan.Loan_Status).slice(indexOfFirstActive, indexOfLastActive))

  }, [state.Loan.getLoanTab])


  useEffect(() => {
    if (statusCode === 200) {
      dispatch({ type: "CLEARLOAN" });
      setIsModalOpen(false);
      dispatch({ type: "GET_LOAN" });
    }

    setMemberId("");
    setLoanAmount("");
    setIsModalOpen(false);
    setMemberLoanType("");
    setEligibleLoanAmount("");
    setIsApprovePopupOpen(false);

  }, [statusCode]);



  useEffect(() => {
    if (state.Loan?.statusCodeLoans === 200) {

      dispatch({ type: "CLEARLOAN" });

    }
  }, [state.Loan?.statusCodeLoans]);



  useEffect(() => {
    setLoading(true);
    dispatch({
      type: "GET_LOAN",
    });
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);


  useEffect(() => {
    if (state.Loan?.statusCodeLoans === 200) {
      dispatch({ type: "GET_LOAN" });

      dispatch({ type: "SETTINGS_GET_LOAN" });
      setTimeout(() => {
        dispatch({ type: "CLEARLOAN" })
      }, 500)
    }
  }, [state.Loan?.statusCodeLoans])

  useEffect(() => {
    dispatch({ type: 'MEMBERLIST' });
  }, []);

  useEffect(() => {
    dispatch({ type: "SETTINGS_GET_LOAN" });
  }, [dispatch]);


  useEffect(() => {
    if (isWitnessModalOpen) {
      setSelectedWitnesses([...initialWitnesses]);
    }
  }, [isWitnessModalOpen]);



  const handleAddWitness = () => {
    if (selectedWitnesses.length === 0) {
      setWitnessError("No changes detected. Please select at least one witness.");
      return;
    }

    const isSelectionUnchanged =
      JSON.stringify([...selectedWitnesses].sort()) === JSON.stringify([...initialWitnesses].sort());

    if (isSelectionUnchanged) {
      setWitnessError("No changes detected");
      return;
    }

    const witnessPayload = {
      id: vitDetails.Loan_Id,
      member_id: vitDetails.Member_Id,
      widness_ids: selectedWitnesses,
    };

    dispatch({ type: "ADD_WITNESS", payload: witnessPayload });
    dispatch({ type: "GET_LOAN" });

    setInitialWitnesses([...selectedWitnesses]);
    setIsWitnessModalOpen(false);
    setSelectedWitnesses([]);
    setWitnessError("");
  };


  const handleAddNewWitness = (loan) => {
    setIsWitnessModalOpen(true);
    setVitDetails({ ...loan });

    const existingWitnesses = loan.Widness_Id
      ? loan.Widness_Id.split(",").map(Number)
      : [];

    setSelectedWitnesses(existingWitnesses);
    setInitialWitnesses(existingWitnesses);
  };



  const [selectedLoan, setSelectedLoan] = useState(null);



  const handleApproval = (loan, selectedMember) => {
    setApprove({ ...loan, ...selectedMember });



    setIsApprovePopupOpen(true);
    setSelectedLoan(loan);

  }



  const approvalSubmit = async (e) => {
    e.preventDefault();
    let isValid = true;

    if (!memberLoanType) {
      setLoanTypeError("Please select a loan type ");
      isValid = false;
    } else {
      setLoanTypeError("");
    }



    if (!eligibleLoanAmount) {
      setLoanAmountError("Please Enter loan amount");
      isValid = false;
    } else {
      setLoanAmountError("");
    }

    if (!isValid) return;

    const payload = {
      id: approve.Loan_Id,
      loan_type: Number(memberLoanType),
      loan_amount: Number(eligibleLoanAmount),
      interest: Number(interesttype)
    };

    dispatch({
      type: "ADD_APPROVAL",
      payload,
    });


  };

  const handleClose = () => {
    setIsModalOpen(false)

    setLoanAmountError('');
    setWitnessError('');
    setMemberError('');

  }

  const handleReject = (loan) => {
    if (!loan) {
      console.error("Loan ID is missing.");
      return;
    }

    dispatch({
      type: "LOAN_REJECT",
      payload: { loan_status: "Reject", id: loan.Loan_Id },
    });
    setisRejectPopupOpen(false);
  };



  const indexOfLastRejected = currentPageApproved * itemsPerPage;
  const indexOfFirstRejected = indexOfLastApproved - itemsPerPage;
  const paginatedRejectedLoans = loans?.length > 0 && loans?.filter(loan => loan?.Loan_Status === 'Reject').slice(indexOfFirstRejected, indexOfLastRejected);





  const indexOfLastActive = currentPageActive * itemsPerPage;
  const indexOfFirstActive = indexOfLastActive - itemsPerPage;
  const [paginatedActiveLoans, setpaginatedActiveLoans] = useState(loans?.length > 0 && loans?.filter(loan => !loan?.Loan_Type && !loan.Loan_Status).slice(indexOfFirstActive, indexOfLastActive));


  const paginatedApprovedLoans = loans?.length > 0 && loans?.filter(loan => loan.Loan_Type).slice(indexOfFirstApproved, indexOfLastApproved);


  const options = members.map((member) => ({
    value: member.Id,
    label: member.User_Name,
  }));

  const witnessOptions = members
    .filter((member) => member.Id !== memberId)
    .map((member) => ({
      value: member.Id,
      label: member.User_Name,
    }));


  const loanOptions = loanGetSetting?.SettingLoan?.getLoan?.loans?.map((loan) => ({
    value: loan.Id,
    label: loan.Loan_Name,
    interest: loan.Interest || "",
  })) || [];


  const customLoanStyles = {
    control: (base, state) => ({
      ...base,
      borderColor: state.isFocused ? "#9CA3AF" : "#D1D5DB",

      borderRadius: "14px",
      padding: "4px",
      boxShadow: "none",
      height: '60px',
      marginTop: '10px',
      fontStyle: 'Gilroy',
      "&:hover": { borderColor: "#666" },
    }),
    placeholder: (base) => ({
      ...base,
      fontFamily: "Gilroy",
      fontSize: "16px",
      color: "#9CA3AF",
    }),
    menu: (base) => ({
      ...base,
      maxHeight: loanOptions.length > 3 ? "150px" : "auto",
      overflowY: loanOptions.length > 3 ? "auto" : "hidden",
    }),
    indicatorSeparator: () => ({ display: "none" }),
    dropdownIndicator: (base) => ({
      ...base,
      cursor: "pointer",
    }),
    menuList: (base) => ({
      ...base,
      maxHeight: "150px",
      overflowY: "auto",
      scrollbarWidth: "thin",
      "&::-webkit-scrollbar": {
        width: "6px",
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "#888",
        borderRadius: "4px",
      },
      "&::-webkit-scrollbar-thumb:hover": {
        backgroundColor: "#555",
      },
    }),
  };

  const customStyles = {
    control: (base, state) => ({
      ...base,
      borderColor: state.isFocused ? "#9CA3AF" : "#D1D5DB",

      borderRadius: "14px",
      padding: "4px",
      boxShadow: "none",
      height: '60px',
      marginTop: '10px',
      "&:hover": { borderColor: "#666" },
    }),
    placeholder: (base) => ({
      ...base,
      fontFamily: "Gilroy",
      fontSize: "16px",
      color: "#9CA3AF",
    }),
    menu: (base) => ({
      ...base,
      maxHeight: options.length > 3 ? "150px" : "auto",
      overflowY: options.length > 3 ? "auto" : "hidden",
    }),
    indicatorSeparator: () => ({ display: "none" }),
    dropdownIndicator: (base) => ({
      ...base,
      cursor: "pointer",
    }),
    menuList: (base) => ({
      ...base,
      maxHeight: "150px",
      overflowY: "auto",
      scrollbarWidth: "thin",
      "&::-webkit-scrollbar": {
        width: "6px",
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "#888",
        borderRadius: "4px",
      },
      "&::-webkit-scrollbar-thumb:hover": {
        backgroundColor: "#555",
      },
    }),
  };

  const customStyled = {
    control: (base, state) => ({
      ...base,
      borderColor: state.isFocused ? "#9CA3AF" : "#D1D5DB",

      borderRadius: "14px",
      padding: "4px",
      boxShadow: "none",
      height: '60px',
      marginTop: '10px',
      minHeight: "48px",
      maxHeight: "auto",
      overflowY: "auto",
      "&:hover": { borderColor: "#666" },
    }),
    placeholder: (base) => ({
      ...base,
      fontFamily: "Gilroy",
      fontSize: "16px",
      color: "#9CA3AF",
    }),
    menu: (base) => ({
      ...base,
      maxHeight: witnessOptions.length > 3 ? "150px" : "auto",
      overflowY: witnessOptions.length > 3 ? "auto" : "hidden",
    }),
    indicatorSeparator: () => ({ display: "none" }),
    menuList: (base) => ({
      ...base,
      maxHeight: "150px",
      overflowY: "auto",
      scrollbarWidth: "thin",
      "&::-webkit-scrollbar": {
        width: "6px",
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "#888",
        borderRadius: "4px",
      },
      "&::-webkit-scrollbar-thumb:hover": {
        backgroundColor: "#555",
      },
    }),
    dropdownIndicator: (base) => ({
      ...base,
      cursor: "pointer",
    }),
    clearIndicator: (base) => ({
      ...base,
      cursor: "pointer",
    }),

    valueContainer: (base) => ({
      ...base,
      display: "flex",
      flexWrap: "wrap",
    }),
    multiValue: (base) => ({
      ...base,
      backgroundColor: "#E2E8F0",
      borderRadius: "4px",
      padding: "2px 4px",
    }),
    multiValueLabel: (base) => ({
      ...base,
      fontSize: "14px",
      color: "#333",
    }),

  };


  const customWitStyles = {
    control: (base, state) => ({
      ...base,
      borderColor: state.isFocused ? "#9CA3AF" : "#D1D5DB",
      borderRadius: "14px",
      padding: "4px",
      boxShadow: "none",
      height: "60px",
      marginTop: "10px",
      minHeight: "48px",
      maxHeight: "auto",
      overflowY: "auto",
      "&:hover": { borderColor: "#666" },
    }),
    menu: (base) => ({
      ...base,
      maxHeight: witnessOptions.length > 3 ? "150px" : "auto",
      overflowY: "auto",
    }),
    indicatorSeparator: () => ({ display: "none" }),
    menuList: (base) => ({
      ...base,
      maxHeight: "150px",
      overflowY: "auto",
      scrollbarWidth: "thin",
      "&::-webkit-scrollbar": {
        width: "6px",
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "#888",
        borderRadius: "4px",
      },
      "&::-webkit-scrollbar-thumb:hover": {
        backgroundColor: "#555",
      },
    }),
    dropdownIndicator: (base) => ({
      ...base,
      cursor: "pointer",
    }),
    clearIndicator: (base) => ({
      ...base,
      cursor: "pointer",
    }),
    valueContainer: (base) => ({
      ...base,
      display: "flex",
      flexWrap: "wrap",
    }),
    multiValue: (base) => ({
      ...base,
      backgroundColor: "#E2E8F0",
      borderRadius: "4px",
      padding: "2px 4px",
    }),
    multiValueLabel: (base) => ({
      ...base,
      fontSize: "14px",
      color: "#333",
    }),

  };



  if (loading) {
    return (
      <div className="w-full p-4 bg-white rounded-3xl flex justify-center items-center h-full mt-44">
        <ClipLoader color="#7f00ff" loading={loading} size={30} />
      </div>
    );
  }





  return (
    <>
      <div className="container mx-auto mt-5 p-4 ">
        <div>
          <div className="flex items-center  justify-between w-full pl-5 pr-5">
            <p className="font-Gilroy font-semibold text-2xl text-black">Loan Request</p>
            <button
              className="bg-black text-white py-3 px-4 rounded-full text-base font-Gilroy font-medium"

              onClick={() => {
                setIsModalOpen(true);
                setSelectedWitnesses([]);
                setMemberId("");
                setLoanAmount("");
              }}
            >
              + Create Request
            </button>
          </div>
        </div>

        <div data-testid='Loans-tab' className="mt-5 pl-5 pr-5 flex overflow-x-auto whitespace-nowrap flex-nowrap gap-10 scrollbar-hide">
          {["Active loan", "Approved loan", "Rejected loan"].map((tab, index) => (
            <button
              data-testid={`button-tab-${index}`}
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 text-[16px] font-base font-Gilroy transition-all relative min-w-max ${activeTab === tab ? "text-black font-medium" : "text-[#939393]"
                }`}
            >
              {tab}
              <span
                className={`container absolute left-1/2 bottom-0 h-[2px] lg:w-[130px] 
          transition-all transform -translate-x-1/2 ${activeTab === tab ? "bg-black" : "bg-transparent"}
        `}
              ></span>
            </button>
          ))}
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white w-464 rounded-40 p-6 shadow-lg transition-all duration-300">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold font-Gilroy">Add a loan request</h2>
                <img
                  src={CloseCircleIcon}
                  alt="Close"
                  onClick={handleClose}
                  className="w-[24] h-[24] cursor-pointer"
                />
              </div>
              <div className="w-full border border-[#E7E7E7] mx-auto"></div>


              <div className="mt-7">

                <label className="text-black text-sm font-medium font-Gilroy text-lg">
                  Member<span className="text-red-500 text-[20px]">*</span>
                </label>

                <Select
                  value={options.find((opt) => opt.value === memberId)}
                  onChange={(selectedOption) => {
                    setMemberId(selectedOption ? selectedOption.value : "");

                    setMemberError("");
                  }}
                  options={options}
                  placeholder="Select a member"
                  styles={customStyles}
                  isSearchable={true}
                  menuShouldScrollIntoView={true}
                  isValidNewOption={() => false} t
                  onInputChange={(inputValue, { action }) => {
                    if (action === "input-change" && /\d/.test(inputValue)) {
                      return "";
                    }
                  }}
                />


                {memberError && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <MdError className="mr-1" /> {memberError}
                  </p>
                )}

              </div>


              <div className="relative mt-7">
                <label className="text-black text-sm font-medium font-Gilroy text-lg">
                  Witnesses <span className="text-red-500 text-[20px]">*</span>
                </label>

                <Select
                  value={witnessOptions.filter((opt) => selectedWitnesses.includes(opt.value))}
                  onChange={(selectedOptions) => {
                    setSelectedWitnesses(selectedOptions ? selectedOptions.map((opt) => opt.value) : []);
                    setWitnessError("");
                  }}
                  options={witnessOptions}
                  placeholder="Select witnesses"
                  styles={customStyled}
                  isSearchable={true}
                  isMulti={true}
                  menuShouldScrollIntoView={true}
                />

                {witnessError && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <MdError className="mr-1" /> {witnessError}
                  </p>
                )}
              </div>


              <div className="mt-7">
                <label className="text-black text-sm font-medium font-Gilroy text-lg">Loan amount <span className="text-red-500 text-[20px]">*</span></label>
                <input
                  value={loanAmount}

                  onChange={(e) => {

                    const value = e.target.value.replace(/[^0-9]/g, "");
                    setLoanAmount(value);

                    setLoanAmountError('');
                  }}
                  type="text"
                  placeholder="Enter approved loan amount"
                  className="w-full h-60 border border-[#D9D9D9] font-Gilroy rounded-2xl p-4 mt-3 
             focus:border-gray-400 focus:outline-none"
                />
                {loanAmountError && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <MdError className="mr-1" /> {loanAmountError}
                  </p>
                )}

              </div>

              <button
                onClick={handleSubmit}
                className="mt-10 pt-[20px] pr-[40px] pb-[20px] pl-[40px] w-full h-59 bg-black text-white rounded-60 text-base font-Gilroy font-medium"
              >
                Add loan request
              </button>
            </div>
          </div>
        )}

        {activeTab === "Active loan" && (
          <div>

            <div className="active-loan max-h-[440px] overflow-y-auto p-5  scroll gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">

              {paginatedActiveLoans?.length > 0 ? (
                paginatedActiveLoans?.map((loan) => {

                  const selectedMember = members?.find(member => String(member.Id) === String(loan.Member_Id)) || null;

                  return (loan.Loan_Type === null && loan.Loan_Status !== "Reject") && (
                    <div
                      key={loan.Loan_Id}
                      className="w-full  bg-[#F4F7FF] flex flex-col rounded-2xl p-4 shadow-md"
                    >

                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <img
                            src={img1}
                            alt="Profile"
                            className="w-12 h-12 rounded-full"
                          />
                          <div className="ml-3">

                            <p className="text-black font-semibold text-base font-Gilroy font-semibold">
                              {selectedMember?.User_Name}
                            </p>

                            <p className="text-[#000000] text-sm bg-[#D9E9FF] pt-1 pr-2 pb-1 pl-2 rounded-[60px] inline-block font-Gilroy">
                              {selectedMember?.Member_Id}
                            </p>
                          </div>
                        </div>

                        <p
                          style={{ marginTop: '-30px' }}
                          className="text-black font-semibold text-base font-Gilroy"
                        >
                          Loan amount: ₹{loan.Loan_Amount ? Number(loan.Loan_Amount).toLocaleString('en-IN') : "0"}
                        </p>



                      </div>

                      <div className="w-full border border-[#E7E7E7] mx-auto my-3"></div>


                      <div className="witness-div">
                        <div className="mt-3">

                          <p className="text-[#939393] font-medium text-xs font-Gilroy">Witnesses</p>

                          {loan.Witness_Details && loan.Witness_Details.length > 0 ? (
                            <div className="flex flex-wrap gap-4 mt-2">
                              {loan.Witness_Details.map((witness) => {
                                const witnessData = members.find((member) => String(member.Id) === String(witness.Widness_Id || witness.Id));

                                return witnessData ? (
                                  <div key={witnessData.Id} className="flex items-center  py-2 rounded-lg">
                                    <img src={img1} alt="Witness Profile" className="w-10 h-10 rounded-full" />
                                    <div className="ml-2">
                                      <p className="text-black font-semibold text-sm font-Gilroy font-semibold">{witnessData.User_Name}</p>
                                      <p className="text-[#000000] text-xs bg-[#D9E9FF] pt-1 pr-2 pb-1 pl-2 rounded-[60px] inline-block font-Gilroy">{witnessData.Member_Id}</p>
                                    </div>
                                  </div>
                                ) : null;
                              })}



                            </div>
                          ) : null}


                        </div>

                      </div>



                      <div className="mt-10 flex items-center justify-between">
                        <div className="font-Gilroy font-medium text-base text-[#222222] cursor-pointer"
                          onClick={() => handleAddNewWitness(loan)}
                        >+ Add witness</div>


                        <div className="flex gap-3">
                          <button className="border border-black text-[#222222] py-3 px-8 rounded-full text-base font-Gilroy
                           font-medium cursor-pointer "

                            onClick={() => {
                              setisRejectPopupOpen(true);
                              setRejectLoanData({ ...loan })
                            }}
                          >
                            Reject
                          </button>



                          <button className="bg-black text-white py-3 px-8 rounded-full text-base font-Gilroy font-medium cursor-pointer"

                            onClick={() => handleApproval(loan, selectedMember)}
                          >
                            Approve
                          </button>
                        </div>
                      </div>



                      {isRejectPopupOpen && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20 z-[9999]">
                          <div className="bg-white w-[388px] h-[200px] mx-auto rounded-2xl shadow-lg">

                            <div className="flex justify-center items-center p-4">
                              <h2 className="text-[18px] font-semibold text-[#222222] font-Gilroy">
                                Reject Loan ?
                              </h2>
                            </div>


                            <div className="text-center text-[14px] font-medium text-[#646464] font-Gilroy mt-[-10px]">
                              Are you sure you want to reject the loan?
                            </div>


                            <div className="flex justify-center mt-4 p-4">
                              <button
                                className="w-[160px] h-[52px] rounded-lg px-5 py-3 bg-white text-[#1E45E1] border border-[#1E45E1] font-semibold font-Gilroy text-[14px] mr-2"
                                onClick={() => setisRejectPopupOpen(false)}
                              >
                                Cancel
                              </button>
                              <button
                                className="w-[160px] h-[52px] rounded-lg px-5 py-3 bg-[#1E45E1] text-white font-semibold font-Gilroy text-[14px]"
                                onClick={() => handleReject(rejectLoanData)}
                              >
                                Reject
                              </button>
                            </div>
                          </div>
                        </div>
                      )}


                    </div>
                  );
                })
              ) : (
                <p className="text-red-500">Loan Data Not Available</p>
              )}

            </div>




            {paginatedActiveLoans.length > 0 && (
              <div className="fixed bottom-0 left-0 w-full p-4 flex justify-end">
                <button
                  className={`px-4 py-2 mx-2 border rounded ${currentPageActive === 1 ? "opacity-50 cursor-not-allowed" : "bg-[#F4F7FF] text-black"
                    }`}
                  onClick={() => setCurrentPageActive(currentPageActive - 1)}
                  disabled={currentPageActive === 1}
                >
                  &lt;
                </button>
                <span className="px-4 py-2 border rounded">{currentPageActive}</span>
                <button
                  className={`px-4 py-2 mx-2 border rounded ${indexOfLastActive >= loans?.filter(loan => !loan.Loan_Type).length
                    ? "opacity-50 cursor-not-allowed"
                    : "bg-[#F4F7FF] text-black"
                    }`}
                  onClick={() => setCurrentPageActive(currentPageActive + 1)}
                  disabled={indexOfLastActive >= loans?.filter(loan => !loan.Loan_Type).length}
                >
                  &gt;
                </button>
              </div>
            )}
          </div>



        )}



        {isWitnessModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[9999]">
            <div className="bg-white w-[400px] rounded-2xl p-6 shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold font-Gilroy">Add New  Witnesses</h2>
                <button
                  className="text-gray-600 text-xl"
                  onClick={() => {
                    setIsWitnessModalOpen(false);
                    setWitnessError("");
                    setInitialWitnesses([])
                  }}
                >
                  <img src={CloseCircleIcon} alt="Close" />
                </button>

              </div>
              <div className="w-full border border-[#E7E7E7] mx-auto my-2 mb-4"></div>
              No



              <div className="relative">
                <label className="text-black text-sm font-medium font-Gilroy text-lg">
                  Witnesses Names
                </label>
                <Select
                  value={witnessOptions.filter((opt) => selectedWitnesses.includes(opt.value))}

                  onChange={(selectedOptions) => {
                    setSelectedWitnesses(selectedOptions.map((opt) => opt.value)); // This ensures removal works
                    setWitnessError("");
                  }}



                  options={witnessOptions}
                  placeholder="Select witnesses"
                  styles={customWitStyles}
                  isSearchable={true}
                  isMulti={true}
                  menuShouldScrollIntoView={true}
                  isValidNewOption={() => false}
                  onInputChange={(inputValue, { action }) => {
                    if (action === "input-change" && /\d/.test(inputValue)) {
                      return "";
                    }
                  }}
                />
              </div>

              {witnessError && <p className="text-red-500 text-sm mt-2 text-center">{witnessError}</p>}

              <button
                className="mt-6 bg-black text-white border font-Gilroy font-medium text-base cursor-pointer rounded-[60px] w-full h-[51px] pt-4 pr-5 pb-4 pl-5"
                onClick={handleAddWitness}
              >
                Add Witnesses
              </button>
            </div>
          </div>
        )}


        {isApprovePopupOpen && (
          <div className="fixed  inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white w-[465px] rounded-2xl p-6 rounded-[40px] shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold font-Gilroy">Approve Loan?</h2>
                <button
                  className="text-gray-600 text-xl"

                  onClick={() => {
                    setIsApprovePopupOpen(false);
                    setLoanAmountError("");

                    setLoanTypeError("");
                    setMemberLoanType("");
                    setInterestType("");
                    setEligibleLoanAmount('');
                  }}
                >
                  <img src={CloseCircleIcon} alt="Close" />
                </button>

              </div>

              <div className="w-full border border-[#E7E7E7] mx-auto my-3"></div>

              <div>
                {selectedLoan && (
                  <div>
                    <p className="font-Gilroy text-sm font-medium text-[#939393]">Are you sure you want to approve a loan of amount
                      <span className="text-black font-semibold"> ₹ {selectedLoan.Loan_Amount}? </span>
                      Select a loan type to approve the loan amount!</p>
                  </div>
                )}</div>



              <div className="mt-4 relative">
                <label className="text-black text-sm font-medium font-Gilroy">
                  Loan type <span className="text-red-500 text-[20px]">*</span>
                </label>

                <Select
                  value={loanOptions.find((opt) => String(opt.value) === String(memberLoanType)) || null}
                  onChange={(selectedOption) => {
                    setMemberLoanType(selectedOption ? selectedOption.value : "");
                    setInterestType(selectedOption ? selectedOption.interest : "");
                    setLoanTypeError("")
                  }}
                  options={loanOptions}
                  placeholder="Select a loan type"
                  styles={customLoanStyles}
                  isSearchable={true}
                  menuShouldScrollIntoView={true}
                  isValidNewOption={() => false}
                  onInputChange={(inputValue, { action }) => {
                    if (action === "input-change" && /\d/.test(inputValue)) {
                      return "";
                    }
                  }}
                />

                {loanTypeError && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <MdError className="mr-1" /> {loanTypeError}
                  </p>
                )}
              </div>

              <div className="mt-4">
                <label className="text-black font-Gilroy text-sm font-medium text-lg mt-10">Interest type<span className="text-red-500 text-[20px]">*</span></label>
                <input
                  type="text"
                  value={interesttype}
                  readOnly
                  className="w-full h-60 font-Gilroy border border-[#D9D9D9] rounded-2xl p-4 mt-3  focus:border-gray-400 focus:outline-none"
                />

              </div>

              <div className="mt-4">
                <label className="text-black text-sm font-medium font-Gilroy">Loan Amount<span className="text-red-500 text-[20px]">*</span></label>

                <input
                  value={eligibleLoanAmount}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9]/g, "");
                    if (value !== "" && Number(value) > selectedLoan.Loan_Amount) {

                      setLoanAmountError(`Loan amount cannot exceed ₹ ${selectedLoan.Loan_Amount}`);
                    } else {
                      setLoanAmountError("");
                    }
                    setEligibleLoanAmount(value);
                  }}
                  type="text"
                  placeholder="Enter approved loan amount"
                  className="w-full h-60 border border-[#D9D9D9] rounded-2xl p-3 mt-2 font-Gilroy  focus:border-gray-400 focus:outline-none"
                />

                {loanAmountError && <p className="text-red-500 text-sm mt-1 flex items-center"><MdError className="mr-1" /> {loanAmountError}</p>}
              </div>

              <div className="mt-5">
                <p className="font-Gilroy text-sm font-medium text-[#939393]">Note: Once loan approved cannot be canceled!</p>
              </div>



              <button className="mt-5 bg-black text-white border font-Gilroy font-medium text-base 
                          cursor-pointer rounded-[60px] w-full h-[60px] pt-4 pr-5 pb-4 pl-5"
                onClick={approvalSubmit}
              >
                Approve Loan
              </button>
            </div>
          </div>
        )}


        {activeTab === "Approved loan" && (
          <div>

            <div className="active-loan max-h-[440px] overflow-y-auto p-5  scroll gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">

              {paginatedApprovedLoans.length > 0 ? (
                paginatedApprovedLoans.map((loan) => {

                  const selectedMember = members?.find((member) => String(member.Id) === String(loan.Member_Id)) || null;

                  return (loan.Loan_Type && loan.Loan_Status !== 'Reject') && (
                    <div
                      key={loan.Loan_Id}
                      className="w-full  bg-[#F4F7FF] flex flex-col rounded-2xl p-4 shadow-md"
                    >

                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <img
                            src={img1}
                            alt="Profile"
                            className="w-12 h-12 rounded-full"
                          />
                          <div className="ml-3">

                            <p className="text-black font-semibold text-base font-Gilroy font-semibold">
                              {selectedMember?.User_Name}
                            </p>

                            <p className="text-[#000000] text-sm bg-[#D9E9FF] pt-1 pr-2 pb-1 pl-2 rounded-[60px] inline-block">
                              {selectedMember?.Member_Id}
                            </p>
                          </div>
                        </div>

                        <p
                          style={{ marginTop: '-30px' }}
                          className="text-black font-semibold text-base font-Gilroy"
                        >
                          Loan amount: ₹{loan.Approved_Amount ? Number(loan.Approved_Amount).toLocaleString('en-IN') : "0"}
                        </p>


                      </div>

                      <div className="w-full border border-[#E7E7E7] mx-auto my-3"></div>


                      <div className="witness-div">
                        <div className="mt-3">

                          <p className="text-[#939393] font-medium text-xs font-Gilroy">Witnesses</p>

                          {loan.Witness_Details && loan.Witness_Details.length > 0 ? (
                            <div className="flex flex-wrap gap-4 mt-2">
                              {loan.Witness_Details.map((witness) => {
                                const witnessData = members.find((member) => String(member.Id) === String(witness.Widness_Id || witness.Id));

                                return witnessData ? (
                                  <div key={witnessData.Id} className="flex items-center  py-2 rounded-lg">
                                    <img src={img1} alt="Witness Profile" className="w-10 h-10 rounded-full" />
                                    <div className="ml-2">
                                      <p className="text-black font-semibold text-sm font-Gilroy font-semibold">{witnessData.User_Name}</p>
                                      <p className="text-[#000000] text-xs bg-[#D9E9FF] pt-1 pr-2 pb-1 pl-2 rounded-[60px] inline-block">{witnessData.Member_Id}</p>
                                    </div>
                                  </div>


                                ) : null;

                              })}



                            </div>
                          ) : (
                            <p className="text-gray-500">No Witnesses</p>
                          )}

                        </div>

                      </div>

                      <div>

                        {loan?.Approvel_Date && (
                          <div className="flex items-center gap-2 mt-5 mb-5">
                            <img src={tick} alt="Approved" className="w-5 h-5" />
                            <p className="text-black text-base font-Gilroy font-medium">
                              Loan approved on {" "}
                              <span className="text-black text-base font-Gilroy font-semibold">
                                {new Date(loan.Approvel_Date).toLocaleDateString("en-GB", {
                                  day: "2-digit",
                                  month: "long",
                                  year: "numeric",
                                })}
                              </span>{" "}
                              with interest of {" "}
                              {loan?.Interest_Type}% p.m

                            </p>

                          </div>
                        )}





                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-red-500">No Loan Data Available</p>
              )}

            </div>
            {paginatedApprovedLoans.length > 0 && (
              <div className="fixed bottom-0 left-0 w-full p-4 flex justify-end">

                <button
                  className={`px-4 py-2 mx-2 border rounded ${currentPageApproved === 1 ? "opacity-50 cursor-not-allowed" : "bg-[#F4F7FF] text-black"
                    }`}
                  onClick={() => setCurrentPageApproved(currentPageApproved - 1)}
                  disabled={currentPageApproved === 1}
                >
                  &lt;
                </button>
                <span className="px-4 py-2 border rounded">{currentPageApproved}</span>
                <button
                  className={`px-4 py-2 mx-2 border rounded ${indexOfLastApproved >= loans?.filter(loan => loan.Loan_Type).length
                    ? "opacity-50 cursor-not-allowed"
                    : "bg-[#F4F7FF] text-black"
                    }`}
                  onClick={() => setCurrentPageApproved(currentPageApproved + 1)}
                  disabled={indexOfLastApproved >= loans?.filter(loan => loan.Loan_Type).length}
                >
                  &gt;
                </button>
              </div>
            )}
          </div>


        )}



        {activeTab === "Rejected loan" && (

          <div>

            <div className="active-loan max-h-[440px] overflow-y-auto p-5  scroll gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">

              {paginatedRejectedLoans.length > 0 ? (
                paginatedRejectedLoans.map((loan) => {

                  const selectedMember = members?.find((member) => String(member.Id) === String(loan.Member_Id)) || null;

                  return (
                    <div
                      key={loan.Loan_Id}
                      className="w-full  bg-[#F4F7FF] flex flex-col rounded-2xl p-4 shadow-md"
                    >

                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <img
                            src={img1}
                            alt="Profile"
                            className="w-12 h-12 rounded-full"
                          />
                          <div className="ml-3">

                            <p className="text-black font-semibold text-base font-Gilroy font-semibold">
                              {selectedMember?.User_Name}
                            </p>

                            <p className="text-[#000000] text-sm bg-[#D9E9FF] pt-1 pr-2 pb-1 pl-2 rounded-[60px] inline-block">
                              {selectedMember?.Member_Id}
                            </p>
                          </div>
                        </div>


                        <p style={{ marginTop: '-30px' }} className="text-black font-semibold text-base font-Gilroy font-semibold">

                          Loan amount: ₹{loan.Loan_Amount ? Number(loan.Loan_Amount).toLocaleString('en-IN') : "0"}
                        </p>
                      </div>

                      <div className="w-full border border-[#E7E7E7] mx-auto my-3"></div>


                      <div className="witness-div">
                        <div className="mt-3">

                          <p className="text-[#939393] font-medium text-xs font-Gilroy">Witnesses</p>

                          {loan.Witness_Details && loan.Witness_Details.length > 0 ? (
                            <div className="flex flex-wrap gap-4 mt-2">
                              {loan.Witness_Details.map((witness) => {
                                const witnessData = members.find((member) => String(member.Id) === String(witness.Widness_Id || witness.Id));

                                return witnessData ? (
                                  <div key={witnessData.Id} className="flex items-center  py-2 rounded-lg">
                                    <img src={img1} alt="Witness Profile" className="w-10 h-10 rounded-full" />
                                    <div className="ml-2">
                                      <p className="text-black font-semibold text-sm font-Gilroy font-semibold">{witnessData.User_Name}</p>
                                      <p className="text-[#000000] text-xs bg-[#D9E9FF] pt-1 pr-2 pb-1 pl-2 rounded-[60px] inline-block">{witnessData.Member_Id}</p>
                                    </div>
                                  </div>


                                ) : null;

                              })}



                            </div>
                          ) : (
                            <p className="text-gray-500">No Witnesses</p>
                          )}

                        </div>

                      </div>


                    </div>
                  );
                })
              ) : (
                <p className="text-red-500">No Loan Data Available</p>
              )}

            </div>
            {paginatedRejectedLoans.length > 0 && (
              <div className="fixed bottom-0 left-0 w-full p-4 flex justify-end">
                <button
                  className={`px-4 py-2 mx-2 border rounded ${currentPageApproved === 1 ? "opacity-50 cursor-not-allowed" : "bg-[#F4F7FF] text-black"
                    }`}
                  onClick={() => setCurrentPageApproved(currentPageApproved - 1)}
                  disabled={currentPageApproved === 1}
                >
                  &lt;
                </button>
                <span className="px-4 py-2 border rounded">{currentPageApproved}</span>
                <button
                  className={`px-4 py-2 mx-2 border rounded ${indexOfLastApproved >= loans?.filter(loan => loan.Loan_Type).length
                    ? "opacity-50 cursor-not-allowed"
                    : "bg-[#F4F7FF] text-black"
                    }`}
                  onClick={() => setCurrentPageApproved(currentPageApproved + 1)}
                  disabled={indexOfLastApproved >= loans?.filter(loan => loan.Loan_Type).length}
                >
                  &gt;
                </button>
              </div>
            )}
          </div>

        )}



      </div>
    </>
  );
}

const mapsToProps = (stateInfo) => {
  return {
    state: stateInfo
  }
}
AddLoanForm.propTypes = {
  state: PropTypes.object,
};

export default connect(mapsToProps)(AddLoanForm);