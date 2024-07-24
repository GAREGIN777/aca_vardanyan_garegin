import Button from "../styled/Button/Button";
import Input from "../styled/Input/Input";
import {useAuth} from "../../context/AuthContext";
import {useRef, useState} from "react";
import {useAcaAPI} from "../../context/DataContext";
import {toast} from "react-toastify";
import {getRoute} from "./routes";
import {useNavigate} from "react-router-dom";

export default function Login(){


   const {login} = useAuth();

   const navigate = useNavigate();

   const [username, setUsername] = useState('user1');
   const [password, setPassword] = useState('a123!');
   const [submitted,setSubmitted] = useState(false);

   const handleUsernameChange = (e) => {
      setUsername(e.target.value);
   };

   const handlePasswordChange = (e) => {
      setPassword(e.target.value);
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      setSubmitted(true);

      const userNameError = !username.trim();
      const passwordError = !password.trim();

      if (userNameError || passwordError) {
         setSubmitted(false);
         if (userNameError) {
            toast.error("Անունը անհրաժեշտ է")
            return;
         }
         if (passwordError) {
            toast.error("Գաղտնաբառը անհրաժեշտ է")
            return;
         }
      }

      const loggedInSuccessfully = await login(username, password); // Assuming login is an async function

      if (loggedInSuccessfully) {
         toast.success('Դուք հաջողությամբ եք գրանցվել');
         navigate(getRoute("home").path);
      } else {
         toast.error("Այդպիսի տվյալներով օգտատեր չի գտնվել");
      }

      // Reset submitted state after a short delay
      setTimeout(() => setSubmitted(false), 1000);
   };




   return (
   <form className="container" onSubmit={handleSubmit}>
      <div>
         <h1>Մուտք</h1>
         <Input onChange={handleUsernameChange} value={username} className="mt-6" placeholder="Անուն" ></Input>
         <Input onChange={handlePasswordChange} value={password} className="mt-4" placeholder="Գաղտնաբառ" type="password"></Input>
         <Button type="submit" disabled={submitted} className="mt-6">Գրանցվել</Button>
      </div>
   </form>
   )
}