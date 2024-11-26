import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getDataQuiz } from "../../services/apiService";
import _ from "lodash";
import "./DetailQuiz.scss";

const DetailQuiz = (props) => {
  const params = useParams();
  const quizId = params.id;
  const location = useLocation();

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
      }
    };
    fetchQuestions();
  }, [quizId]);

  return (
    <div className="detail-quiz-container container">
      <div className="left-content">
        <div className="title">
          Quiz {quizId}: {location?.state?.quizTitle}
        </div>
        <hr />
        <div className="img">
          <img src="" alt="" />
        </div>
        <div className="content">
          <div className="question">question ?</div>
          <div className="answer">
            <div>A.đâsdá</div>
            <div>B.đâsdá</div>
            <div>C.đâsdá</div>
          </div>
        </div>
        <div className="footer">
          <button className="btn btn-primary">Prev</button>
          <button className="btn btn-secondary">Next</button>
        </div>
      </div>
      <div className="right-content">right-content</div>
    </div>
  );
};

export default DetailQuiz;
