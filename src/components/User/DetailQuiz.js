import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getDataQuiz } from "../../services/apiService";
import _ from "lodash";
import "./DetailQuiz.scss";
import Question from "./Question";

const DetailQuiz = (props) => {
  const params = useParams();
  const quizId = params.id;
  const location = useLocation();
  const [dataQuiz, setDataQuiz] = useState([]);
  const [currentQ, setCurrentQ] = useState(0);

  useEffect(() => {
    const fetchQuestions = async () => {
      const res = await getDataQuiz(quizId);
      if (res && res.EC === 0) {
        let raw = res.DT;
        let data = _.chain(raw)
          .groupBy("id")
          .map((value, key) => {
            let answers = [];
            let questionDesc,
              img = null;
            value.forEach((item, index) => {
              if (index === 0) {
                questionDesc = item.description;
                img = item.image;
              }
              answers.push(item.answers);
            });
            return { questionId: key, answers, questionDesc, img };
          })
          .value();
        setDataQuiz(data);
      }
    };
    fetchQuestions();
  }, [quizId]);

  const handlePrev = (params) => {
    if (currentQ - 1 < 0) return;
    setCurrentQ(currentQ - 1);
  };
  const handleNext = () => {
    if (dataQuiz && dataQuiz.length > currentQ + 1) {
      setCurrentQ(currentQ + 1);
    }
  };

  return (
    <div className="detail-quiz-container container">
      <div className="left-content">
        <div className="title">
          Quiz {quizId}: {location?.state?.quizTitle}
        </div>
        <hr />

        <div className="content">
          <Question
            data={dataQuiz && dataQuiz.length > 0 ? dataQuiz[currentQ] : []}
            currentQ={currentQ}
          />
        </div>
        <div className="footer">
          <button className="btn btn-primary" onClick={() => handlePrev()}>
            Prev
          </button>
          <button className="btn btn-secondary" onClick={() => handleNext()}>
            Next
          </button>
        </div>
      </div>
      <div className="right-content">right-content</div>
    </div>
  );
};

export default DetailQuiz;
