import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDataQuiz } from "../../services/apiService";

const DetailQuiz = (props) => {
  const params = useParams();
  const quizId = params.id;

  useEffect(() => {
    const fetchQuestions = async () => {
      const res = await getDataQuiz(quizId);
      console.log("check data res:", res);
    };
    fetchQuestions();
  }, [quizId]);

  return <div className="detail-quiz-container">DetailQuiz</div>;
};

export default DetailQuiz;
