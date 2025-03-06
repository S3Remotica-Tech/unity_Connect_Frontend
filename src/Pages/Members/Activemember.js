/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from "react";
import { FaEllipsisH } from "react-icons/fa";
import img1 from "../../Asset/Images/Memberone.svg";
import call from "../../Asset/Icons/call.svg";
import sms from "../../Asset/Icons/sms.svg";
import building from "../../Asset/Icons/buildings.svg";
import editIcon from "../../Asset/Icons/edit_blue.svg";
import deleteIcon from "../../Asset/Icons/Delete.svg";
import { useDispatch, connect } from "react-redux";
import changestatus from '../../Asset/Icons/ChangeStatusicon.svg';
import moment from "moment";
import PropTypes from 'prop-types';
import AddMemberForm from "./AddMemberForm";
import MemberDetails from './MemberDetails';
import closecircle from '../../Asset/Icons/close-circle.svg';

function ActiveMember({ state, onSelectMember }) {


  const dispatch = useDispatch();
  const [openMenu, setOpenMenu] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [deletePopup, setDeletePopup] = useState(null);
  const [changePopup, setChangePopup] = useState(null)
  const [status, setStatus] = useState("");
  const [statusError, setStatusError] = useState("");
  const [memberdetail, setMemberdetails] = useState(null);
  const [showMembers, setShowMembers] = useState(true);




  const handleStatusChange = (e) => setStatus(e.target.value);
  const handleChangeStatusClick = (memberId) => {
    if (!status) {
      setStatusError("Please select a status");
    } else {
      setStatusError("");
      setChangePopup(null);

      const payload = { id: memberId, status: status };

      dispatch({ type: "CHANGE_STATUS", payload });
    }
    setStatus("")
  };

  const popupRef = useRef(null);
  const members = state.Member.Memberdata;


 const formattedDate = moment(members.Joining_Date).format("DD-MM-YYYY");

  useEffect(() => {
    if (state.Member.statusCodeMemberList === 200) {
      dispatch({ type: 'CLEAR_STATUS_CODE_MEMBER_LIST' });
    }
  }, [state.Member.statusCodeMemberList])


  useEffect(() => {
    dispatch({ type: 'MEMBERLIST' });
  }, []);



  useEffect(() => {
    if (state.Member.deleteMemberStatusCode === 200) {
      dispatch({ type: 'MEMBERLIST' })
      dispatch({ type: 'CLEAR_DELETE_MEMBER' })

      setDeletePopup(null)
    }
  }, [state.Member.deleteMemberStatusCode])


  useEffect(() => {
    if (state.Member.changestausStatusCode === 200) {

      dispatch({ type: 'MEMBERLIST' })
      dispatch({ type: 'CLEAR_STATUS_MEMBER' })
    }
  }, [state.Member.changestausStatusCode])

  const handleDeleteClick = (index) => {
    setDeletePopup(index);
    setOpenMenu(null);
  };

  const handleChangeStatus = (index) => {
    setChangePopup(index);
    setOpenMenu(null);
  }

  const confirmDelete = (memberId) => {
    const payload = {
      id: memberId,
    };


    dispatch({ type: "DELETEMEMBER", payload });

  };



  const toggleMenu = (event, index) => {
    event.stopPropagation();
    setOpenMenu(openMenu === index ? null : index);
  };



  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setOpenMenu(null);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleClickAddMember = () => {

    setShowModal(true);
    setSelectedMember("");

  }


  const handleOnClose = () => {
    setShowModal(false);
  }


  const handleEditMemberClick = (member) => {
    setSelectedMember(member);
    setShowModal(true);
    setOpenMenu(null);
  };

  const closeDetails = () => {
    setMemberdetails(null);
    setShowMembers(true)
  };

  const handleCloseStatus = () => {
    setChangePopup(false)
    setStatusError("")
  }


  return (
    <>
      <div>
        <div data-testid='active-member-div' className="flex justify-end">
          <button
            data-testid="button-add-member"

            className="bg-black text-white py-4 px-8 rounded-full text-base font-Gilroy font-medium mt-[-60px]"
            onClick={handleClickAddMember}
          >
            + Add Member
          </button>
        </div>
        <div>
          {state.Member.errormsg === "No members found" && (
            <p className="text-red-500 text-sm text-center font-Gilroy">{state.Member.errormsg}</p>
          )}
        </div>
        <div className=" max-h-[400px] overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {members.map((member, index) => (
            <div key={index} className="member-card bg-blue-50 p-4 rounded-3xl shadow-sm relative">


              <div className="absolute top-4 right-4">
                <FaEllipsisH
                  data-testid={`button-toggle-menu${index}`}
                  className="text-gray-500 cursor-pointer"
                  onClick={(event) => toggleMenu(event, index)}
                />
              </div>


              {openMenu === index && (
                <div
                  ref={popupRef}
                  data-testid='edit-container'
                  className="absolute right-4 top-10 bg-white w-40 border border-gray-200 rounded-lg shadow-lg z-10 w-[180px]"
                >
                  <button
                    className="flex items-center gap-2 w-full px-3 py-2 font-Gilroy rounded-lg"
                    onClick={() => handleChangeStatus(index)}
                  >
                    <img src={changestatus} alt="Delete" className="h-4 w-4" />
                    Change Status
                  </button>
                  <button
                    data-testid={`button-edit-member-${index}`}
                    className="flex items-center gap-2 w-full px-3 py-2 font-Gilroy rounded-lg"
                    onClick={() => handleEditMemberClick(member)}
                  >
                    <img src={editIcon} alt="Edit" className="h-4 w-4" />
                    Edit
                  </button>

                  <button
                    className="flex items-center gap-2 w-full px-3 py-2 text-red-600 font-Gilroy rounded-lg"
                    onClick={() => handleDeleteClick(index)}
                  >
                    <img src={deleteIcon} alt="Delete" className="h-4 w-4" />
                    Delete
                  </button>
                </div>
              )}


              <div onClick={() => onSelectMember(member)} className="flex items-center gap-4">
                <img src={img1} alt='Member' className="rounded-full" />
                <div>
                  <h3 className="font-semibold text-base font-Gilroy">{member.User_Name}</h3>
                  <div className="flex gap-2 text-sm mt-1">
                    <span className="bg-blue-100 text-sm font-medium font-Gilroy  px-2 py-1 rounded-xl">
                      {member.Member_Id
                      }
                    </span>

                    <span className={`px-2 py-1 rounded-xl text-sm font-medium font-Gilroy ${member.Status === "Active" ? "bg-green-200" : "bg-pink-200"
                      }`}>
                      {member.Status}
                    </span>
                  </div>
                </div>
              </div>


              <div onClick={() => onSelectMember(member)} className="mt-3 text-sm text-gray-700">
                <div className="flex justify-stretch items-center">
                  <p className="flex items-center gap-2 font-Gilroy">
                    <img src={sms} className="text-gray-500" alt="sms" />
                    {member.Email_Id}
                  </p>
                  <p className="flex items-center gap-2 font-Gilroy">
                    <img src={call} className="text-gray-500" alt="call" />
                    {member.Mobile_No
                    }
                  </p>
                </div>
                <p className="flex items-center gap-2 mt-2 font-Gilroy">
                  <img src={building} className="text-gray-500" alt="building" />
                  {member.Address}
                </p>
              </div>


              <div className="flex justify-between items-center mt-3">
                <p className="text-purple-600 font-medium text-sm font-Gilroy">
                  View attached documents
                </p>
                <span className="bg-gray-200 text-gray-700 text-sm px-3 py-1 rounded-xl font-Gilroy">
                  {formattedDate}
                </span>
              </div>


              {deletePopup === index && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[9999]">
                  <div className="bg-white w-[388px] h-[200px] mx-auto rounded-2xl shadow-lg">

                    <div className="flex justify-center items-center p-4">
                      <h2 className="text-[18px] font-semibold text-[#222222] font-Gilroy">
                        Delete Member ?
                      </h2>
                    </div>


                    <div className="text-center text-[14px] font-medium text-[#646464] font-Gilroy mt-[-10px]">
                      Are you sure you want to delete this Member?
                    </div>


                    <div className="flex justify-center mt-4 p-4">
                      <button
                        className="w-[160px] h-[52px] rounded-lg px-5 py-3 bg-white text-[#1E45E1] border border-[#1E45E1] font-semibold font-Gilroy text-[14px] mr-2"
                        onClick={() => setDeletePopup(null)}
                      >
                        Cancel
                      </button>
                      <button
                        className="w-[160px] h-[52px] rounded-lg px-5 py-3 bg-[#1E45E1] text-white font-semibold font-Gilroy text-[14px]"
                        onClick={() => confirmDelete(member.Id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {changePopup === index && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-white max-w-[550px] w-full p-6 rounded-[30px] shadow-lg relative">

                    <div className="flex justify-between items-center">
                      <h2 className="text-[20px] font-semibold font-Gilroy">Change Status</h2>
                  
                       <button data-testid='button-close' className="text-gray-600" onClick={handleCloseStatus}>
                        <img src={closecircle} alt="Close" className="" />
                    </button>
                    </div>


                    <div className="mt-4">
                      <label className="text-[14px] text-[#222] font-medium font-Gilroy mb-2 block">
                        Change Status <span className="text-red-500 text-[20px]">*</span>
                      </label>
                      <select
                        className="border border-gray-300 text-[#4B4B4B] text-[16px] font-medium font-gilroy shadow-none h-[50px] rounded-xl w-full px-3"
                        value={status}
                        onChange={handleStatusChange}
                      >
                        <option value="" disabled selected>
                          Select a status
                        </option>
                        <option value="active">Active</option>

                        <option value="in-active">In active</option>
                      </select>

                      {statusError.trim() !== "" && (
                        <div className="mt-2 text-center text-red-500 text-[12px] font-medium font-gilroy">
                          <span className="inline-block text-red-500 mb-1"></span> {statusError}
                        </div>
                      )}
                    </div>


                    <div className="mt-6">
                      <button
                        className="w-full bg-[#1E45E1] text-white font-medium h-[50px] rounded-xl text-[16px] font-gilroy"
                        onClick={() => handleChangeStatusClick(member.Id)}
                      >
                        Change Status
                      </button>
                    </div>
                  </div>
                </div>
              )}

            </div>
          ))}

        </div>
        {showModal && <AddMemberForm memberData={selectedMember} onClose={handleOnClose} />}
        {!showMembers && <MemberDetails member={memberdetail} onClick={() => closeDetails} />}


      </div>
    </>
  );
}

const mapsToProps = (stateInfo) => {
  return {
    state: stateInfo,
   
  }
}
ActiveMember.propTypes = {
  state: PropTypes.object,
  onSelectMember: PropTypes.func,
};
export default connect(mapsToProps)(ActiveMember)
