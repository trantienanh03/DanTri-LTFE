import Banner from './components/BannerMaster/Banner';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Nav from './components/NavigationBar/Nav';
import Home from './pages/Home/Home';
import './App.scss'

function App() {
  return (
    <div className="app">
      <Banner />
      <Header />
      <Nav />
      <main className="body-container">
        <Home />
      </main>
      <Footer />
    </div>
  );
}

export default App
