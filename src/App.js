import './App.css';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import {
  BrowserRouter ,
  Routes,
  Route,
} from "react-router-dom";
import GistUser from './views/GistUser';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<GistUser />}/>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
