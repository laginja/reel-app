import React, { useState } from 'react';
import AllAuditionsPage from './AllAuditionsPage';
import AllPeoplePage from './AllPeoplePage';

const ReelsDashboardPage = () => {
    const [selection, setSelection] = useState('auditions');
    
    return (
        <div className="content-main__item-wide">
            <div className="main__navigation">
                <h1>Browse</h1>
                <button className="button" onClick={() => setSelection('auditions')}>Auditions</button>
                <button className="button" onClick={() => setSelection('people')}>People</button>
            </div>
            <div>
                { selection === 'auditions' ? <AllAuditionsPage /> : <AllPeoplePage />}    
            </div>
        </div>
        
    )
}

export default ReelsDashboardPage;