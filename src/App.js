import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  IoMdSunny,
  IoMdRainy,
  IoMdCloudy,
  IoMdThunderstorm,
  IoMdSearch,
  IoMdSnow,
} from 'react-icons/io';
import {
  BsCloudHaze2Fill,
  BsCloudDrizzleFill,
  BsEye,
  BsWater,
  BsThermometer,
  BsWind,
} from 'react-icons/bs';
import { TbTemperatureCelsius } from 'react-icons/tb';
import { ImSpinner8 } from 'react-icons/im';

const API_KEY = process.env.REACT_APP_API_KEY;

const App = () => {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState('Warsaw');

  useEffect(() => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`;

    axios.get(url).then((res) => {
      setData(res.data);
    });
  }, [location]);

  // if data is not true show the loader
  if (!data) {
    return (
      <div>
        <div>
          <ImSpinner8 className='text-5xl animate-spin' />
        </div>
      </div>
    );
  }

  // set the icon according to the weather
  let icon;

  switch (data.weather[0].main) {
    case 'Clouds':
      icon = <IoMdCloudy />;
      break;
    case 'Haze':
      icon = <BsCloudHaze2Fill />;
      break;
    case 'Rain':
      icon = <IoMdRainy />;
      break;
    case 'Clear':
      icon = <IoMdSunny />;
      break;
    case 'Drizzle':
      icon = <BsCloudDrizzleFill />;
      break;
    case 'Snow':
      icon = <IoMdSnow />;
      break;
    case 'Thunderstorm':
      icon = <IoMdThunderstorm />;
      break;
    default:
      return icon;
  }

  // Date Object
  const date = new Date();

  return (
    <div className='w-full h-screen bg-gradientBg bg-no-repeat bg-cover bg-center flex flex-col items-center justify-center px-4 lg:px-0'>
      {/* Form */}
      <form>form</form>
      {/* Card */}
      <div className='w-full max-w-[450px] bg-black/20 min-h-[584px] text-white backdrop-blur-[32px] rounded-xl py-12 px-6'>
        <div>
          {/* Card Top */}
          <div className='flex items-center gap-x-5'>
            {/* Icon */}
            <div className='text-7xl'>{icon}</div>
            <div>
              {/* City */}
              <div className='text-2xl font-semibold'>
                {data.name}, {data.sys.country}
              </div>
              {/* Date */}
              <div>
                {date.getUTCDate()}/{date.getUTCMonth() + 1}/
                {date.getUTCFullYear()}
              </div>
            </div>
          </div>
          {/* Card Body */}
          <div className='my-20'>
            <div className='flex justify-center items-center'>
              {/* Temperature */}
              <div className='text-9xl leading-none font-light'>
                {parseInt(data.main.temp)}
              </div>
              {/* Celsius */}
              <div className='text-4xl'>
                <TbTemperatureCelsius />
              </div>
            </div>
            {/* Weather Description */}
            <div className='capitalize text-center'>
              {data.weather[0].description}
            </div>
          </div>
          {/* Card Bottom */}
          <div>card bottom</div>
        </div>
      </div>
    </div>
  );
};

export default App;
