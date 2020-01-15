import React, { useEffect, useState, useReducer } from 'react';
import { startFetchAudition } from '../../actions/auditions';
import moment from 'moment';
import auditionsReducer from '../../reducers/auditions';
import JobsContext from '../../context/jobs-context';
import JobList from './JobList';
import Loading from '../Loading';

const AuditionPage = (props) => {

    const { id: auditionId } = props.match.params
    
    // create states and provide dispatch function for the reducer to update that state
    const [audition, dispatchAudition] = useReducer(auditionsReducer, [])
    const [auditionLoaded, setAuditionLoaded] = useState(false)

    useEffect(() => {
        startFetchAudition(auditionId, dispatchAudition).then(() => {
            setAuditionLoaded(true)
        })
    }, [auditionId])

    return (
        <div className="content-main__item-wide">
            {!auditionLoaded ? <Loading /> : (
                <div>
                    <h1>{audition.title}</h1>
                    <h5>Added {moment(audition.createdAt).format('DD MMMM, YYYY')}</h5>
                    <div className="audition-page__under-header">
                        {
                            audition.category ? (
                                <div className="audition-page__under-header-item">
                                    <span>{audition.category}</span>
                                </div>
                            ) : ""
                        }
                        {
                            audition.paid ? (
                                <div className="audition-page__under-header-item">
                                    <span>Paid</span>
                                </div>
                            ) : (
                                    <div className="audition-page__under-header-item">
                                        <span>Unpaid</span>
                                    </div>
                                )
                        }
                        {
                            audition.location ? (
                                <div className="audition-page__under-header-item">
                                    <span>{audition.location}</span>
                                </div>
                            ) : ""
                        }
                    </div>
                    <div className="audition-page__description">
                        {audition.description ? audition.description : ""}
                    </div>
                    <h3>Audition date {moment(audition.auditionDate).format('DD MMMM, YYYY')}</h3>
                    <h3>Job positions</h3>
                    {
                        !audition.crewMembers ? (
                            <div>
                                <span>No jobs specified</span>
                            </div>
                        ) : (   
                                /* TODO refactor audition to store it's ID */
                                <JobsContext.Provider value={{ audition, auditionId }}>
                                    <JobList />
                                </JobsContext.Provider>
                            )

                    }
                </div>
            )}
        </div>
    )
}

export default AuditionPage;