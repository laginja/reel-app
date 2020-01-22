import React, { useState, useContext, useReducer, useEffect } from 'react';
import { SingleDatePicker } from 'react-dates';
import { addJobInput, removeJobInput, setJobInputs } from '../../actions/jobsInput';
import moment from 'moment';
import AuthContext from '../../context/auth-context';
import jobsInputReducer from '../../reducers/jobsInput';
import JobsInput from './JobsInput';
import 'react-dates/lib/css/_datepicker.css'
import 'react-dates/initialize' // imported to clear the error I was getting

const AuditionForm = (props) => {
    /* 
        'useState()' returns an array with 2 items -> 1st current state value that's gonna change over time, 
        2nd is a function we can call to update the state.

        'useState' uses 'useReducer' in the BG
    */
    // get user that is logged-in 
    const { currentUser } = useContext(AuthContext)

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [createdAt, setCreatedAt] = useState(moment())
    const [category, setCategory] = useState('')
    const [auditionDate, setAuditionDate] = useState(moment())
    const [calendarFocused, setCalendarFocus] = useState(false)
    const [location, setLocation] = useState('')
    const [paid, setPaid] = useState(false)
    const [error, setError] = useState('')

    // create state for crew members input 
    const jobInput = { id: '', job: '', description: '' };
    const [jobs, dispatchJobs] = useReducer(jobsInputReducer, []);

    const onDateChange = (auditionDate) => {
        if (auditionDate) {
            setAuditionDate(auditionDate)
        }
    };

    const onFocusChange = ({ focused }) => {
        setCalendarFocus(focused)
    };

    // Add Crew member field 
    const addJob = (e) => {
        e.preventDefault()
        dispatchJobs(addJobInput(jobInput))
    };

    // Remove Crew member field 
    const removeJob = (e, { id }) => {
        e.preventDefault()
        dispatchJobs(removeJobInput(id))
    };

    // Update jobs state on input change 
    const handleJobInputChange = (e) => {
        e.preventDefault()
        const jobInputs = [...jobs];
        jobInputs[e.target.dataset.idx][e.target.name] = e.target.value;
        dispatchJobs(setJobInputs(jobInputs))
    };

    // Submit new audition
    const onSubmit = (e) => {
        e.preventDefault()

        const { uid } = currentUser;

        // check for title and body
        if (!title || !description) {
            setError('Please fill the form')
        } else {
            props.onSubmit({
                title: title,
                description: description,
                createdAt: createdAt.valueOf(),
                category: category,
                auditionDate: auditionDate.valueOf(),
                location: location,
                paid: paid,
                jobs: jobs,
                ownerId: uid
            })
        }
    };
    
    useEffect(() => {
        // check whether we are editing or creating a new audition
        setTitle(props.audition ? props.audition.title : '')
        setDescription(props.audition ? props.audition.description : '')
        setCreatedAt(props.audition ? moment(props.audition.createdAt) : moment())
        setCategory(props.audition ? props.audition.category : '')
        setAuditionDate(props.audition ? moment(props.audition.auditionDate) : moment())
        setLocation(props.audition ? props.audition.location : '')
        setPaid(props.audition ? props.audition.paid : false)      
        if (props.audition) {
            dispatchJobs(setJobInputs(props.audition.jobs))
        }
    }, [props.audition])

    return (
        <form className="form" onSubmit={onSubmit}>
            {error && <p className="form__error">{error}</p>}
            <h3>General</h3>
            <input
                value={title}
                className="text-input"
                placeholder="Title"
                onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
                value={description}
                className="textarea"
                placeholder="Audition Description"
                onChange={(e) => setDescription(e.target.value)}
            />
            <input
                value={category}
                className="text-input"
                placeholder="Category"
                onChange={(e) => setCategory(e.target.value)}
            />
            <SingleDatePicker
                placeholder="Audition Date"
                date={auditionDate}
                onDateChange={onDateChange}
                focused={calendarFocused}
                onFocusChange={onFocusChange}
                numberOfMonths={1}
                block
            />
            <input
                value={location}
                className="text-input"
                placeholder="Location"
                onChange={(e) => setLocation(e.target.value)}
            />
            <h3>Jobs</h3>
            <div>
                <button className="button" onClick={addJob}>New job</button>
            </div>
            {
                jobs.map((job, idx) => {
                    props.audition ? job.id = props.audition.jobs[idx].id : job.id = idx 
                    return (
                        <JobsInput
                            key={job.id}
                            index={idx}
                            job={job}
                            removeJob={removeJob}
                            handleJobInputChange={handleJobInputChange}
                        />
                    )
                })
            }
            <div>
                <input className="button button--add" type="submit" value={props.audition ? "Edit audition" : "Add Audition"} />
            </div>
        </form>
    )
}

export { AuditionForm as default }