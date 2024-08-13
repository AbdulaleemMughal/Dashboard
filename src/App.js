import "./App.css";
import { Space } from "antd";
import Header from "./components/Header";
import SideMenu from "./components/SideMenu";
import PageContent from "./components/PageContent";
import Footer from "./components/Footer";

function App() {

  const appRoute = {
    
  }

  return (
    <div className="App">
      <Header />
      <Space className="SideMenuAndPageContent">
        <SideMenu />
        <PageContent />
      </Space>
      <Footer />
    </div>
  );
}

export default App;
