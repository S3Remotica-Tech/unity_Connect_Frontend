/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useDispatch,  connect } from "react-redux";
import ExpensesIcon from "../../Asset/Icons/ExpensesIcon.svg";
import ThreeDotMore from "../../Asset/Icons/ThreeDotMore.svg";
import CloseCircleIcon from "../../Asset/Icons/close-circle.svg";
import PropTypes from "prop-types";

function ExpensesSetting({ state }) {

  const dispatch = useDispatch();


  const expensesetting = state.SettingExpenses?.getExpenseData.data || [];


  const statusCode = state.SettingExpenses.statusCodeSettingsAddExpenses;

  const [categoryName, setCategoryName] = useState("");
  const [subCategoryName, setSubCategoryName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubCategory, setIsSubCategory] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!categoryName && !isSubCategory) {
      setErrorMessage("!Please do some changes before adding a category.");
      return;
    }
  
    if (isSubCategory && !subCategoryName) {
      setErrorMessage("!Please enter a sub-category name.");
      return;
    }
  

    setErrorMessage("");
    const payload = {
      category_Name: categoryName,
      sub_Category: isSubCategory ? subCategoryName : "",
      id: expensesetting,
    };

    dispatch({
      type: "SETTING_ADD_EXPENSES",
      payload: payload,
    });
  };

  useEffect(() => {
    if (statusCode === 200) {
      dispatch({ type: "CLEARSETTINGADDEXPENSES" });
      setCategoryName("");
      setSubCategoryName("");
      setIsModalOpen(false);
    }
  }, [statusCode, dispatch]);

  const handlecategoryName = (e) => setCategoryName(e.target.value);
  const handleSubCategoryName = (e) => setSubCategoryName(e.target.value);

  useEffect(() => {
    dispatch({ type: "SETTING_GET_EXPENSES" });
  }, [dispatch]);



  useEffect(() => {
    if (state.SettingExpenses === 200) {
      dispatch({ type: "SETTING_GET_EXPENSES" });

      setTimeout(() => {
        dispatch({ type: "CLEARSETTINGADDEXPENSES" })
      }, 500)
    }
  }, [state.SettingExpenses, dispatch])


  return (
    <div className="container mx-auto mt-5">
      <div className="flex items-center justify-between w-full ">
        <div>
          <p className="font-Gilroy font-semibold text-xl text-black">Expenses</p>
          <p className="mt-5 text-gray-500 text-sm font-medium">
            Set up expenses by creating categories
          </p>
        </div>
        <button
          className="bg-black text-white w-[155px] rounded-[60px] font-Gilroy text-base font-medium pt-[16px] pr-[20px] pb-[16px] pl-[20px]"
          onClick={() => setIsModalOpen(true)}
        >
          + Add category
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className={`bg-white w-464 rounded-40 p-6 shadow-lg transition-all duration-300 ${isSubCategory ? 'h-auto' : 'h-[380px]'}`}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold font-Gilroy">Add new category</h2>
              <img
                alt=""
                src={CloseCircleIcon}
                onClick={() => setIsModalOpen(false)}
                className="w-32 h-32 cursor-pointer"
              />
            </div>
            <div className="w-full border border-[#E7E7E7] mx-auto"></div>
            <div className="mt-7">
              <label className="text-black text-sm font-medium font-Gilroy text-lg">Category name</label>
              <input
                onChange={(e) => {
                  handlecategoryName(e);
                  setErrorMessage("");
                }}                value={categoryName}
                type="text"
                placeholder="Enter category name"
                className="w-full h-60 border border-[#D9D9D9] rounded-2xl p-4 mt-3 text-base placeholder:text-gray-400 focus:outline-none focus:border-[#D9D9D9]"
              />

              <div className="flex items-center mt-7 cursor-pointer">
                <input
                  type="checkbox"
                  id="makeSubCategory"
                  className="w-5 h-5"
                  checked={isSubCategory}
                  onChange={() => {
                    setIsSubCategory(!isSubCategory);
                    setErrorMessage("");
                  }}
                />
                <label
                  htmlFor="makeSubCategory"
                  className="text-black font-medium font-Gilroy text-base pl-10 cursor-pointer"
                >
                  Make sub-category
                </label>
              </div>

              {isSubCategory && (
                <div className="mt-5">
                  <label className="text-black text-sm font-medium font-Gilroy text-lg">Select Category</label>
                  <input
                    type="text"
                    placeholder="Select a category"
                    onChange={(e) => {
                      handleSubCategoryName(e);
                      setErrorMessage("");
                    }}
                    className="w-full h-60 border border-[#D9D9D9] rounded-2xl p-4 mt-3 text-base placeholder:text-gray-400 focus:outline-none focus:border-[#D9D9D9]"
                  />
                </div>
              )}
            </div>

            {errorMessage && (
  <p className="text-[red] text-sm font-medium mt-3">{errorMessage}</p>
)}

            <button
              onClick={handleSubmit}
              className="mt-10 pt-[20px] pr-[40px] pb-[20px] pl-[40px] w-full h-59 bg-black text-white
               rounded-60 text-base font-Gilroy font-medium"
            >
              Add category
            </button>
          </div>
        </div>
      )}


      <div className="max-h-[400px] overflow-y-auto mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {expensesetting.map((category, index) => (
          <div key={index} className="w-350 h-170 border border-[#E7E7E7] bg-[#F4F7FF] flex flex-col rounded-3xl">
            <div className="flex items-center px-4 py-4">
              <img src={ExpensesIcon} alt="Expenses Icon" className="w-8 h-8" />
              <p className="text-darkGray text-base font-semibold leading-[19.09px] ml-2 font-Gilroy">
                {category.category_Name}
              </p>
              <div className="flex-grow"></div>
              <img src={ThreeDotMore} alt="More Options" className="w-6 h-6 cursor-pointer" />
            </div>
            <div className="w-310 mx-auto border-t border-[#E7E7E7]"></div>

            {category.subcategory?.map((sub, subIndex) => (

              <div key={subIndex} className="flex justify-between w-310 mx-auto px-2 pt-5">
                <p className="text-grayCustom font-Gilroy font-medium text-sm leading-[16.48px]">Sub-category </p>
                <p className="text-black font-Gilroy font-semibold text-sm leading-[16.7px] text-right">{sub.subcategory}</p>
              </div>
            ))}
          </div>
        ))}
      </div>

    </div>
  );
}

const mapsToProps = (stateInfo) => {
  return {
      state: stateInfo
  }
}
ExpensesSetting.propTypes = {
  state: PropTypes.object,
};

export default connect(mapsToProps)(ExpensesSetting);