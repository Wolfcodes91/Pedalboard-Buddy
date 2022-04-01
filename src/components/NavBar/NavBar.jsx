import { isDOMComponent } from "react-dom/test-utils";
import { Link } from "react-router-dom"
import * as userService from '../../utilities/users-service';
import "./NavBar.css"


export default function NavBar({ user, setUser, isOpen, onOpen, onClose, cancelRef}) {
    function handleLogOut() {
        userService.logOut();
        setUser(null);
    }

    function handleLogIn() {
        onOpen()
    }

    return (
    <nav>
       <object className="logo" type="image/svg+xml" data="Photos/pedalboard-buddy-3.svg"></object>
       &nbsp; | &nbsp;
       { user ? 
       <span>Welcome, {user.name}</span> 
        :
        <span>Welcome</span> 
        }
       &nbsp; | &nbsp;
       { user ?
       <Link onClick={handleLogOut} to=''>Log Out</Link>
       :
       <Link onClick={handleLogIn} to=''>Log In</Link>
        }
       &nbsp; | &nbsp;
    </nav>
    )
}