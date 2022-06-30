import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MovieCard from '../movieCard/MovieCard';
import Button, { OutlineButton } from '../button/Button';
import tmdbApi, { category, movieType, tvType } from '../../app/tmdbApi';
import { Box, Grid } from '@mui/material';
import Input from '../input/Input'
import Select from '../select/Select'


const MovieGrid = (props) => {

    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const { keyword } = useParams();
    const [genres, setgenres] = useState([])
    const [value, setvalue] = useState(0)


    useEffect(() => {
        const getList = async () => {
            let response = null;
            if (keyword === undefined) {
                const params = {};
                switch (props.category) {
                    case category.movie:
                        response = await tmdbApi.getMoviesList(movieType.upcoming, { params });
                        break;
                    default:
                        response = await tmdbApi.getTvList(tvType.popular, { params });
                }
            } else {
                const params = {
                    query: keyword
                }
                response = await tmdbApi.search(props.category, { params });
            }
            setItems(response.results);
            setTotalPage(response.total_pages);

        }
        getList();
    }, [props.category, keyword]);

    const loadMore = async () => {
        let response = null;
        if (keyword === undefined) {
            const params = {
                page: page + 1
            };
            switch (props.category) {
                case category.movie:
                    response = await tmdbApi.getMoviesList(movieType.upcoming, { params });
                    break;
                default:
                    response = await tmdbApi.getTvList(tvType.popular, { params });
            }
        } else {
            const params = {
                page: page + 1,
                query: keyword
            }
            response = await tmdbApi.search(props.category, { params });
        }
        setItems([...items, ...response.results]);
        setPage(page + 1);

    }

    useEffect(() => {
        const getGenre = async () => {
            const params = {};
            const response = await tmdbApi.getGenre(props.category, { params });
            setgenres(response.genres);

        }
        getGenre();
    }, [props.category]);

    return (
        <>

            <div className="section mb-3">
                <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
                    <MovieSearch category={props.category} keyword={keyword} />
                    <Select category={props.category} genres={genres} value={value} setvalue={setvalue} />
                </Box>
            </div>

            <Grid container spacing={2} mt={1}>

                {items

                    .filter((item) => !value ? item.genre_ids : (item.genre_ids.slice(0, 1)).toString() === value.toString())

                    .map((item, index) => (
                        <Grid key={index} item xs={6} md={4} lg={2}>
                            <MovieCard category={props.category} item={item} key={item.id} />
                        </Grid>
                    ))}
            </Grid>

            {
                page < totalPage ? (
                    <Grid>
                        <Box sx={{ mt: 5, textAlign: 'center' }}>
                            <OutlineButton className="small" onClick={loadMore}>Load more</OutlineButton>
                        </Box>
                    </Grid>
                ) : null
            }
        </>
    );
}
const MovieSearch = (props) => {

    let navigate = useNavigate();

    const [keyword, setKeyword] = useState(props.keyword ? props.keyword : '');


    const goToSearch = useCallback(
        () => {
            if (keyword.trim().length > 0) {
                navigate(`/${category[props.category]}/search/${keyword}`);
            }
        },
        [keyword, props.category, navigate]
    );

    useEffect(() => {
        const enterEvent = (e) => {
            e.preventDefault();
            if (e.keyCode === 5) {
                goToSearch();
            }
        }
        document.addEventListener('keyup', enterEvent);
        return () => {
            document.removeEventListener('keyup', enterEvent);
        };
    }, [keyword, goToSearch]);

    return (
        <div className="movie-search">
            <Input
                type="text"
                placeholder="Enter keyword"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
            />


            <Button className="small" onClick={goToSearch}>Search</Button>
        </div>
    )
}


export default MovieGrid;
