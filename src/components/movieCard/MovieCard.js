import React from 'react';
import './movie-card.scss';
import { Link } from 'react-router-dom';
import Button from '../button/Button';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import apiConfig from '../../app/apiConfig';
import { category } from '../../app/tmdbApi';


const MovieCard = props => {

    const item = props.item;

    const link = '/' + category[props.category] + '/' + item.id;

    const bg = apiConfig.w500Image(item.poster_path || item.backdrop_path);

    return (
        <Link to={link}>
            <div className="movie-card" style={{ backgroundImage: `url(${bg})` }}>
                <Button>
                    <i className="bx bx-play"><PlayArrowIcon /></i>
                </Button>
            </div>
            <h3>{item.title || item.name}</h3>

        </Link>
    );
}

export default MovieCard;
