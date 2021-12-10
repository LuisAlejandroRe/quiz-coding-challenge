import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useStateValue } from '../../StateManagement/StateProvider';
import './Quiz.css';

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

  }, [questions, history])

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
    <div className='quiz'>
      {currentQuestion &&
        <form className='quiz__form'>
          <h1>{currentQuestion.category}</h1>
          <p className='quiz__question'>{currentQuestion.question}</p>
          <p>{currentQuestion.index + 1 + '/10'}</p>
          <div className="quiz__formButtons">
            <button type='submit' onClick={(e) => handleSubmit(e, 'True')}>True</button>
            <button type='submit' onClick={(e) => handleSubmit(e, 'False')}>False</button>
          </div>
        </form>
      }
    </div>
  )
}

export default Quiz
