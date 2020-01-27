import React, { useState, useEffect } from 'react';
import History from '../helpers/stack';
import AllAuditionsPage from './audition/AllAuditionsPage';
import AllPeoplePage from './user/AllPeoplePage';

const ReelsDashboardPage = () => {
    const [selection, setSelection] = useState('auditions');

    const [history, setHistory] = useState([])

    useEffect(() => {
        let recentHistory = new History(JSON.parse(localStorage.getItem('history')))

        if (recentHistory)
            setHistory(recentHistory.reverse())
    }, [])
    
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
            {
                history.map((element) => {
                    return <p>{element}</p>
                })
            }
        </div>
        
    )
}

export default ReelsDashboardPage;