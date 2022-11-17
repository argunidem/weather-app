import React from 'react';
import { GoSearch } from 'react-icons/go';

const Card = () => {
  // const [expand, setExpand] = React.useState(false);

  const expandSearch = (e) => {
    // setExpand(!expand);

    e.target.previousElementSibling.classList.remove('hdiden');
    e.target.className =
      'text-black absolute top-4 right-5 animate-bounce cursor-pointer';

    //  'text-black absolute top-4 right-5 animate-bounce cursor-pointer'
  };

  return (
    <div className='bg-[#00000090] text-white shadow-lg shadow-gray-900 font-semibold min-h-96 p-12 rounded-md'>
      <div className='relative search'>
        <input
          type='search'
          className='text-slate-800 px-4 py-2 rounded-lg focus:outline-none hidden'
        />

        <GoSearch
          className='w-11 h-11 p-3 bg-white text-black rounded-full cursor-pointer animate-bounce transition-all duration-400 hover:bg-rose-100 hover:text-slate-700'
          onClick={expandSearch}
        />
      </div>

      {/* {expand ? (
        <div className='relative search'>
          <input
            type='search'
            className='text-slate-800 px-4 py-2 rounded-lg focus:outline-none'
          />
          <GoSearch className='text-black absolute top-4 right-5 animate-bounce cursor-pointer' />
        </div>
      ) : (
        <GoSearch
          className='w-11 h-11 p-3 bg-white text-black rounded-full cursor-pointer animate-bounce transition-all duration-400 hover:bg-rose-100 hover:text-slate-700'
          onClick={expandSearch}
        />
      )} */}

      <div>
        <h2>Weather in City</h2>
        <div>51°C</div>
        {/* icon in img */}
        <div>cloudy</div>
        <div>Humidity: 60%</div>
        <div>Wind speed: 6.3km/h</div>
      </div>
    </div>
  );
};

export default Card;
