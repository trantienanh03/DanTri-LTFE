import { Routes, Route } from 'react-router-dom';

import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Nav from './components/NavigationBar/Nav';
import Home from './pages/Home/Home';
import ArticleDetail from './pages/ArticleDetail/ArticleDetail';
import Profile from './pages/Profile/Profile';
import AuthModal from './components/AuthModal/AuthModal';
import { AuthProvider } from './context/AuthContext';
import { SavedProvider } from './context/SavedContext';
import './App.scss'

function App() {
  return (
    <div className="app">
      <SavedProvider>
        <AuthProvider>
        <AuthModal />
        <Routes>


          <Route path="/profile" element={
            <>
              <Header />
              <Nav />
              <main className="body-container">
                <Profile />
              </main>
              <Footer />
            </>
          } />

          {/* Route cho trang chi tiết bài viết */}
          <Route path="/article" element={
            <>

              <Header />
              <Nav />
              <main className="body-container">
                <ArticleDetail />
              </main>
              <Footer />
            </>
          } />

          <Route path="/category/:slug" element={
            <>

              <Header />
              <Nav />
              <Home />
              <Footer />
            </>
          } />


          <Route path="/" element={
            <>

              <Header />
              <Nav />
              <Home />
              <Footer />
            </>
          } />
        </Routes>
      </AuthProvider>
    </SavedProvider>
  </div>
  );
}

export default App
