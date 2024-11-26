import _ from "lodash";
import React from "react";
import { Form } from "react-bootstrap";

const Question = (props) => {
  const { data, currentQ } = props;
  console.log(data);
  if (_.isEmpty(data)) {
    return <></>;
  }
  return (
    <>
      {data.img && (
        <div className="img">
          <img src={`data:image/jpeg;base64,${data.img}`} alt="" />
        </div>
      )}
      <div className="question">
        Question {currentQ + 1}: {data.questionDesc}?
      </div>
      <div className="answer">
        {data.answers &&
          data.answers.length > 0 &&
          data.answers.map((item, index) => {
            return (
              <div key={`answer-${index}`}>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                  />
                  <label className="form-check-label">{item.description}</label>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Question;
