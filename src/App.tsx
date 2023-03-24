import { Space } from 'antd';
import Button from 'antd/es/button';
import axios, { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import './App.css';
import { Input, Typography } from 'antd';
import { Condition, Current, Location, Weather } from './data';

function App() {
  interface weatherdata {
    loading: boolean,
    data: Weather[]
    location: Location,
    current: Current,
  }
  const [state, setState] = useState('hyderabad')


  const [report, setReport] = useState<weatherdata>({
    loading: false,
    data: [] as Weather[],
    location: {
      name: '',
      region: '',
      country: '',
      lat: 123,
      lon: 1223,
      tz_id: '',
      localtime_epoch: 12,
      localtime: '',
    },
    current: {
      last_updated_epoch: 1,
      last_updated: '',
      temp_c: 1,
      temp_f: 2,
      is_day: 1,
      condition: {
        text: '',
        icon: '',
        code: 1,
      },
      wind_mph: 1,
      wind_kph: 2,
      wind_degree: 1,
      wind_dir: '',
      pressure_mb: 1,
      pressure_in: 1,
      precip_mm: 1,
      precip_in: 1,
      humidity: 1,
      cloud: 1,
      feelslike_c: 1,
      feelslike_f: 1,
      vis_km: 1,
      vis_miles: 1,
      uv: 1,
      gust_mph: 1,
      gust_kph: 1
    },

  })


  const getInputdata = (e?: any) => {
    setState(e.target.value)
  }

  const GetweatherReport = () => {
    axios.get(`https://api.weatherapi.com/v1/current.json?key=4c0bdf11c8114095a5143202232303&q=${state}&aqi=no`).then((response: AxiosResponse) => {
      console.log(response.data);
      setReport({ ...report, data: response.data, location: response.data.location, current: response.data.current });
    });

  }


  const { loading, data, location, current } = report


  console.log(report)
  return (
    <div className="App">
      <Typography className='app-logo'>Weather App</Typography>
      <Space className='components' size={30}>
        <Input type='text' placeholder='Enter City ' onChange={getInputdata} />
        <Button onClick={GetweatherReport}>Submit</Button>
      </Space>
      <div className='location'>
        <Space size={-0} direction='vertical' className='txt'>

          <Typography className='location-text' > {location.name} | {location.country}</Typography>
          <Typography className='date-text'>As of {current.last_updated}</Typography>
        </Space>
        <Typography className='temp'> {current.temp_c}<span>&#176;</span><img src={current.condition.icon} /><span className='wind' >{current.condition.text}</span></Typography>
        <Typography className='wind-1'> {current.condition.text}</Typography>
      </div>
      <div>
        <Space size={100}>
          <div className='data' >
            <Space size={100} className='data-container'>
              <span className='txt'>
                High/Low
              </span>
              <span className='value'>{current.temp_c}/{current.pressure_in}</span>
            </Space>
            <div >
              <Space size={100} className='data-container' >
                <span className='txt'>
                  Humidity
                </span>
                <span className='value'>{current.humidity}</span>
              </Space>
            </div>
            <div >
              <Space size={100} className='data-container' >
                <span className='txt'>
                  Pressure
                </span>
                <span className='value'>{current.pressure_mb} hPa</span>
              </Space>
            </div>
            <div >
              <Space size={100} className='data-container'>
                <span className='txt'>
                  Visibility
                </span>
                <span className='value'>{current.vis_km} Km</span>
              </Space>
            </div>
          </div>

          <div className='data'>
            <div className='data' >
              <Space size={100} className='data-container'>
                <span className='txt'>
                  Wind
                </span>
                <span className='value'>{current.wind_kph} km/hr</span>
              </Space>
              <div >
                <Space size={100} className='data-container' >
                  <span className='txt'>
                    Direction
                  </span>
                  <span className='value'>{current.wind_degree}<span>&#176;</span> deg</span>
                </Space>
              </div>
              <div >
                <Space size={100} className='data-container' >
                  <span className='txt'>
                    Sunrise
                  </span>
                  <span className='value'>-</span>
                </Space>
              </div>
              <div >
                <Space size={100} className='data-container'>
                  <span className='txt'>
                    Sunset
                  </span>
                  <span className='value'>-</span>
                </Space>
              </div>
            </div>
          </div>
        </Space>
      </div>


    </div>
  );
}

export default App;
