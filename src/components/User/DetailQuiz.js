import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDataQuiz } from "../../services/apiService";
import _ from "lodash";

const DetailQuiz = (props) => {
  const params = useParams();
  const quizId = params.id;

  useEffect(() => {
    const fetchQuestions = async () => {
      const res = await getDataQuiz(quizId);
      console.log("check data res:", res);
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
        console.log(data);
      }
    };
    fetchQuestions();
  }, [quizId]);

  return <div className="detail-quiz-container">DetailQuiz</div>;
};

export default DetailQuiz;
