import TopNavbar from "../components/TopNavbar";
import BottomNavbar from "../components/BottomNavbar";
import MainContent from "../components/MainContent";
import "../styles/HomePage.css";

const HomePage = () => {
  return (
    <div className="home-page-container">
      <TopNavbar />
      <MainContent />
      <BottomNavbar />
    </div>
  );
};

export default HomePage;
