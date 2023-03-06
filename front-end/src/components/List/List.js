import React from 'react'
import "./List.css"

export default function List({logs}) {

    // splitting the following format to get date and time
    // Wed Mar 01 2023 05:30:00 GMT+0530

    // Fetching formatted date
    const formatDate = (dateTime) => {
        let d  = dateTime.split(" ")
        return d[0] + ", " + d[1] + " " + d[2] + " " + d[3]
    }

    // Fetching formatted Time
    const formatTime = (dateTime) => {
        let t = dateTime.split(" ")[4]
  
        let hours = parseInt(t.substr(0,2));
      
        let prefix = hours >= 12 ? "pm" : "am"
        hours = (hours % 12) || 12;
        let mins = t.substr(3,2);
        return hours + ":" + mins+" "+prefix
      
    }


    
  return (
    <div className='wrapper' >
        <header>Timzone Logs</header>

        <div id="items">
        {
            logs.map((log,index) => (
                <div key={index} className='time-flex'>
                    <div>
                        <h4>Client</h4>
                        <p>{log.clientCountry}</p>
                        <small><i className="fa-regular fa-calendar-days"></i> {formatDate(log.clientTime)}</small>
                        <br />
                        <small><i className="fa-regular fa-clock"></i> {formatTime(log.clientTime)}</small>
                    </div>
                    <div>
                        <h4>Host</h4>
                        <p>{log.hostCountry}</p>
                        <small><i className="fa-regular fa-calendar-days"></i> {formatDate(log.hostTime)}</small>
                        <br />
                        <small><i className="fa-regular fa-clock"></i> {formatTime(log.hostTime)}</small>
                    </div>
                </div>
            ))
        }
                
        </div>
        

    </div>
  )
}
