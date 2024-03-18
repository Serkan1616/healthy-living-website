import axios from 'axios';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Chart } from "react-google-charts";

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Accordion from 'react-bootstrap/Accordion';



const Table = () => {


  
  const [selectedCell, setSelectedCell] = useState(null);
  const [selectedMeal, setSelectedMeal] = useState('');
  const [confirmationEnabled, setConfirmationEnabled] = useState(false);
  const [meals, setMeals] = useState([]);

  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const [caloryavg, setCaloryavg] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`http://localhost:8800/deneme?food=${query}`, { withCredentials: true });
      setData(res.data);
    };
    if (query.length === 0 || query.length > 2) fetchData();
  }, [query]);

  const fetchData = async () => {
    try {
      const res = await axios.get(`http://localhost:8800/api/auth/getpersonalmeals`, { withCredentials: true });
      setMeals(res.data);
      console.log(res.data); // Log the updated state
    } catch (error) {
      console.error('Error fetching meal data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Dependency array is empty, so it runs only once on mount

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`http://localhost:8800/api/auth/getcalory`, { withCredentials: true });
      setCaloryavg(res.data);
      console.log('Calory Average:', res.data); // Log the caloryavg value to the console
    };

    fetchData();
  }, []);

  const handleMealChange = (event) => {
    setSelectedMeal(event.target.value);
    setConfirmationEnabled(true);
  };

  const handleCellClick = async (item) => {
    const confirmation = window.confirm(`Do you confirm the selected item?\nFood: ${item.Food}`);

    if (selectedMeal && confirmation) {
      setSelectedCell(item);
      const regURL = `http://localhost:8800/api/auth/addpersonaldiet`;

      try {
        const response = await axios.post(
          regURL,
          {
            Food: item.Food,
            Measure: item.Measure,
            Grams: item.Grams,
            Calories: item.Calories,
            Protein: item.Protein,
            Fat: item.Fat,
            Fiber: item.Fiber,
            Carbs: item.Carbs,
            Category: item.Category,
            Meal: selectedMeal,
            Date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
          },
          { withCredentials: true }
        );

        console.log('Data sent successfully', response.data);
        setConfirmationEnabled(false);
        await fetchData(); // Yemek verilerini güncelle
      } catch (error) {
        console.error('Error sending data to API:', error);
      }
    }
  };

  const calculateTotalCalories = () => {
    const totalCalories = meals.reduce((acc, meal) => acc + parseInt(meal.Calories, 10), 0);
    return Number(totalCalories); // Convert the total calories to a string
  };
  const calculateTotalProteins = () => {
    const totalProteins = meals.reduce((acc, meal) => acc + parseInt(meal.Protein, 10), 0);
    return Number(totalProteins); // Convert the total proteins to a number
  };
  
  const calculateTotalFats = () => {
    const totalFats = meals.reduce((acc, meal) => acc + parseInt(meal.Fat, 10), 0);
    return Number(totalFats); // Convert the total fats to a number
  };
  
  const calculateTotalCarbs = () => {
    const totalCarbs = meals.reduce((acc, meal) => acc + parseInt(meal.Carbs, 10), 0);
    return Number(totalCarbs); // Convert the total carbs to a number
  };

  const results = [
    ["Task", "Value"],
    ["Total Proteins", calculateTotalProteins()],
    ["Total Fats", calculateTotalFats()],
    ["Total Carbs", calculateTotalCarbs()],
  ];
  
  const options = {
    title: "My Daily Summary",
    is3D: true,
  };


  const calorieresults = [
    ["Task", "Value"],
    ["Used Calories", calculateTotalCalories()],
    ["Remain Calories", (parseFloat(caloryavg.calory) - calculateTotalCalories())],
  ];
  
  const calorieoptions = {
    title: "Prcent of Calorie",
    pieHole: 0.4,
    is3D: false,
  };


  return (
    <div>
     <Row className='Row'>
     <Col className='Col'>
     <div className='Search'>
          <input
          className="search"
          placeholder="Search..."
          onChange={(e) => setQuery(e.target.value.toLowerCase())}
        />
      

      
        <select className='selectmeal' value={selectedMeal} onChange={handleMealChange}>
          <option value="">Select Meal</option>
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch">Lunch</option>
          <option value="Dinner">Dinner</option>
          <option value="Snack">Snack</option>
        </select>
      

      <table>
        <tbody>
        {data.map((item) => (
  <tr
    key={item.id}
    onClick={() => selectedMeal && handleCellClick(item)}
    style={{
      cursor: selectedMeal ? 'pointer' : 'default',
      backgroundColor: selectedMeal ? '#f0f0f0' : 'transparent', // Optional: Highlight the row when a meal is selected
    }}
  >
    <td>{item.Food}</td>
    <td>{item.Grams + 'g'}</td>
  </tr>
))}
        </tbody>
      </table>
      </div>
      </Col>
      
      <Col >
       <div className="meals">
      <Accordion className='according' defaultActiveKey={['0']} alwaysOpen>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Breakfast Meals</Accordion.Header>
        <Accordion.Body className='visible'>
        {meals
          .filter((meal) => meal.Meal === 'Breakfast')
          .map((meal) => (
            <div key={meal.id}>
              <p>{meal.Food} - {meal.Grams}g - {meal.Calories}</p>
            </div>
          ))}
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Lunch Meals</Accordion.Header>
        <Accordion.Body className='visible'>
        {meals
          .filter((meal) => meal.Meal === 'Lunch')
          .map((meal) => (
            <div key={meal.id}>
              <p>{meal.Food} - {meal.Grams}g - {meal.Calories}</p>
            </div>
          ))}
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2">
        <Accordion.Header>Dinner Meals</Accordion.Header>
        <Accordion.Body className='visible'>
        {meals
          .filter((meal) => meal.Meal === 'Dinner')
          .map((meal) => (
            <div key={meal.id}>
              <p>{meal.Food} - {meal.Grams}g - {meal.Calories}</p>
            </div>
          ))}
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="3">
        <Accordion.Header>Snack Meals</Accordion.Header>
        <Accordion.Body className='visible'>
        {meals
          .filter((meal) => meal.Meal === 'Snack')
          .map((meal) => (
            <div key={meal.id}>
              <p>{meal.Food} - {meal.Grams}g - {meal.Calories}</p>
            </div>
          ))}
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
    </div>
      </Col>

      <Col>
      
      <div className='fullchart'>
      <Chart className='chart'
      chartType="PieChart"
      data={results}
      options={options}
      width={"100%"}
      height={"150px"}
      />

      <Chart className='caloriechart'
      chartType="PieChart"
      width={"100%"}
      height={"150px"}
      data={calorieresults}
      options={calorieoptions}
      />
      </div>

      </Col>

      </Row>
    </div>
  );
};

export default Table;