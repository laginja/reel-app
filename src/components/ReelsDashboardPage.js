import React, { useState } from 'react';
import AllAuditionsPage from './audition/AllAuditionsPage';
import AllPeoplePage from './user/AllPeoplePage';

const ReelsDashboardPage = () => {
    const [selection, setSelection] = useState('auditions');

    return (
        <div className="main">
            <div>
                <h1>Browse</h1>
                <button className="button" onClick={() => setSelection('auditions')}>Auditions</button>
                <button className="button" onClick={() => setSelection('people')}>People</button>
            </div>
            <div>
                {selection === 'auditions' ? <AllAuditionsPage /> : <AllPeoplePage />}
            </div>
        </div>
    )
}

export default ReelsDashboardPage;