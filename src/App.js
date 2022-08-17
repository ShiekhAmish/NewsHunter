import './App.css';
import React, { useState } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
const App = ()=>{

const apikey=process.env.REACT_APP_NEWS_API
const [Progress, setProgress] = useState(0)



    return (
      <div>
        <Router>
        <Navbar/>
        <LoadingBar
        color='#f11946'
        height={3}
        progress={Progress} 
        
      />
        <Routes>
        <Route exact path="/" element={<News setProgress={setProgress} apikey={apikey}  key="general" category="general"/>} />
        <Route exact path="/business" element={<News setProgress={setProgress} apikey={apikey}   key="business"  category="business"/>} />
        <Route exact path="/entertainment" element={<News setProgress={setProgress} apikey={apikey}   key="entertainment" category="entertainment"/>} />
        <Route exact path="/general" element={<News setProgress={setProgress} apikey={apikey}   key="general" category="general"/>} />
        <Route exact path="/health" element={<News setProgress={setProgress} apikey={apikey}   key="health" category="health"/>} />
        <Route exact path="/science" element={<News setProgress={setProgress} apikey={apikey}   key="science" category="science"/>} />
        <Route exact path="/sports" element={<News setProgress={setProgress} apikey={apikey}   key="sports" category="sports"/>} />
        <Route exact path="/technology" element={<News setProgress={setProgress} apikey={apikey}   key="technology" category="technology"/>} />
        </Routes>
        </Router>
      </div>
    )
  
}

export default App;
