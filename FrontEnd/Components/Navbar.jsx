import {NavLink} from 'react-router-dom';
import  './Navbar.css';

function Navbar(){

    return (
    <nav className="nav_container">
      < ul className='no_dot'>
      <li>
      <NavLink to='/' >Home</NavLink >
      </li>
      <li>
      <NavLink to='/search'>search</NavLink>
      </li>
      </ul>
    </nav>
    );

}
export default Navbar;