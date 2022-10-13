import {Routes, Route} from 'react-router-dom';

import './App.css';
import { Home } from './Screens/Home/Home';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route 
          path='/' 
          element={
            <>
              <Home></Home>
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
