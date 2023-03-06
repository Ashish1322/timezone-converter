import React, {useState, useEffect} from "react";
import "./card.css";

export default function Card({countries,setClientCountry,setHostCountry,setClientTime,loginClient,loading,clearLogs}) {

  // methods to handle the change of select tag and updating the values accordingly
  const handleClientSelectChange = (e) => {
    let data = JSON.parse(e.currentTarget.value)

    setClientCountry(data)
  }

  const handleHostSelectChange = (e) => {
    let data = JSON.parse(e.currentTarget.value)

    setHostCountry(data)
  }

  return (
    <div className="wrapper">
      <header>Create Log</header>
      <form onSubmit={loginClient}>
      
        <div>
          <p>Select Client's Date & Time</p>
          <input 
          type="datetime-local" 
          defaultValue={1} 
          required
          onChange={(e) => setClientTime(e.currentTarget.value)} />

        </div>

        <div className="drop-list">

          <div className="from">
            <p>Client's Country</p>
            <div className="select-box">
              <select onChange={handleClientSelectChange}>
                { countries.map(country => <option 
                                            key={country.id} 
                                            value={JSON.stringify({ id:country.id, name: country.name, timezone: country.timezones   })}
                                            >
                                            {country.name}
                                            </option>)}
              </select>
            </div>
          </div>

          <div className="to">
            <p>Host Country</p>
            <div className="select-box">
              <select  onChange={handleHostSelectChange}>
              { countries.map(country =><option 
                                        key={country.id} 
                                        value={JSON.stringify({ id:country.id, name: country.name, timezone: country.timezones   })}
                                        >
                                        {country.name}
                </option>)}
              </select>
            </div>
          </div>

        </div>


        <button disabled={loading} type="submit">{ loading? "Loading..." :" Login Client"}</button>
        <button onClick={clearLogs} role="button" type="button" style={{marginTop: "20px",backgroundColor:"red"}}>Clear All Saved Logs</button>
      </form>
    </div>
  );
}
