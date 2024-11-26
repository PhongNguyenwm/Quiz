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
              item.answers.isSelected = false;
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

  const handleCheckbox = (aId, qId) => {
    let dataQuizClone = _.cloneDeep(dataQuiz);
    let question = dataQuizClone.find((item) => +item.questionId === +qId);
    if (question && question.answers) {
      question.answers = question.answers.map((item) => {
        if (+item.id === +aId) {
          item.isSelected = !item.isSelected;
        }
        return item;
      });
    }
    let index = dataQuizClone.findIndex((item) => +item.questionId === +qId);
    if (index > -1) {
      dataQuizClone[index] = question;
      setDataQuiz(dataQuizClone);
    }
  };
  console.log(dataQuiz);

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
            handleCheckbox={handleCheckbox}
          />
        </div>
        <div className="footer">
          <button className="btn btn-primary" onClick={() => handlePrev()}>
            Prev
          </button>
          <button className="btn btn-secondary" onClick={() => handleNext()}>
            Next
          </button>
          <button className="btn btn-warning" onClick={() => handleNext()}>
            Finish
          </button>
        </div>
      </div>
      <div className="right-content">right-content</div>
    </div>
  );
};

export default DetailQuiz;
