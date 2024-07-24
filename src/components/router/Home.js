import {useAuth} from "../../context/AuthContext";
import HomeLogged from "./Home_States/HomeLogged";
import HomeGuest from "./Home_States/HomeGuest";


export default function Home(){

    let {logged} = useAuth();
    return (
        <>
            {logged ? <HomeLogged/> : <HomeGuest/>}
        </>
    )
}