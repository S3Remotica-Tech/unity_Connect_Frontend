/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { MdError } from "react-icons/md";
import { AiOutlinePlus } from 'react-icons/ai';
import { useDispatch } from "react-redux";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from "moment";
import closecircle from '../../Asset/Icons/close-circle.svg';


function MemberModal({ state, memberData, onClose }) {

    const dispatch = useDispatch();

    const [memberId, setMemberId] = useState("");
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [joiningDate, setJoiningDate] = useState("");
    const [mobileNo, setMobileNo] = useState("");
    const [address, setAddress] = useState("");
    const [file, setFile] = useState("");
    const [showImage, setShowImage] = useState("");
    const [errors, setErrors] = useState({});
    const [noChanges, setNoChanges] = useState("");


    useEffect(() => {
        if (memberData) {
            setMemberId(prev => memberData.Member_Id || prev);
            setUserName(prev => memberData.User_Name || prev);
            setEmail(prev => memberData.Email_Id || prev);
            setMobileNo(prev => memberData.Mobile_No || prev);
            setAddress(prev => memberData.Address || prev);
            setJoiningDate(prev => memberData.Joining_Date || prev);
            setFile(prev => memberData.file || prev);
        }
    }, [memberData]);


    useEffect(() => {
        if (state.Member.statusCodeForAddUser === 200) {
            dispatch({ type: 'MEMBERLIST' });
            dispatch({ type: 'CLEAR_STATUS_CODES' })
        }
    }, [state.Member.statusCodeForAddUser]);


    useEffect(() => {
        dispatch({ type: 'GET_MEMBER_ID' });
    }, []);

    useEffect(() => {
        setNoChanges("");
    }, [memberId, userName, email, mobileNo, address, joiningDate, file]);


    const formattedDate = moment(memberData.Joining_Date).format("YYYY-MM-DD");

   
    const validate = () => {
        let tempErrors = {};
        if (!userName) tempErrors.userName = "User Name is required";
        if (!email) tempErrors.email = "Email is required";
        if (!joiningDate) tempErrors.joiningDate = "Joining Date is required";
        if (!mobileNo) {
            tempErrors.mobileNo = "Mobile number is required";
        } else if (!/^\d{10}$/.test(mobileNo)) {
            tempErrors.mobileNo = "Mobile number must be exactly 10 digits";
        }

        if (!address) tempErrors.address = "Address is required";
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };


    const handleChange = (field, value) => {
        if (field === "memberId") setMemberId(value);
        if (field === "userName") setUserName(value);
        if (field === "email") setEmail(value);
        if (field === "joiningDate") setJoiningDate(value);
        if (field === "mobileNo") setMobileNo(value);
        if (field === "address") setAddress(value);
        if (field === "file") setFile(value);

        setErrors((prevErrors) => ({ ...prevErrors, [field]: "" }));
    };


    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile)
        if (selectedFile) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setShowImage(reader.result);
            };
            reader.readAsDataURL(selectedFile);
        }
    };


    const handleClose = () => {
        onClose()
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        setNoChanges("");

        if (!userName && !email && !mobileNo && !joiningDate && !address) {
            setNoChanges("Please fill in all the required fields.");
            return;
        }

        const isChanged = memberData && (
            userName.trim() !== (memberData.User_Name || '').trim() ||
            email.trim() !== (memberData.Email_Id || '').trim() ||
            String(mobileNo).trim() !== String((memberData.Mobile_No || '')).trim() ||
            ((joiningDate && memberData.Joining_date) &&
                moment(joiningDate).format('YYYY-MM-DD') !== moment(memberData.Joining_date).format('YYYY-MM-DD')) ||
            address.trim() !== (memberData.Address || '').trim() ||
            (file && file.name !== memberData.file)
        );


        if (memberData && !isChanged) {
            setNoChanges("No Changes Detected");
            return;
        }

        if (!validate()) {
            return;
        }

        const payload = {
            Member_Id: memberId,
            user_name: userName,
            email_id: email,
            mobile_no: mobileNo,
            joining_date: joiningDate,
            address: address,
            file: file,
        };

        const Editpayload = {
            Member_Id: memberId,
            user_name: userName,
            email_id: email,
            mobile_no: mobileNo,
            joining_date: joiningDate,
            address: address,
            document_url: memberData?.Document_Url,
            id: memberData.Id,
        };

        dispatch({
            type: 'MEMBERINFO',
            payload: memberData ? Editpayload : payload,
        });

        setNoChanges("");
        onClose();
    };


    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-5 rounded-2xl shadow-lg w-full max-w-lg relative">
                <div className="flex items-center justify-between border-b pb-2 mb-4">
                    <h2 className="font-sans font-semibold font-Gilroy text-lg leading-6 tracking-normal">
                        {memberData ? "Edit Member" : "Add a Member"}
                    </h2>
                    <button data-testid='button-close' className="text-gray-600" onClick={handleClose}>
                        <img src={closecircle} alt="Close" className="w-6 h-6" />
                    </button>
                </div>

                <div className="space-y-1 mt-2">
                    <div className="flex gap-4">



                        <div className="w-1/2">
                            <label className="block font-medium font-Gilroy text-sm tracking-normal mb-1">Member ID</label>
                            <input
                                data-testid='input-member-id'
                                type="text"
                                className="w-full p-2 h-10 border rounded-lg"
                                value={state?.Member?.GetMemberId?.memberId || ''}
                                readOnly
                            />
                            {errors.memberId && (
                                <p className="text-red-500 flex items-center gap-1 mt-1 text-xs">
                                    <MdError size={14} /> {errors.memberId}
                                </p>
                            )}
                        </div>


                        <div className="w-1/2">
                            <label className="block font-medium font-Gilroy text-sm tracking-normal mb-1">User Name</label>
                            <input data-testid='input-user-name' type="text" className="w-full p-2 h-10 border rounded-lg"
                                value={userName}
                                onChange={(e) => handleChange("userName", e.target.value)} />
                            {errors.userName && <p className="text-red-500 flex items-center gap-1 mt-1 text-xs"><MdError size={14} /> {errors.userName}</p>}
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <div className="w-1/2">
                            <label className="block font-medium font-Gilroy text-sm tracking-normal mb-1">Email</label>
                            <input data-testid='input-member-email' type="email" className="w-full p-2 h-10 border rounded-lg"
                                value={email}
                                onChange={(e) => handleChange("email", e.target.value)} />
                            {errors.email && <p className="text-red-500 flex items-center gap-1 mt-1 text-xs"><MdError size={14} /> {errors.email}</p>}
                        </div>
                        <div className="w-1/2">
                            <label className="block font-medium font-Gilroy text-sm tracking-normal mb-1">Mobile No.</label>
                            <input data-testid='input-member-phone' type="text" className="w-full p-2 h-10 border rounded-lg" value={mobileNo} onChange={(e) => handleChange("mobileNo", e.target.value)} />
                            {errors.mobileNo && <p className="text-red-500 flex items-center gap-1 mt-1 text-xs"><MdError size={14} /> {errors.mobileNo}</p>}
                        </div>
                    </div>

                    <div>
                        <label className="block font-medium text-sm font-Gilroy tracking-normal mb-1">Joining Date</label>
                        <input
                            data-testid='input-joining-data'
                            type="date"
                            className="w-56 p-2 h-10 border rounded-lg"
                            value={joiningDate ? formattedDate : ""}
                            onChange={(e) => handleChange("joiningDate", e.target.value)}
                        />
                        {errors.joiningDate && <p className="text-red-500 flex items-center gap-1 mt-1 text-xs"><MdError size={14} /> {errors.joiningDate}</p>}
                    </div>

                    <div>
                        <label className="block font-medium font-Gilroy text-sm tracking-normal mb-1">Address</label>
                        <textarea data-testid='input-member-address' className="w-full p-2 border rounded-lg h-10"
                            value={address}
                            onChange={(e) => handleChange("address", e.target.value)} />
                        {errors.address && <p className="text-red-500 flex items-center gap-1 text-xs"><MdError size={14} /> {errors.address}</p>}
                    </div>

                    <div className="">
                        <label className="block font-medium font-Gilroy text-sm tracking-normal mb-1">Add Documents</label>
                        <div className="border rounded px-2 py-4 flex items-center justify-center relative w-28 mb-1">
                            <input type="file" className="absolute inset-0 opacity-0 w-full h-full" onChange={handleFileChange} />
                            {memberData && <img src={memberData.Document_Url} alt="Selected" />}
                            {showImage ? <img src={showImage} alt="Selected" /> : <AiOutlinePlus size={20} />}
                        </div>
                        <p className="font-medium text-xs font-Gilroy mb-3">Note: File should be .JPG, .PDF, .PNG (max 2MB)</p>
                    </div>

                    {noChanges && (
                        <div className="flex items-center justify-center mt-8 text-red-500 text-sm font-semibold">
                            <MdError className="text-sm mr-2" />
                            <p>{noChanges}</p>
                        </div>
                    )}
                    <div className="mt-2">
                        <button type="submit" className="w-full bg-black text-white p-2 rounded-lg"
                            onClick={handleSubmit}>{memberData ? "Save Changes" : "Add Member"}</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

const mapsToProps = (stateInfo) => {
    return {
        state: stateInfo
    }
}
MemberModal.propTypes = {
    memberData: PropTypes.object,
    state: PropTypes.object,
    onClose: PropTypes.func
};

export default connect(mapsToProps)(MemberModal);

