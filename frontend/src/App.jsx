import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import { ReviewProvider } from './context/ReviewContext';
import Navbar from './components/Layout/Navbar';
import Home from './pages/Home/Home';
import MovieDetail from './pages/MovieDetail/MovieDetail';
import Search from './pages/Search/Search';
import MyReviews from './pages/MyReviews/MyReviews';
import './styles/global.css';
import './utils/keepAlive'; // Import keep-alive service (auto-starts in production)

function App() {
  return (
    <UserProvider>
      <ReviewProvider>
        <Router>
          <div className="App">
            <Navbar />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/movie/:id" element={<MovieDetail />} />
                <Route path="/tv/:id" element={<MovieDetail />} />
                <Route path="/search" element={<Search />} />
                <Route path="/my-reviews" element={<MyReviews />} />
              </Routes>
            </main>
          </div>
        </Router>
      </ReviewProvider>
    </UserProvider>
  );
}

export default App;
