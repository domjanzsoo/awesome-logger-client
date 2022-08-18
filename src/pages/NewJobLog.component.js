import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import axios from 'axios';

// No detailed styling this time, sorry. It's already midnight.
const Styles = styled.div`
  position:relative;
  width: 300px;
  height: auto;
  margin: 50px auto;
  background: #f0f0f0;
  padding: 10px;

  h3 {
    width: 100%;
    text-align: center;
  }

  div.span-container {
    margin-top: 8px;
  }

  div.span-container input,  div.span-container select {
    margin-left: 20px !important;
  }

  .textarea-container {
    margin-top: 10px;
  }

  input[type=submit] {
    width: 100%;
    background: red;
    color: white;
    text-align: center;
    margin-top: 50px;
    height: 30px;
    border-radius: 9px;
  }
`;

const NewJobLog = () => {
  console.log(process.env.REACT_APP_API_URL);
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    getProperties();

    console.log(properties);
  }, []);



  const getProperties = async () => {
    await axios.get(process.env.REACT_APP_API_URL + '/properties').then(data => {
      console.log('the data');
      console.log(data.data);

      setProperties(data.data);
    }).catch(error => console.log(error));
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log(event.target);
  }

  return (
    <Styles>
    <h3> Add New Job </h3>
      <form onSubmit={handleSubmit}>
        <div className="span-container">
          <label>
            Name:
            <input type="text" name="summary" />
          </label>
        </div>
        <div className="span-container">
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
        <div className="span-container">
          <label>
            Status:
              <select name="property_id">
              // No form validation for now, but at least it's functional
                <option value="none">
                  Choose an option
                </option>
                {
                  properties.length > 0 &&
                    properties.map(property => {
                      return <option value={property.id} key={property.id}>
                              {property.name}
                            </option>

                    })
                }
              </select>
          </label>
        </div>
        <div className="span-container">
          <label>
            Description:
          </label>
          <div className="textarea-container">
            <textarea name="description" rows="10" cols="28"></textarea>
          </div>
        </div>
          <input type="submit" value="Submit" />
      </form>
    </Styles>
  )
}


export default NewJobLog;
