import React from 'react';
import { Link } from 'react-router-dom';

const BrowsingHistoryItem = ({ item }) => {
    return (
        <div>
            <Link to={`/audition/${item.id}`}>
                {item.title}
            </Link>
        </div>
    )
}

export default BrowsingHistoryItem;