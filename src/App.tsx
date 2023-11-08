import { Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header/Header";
import Page404 from "./pages/Page404";
import { publicRoutes } from "./routes/routes";

const App = () => {
  const location = useLocation();
  // lấy lọc đường dẫn có header và không có header
  const showHeader = !location.pathname.startsWith("/authentication/");

  return (
    <>
      {showHeader && <Header />}

      <Routes>
        {publicRoutes.map((item: any, index: any) => {
          const Page = item.component;
          return <Route key={index} path={item.path} element={<Page />} />;
        })}

        <Route path="*" element={<Page404 />} />
      </Routes>
    </>
  );
};

export default App;
