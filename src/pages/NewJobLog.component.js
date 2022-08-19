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
  const [properties, setProperties] = useState([]);
  const [summary, setSummary] = useState('');
  const [description, setDescription] = useState('');
  const [propertyId, setPropertyId] = useState(0);

  useEffect(() => {
    getProperties();
  }, []);



  const getProperties = async () => {
    await axios.get(`${process.env.REACT_APP_API_URL}/properties`).then(data => {
      setProperties(data.data);
    }).catch(error => console.log(error));
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

// With a hook like useForm, this could be more simplified
    if(description.lenght === 0 || summary.length === 0 || propertyId === 0) {
      alert('Oops .. something missing');
    } else {
      const property_id = parseInt(propertyId);
      const data = {description, summary, property_id}

      await axios.post(`${process.env.REACT_APP_API_URL}/job`, data).then(response => {
        console.log(response);
      }).catch(error => console.log(error));

      event.target.reset();

      alert('Job log successfully created');
    }
  }

  return (
    <Styles>
    <h3> Add New Job </h3>
      <form onSubmit={handleSubmit}>
        <div className="span-container">
          <label>
            Summary:
            <input type="text" name="summary" onChange={event => setSummary(event.target.value)}/>
          </label>
        </div>
        <div className="span-container">
          <label>
            Property:
              <select name="property_id" onChange={event => setPropertyId(event.target.value)}>
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
            <textarea name="description" rows="10" cols="28" onChange={event => setDescription(event.target.value)}></textarea>
          </div>
        </div>
          <input type="submit" value="Submit" />
      </form>
    </Styles>
  )
}


export default NewJobLog;
