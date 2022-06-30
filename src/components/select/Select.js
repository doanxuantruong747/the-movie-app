import React from 'react';

import './select.scss';


const Select = ({ setvalue, value, genres }) => {

    const handleChange = (e) => {
        setvalue(e.target.value)
    };
    return (
        <>
            <select
                value={value}
                onChange={(e) => handleChange(e)}

            >
                <option value=''>Category All</option>
                {genres.map((genre) => (
                    <option key={genre.id} value={genre.id}>{genre.name}</option>
                ))

                }

            </select>
        </>
    );
}
export default Select;
