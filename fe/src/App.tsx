import { Routes, Route } from 'react-router-dom';
import Banner from './components/BannerMaster/Banner';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Nav from './components/NavigationBar/Nav';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import ArticleDetail from './pages/ArticleDetail/ArticleDetail';
import './App.scss'

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/login" element={<Login />} />
        
        {/* Route cho trang chi tiết bài viết */}
        <Route path="/article/:id" element={
          <>
            <Banner />
            <Header />
            <Nav />
            <main className="body-container">
              <ArticleDetail />
            </main>
            <Footer />
          </>
        } />
        
        <Route path="/" element={
          <>
            <Banner />
            <Header />
            <Nav />
            <main className="body-container">
              <Home />
            </main>
            <Footer />
          </>
        } />
      </Routes>
    </div>
  );
}

export default App
