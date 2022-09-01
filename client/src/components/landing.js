import { Link } from 'react-router-dom';
import '../estilos/sass/landing.scss';
import { BsFillCaretRightFill } from 'react-icons/bs';

export default function LandingPage() {
    return (
        <div className="landingPage">
            <Link className='linkHome' to="/videogames">
            <button className='landingButton'>
                <BsFillCaretRightFill /> Press Start
            </button>
            </Link>
        </div>
    );
}