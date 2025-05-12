import Navigationbar from "./Navbar/Navbar.js";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <Navigationbar />
      <div style={{ paddingTop: "76px" }}>
        <Outlet />
      </div>
    </>
  );
}

export default Layout;
