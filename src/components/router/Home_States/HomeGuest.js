import {Link} from "react-router-dom";
import {getRoute} from "../routes";
import Button from "../../styled/Button/Button";

export default function HomeGuest() {
    return (
    <div className="container">
        <h1>Գլխավոր</h1>
        <p className="mt-6">Դուք չեք կարող որևէ գործողություն կատարել կամ որևէ տեղեկատվություն դիտել առանց
            վավերացման</p>
        <Link to={getRoute("login").path}><Button className="mt-6">Մուտք</Button></Link>
    </div>
    );
}