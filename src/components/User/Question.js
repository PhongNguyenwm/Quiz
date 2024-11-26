import _ from "lodash";
import React from "react";

const Question = (props) => {
  const { data, currentQ } = props;
  if (_.isEmpty(data)) {
    return <></>;
  }

  const handleCheckbox = (e, aId, qId) => {
    console.log("check:", e.target.checked, aId, qId);
    props.handleCheckbox(aId, qId);
  };

  return (
    <>
      {data.img ? (
        <div className="img">
          <img src={`data:image/jpeg;base64,${data.img}`} alt="" />
        </div>
      ) : (
        <div className="img"></div>
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
                    checked={item.isSelected}
                    onChange={(e) =>
                      handleCheckbox(e, item.id, data.questionId)
                    }
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
