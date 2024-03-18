import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useState } from 'react';
import axios from "axios";
import '../styles/Calory.scss';



function Calory() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [activity, setActivity] = useState('');
  const [calory, setCalory] = useState(null);

  const handleChange = (event, setterFunction) => {
    setterFunction(event.target.value);
  };

  const calculateCalories = async (e) => {
    e.preventDefault();
  
    // Validate input values
    if (!weight || !height || !age || !gender || !activity) {
      alert('Please fill in all the fields');
      return;
    }
  
    // Convert input values to numbers
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);
    const ageNum = parseFloat(age);
  
    // Validate numerical input
    if (isNaN(weightNum) || isNaN(heightNum) || isNaN(ageNum)) {
      alert('Please enter valid numerical values');
      return;
    }
  
    // Calculate BMR
    let bmr;
    if (gender === 'Man') {
      bmr = 10 * weightNum + 6.25 * heightNum - 5 * ageNum + 5;
    } else if (gender === 'Woman') {
      bmr = 10 * weightNum + 6.25 * heightNum - 5 * ageNum - 161;
    } else {
      alert('Please select a gender');
      return;
    }
  
    // Calculate total daily calorie needs based on activity level
    let activityFactor;
    switch (activity) {
      case '1':
        activityFactor = 1.2;
        break;
      case '2':
        activityFactor = 1.375;
        break;
      case '3':
        activityFactor = 1.55;
        break;
      case '4':
        activityFactor = 1.725;
        break;
      case '5':
        activityFactor = 1.9;
        break;
      default:
        alert('Please select an activity level');
        return;
    }
  
    const calory = Math.round(bmr * activityFactor);
    setCalory(calory); // Set calories state
  
    // Set activityLevel state (if not already set)
    if (!activity) {
      setActivity('1'); // You may want to set a default value if it's not set in the form
    }
  
    // Check if user data already exists
  const checkDataURL = "http://localhost:8800/api/auth/checkpersonaldata";
  try {
    const checkDataResponse = await axios.post(
      checkDataURL,
      {
        // Add any parameters needed to uniquely identify the user, e.g., user ID
      },
      { withCredentials: true }
    );

    // If user data exists, update the existing data
    if (checkDataResponse.data.exists) {
      const updateDataURL = "http://localhost:8800/api/auth/updatepersonaldata";
      const updateDataResponse = await axios.post(
        updateDataURL,
        {
          height: heightNum,
          weight: weightNum,
          gender,
          age: ageNum,
          activity,
          calory,
        },
        { withCredentials: true }
      );

      // Log success or perform other actions if needed
      console.log('Data updated successfully', updateDataResponse.data);
    } else {
      // If user data doesn't exist, insert new data
      const addDataURL = "http://localhost:8800/api/auth/addpersonaldata";
      const addDataResponse = await axios.post(
        addDataURL,
        {
          height: heightNum,
          weight: weightNum,
          gender,
          age: ageNum,
          activity,
          calory,
        },
        { withCredentials: true }
      );

      // Log success or perform other actions if needed
      console.log('Data added successfully', addDataResponse.data);
    }
    // Log success or perform other actions if needed
    console.log('Data check successful', checkDataResponse.data);
  } catch (error) {
    // Handle error
    console.error('Error checking/updating/adding data to API:', error);
  }
  };
  
  

  return (
    <div className="calculate">

     
      <Form className="form">
        <Row className="row">
          <Col className='col1'>
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Label>Weight</Form.Label>
              <Form.Control
                className="box"
                type="text"
                placeholder="Enter weight"
                value={weight}
                onChange={(e) => handleChange(e, setWeight)}
              />
            </Form.Group>
  
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label>Height</Form.Label>
              <Form.Control
                className="box"
                type="text"
                placeholder="Enter height"
                value={height}
                onChange={(e) => handleChange(e, setHeight)}
              />
            </Form.Group>
  
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label>Age</Form.Label>
              <Form.Control
                className="box"
                type="text"
                placeholder="Enter age"
                value={age}
                onChange={(e) => handleChange(e, setAge)}
              />
            </Form.Group>
            <br />

            <Row>
            <Col>
            <Form.Select
              className="age"
              aria-label="Gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Gender</option>
              <option value="Man">Man</option>
              <option value="Woman">Woman</option>
            </Form.Select>
            </Col>
  
           
            <Col>
            <Form.Select
              className="activity"
              aria-label="Activity Level"
              value={activity}
              onChange={(e) => setActivity(e.target.value)}
            >
              <option value="">Activity Level</option>
              <option value="1">Sedentary</option>
              <option value="2">Lightly Active</option>
              <option value="3">Moderately Active</option>
              <option value="4">Very Active</option>
              <option value="5">Extra Active</option>
            </Form.Select>
            </Col>
            </Row>
            <br />
        <br />
            <Row>
          
        <div className="custom-button">
          <Button className="button" onClick={calculateCalories}>
            Calculate
          </Button>{' '}
        </div>
            </Row>
            
          </Col>
          
          <Col>
          {calory !== null && (
        <div className="result">
          <h2>Average daily calories you should consume: {calory}</h2>
        </div>
      )}
          </Col>
        </Row>
  
        
      </Form>


    </div>
  );
  
}

export default Calory;