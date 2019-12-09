import React from 'react';

const AuditionPage = (props) => {

    console.log(props.match.params.id)
    return (
        <div>
            <h1>Audition </h1>
        </div>
    )
}

export default AuditionPage;