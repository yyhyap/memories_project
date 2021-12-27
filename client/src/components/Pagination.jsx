import React from 'react';
import { Pagination, PaginationItem } from '@mui/material';
import { Link } from 'react-router-dom';

import useStyle from './styles';

const Paginate = () => {
    const classes = useStyle();

    return (
        <Pagination 
            classes={{ ul: classes.ul }}
            // pages
            count={5}
            // current page
            page={1}
            variant="outlined"
            color="primary"
            renderItem={(item) => (
                <PaginationItem {...item} component={Link} to={`/posts?page=${1}`} />
            )}
        />
    )
}

export default Paginate;