import { Header } from "./header/Header"
import { Home } from "./home/Home";
import { Detail } from "./detail/Detail"
import { Route, Routes } from "react-router-dom";
import { Contact } from "./contact/Contact";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/posts/:id" element={<Detail />} />
        {/* React Router において「動的ルート」を作成するためです。:（コロン）を使うことで、URL パスに動的なパラメータを埋め込むことができる */}
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  );
}

export default App;
