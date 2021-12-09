import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useStateValue } from '../../StateManagement/StateProvider';


function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [{questions}, dispatch] = useStateValue();
  const history = useHistory();

  useEffect(() => {

    if(!questions){
      return history.push('/')
    };

    const question = questions[0];
    question.index = 0
    setCurrentQuestion(question);

  }, [questions])

  const handleSubmit = (e, answer) => {
    e.preventDefault();

    if(answer === currentQuestion.correct_answer) {
      dispatch({
        type: "SET_RESULTS",
        result: {question: currentQuestion.question, correct: true},
      });
    } else {
      dispatch({
        type: "SET_RESULTS",
        result: {question: currentQuestion.question, correct: false},
      });
    }  

    if(currentQuestion.index < 9) {
      const question = questions[currentQuestion.index + 1];
      question.index = currentQuestion.index + 1;
      return setCurrentQuestion(question);
    } else {
      return history.push('/results')
    }

  }

  return (
    <div>
      <h1>Quiz</h1>
      {currentQuestion &&
        <form>
          <h1>{currentQuestion.category}</h1>
          <p>{currentQuestion.question}</p>
          <button type='submit' onClick={(e) => handleSubmit(e, 'True')}>True</button>
          <button type='submit' onClick={(e) => handleSubmit(e, 'False')}>False</button>
        </form>
      }
    </div>
  )
}

export default Quiz
