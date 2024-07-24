import {useAuth} from "../../../context/AuthContext";
import styles from "./Navbar.module.css"
import classNames from "classnames";
import Button from "../../styled/Button/Button";
import {TbLogout} from "react-icons/tb";

export default function NavbarLogged(){
    //const {logged} = useAuth();
    "Դուք հաջողությամբ դուրս եկաք";
   let {user,logout} = useAuth();

   let onLogout = (e) => {
       e.target.setAttribute("disabled", true);
       logout();
   };
    return (
        <nav className={styles.navbar}>
            <div className={classNames(styles.navbarWrapper,"container")}>
                <div className={styles.navbarLogo}>
                    {user.getName()}
                </div>
                <ul className={styles.navbarLinks}>

                    <li className={styles.navLink}>
                        <Button onClick={onLogout}>Ելք</Button>
                    </li>


                </ul>
            </div>
        </nav>
    );
}

