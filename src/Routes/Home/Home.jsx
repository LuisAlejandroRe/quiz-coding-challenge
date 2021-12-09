import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useStateValue } from "../../StateManagement/StateProvider"

function Home() {
  const [categories, setCategories] = useState(null);
  const [formData, setFormData] = useState({
    category: 'Any',
    difficulty: 'Any Difficulty',
  });
  const [{}, dispatch] = useStateValue();
  const history = useHistory();

  useEffect(() => {
    
    axios.get('https://opentdb.com/api_category.php')
      .then( res => {
        let categories = res.data.trivia_categories;
        setCategories(categories);
      })
      .catch(error => {
        console.error(error);
        alert(error.message);
      })

  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();

    const categoryURL = formData.category === 'Any' ? '' : `&category=${formData.category}`;
    const difficultyURL = formData.difficulty === 'Any Difficulty' ? '' : `&difficulty=${formData.difficulty}`;
    const URL = `https://opentdb.com/api.php?amount=10${categoryURL}${difficultyURL}&type=boolean`;
    console.log(URL)

    axios.get(URL)
      .then( res => {
        if(res.data.response_code === 0) {
          dispatch({
            type: "SET_QUESTIONS",
            questions: res.data.results,
          });
          return history.push('/quiz')
        }
        if(res.data.response_code === 1) (alert('We do not have enough questions for your query, please try again'));
      })
      .catch(error => {
        console.error(error);
        alert(error.message);
      });

  }

  return (
    <div>
      <h1>Home</h1>
      <form>
        <label>Select Category:</label>
        <select defaultValue={'Any'} name="category" onChange={ e => setFormData(prevData => ({...prevData, category: e.target.value}))}>
          <option value='Any' >Any Category</option>
          {categories && 
            categories.map(category => (
              <option value={category.id}>{category.name}</option>
            ))
          }
        </select>
        <label>Select Difficulty:</label>
        <select defaultValue={'Any Difficulty'} name="Difficulty" onChange={ e => setFormData(prevData => ({...prevData, difficulty: e.target.value}))}>
          <option value='Any Difficulty'>Any Difficulty</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <button type="submit" onClick={handleSubmit}>Begin</button>
      </form>
    </div>
  )
}

export default Home
