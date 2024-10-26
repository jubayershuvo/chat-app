
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ErrorSection7 from './pages/404Page.jsx';
import UserRouter from './UserRouter.jsx';
import AdminRouter from './AdminRouter.jsx';

function App() {

  return (
    <Router>
      <Routes>

        <Route path="/*" element={<UserRouter />} />

        <Route path="/admin/*" element={<AdminRouter />} />

        <Route path="*" element={<ErrorSection7 />} />
        
      </Routes>
    </Router>
  );
}


export default App;
