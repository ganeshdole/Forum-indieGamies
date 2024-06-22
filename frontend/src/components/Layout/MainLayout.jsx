import Footer from "../Footer/Footer";
import Navbar from "../Header/Navbar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
    return (
        <>
            <header>
                <Navbar />
            </header>
            <main className="bg-gray-100 min-h-screen">
                <Outlet />
            </main>
            <footer>
                <Footer />
            </footer>
        </>
    )
}


export default MainLayout;

