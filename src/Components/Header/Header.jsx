import { useHistory, useLocation } from 'react-router-dom';
import { useStateValue } from '../../StateManagement/StateProvider';
import './Header.css';

function Header() {
  const [{}, dispatch] = useStateValue();
  const history = useHistory();
  const location = useLocation();

  const backHome = () => {
    console.log(location)
    dispatch({
      type: "RESET",
    });
    history.push('/');
  }

  return (
    <header className='quiz__header'>
      {location.pathname !== '/' && <button onClick={backHome}>Home</button>}
      <h1>Quiz Coding Challenge</h1>    
    </header>
  )
}

export default Header
