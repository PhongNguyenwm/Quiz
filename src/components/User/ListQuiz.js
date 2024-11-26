import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { getQuizByUser } from "../../services/apiService";
import "./ListQuiz.scss";
import { useNavigate } from "react-router-dom";

const ListQuiz = (props) => {
  const [arrQuiz, setArrQuiz] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getQuizData();
  }, []);

  const getQuizData = async () => {
    const res = await getQuizByUser();
    if (res?.EC === 0) {
      setArrQuiz(res.DT);
    }
  };
  return (
    <div className="list-quiz-container container">
      {arrQuiz &&
        arrQuiz.length > 0 &&
        arrQuiz.map((item, index) => {
          return (
            <Card key={`${index}-quiz`} style={{ width: "18rem" }}>
              <Card.Img
                variant="top"
                src={`data:image/jpeg;base64,${item.image}`}
              />
              <Card.Body>
                <Card.Title>Quiz {index + 1}</Card.Title>
                <Card.Text>{item.description}</Card.Text>
                <Button
                  variant="primary"
                  onClick={() =>
                    navigate(`/quiz/${item.id}`, {
                      state: { quizTitle: item.description },
                    })
                  }
                >
                  Start now
                </Button>
              </Card.Body>
            </Card>
          );
        })}
      {arrQuiz && arrQuiz.length === 0 && <div>You dont' have any quiz!</div>}
    </div>
  );
};

export default ListQuiz;
