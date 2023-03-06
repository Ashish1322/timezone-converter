
import './App.css';
import Card from './components/Card/Card';
import React, {useState,useEffect} from 'react';
import moment from 'moment-timezone';
import List from './components/List/List';

function App() {
  
  // states
  const [countries, setCountries] = useState([])
  const [clientTime, setClientTime] = useState("")
  const [clientCountry, setClientCountry] = useState()
  const [hostCountry, setHostCountry] = useState()
  const [logs,setLogs] = useState([])
  const [loading,setLoading] = useState(false)

  // method to fetch country detail to show on select tag
  const fetchAllCountriesDetails = () => {
    setLoading(true)
    fetch("https://timezone-backend.onrender.com/getAllCountries")
    .then(response => response.json())
    .then( data => {setCountries(data); setLoading(false)})
  }

  // method to fetch all the logs from database
  const fetchLogsFromDatabase = () => {
    fetch("https://timezone-backend.onrender.com/getLogs")
    .then(res => res.json())
    .then(data => setLogs(data))
  }

  // method to delete the logs
  const clearLogs = () => {
    fetch("https://timezone-backend.onrender.com/clearLogs",{method:"POST"})
    .then((res) => res.json())
    .then((data) => {
      if(data.success)
      {
        setLogs([])
      }
      else
      alert("Something went wrong! Please try again")
    })
  }

  // method to add the log in the database and updaing the state
  const loginClient = (e) => {
    // prevent from realoding of page
    e.preventDefault();
    
    if(!clientCountry || !hostCountry)
    {
      alert("Please select the client's & host countries")
      return;
    }
    // set the client time according to his country selected
    let timeOfClientCountry = moment.tz(clientTime, clientCountry.timezone);
    // convert the client's country time to host country time
    let timeOfHostCountry = timeOfClientCountry.clone().tz(hostCountry.timezone)
    // updating the new Log onto the database then on state
    let newLog = {clientCountry: clientCountry.name,hostCountry: hostCountry.name, clientTime:timeOfClientCountry.toLocaleString(), hostTime:timeOfHostCountry.toLocaleString() }

    // saving in database
    setLoading(true)
    fetch("https://timezone-backend.onrender.com/saveLog",{
      method:"POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newLog)
    })
    .then(res => res.json() )
    .then( (data) => {
      setLoading(false)
      // check if it is saved successfully
      if(data.success)
      {
        setLogs([...logs,newLog]) // then update state
      }
      else
      {
        alert("Something went wrong! Please try again")
      }
  })
  }

  // making initial calls
  useEffect(() => {fetchAllCountriesDetails(); fetchLogsFromDatabase()},[])

  return (
    <div className='flex'>

    <Card loading={loading}  clearLogs={clearLogs} countries={countries} setClientCountry={setClientCountry} setClientTime={setClientTime} setHostCountry={setHostCountry} loginClient={loginClient}  />
    
    <List logs={logs} />

    </div>
     
  );
}

export default App;
