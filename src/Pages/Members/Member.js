import React, { useState } from "react";
import ActiveMember from "./Activemember";
import NonActiveMember from "./NonActivemember";



const Members = () => {
  const [activeTab, setActiveTab] = useState("Active members");
  const [selectedMemberdetails, setSelectedMemberdetails] = useState(null);


  return (
    <div className="container mx-auto mt-4">

      {!selectedMemberdetails && (
        <h2 className="text-[24px] font-semibold font-Gilroy leading-[28.63px] text-black mb-4">
          Members
        </h2>
      )}

      {!selectedMemberdetails && (
        <div data-testid='members-tab' className="flex overflow-x-auto whitespace-nowrap flex-nowrap gap-8 scrollbar-hide">
          {["Active members", "In active members"].map((tab,index) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              data-testid={`button-tab-${index}`}
              className={`pb-2 text-[16px] font-base font-Gilroy transition-all relative min-w-max ${activeTab === tab ? "text-black font-semibold" : "text-[#939393]"
                }`}
            >
              {tab}
              <span
                className={`absolute left-0 bottom-0 h-[3px] w-full transition-all ${activeTab === tab ? "bg-black" : "bg-transparent"
                  }`}
              ></span>
            </button>
          ))}
        </div>
      )}

<div className="mt-8">
  {activeTab === "Active members" ? (
    <ActiveMember onSelectMember={setSelectedMemberdetails} />
  ) : (
    <NonActiveMember onSelectMember={setSelectedMemberdetails} />
  )}
</div>

    </div>
  );
};

export default Members;
