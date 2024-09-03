import React, { useContext } from 'react';
import { HouseContext } from "./HouseContext";
import House from "./House";
import { ImSpinner2 } from "react-icons/im";

const HouseList = () => {
    const { houses, loading } = useContext(HouseContext);

    if (loading) {
        return (
            <ImSpinner2 className='mx-auto animate-spin text-4xl text-violet-700 font-bold mt-[200px]' />
        );
    }

    if (houses.length < 1) {
        return <div>Sorry, no match found!</div>;
    }

    return (
        <section className='mb-20'>
            <div className="container mx-auto max-w-[1100px]">
                <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5'>
                    {houses.map((house, index) => (
                        <House house={house} key={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HouseList;
