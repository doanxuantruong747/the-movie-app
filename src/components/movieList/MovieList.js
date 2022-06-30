import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import tmdbApi, { category } from '../../app/tmdbApi';
import MovieCard from '../movieCard/MovieCard';
import { Grid } from '@mui/material';


const MovieList = (props) => {

    const [items, setItems] = useState([]);

    useEffect(() => {
        const getList = async () => {
            let response = null;
            const params = {};

            if (props.type !== 'similar') {
                switch (props.category) {
                    case category.movie:
                        response = await tmdbApi.getMoviesList(props.type, { params });
                        break;
                    default:
                        response = await tmdbApi.getTvList(props.type, { params });
                }
            } else {
                response = await tmdbApi.similar(props.category, props.id);
            }
            setItems(response.results);
        }
        getList();
    }, [props]);

    return (

        <Grid container spacing={2} mt={1}>
            {items.map((item, index) => (
                <Grid key={index} item xs={6} md={4} lg={2}>
                    <MovieCard item={item} category={props.category} />
                </Grid>
            ))}
        </Grid>

    );
}

MovieList.propTypes = {
    category: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
}

export default MovieList;
