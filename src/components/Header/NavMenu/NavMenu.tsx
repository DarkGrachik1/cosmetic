import "./NavMenu.sass"
import {Link} from "react-router-dom";
import {useAuth} from "../../../hooks/users/useAuth";
import {useEffect} from "react";

const NavMenu = () => {

    const {is_authenticated, auth, user_name} = useAuth()

    useEffect(() => {
        auth()
    }, [])

    return (
        <div className="menu-wrapper">

            <Link to="/substances" className="menu-item">
                <span>Вещества</span>
            </Link>

            {is_authenticated &&
                <Link to="/cosmetics" className="menu-item">
                    <span>Косметика</span>
                </Link>
            }

            {is_authenticated &&
                <Link to="/profile" className="menu-item">
                    <span>{user_name}</span>
                </Link>
            }

            {!is_authenticated &&
                <Link to="/login" className="menu-item">
                    <span>Вход</span>
                </Link>
            }

        </div>
    )
}

export default NavMenu;