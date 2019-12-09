import React, { useState } from 'react';
import AuditionApp from './AuditionApp';
import RecommendedAuditions from '../components/RecommendedAuditions';
import RecommendedProfiles from '../components/RecommendedProfiles';

const Main = () => {
    const [selection, setSelection] = useState('auditions');
    
    return (
        <div className="content-container-full">
            <div className="content-main">
                <div className="content-main__item-narrow border-right">
                    <RecommendedAuditions />
                </div>
                <div className="content-main__item-wide">
                    <div className="main">
                        <div className="main__navigation">
                            <h1>Browse</h1>
                            <button className="button" onClick={() => setSelection('auditions')}>Auditions</button>
                            <button className="button" onClick={() => setSelection('people')}>People</button>
                        </div>
                        <div>
                            { selection === 'auditions' ? <AuditionApp /> : <div><h1>People component</h1></div>}    
                        </div>
                    </div>
                </div>
                <div className="content-main__item-narrow border-left">
                    <RecommendedProfiles />
                </div>
            </div>
        </div> 
    )
}

export default Main;