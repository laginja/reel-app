import React from 'react';
import { Link } from 'react-router-dom';

// 'Link' allows us to use client side routing - client side JS renders a new component so 
// there is no call to the server
const NotFoundPage = () => (
    <div>
        404 - <Link to="/">Go home</Link>
    </div>
)

export default NotFoundPage;