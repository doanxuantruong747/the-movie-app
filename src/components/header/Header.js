
import { Link, useLocation } from 'react-router-dom'
import './header.scss'
import Logo from '../Logo'


const headerNav = [
    {
        display: 'Home',
        path: '/',
    },
    {
        display: 'Movies',
        path: '/movie',
    },
    {
        display: 'TV Series',
        path: '/tv',
    },
    {
        display: 'LogOut',
        path: '/login',
    },

]

const Header = () => {
    const { pathname } = useLocation();
    const active = headerNav.findIndex(e => e.path === pathname)


    return (
        <div className='header'>
            <div className='header_wrap container'>
                <div className='logo'>
                    <Logo />
                    <Link to='/'>ovies</Link>
                </div>
                <ul className="header_nav">
                    {
                        headerNav.map((e, i) => (
                            <li key={i} className={`${i === active ? 'active' : ''}`}>
                                <Link to={e.path} >
                                    {e.display}
                                </Link>
                            </li>
                        ))

                    }

                </ul>

            </div>
        </div>
    )
}


export default Header