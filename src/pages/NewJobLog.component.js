import React from 'react';
import styled from 'styled-components'


const NewJobLog = () => {
  console.log(process.env.REACT_APP_API_URL);

  // No detailed styling this time, sorry. It's already midnight.
  const Styles = styled.div`
    div {
      margin-top: 8px;
    }

    label {
      margin-right: 4px;
    }
  `;

  const handleSubmit = async (data) => {
    console.log(data);
  }

  return (
    <Styles>
      <form onSubmit={handleSubmit}>
        <div style={{marginTop: '5px'}}>
          <label>
            Name:
            <input type="text" name="summary" />
          </label>
        </div>
        <div style={{marginTop: '5px'}}>
          <label>
            Status:
              <select name="status">
              // No form validation for now, but at least it's functional
                <option value={null} disabled>
                  Choose an option
                </option>
                <option value="open">Open</option>
                <option value={"in progress"}>In Progress</option>
                <option value={"completed"}>Completed</option>
                <option value={"cancelled"}>Cancelled</option>
              </select>
          </label>
        </div>
        <div style={{marginTop: '5px'}}>
          <input type="submit" value="Submit" />
        </div>
      </form>
    </Styles>
  )
}


export default NewJobLog;
