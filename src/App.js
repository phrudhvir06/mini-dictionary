import { React } from 'react'
import './App.css';
import Search from './views/searchData'; // importing the search component

function App() {
  return (
    <div className="App">
       <h2>Mini Dictionary</h2>
       <Search />
    </div>
  );
}

export default App;
