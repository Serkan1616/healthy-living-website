import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Chart } from 'react-google-charts';
import { AuthContext } from '../context/authContext.jsx';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import profilePhoto from "../img/icon.jpg";
import Alert from 'react-bootstrap/Alert';
import ListGroup from 'react-bootstrap/ListGroup';

const Profile = () => {
  const [meals, setMeals] = useState([]);
  const [personaldata, setPersonaldata] = useState([]);

  const { currentUser } = useContext(AuthContext);

  const fetchMeals = async () => {
    try {
      const res = await axios.get('http://localhost:8800/api/auth/getpersonalmealsfortrack', { withCredentials: true });
      setMeals(res.data);
    } catch (error) {
      console.error('Error fetching meal data:', error);
    }
  };

  const fetchPersonalData = async () => {
    try {
      const res = await axios.get('http://localhost:8800/api/auth/getpersonaldata', { withCredentials: true });
      setPersonaldata(res.data[0]);
    } catch (error) {
      console.error('Error fetching personal data:', error);
    }
  };

  useEffect(() => {
    fetchMeals();
    fetchPersonalData();
  }, []);

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        throw new Error('Invalid date string');
      }
      const formattedDate = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });
      return formattedDate;
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid Date';
    }
  };

  const today = new Date(); // Bugünün tarihi
  today.setHours(0, 0, 0, 0); // Saat, dakika, saniye ve milisaniye kısmını sıfırla

  const renderChartData = () => {
    const chartData = [['Date', 'Total Calories']];

    const dateGroups = Array.from({ length: 7 }, (_, index) => {
      const date = new Date(today);
      date.setDate(today.getDate() - index);
      return date;
    }).reverse();

    dateGroups.forEach((groupDate) => {
      const groupMeals = meals.filter((meal) => {
        const mealDate = new Date(meal.Date);
        mealDate.setHours(0, 0, 0, 0);
        return mealDate.getTime() === groupDate.getTime();
      });

      const totalCalories = groupMeals.reduce((total, meal) => total + parseInt(meal.Calories, 10), 0);
      chartData.push([formatDate(groupDate), totalCalories]);
    });

    return chartData;
  };

  return (
    <Container className='profile'>
      {/* Stack the columns on mobile by making one full-width and the other half-width */}
      <Row>
        <Col className='col1' xs={6} md={4}>
          <div className='profilePhoto'>
            <Image src={profilePhoto} thumbnail />
          </div>
          <div className='nameEmail'>
            <Alert variant='dark'>{currentUser.username}</Alert>
            <Alert variant='dark'>{currentUser.email}</Alert>
          </div>
        </Col>

        <Col className='col2' xs={12} md={8}>
          <div className='information'>
            
            <ListGroup>
  <ListGroup.Item>Weight: {personaldata?.weight || 'N/A'}</ListGroup.Item>
  <ListGroup.Item>Height: {personaldata?.height || 'N/A'}</ListGroup.Item>
  <ListGroup.Item>Age: {personaldata?.age || 'N/A'}</ListGroup.Item>
  <ListGroup.Item>Gender: {personaldata?.gender || 'N/A'}</ListGroup.Item>
  <ListGroup.Item>Activity Level: {personaldata?.activity || 'N/A'}</ListGroup.Item>
  <ListGroup.Item>Avg Calories: {personaldata?.calory || 'N/A'}</ListGroup.Item>

            </ListGroup>
          </div>
          <div className='statistics'>
            <h2 className='statisticsTEXT'>Weekly Calorie Consumption</h2>
          <Chart chartType="ColumnChart" width="60%" height="200px" data={renderChartData()} />
          </div>
        </Col>
      </Row>

      
    </Container>
  );
};

export default Profile;