import React, { useState } from 'react';
import AllAuditionsPage from './audition/AllAuditionsPage';
import AllJobsPage from './job/AllJobsPage';
import AllPeoplePage from './user/AllPeoplePage';

const ReelsDashboardPage = () => {
    const [selection, setSelection] = useState('auditions');

    const renderSwitch = selection => {
        switch (selection) {
            case "jobs":
                return <AllJobsPage />;
            case "auditions":
                return <AllAuditionsPage />;
            case "people":
                return <AllPeoplePage />;
            default:
                break;
        }
    }

    return (
        <div className="main">
            <div>
                <h1>Browse</h1>
                <button className="button" onClick={() => setSelection('jobs')}>Jobs</button>
                <button className="button" onClick={() => setSelection('auditions')}>Auditions</button>
                <button className="button" onClick={() => setSelection('people')}>People</button>
            </div>
            <div>
                {
                    renderSwitch(selection)
                }
            </div>
        </div>
    )
}

export default ReelsDashboardPage;