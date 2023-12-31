import { Outlet } from "react-router-dom";
import Heading from "../components/Heading";


const Main = () => {
    return (
        <div>
        <Heading></Heading>
           <Outlet></Outlet> 
        </div>
    );
};

export default Main;