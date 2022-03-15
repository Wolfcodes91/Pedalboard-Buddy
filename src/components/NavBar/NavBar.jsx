import { Link } from "react-router-dom"
import * as userService from '../../utilities/users-service';
import "./NavBar.css"


export default function NavBar({ user, setUser}) {
    function handleLogOut() {
        userService.logOut();
        setUser(null);
    }

    return (
    <nav>
       <object className="logo" type="image/svg+xml" data="Photos/pedalboard-buddy-3.svg"></object>
       &nbsp; | &nbsp;
       <span>Welcome, {user.name}</span>  
       &nbsp; | &nbsp;
       <Link onClick={handleLogOut} to=''>Log Out</Link>
       &nbsp; | &nbsp;
    </nav>
    )
}