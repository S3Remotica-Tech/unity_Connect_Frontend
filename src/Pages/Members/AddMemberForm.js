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
        dispatch({ type: 'GET_MEMBER_ID' });
    }, []);

    useEffect(() => {
        setNoChanges("");
    }, [memberId, userName, email, mobileNo, address, joiningDate, file]);

    const formattedDate = joiningDate ? moment(joiningDate).format("YYYY-MM-DD") : "";


    const validate = () => {
        let tempErrors = {};
        if (!userName) tempErrors.userName = "User Name is required";
        if (!email) tempErrors.email = "Email is required";
        if (!joiningDate) tempErrors.joiningDate = "Joining Date is required";
        // if (!mobileNo) {
        //     tempErrors.mobileNo = "Mobile number is required";
        // } else if (!/^\d{10}$/.test(mobileNo)) {
        //     tempErrors.mobileNo = "Mobile number must be exactly 10 digits";
        // }
        if (!mobileNo) {
            tempErrors.mobileNo = "Mobile number is required";
        } else if (!/^\d{10}$/.test(mobileNo)) {
            tempErrors.mobileNo = "Mobile number must be exactly 10 digits";
        }
        if (mobileNo.length > 10) {
            tempErrors.mobileNo = "Mobile number cannot exceed 10 digits";
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
        const allowedTypes = ['application/pdf', 'image/png', 'image/jpeg'];

        if (selectedFile) {
            if (allowedTypes.includes(selectedFile.type)) {
                setFile(selectedFile);
                if (selectedFile.type.startsWith('image/')) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        setShowImage(reader.result);
                    };
                    reader.readAsDataURL(selectedFile);
                } else {
                    setShowImage(null);
                }
            } else {
                alert("Only PDF, PNG, and JPG files are allowed.");
            }
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
            joiningDate.trim() !== (memberData.joining_date || '').trim() ||
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
        dispatch({ type: 'MEMBERLIST' });
    };


    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded-2xl shadow-lg w-full max-w-md relative overflow-y-auto">
                <div className="flex items-center justify-between border-b pb-2 mb-4">
                    <p className="font-semibold font-Gilroy text-lg leading-6 tracking-normal">
                        {memberData ? "Edit Member" : "Add a Member"}
                    </p>
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
                                className="w-full p-2 h-10 border rounded-lg text-sm"
                                value={state?.Member?.GetMemberId?.memberId || ''}
                                readOnly
                            />
                            {errors.memberId && (
                                <p className="text-red-500 flex items-center gap-1 mt-1 text-xs">
                                    <MdError className="text-xs" /> {errors.memberId}
                                </p>
                            )}
                        </div>

                        <div className="w-1/2">
                            <label className="block font-medium font-Gilroy text-sm tracking-normal mb-1">User Name</label>
                            <input
                                data-testid='input-user-name'
                                type="text"
                                className="w-full p-2 h-10 border rounded-lg text-sm"
                                placeholder="Enter User Name"
                                value={userName}
                                onChange={(e) => handleChange("userName", e.target.value)}
                            />
                            {errors.userName && (
                                <p className="text-red-500 flex items-center gap-1 text-xs">
                                    <MdError  /> {errors.userName}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <div className="w-1/2">
                            <label className="block font-medium font-Gilroy text-sm tracking-normal mb-1">Email</label>
                            <input
                                data-testid='input-member-email'
                                type="email"
                                className="w-full p-2 h-10 border rounded-lg text-sm"
                                placeholder="Enter Email"
                                value={email}
                                onChange={(e) => handleChange("email", e.target.value)}
                            />
                            {errors.email && (
                                <p className="text-red-500 flex items-center gap-1 text-xs">
                                    <MdError className="text-xs" /> {errors.email}
                                </p>
                            )}
                        </div>

                        <div className="w-1/2">
                            <label className="block font-medium font-Gilroy text-sm tracking-normal mb-1">Mobile No.</label>
                            <input
                                data-testid='input-member-phone'
                                type="text"
                                className="w-full p-2 h-10 border rounded-lg text-sm"
                                placeholder="Enter Mobile No."
                                value={mobileNo}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (/^\d*$/.test(value) && value.length <= 10) {
                                        handleChange("mobileNo", value);
                                    }
                                }}
                            />
                            {errors.mobileNo && (
                                <p className="text-red-500 flex items-center gap-1 text-xs">
                                    <MdError className="text-xs" /> {errors.mobileNo}
                                </p>
                            )}
                        </div>
                    </div>

                    <div>
                        <label className="block font-medium text-sm font-Gilroy tracking-normal mb-1">Joining Date</label>
                        <input
                            data-testid='input-joining-data'
                            type="date"
                            className="w-56 p-2 h-10 border rounded-lg text-sm"
                            placeholder="Select Joining Date"
                            value={formattedDate}
                            onChange={(e) => handleChange("joiningDate", e.target.value)}
                        />
                        {errors.joiningDate && (
                            <p className="text-red-500 flex items-center gap-1 text-xs">
                                <MdError className="text-xs" /> {errors.joiningDate}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block font-medium font-Gilroy text-sm tracking-normal mb-1">Address</label>
                        <textarea
                            data-testid='input-member-address'
                            className="w-full p-2 border rounded-lg h-10 text-sm"
                            placeholder="Enter Address"
                            value={address}
                            onChange={(e) => handleChange("address", e.target.value)}
                        />
                        {errors.address && (
                            <p className="text-red-500 flex items-center gap-1 text-xs -mt-1">
                                <MdError className="text-xs" /> {errors.address}
                            </p>
                        )}
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

                    <div>
                        <button
                            type="submit"
                            className="mt-2 w-full bg-black text-white p-2 rounded-3xl font-Gilroy font-semibold text-sm"
                            onClick={handleSubmit}
                        >
                            {memberData ? "Save Changes" : "Add Member"}
                        </button>
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

