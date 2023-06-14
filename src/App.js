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
  const [inputValue, setInputValue] = useState('');
  const [animate, setAnimate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // check if the field is empty
    if (inputValue !== '') {
      setLocation(inputValue);
    }

    if (inputValue === '') {
      setAnimate(true);
      setTimeout(() => {
        setAnimate(false);
      }, 500);
    }

    setInputValue('');
  };

  useEffect(() => {
    setLoading(true);
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`;

    axios
      .get(url)
      .then((res) => {
        setTimeout(() => {
          setData(res.data);
          setLoading(false);
        }, 400);
      })
      .catch((error) => {
        setLoading(false);
        setErrorMsg(error);
        setAnimate(true);
      });
  }, [location]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorMsg('');
      setAnimate(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [errorMsg]);

  // set the icon according to the weather
  let icon;

  if (data) {
    switch (data.weather[0].main) {
      case 'Clouds':
        icon = <IoMdCloudy />;
        break;
      case 'Haze':
        icon = <BsCloudHaze2Fill />;
        break;
      case 'Rain':
        icon = <IoMdRainy className='text-sky-300' />;
        break;
      case 'Clear':
        icon = <IoMdSunny className='text-yellow-300' />;
        break;
      case 'Drizzle':
        icon = <BsCloudDrizzleFill className='text-sky-400' />;
        break;
      case 'Snow':
        icon = <IoMdSnow className='text-sky-200' />;
        break;
      case 'Thunderstorm':
        icon = <IoMdThunderstorm />;
        break;
      default:
        return icon;
    }
  }

  // Date Object
  const date = new Date();

  return (
    <>
      <div className='absolute w-full h-screen bg-gradient bg-no-repeat bg-cover bg-center opacity-0 animate-change-color'></div>
      <div className='bg-gradient-to-br from-blue-950 to-violet-900 w-full min-h-screen flex flex-col items-center justify-center px-4 lg:px-0'>
        {!data ? (
          <div>
            <ImSpinner8 className='text-5xl animate-spin text-white' />
          </div>
        ) : (
          <>
            <div
              className={`${
                !errorMsg
                  ? '-translate-y-0 opacity-0'
                  : 'translate-y-16 lg:translate-y-32'
              } w-full max-w-[90vw] lg:max-w-[450px] bg-rose-700 text-white absolute -top-6 lg:-top-16 p-4 capitalize rounded-md z-10 duration-300`}
            >{`${errorMsg && errorMsg.response.data.message}`}</div>
            {/* Form */}
            <form
              className={`${animate ? 'animate-shake' : 'animate-none'} ${
                !errorMsg ? 'border-none' : 'border border-rose-600'
              } h-16 bg-black/20 w-full max-w-md rounded-full backdrop-blur-[32px] my-8`}
            >
              <div className='h-full relative flex items-center justify-between p-2'>
                <input
                  type='text'
                  onChange={(e) => handleChange(e)}
                  value={inputValue}
                  className='flex-1 bg-transparent outline-none placeholder:text-white/75 text-white text-sm font-light pl-6 h-full'
                  placeholder='Search by city or country'
                />
                <button
                  onClick={(e) => handleSubmit(e)}
                  className='bg-slate-50 hover:bg-slate-200 duration-200 w-20 h-12 rounded-full flex justify-center items-center transiton'
                >
                  <IoMdSearch className='text-3xl text-black/80' />
                </button>
              </div>
            </form>
            {/* Card */}
            <div className='w-full max-w-[450px] bg-black/20 h-[584px] text-white backdrop-blur-xl rounded-xl py-12 px-6'>
              {loading ? (
                <div className='w-full h-full flex justify-center items-center'>
                  <ImSpinner8 className='text-white text-5xl animate-spin' />
                </div>
              ) : (
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
                  <div className='max-w-sm mx-auto flex flex-col gap-y-6'>
                    <div className='flex justify-between'>
                      <div className='flex items-center gap-x-2'>
                        {/* Icon */}
                        <div className='text-xl'>
                          <BsEye />
                        </div>
                        <div>
                          Visibility
                          <span className='ml-2'>
                            {data.visibility / 1000} km
                          </span>
                        </div>
                      </div>
                      <div className='flex items-center gap-x-2'>
                        {/* Icon */}
                        <div className='text-xl'>
                          <BsThermometer />
                        </div>
                        <div className='flex'>
                          Feels like
                          <div className='flex ml-2'>
                            {parseInt(data.main.feels_like)}
                            <TbTemperatureCelsius />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='flex justify-between'>
                      <div className='flex items-center gap-x-2'>
                        {/* Icon */}
                        <div className='text-xl'>
                          <BsWater />
                        </div>
                        <div>
                          Humidity
                          <span className='ml-2'>{data.main.humidity} %</span>
                        </div>
                      </div>
                      <div className='flex items-center gap-x-2'>
                        {/* Icon */}
                        <div className='text-xl'>
                          <BsWind />
                        </div>
                        <div>
                          Wind
                          <span className='ml-2'>{data.wind.speed} m/s</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default App;
