import { useState, useEffect } from 'react';
import { useStateValue } from '../../StateManagement/StateProvider';
import { useHistory } from 'react-router-dom';

function Results() {
  const [score, setScore] = useState('0/10')
  const [{results}] = useStateValue();
  const history = useHistory();

  useEffect(() => {
    
    if(results.length === 0){
      return history.push('/')
    };

    let counter = 0;
    results.forEach(element => {element.correct && counter++});

    setScore(`${counter}/10`)

  }, [results, history])

  return (
    <div>
      <h1>Results</h1>
      <h2>You scored</h2>
      <h2>{score}</h2>
      <ul>
        {results &&
          results.map((result) => (
            <li key={result.question}>{result.question}</li>
          ))
        }
      </ul>    
    </div>
  )
}

export default Results
