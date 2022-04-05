import { Link } from "react-router-dom"
import * as userService from '../../utilities/users-service';
import "./NavBar.css"


export default function NavBar({ user, setUser, onOpen, setUserBoards, boardSpot, setBoardSpot}) {
    function handleLogOut(evt) {
        evt.preventDefault()
        userService.logOut();
        boardSpot = [
            { number: '0' },
            { number: '1' },
            { number: '2' },
            { number: '3' },
            { number: '4' },
            { number: '5' },
            { number: '6' },
            { number: '7' },
        ]
        setBoardSpot(boardSpot)
        setUser(null);
        setUserBoards(null)
    }

    function handleLogIn(evt) {
        evt.preventDefault()
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
       <Link onClick={(evt) =>handleLogOut(evt)} to=''>Log Out</Link>
       :
       <Link onClick={(evt) =>handleLogIn(evt)} to=''>Log In</Link>
        }
       &nbsp; | &nbsp;
    </nav>
    )
}