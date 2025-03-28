import React, { useState, useEffect } from "react";
import Diamond from '../../Asset/Icons/DiamondGreen.svg';
import ArrowDown from '../../Asset/Icons/arrow-down.svg';

const faqs = [
  {
    question: "The blue whale is the biggest animal to have ever lived",
    answer:
      "",
  },
  {
    question: "The blue whale is the biggest animal to have ever lived",
    answer:
      "",
  },
  {
    question: "The blue whale is the biggest animal to have ever lived",
    answer:
      "",
  },
  {
    question: "The blue whale is the biggest animal to have ever lived",
    answer:
      "",
  },
  {
    question: "The blue whale is the biggest animal to have ever lived",
    answer:
      "",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
        @media (min-width: 200px) and (max-width: 300px) {
          .custom-text {
            font-size: 12px;
          }
        }
   
     @media (min-width: 200px) and (max-width: 300px) {
           .faq {
           font-size: 28px;
          }
        }
         
           @media (min-width: 200px) and (max-width: 300px) {
           .faq-content {
           font-size: 16px;
          }
        }

      
   
      `;

    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  return (
    <>


      <div className="mt-20 flex flex-col faq" data-testid='get-answer-container'>
        <h2
          className="faq text-6xl font-Gilroy font-bold  text-gray-900 text-center"

        >
          Get answers to some FAQs
        </h2>
        <p
          className="text-lg font-Gilroy font-light leading-[28.8px] text-[#000000] text-center mt-4 mb-5"

        >
          Take a look at our most Frequently Asked Questions
        </p>
      </div>
      <div className="relative mt-10">
        <img
          src={Diamond}
          alt="Pink Spiral"
          className="hidden lg:block absolute right-[-50px] top-[-200px] w-218 h-217 "
        />
      </div>


      <div className="container mx-auto text-center px-12 mt-16">


        <div className="custom-text mt-8 bg-#FAF9FF rounded-[40px] p-5 pr-10 border-l-[1px] border-violet-700 border-t-[1px] 
        border-r-[1px] border-b-[1px] border-teal-500 border-t-violet-500 border-r-teal-500 border-b-teal-500">

          {faqs.map((faq, index) => (
            <div key={index}
              className="border-b border-[#C3C3C3] last:border-none"
            >
              <button
                data-testid={`button-toggle-faq-${index}`}
                className=" w-full flex justify-between items-center text-left py-4 px-4 text-black font-500 text-xl rounded-lg"
                onClick={() => toggleFAQ(index)}
              >
                <span
                  className="faq-content text-xl font-Gilroy font-medium leading-32 font-Gilroy py-5 text-gray-800"

                >
                  {faq.question}
                </span>


                <span className="ml-2 flex-shrink-0">
                  {openIndex === index ? (

                    <img src={ArrowDown} alt="arrow-icon"/>

                  ) : (

                    <img src={ArrowDown} alt="arrow-icon"/>
                  )}
                </span>
              </button>
              {openIndex === index && (
                <div data-testid='div-answers' className="px-4 pb-4 text-#000000 text-sm">{faq.answer}</div>
              )}

            </div>
          ))}
        </div>

      </div>
    </>
  );
};

export default FAQSection;
