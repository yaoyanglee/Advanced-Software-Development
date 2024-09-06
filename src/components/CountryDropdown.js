import React, {useState, useContext} from 'react';

import {RiMapPinLine, RiArrowDownSLine, RiArrowUpSLine} from 'react-icons/ri';

import {Menu} from '@headlessui/react';

import {HouseContext} from './HouseContext';

const CountryDropdown = () => {
  const {city, setCity, cities}  = useContext(HouseContext);
  console.log(city);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Menu as='div' className='dropdown relative'>
      <Menu.Button onClick={() => {setIsOpen(!isOpen)}} className="dropdown-btn w-full text-left hover:bg-violet-400 hover:rounded-lg hover:text-white">
        <RiMapPinLine className=' dropdown-icon-primary hover:text-white' />
        <div >
          <div className='text-[15px] font-medium leading-tight'>{city}</div>
          <div className='text-[13px]'>Select your place</div>          
        </div>
          { isOpen? (
              <RiArrowUpSLine className='dropdown-icon-secondary hover:text-white'/>
            ):(
              <RiArrowDownSLine className="dropdown-icon-secondary hover:text-white" />
            )
          }
      </Menu.Button>
      {/* <Menu.Items className='dropdown-menu'>
        {cities.map((city, index) => {
          return(
            <Menu.Item onClick={() => {setCity(city)}} className="cursor-pointer hover:text-violet-700 transition" as='li' key={index}>
              {city}
            </Menu.Item>
          )
        })}
      </Menu.Items> */}
    </Menu>
    // <div>CountryDropdown</div>
  )
}

export default CountryDropdown;