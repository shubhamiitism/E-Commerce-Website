import {Routes,Route} from 'react-router-dom';
import styles from './App.module.css';
import Upload  from '../Components/Upload';
import Navbar from '../Components/Navbar';
import Search from '../Components/Search';
function App() {
 
  return (
    <div className={styles.App_container}>
     <Navbar></Navbar>
      <Routes>
        
        <Route path='/' element={<Upload />} />

        <Route path='/search' element={<Search />} />

      </Routes>
    </div>
  )
}

export default App
