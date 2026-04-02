import Navbar from "./navbar";
import logo from "../../assets/logo.png"
import TypographyH4 from "./typographyH4";

function Header(){
    return (
        <div className="mx-6 mt-4 px-6 py-3 rounded-full border border-black shadow-md flex items-center justify-between bg-white">
            <div className="flex  items-center">
                <img src={logo} className="h-10 w-10 rounded-full"/>
                <TypographyH4>ALGOLYX</TypographyH4>
            </div>
            <div><Navbar/></div>
        </div>
    );
}

export default Header;