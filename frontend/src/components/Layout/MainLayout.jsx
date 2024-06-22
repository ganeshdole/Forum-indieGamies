import Footer from "../Footer/Footer";
import Navbar from "../Header/Navbar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
    return (
        <>
            <header>
                <Navbar />
            </header>
            <main className="min-h-screen mt-[84px]">
                <Outlet />
            </main>
            <footer>
                <Footer />
            </footer>
        </>
    )
}


export default MainLayout;

