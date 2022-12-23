import React from 'react';
import spinner from './assets/spinner.gif';
import { GoSearch } from 'react-icons/go';
const App = () => {
  const [city, setCity] = React.useState('warsaw');
  const [weatherData, setWeatherData] = React.useState();
  const [loading, setLoading] = React.useState(true);
  const [isError, setIsError] = React.useState(false);

  const [search, setSearch] = React.useState(false);

  React.useEffect(() => {
    getWeatherCondition();
  }, []);

  const changeHandler = (e) => {
    setCity(e.target.value);
  };
  const getWeatherCondition = async () => {
    await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=710a2f9c3b4106617ad20f5b29df1018&units=metric`
    )
      .then((response) => {
        if (response.status !== 200) {
          throw new Error('Bad response from server!');
        }
        return response.json();
      })
      .then((data) => {
        setWeatherData(data);
      })
      .catch((error) => {
        setIsError(true);
        setTimeout(() => {
          setIsError(false);
        }, 2000);
      });
    setLoading(false);
  };

  const keyDown = (e) => {
    if (
      document.querySelector('input[type="search"]').value.trim() !== '' &&
      e.key === 'Enter'
    ) {
      getWeatherCondition();
      setCity('');
    }
  };
  const searchHandler = (e) => {
    e.target.previousElementSibling.focus();
    setSearch(true);
    if (e.target.previousElementSibling.value.trim() !== '') {
      getWeatherCondition();
      setCity('');
    }
  };

  return (
    <React.Fragment>
      {loading ? (
        <img src={spinner} alt='spinner' className='w-11 mx-auto' />
      ) : (
        <main
          style={{
            backgroundImage: `url("https://source.unsplash.com/${window.screen.width}x${window.screen.height}/?${weatherData.weather[0].main}")`,
          }}
          className='bg-slate-900 flex items-center justify-center min-h-screen bg-no-repeat bg-center bg-fixed'
        >
          <div className='flex flex-col bg-[#00000090] text-white shadow-lg shadow-gray-900 font-semibold w-80 md:w-96 min-h-96 p-12 rounded-md'>
            <div
              className={`flex mb-6 mx-auto transition-all duration-500 ${
                search ? 'w-full' : 'w-11'
              }`}
            >
              <input
                type='search'
                className={`placeholder:text-sm placeholder:font-medium text-black rounded-l-lg focus:outline-none ${
                  search ? 'w-full px-4 py-2' : 'w-0'
                } ${
                  isError
                    ? 'placeholder:text-red-500 border-2 border-red-700'
                    : 'placeholder:text-gray-400'
                }`}
                placeholder={isError ? `We couldn't find the city!` : 'Search'}
                onChange={changeHandler}
                onKeyDown={keyDown}
                value={city}
              />
              <button
                className={`w-11 h-11 p-3 text-black cursor-pointer focus:outline-none hover:bg-slate-800 hover:text-white transition-all duration-300 ${
                  search
                    ? 'rounded-l-none rounded-r-lg bg-slate-300'
                    : 'bg-white rounded-full animate-bounce'
                }`}
                onClick={searchHandler}
              >
                <GoSearch className={search && 'animate-bounce'} />
              </button>
            </div>

            <div className='flex flex-col space-y-3'>
              <h2>
                Weather in{' '}
                {weatherData.name.charAt(0).toUpperCase() +
                  weatherData.name.slice(1)}
              </h2>
              <div>{weatherData.main.temp.toFixed(1)}°C</div>
              <div className='h-6 flex items-center'>
                <span className='align-middle'>
                  {weatherData.weather[0].description
                    .split(' ')
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ')}
                </span>{' '}
                <img
                  src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
                  alt='icon'
                  className='inline-block mb-1 w-9'
                />
              </div>
              <div>Humidity: {weatherData.main.humidity}%</div>
              <div>Wind speed: {weatherData.wind.speed}km/h</div>
            </div>
          </div>
        </main>
      )}
    </React.Fragment>
  );
};

export default App;
