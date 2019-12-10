import React, { useState } from 'react';
import ContentPage from './AllAuditionsPage';
import RecommendedAuditions from './RecommendedAuditions';
import RecommendedProfiles from './RecommendedProfiles';

const ReelsDashboardPage = () => {
    const [selection, setSelection] = useState('auditions');
    
    return (
        <div className="content-main__item-wide">
            <div className="main">
                <div className="main__navigation">
                    <h1>Browse</h1>
                    <button className="button" onClick={() => setSelection('auditions')}>Auditions</button>
                    <button className="button" onClick={() => setSelection('people')}>People</button>
                </div>
                <div>
                    { selection === 'auditions' ? <ContentPage /> : <div><h1>People component</h1></div>}    
                </div>
            </div>
        </div>
    )
}

export default ReelsDashboardPage;