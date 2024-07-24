import {Link} from "react-router-dom";
import {getRoute} from "./routes";
import Button from "../styled/Button/Button";

export default function NotFound() {

    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        textAlign: 'center',
    };

    return (
        <div style={containerStyle}>
            <h1>Oops!!!</h1>
            <p>Page not found</p>
            <Link to={getRoute("home").path}><Button className="mt-4">Go to Main</Button></Link>
        </div>
    );
};

