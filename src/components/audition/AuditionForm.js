import React, { useState, useContext, useReducer, useEffect } from 'react';
import { SingleDatePicker } from 'react-dates';
import { addJobInput, removeJobInput, setJobInputs } from '../../actions/jobsInput';
import moment from 'moment';
import AuthContext from '../../context/auth-context';
import jobsInputReducer from '../../reducers/jobsInput';
import JobsInput from './JobsInput';
import 'react-dates/lib/css/_datepicker.css'
import 'react-dates/initialize' // imported to clear the error I was getting

// MUI 
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import WorkOutlineIcon from '@material-ui/icons/WorkOutline';

const useStyles = makeStyles(theme => ({
    root: {
        padding: '16px 0',
        '& .MuiTextField-root': {
            'margin-top': theme.spacing(1),
            width: '100%',
        },
    },
    success: {
        color: '#fff',
        background: '#10B91F',
        'margin-top': "20px"
    }
}));

const categories = [
    {
        value: 'Action',
        label: 'Action',
    },
    {
        value: 'Drama',
        label: 'Drama',
    },
    {
        value: 'Comedy',
        label: 'Comedy',
    },
    {
        value: 'Horror',
        label: 'Horror',
    },
];

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
    const [category, setCategory] = useState('Action')
    const [auditionDate, setAuditionDate] = useState(moment())
    const [calendarFocused, setCalendarFocus] = useState(false)
    const [location, setLocation] = useState('')
    const [paid, setPaid] = useState(false)
    const [error, setError] = useState('')

    // create state for crew members input 
    const jobInput = { id: '', position: '', description: '', age: '', roleType: '', isNew: false };
    const [jobs, dispatchJobs] = useReducer(jobsInputReducer, []);

    // we need to be able to manipulate jobs in order to remove them so we store them in a state
    const [jobsArray, setJobsArray] = useState([])

    // state to store all job ids that need to be removed. We pass is an an object property to the correct action
    const [jobsToRemove, setJobsToRemove] = useState([]);

    const onDateChange = (auditionDate) => {
        if (auditionDate) {
            setAuditionDate(auditionDate);
        }
    };

    const onFocusChange = ({ focused }) => {
        setCalendarFocus(focused);
    };

    // Add Crew member field 
    const addJob = (e) => {
        e.preventDefault();
        dispatchJobs(addJobInput(jobInput));
    };

    // Remove Crew member field 
    const removeJob = (e, { id }) => {
        e.preventDefault();

        // remove job from the state
        setJobsArray(jobsArray.filter(item => {
            return item.id !== id;
        }))
        // lay out all job ids that need to be removed in a new array
        let jobsArrayToRemove = [...jobsToRemove];
        // append the id of a job to be removed to the new array
        if (typeof id === 'string')
            jobsArrayToRemove.push(id)
        // set new jobsToRemove state
        setJobsToRemove(jobsArrayToRemove)

        dispatchJobs(removeJobInput(id));
    };

    // Update jobs state on input change 
    const handleJobInputChange = (e) => {
        console.log(e)
        console.log(e.target.dataset.idx)
        console.log(e.target.name)
        console.log(e.target.value)
        e.preventDefault();
        const jobInputs = [...jobs];
        jobInputs[e.target.dataset.idx][e.target.name] = e.target.value;

        if (jobInputs[e.target.dataset.idx]["position"] !== "Actor" ) {
            jobInputs[e.target.dataset.idx]["age"] = 0;    
            jobInputs[e.target.dataset.idx]["roleType"] = '';
        }
        console.log(jobInputs[e.target.dataset.idx][e.target.name])
        dispatchJobs(setJobInputs(jobInputs));
    };

    // Submit new audition
    const onSubmit = (e) => {
        e.preventDefault();

        const { uid } = currentUser;

        // check for title and body
        if (!title || !description) {
            setError('Please fill the form');
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
                jobsToRemove: jobsToRemove,
                ownerId: uid
            })
        }
    };

    useEffect(() => {
        // check whether we are editing or creating a new audition
        setTitle(props.audition ? props.audition.title : '');
        setDescription(props.audition ? props.audition.description : '');
        setCreatedAt(props.audition ? moment(props.audition.createdAt) : moment());
        setCategory(props.audition ? props.audition.category : '');
        setAuditionDate(props.audition ? moment(props.audition.auditionDate) : moment());
        setLocation(props.audition ? props.audition.location : '');
        setPaid(props.audition ? props.audition.paid : false);
        if (props.audition) {
            dispatchJobs(setJobInputs(props.audition.jobs));
        }
        setJobsArray(props.audition ? props.audition.jobs : [])
    }, [props.audition])

    //MUI
    const classes = useStyles();

    return (
        <form className={classes.root} onSubmit={onSubmit}>
            {error && <p className="form__error">{error}</p>}
            <div>
                <TextField
                    value={title}
                    required
                    id="standard-required-title"
                    label="Title"
                    onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div>
                <TextField
                    value={description}
                    required
                    id="standard-multiline-flexible"
                    multiline
                    label="Description"
                    onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div>
                <TextField
                    id="standard-select-category"
                    required
                    select
                    label="Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    helperText="Select category"
                >
                    {categories.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
            </div>
            <div>
                <SingleDatePicker
                    placeholder="Audition Date"
                    date={auditionDate}
                    onDateChange={onDateChange}
                    focused={calendarFocused}
                    onFocusChange={onFocusChange}
                    numberOfMonths={1}
                    block
                />
            </div>
            <div>
                <TextField
                    value={location}
                    required
                    id="standard-required-location"
                    label="Location"
                    onChange={(e) => setLocation(e.target.value)} />
            </div>

            <h3>Jobs</h3>
            {
                jobs.map((job, idx) => {
                    // check if audition has props (then we're coming from edit audition) and if the audition has jobs
                    if (props.audition && jobsArray[idx]) {                  
                            job.id = jobsArray[idx].id;
                            job.isNew = false;
                    } else {
                        job.id = idx;
                        job.isNew = true
                    }
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
                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={addJob}
                    startIcon={<WorkOutlineIcon />}
                >
                    New job
                </Button>

            </div>
            <div>
                <Button
                    variant="contained"
                    className={classes.success}
                    type="submit"
                    size="medium"
                    startIcon={<CheckCircleOutlineIcon />}
                >
                   {props.audition ? "Edit audition" : "Create Audition"}
                </Button>    
            </div>
        </form>
            )
        }   
export {AuditionForm as default}