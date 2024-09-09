import React, {useState, useContext} from 'react';

import {RiHome5Line, RiArrowDownSLine, RiArrowUpSLine} from 'react-icons/ri';

import {Menu} from '@headlessui/react';

import {HouseContext} from './HouseContext';

const RoSDropdown = () => {
    const {RoS, setRoS, RoSs}  = useContext(HouseContext);
   
    const [isOpen, setIsOpen] = useState(false);
  return (
    <Menu as='div' className='dropdown relative'>
      <Menu.Button onClick={() => {setIsOpen(!isOpen)}} className="dropdown-btn w-full text-left  hover:bg-violet-400 hover:rounded-lg hover:text-white">
        <RiHome5Line className=' dropdown-icon-primary hover:text-white' />
        <div >
          <div className='text-[15px] font-medium leading-tight'>{RoS}</div>
          <div className='text-[13px]'>Select Rent/Sell</div>          
        </div>
          { isOpen? (
              <RiArrowUpSLine className='dropdown-icon-secondary hover:text-white'/>
            ):(
              <RiArrowDownSLine className="dropdown-icon-secondary hover:text-white" />
            )
          }
      </Menu.Button>
      <Menu.Items className='dropdown-menu'>
        {RoSs.map((availableRoS, index) => {
          return(
            <Menu.Item
              onClick={() => {
                setRoS(availableRoS); 
                setIsOpen(false);
              }}
              className={`cursor-pointer hover:text-violet-700 transition ${
                availableRoS === RoS? "font-bold text-violet-700" : "" 
              }`}
              as="li"
              key={index}
            >
              {availableRoS}
            </Menu.Item>
          );
        })}
      </Menu.Items>
    </Menu>
  )
}

export default RoSDropdown