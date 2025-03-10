import React, { useEffect, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { FaArrowRotateRight } from "react-icons/fa6";
import {
  FaChevronDown,
  FaChevronUp,
  FaCircleCheck,
  FaCircleQuestion,
  FaPaperPlane,
} from "react-icons/fa6";
import { ansQuestion } from "../../../redux/features/ProductQuestionSlice";
import { fetchQuestions } from "../../../redux/features/ProductQuestionSlice";

const ProductQuestions = () => {
  const dispatch = useDispatch();
  const themeMode = useSelector((state) => state.theme.mode);
  const productQuestions = useSelector((state) => state.productQuestions.productQuestions)
  const [expandedProduct, setExpandedProduct] = useState(null); // Tracks the expanded product
  const [answerInput, setAnswerInput] = useState({}); // Tracks the answers being typed
  const [products, setProducts] = useState(productQuestions || []); // Ensure `products` is initialized as an empty array if `productQuestions` is undefined
    // console.log(products)
  // Toggle the visibility of questions for a product
  const toggleProduct = (productId) => {
    setExpandedProduct(expandedProduct === productId ? null : productId);
  };

  const handleRefresh = () => {
      dispatch(fetchQuestions());
    };

  // Handle the input change for the answer
  const handleAnswerChange = (quesId, value) => {
    setAnswerInput({ ...answerInput, [quesId]: value });
  };

  // Handle sending an answer
  const handleSendAnswer = (productId, quesId) => {
    if (!answerInput[quesId]) {
      alert("Please enter an answer before submitting.");
      return;
    }

    // Create an object with quesId and the vendor's answer
    const answerObject = {
      quesId: quesId,
      answer: answerInput[quesId],
    };

    console.log("Answer Object:", answerObject); // Log the created object for testing
    dispatch(ansQuestion({ qnA: answerObject, productId }));

    // Update the products state with the new answer
    const updatedProducts = products.map((product) => {
      if (product.productId === productId) {
        const updatedQuestions = (product.questions || []).map((question) => {
          if (question.quesId === quesId) {
            return {
              ...question,
              isAnswered: true, // Mark as answered
              answers: [
                ...question.answers,
                {
                  text: answerInput[quesId],
                  isVendor: true,
                  answeredBy: "Vendor",
                  answerDateTime: new Date().toLocaleString(),
                },
              ],
            };
          }
          return question;
        });
        return { ...product, questions: updatedQuestions };
      }
      return product;
    });

    setProducts(updatedProducts); // Update the state
    setAnswerInput({ ...answerInput, [quesId]: "" }); // Clear the input field for the specific question
  };

  return (
    <div className={`w-full h-full ${themeMode === 'theme-mode-dark' ? 'gradient-bg-dark text-txt-white' : 'gradient-bg-light text-black shadow-lg'} p-4 flex flex-col`}>
      <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold mb-4">Product Questions</h1>
       <button className={`p-2 ${themeMode === "theme-mode-dark" ? "text-black" : "text-txt-white"} bg-[#26DC5C] rounded-lg shadow-lg flex items-center justify-around min-w-[100px]`} onClick={handleRefresh}>
              <FaArrowRotateRight />
      </button>
      </div>
      {
        !productQuestions || !productQuestions.length ? 
        (
          <div className="w-full h-full flex justify-center items-center">
            <p className={`${themeMode === 'theme-mode-dark' ? 'text-txt-white' : 'text-black'} text-2xl font-semibold`}>No Questions Yet</p>
          </div>
        )
        :
        (
          <>
          <div className="w-full flex flex-col gap-4 overflow-y-auto">
        {products.map((product) => (
          <div key={product.productId} className={`${themeMode === 'theme-mode-dark' ? 'bg-gray-800' : 'bg-white shadow-lg'} rounded-lg`}>
            {/* Product Header */}
            <div
              className={`p-4 flex justify-between items-center cursor-pointer ${themeMode === 'theme-mode-dark' ? 'hover:bg-gray-700' : 'hover:bg-white'}`}
              onClick={() => toggleProduct(product.productId)}
            >
              <div className="flex items-center gap-4">
                <img
                  src={product.productImage}
                  alt={product.productName}
                  className="w-16 h-16 rounded object-cover"
                />
                <div>
                  <h2 className="text-lg font-semibold">{product.productName}</h2>
                  <p className={`text-sm ${themeMode === 'theme-mode-dark' ? 'text-gray-500' : 'text-gray-700'}`}>
                    {product.hasQuestions
                      ? `${product.questions.length} Questions`
                      : "No Questions"}
                  </p>
                </div>
              </div>
              {expandedProduct === product.productId ? (
                <FaChevronUp className={`${themeMode === 'theme-mode-dark' ? 'text-gray-400' : 'text-black'}`} />
              ) : (
                <FaChevronDown className={`${themeMode === 'theme-mode-dark' ? 'text-gray-400' : 'text-black'}`} />
              )}
            </div>

            {/* Questions Section */}
            {expandedProduct === product.productId && product.questions && product.questions.length > 0 && (
              <div className={`p-4 ${themeMode === 'theme-mode-dark' ? 'bg-gray-700' : 'bg-gray-100'} space-y-4`}>
                {product.questions.map((question) => (
                  <div key={question.quesId} className={`p-4 ${themeMode === 'theme-mode-dark' ? 'bg-gray-800' : 'gradient-bg-light text-black shadow-lg'} rounded-lg`}>
                    {/* Question */}
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                      <p>{question.text}</p>
                      <p className="text-[0.75rem] text-gray-400">Asked by : {question.askedBy}</p>
                      <p className="text-[0.75rem] text-gray-400">At : {question.askedDateTime}</p>
                      </div>
                      {question.isAnswered ? (
                        <FaCircleCheck className="text-green-500" />
                      ) : (
                        <FaCircleQuestion className="text-yellow-500" />
                      )}
                    </div>

                    {/* Answers */}
                    {question.isAnswered && question.answers.length > 0 && (
                      <div className="mt-4">
                        {question.answers.map((answer, index) => (
                          <div
                            key={index}
                            className={`p-3 ${themeMode === 'theme-mode-dark' ? 'bg-gray-600 text-txt-white' : 'bg-gray-200 text-black shadow-lg'} space-y-2`}
                          >
                            <p>{answer.text}</p>
                            <div className="text-[0.75rem] text-gray-400">
                              <p>Answered by: {answer.answeredBy}</p>
                              <p>At: {answer.answerDateTime}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Input for Answer */}
                    {!question.isAnswered && (
                      <div className="mt-4 flex items-center gap-4">
                        <input
                          type="text"
                          placeholder="Type your answer..."
                          className={`w-full p-2 rounded-lg ${themeMode === 'theme-mode-dark' ? 'bg-gray-600 text-txt-white placeholder-gray-400' : 'bg-white text-black placeholder-gray-700 border-1 border-gray-300 shadow-lg'} `}
                          value={answerInput[question.quesId] || ""}
                          onChange={(e) => handleAnswerChange(question.quesId, e.target.value)}
                        />
                        <button
                          className="bg-green-500 text-white p-2 rounded-lg flex items-center justify-center gap-2 hover:bg-green-600"
                          onClick={() => handleSendAnswer(product.productId, question.quesId)}
                        >
                          <FaPaperPlane />
                          Send
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

          </>
        )
      }
    </div>
  );
};

export default ProductQuestions;
