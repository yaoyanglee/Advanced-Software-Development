// import house images
import House1 from "./assets/img/houses/house1.png";
import House2 from "./assets/img/houses/house2.png";
import House3 from "./assets/img/houses/house3.png";
import House4 from "./assets/img/houses/house4.png";
import House5 from "./assets/img/houses/house5.png";
import House6 from "./assets/img/houses/house6.png";
import House7 from "./assets/img/houses/house7.png";
import House8 from "./assets/img/houses/house8.png";
import House9 from "./assets/img/houses/house9.png";
import House10 from "./assets/img/houses/house10.png";
import House11 from "./assets/img/houses/house11.png";
import House12 from "./assets/img/houses/house12.png";
// import house large images
import House1Lg from "./assets/img/houses/house1lg.png";
import House2Lg from "./assets/img/houses/house2lg.png";
import House3Lg from "./assets/img/houses/house3lg.png";
import House4Lg from "./assets/img/houses/house4lg.png";
import House5Lg from "./assets/img/houses/house5lg.png";
import House6Lg from "./assets/img/houses/house6lg.png";
import House7Lg from "./assets/img/houses/house7lg.png";
import House8Lg from "./assets/img/houses/house8lg.png";
import House9Lg from "./assets/img/houses/house9lg.png";
import House10Lg from "./assets/img/houses/house10lg.png";
import House11Lg from "./assets/img/houses/house11lg.png";
import House12Lg from "./assets/img/houses/house12lg.png";

// import apartments images
import Apartment1 from "./assets/img/apartments/a1.png";
import Apartment2 from "./assets/img/apartments/a2.png";
import Apartment3 from "./assets/img/apartments/a3.png";
import Apartment4 from "./assets/img/apartments/a4.png";
import Apartment5 from "./assets/img/apartments/a5.png";
import Apartment6 from "./assets/img/apartments/a6.png";
// import apartments large images
import Apartment1Lg from "./assets/img/apartments/a1lg.png";
import Apartment2Lg from "./assets/img/apartments/a2lg.png";
import Apartment3Lg from "./assets/img/apartments/a3lg.png";
import Apartment4Lg from "./assets/img/apartments/a4lg.png";
import Apartment5Lg from "./assets/img/apartments/a5lg.png";
import Apartment6Lg from "./assets/img/apartments/a6lg.png";

// import agents images
import Agent1 from "./assets/img/agents/agent1.png";
import Agent2 from "./assets/img/agents/agent2.png";
import Agent3 from "./assets/img/agents/agent3.png";
import Agent4 from "./assets/img/agents/agent4.png";
import Agent5 from "./assets/img/agents/agent5.png";
import Agent6 from "./assets/img/agents/agent6.png";
import Agent7 from "./assets/img/agents/agent7.png";
import Agent8 from "./assets/img/agents/agent8.png";
import Agent9 from "./assets/img/agents/agent9.png";
import Agent10 from "./assets/img/agents/agent10.png";
import Agent11 from "./assets/img/agents/agent11.png";
import Agent12 from "./assets/img/agents/agent12.png";

export const housesData = [
  {
    id: 1,
    type: "House",
    name: "House 1",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, illoat. Repudiandae ratione impedit delectus consectetur. Aspernaturvero obcaecati placeat ab distinctio unde ipsam molestias atqueratione delectus blanditiis nemo eius dignissimos doloremque quaealiquid maiores id tempore consequatur, quod pariatur saepe.",
    image: House1,
    imageLg: House1Lg,
    country: "United States",
    address: "7240C Argyle St. Lawndale, CA 90260",
    bedrooms: "6",
    bathrooms: "3",
    surface: "4200 sq ft",
    year: "2016",
    price: "1700",
    date: "5",
    agent: {
      image: Agent1,
      name: "Patricia Tullert",
      phone: "0123 456 78910",
    },
  },
  {
    id: 2,
    type: "House",
    name: "House 2",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, illoat. Repudiandae ratione impedit delectus consectetur. Aspernaturvero obcaecati placeat ab distinctio unde ipsam molestias atqueratione delectus blanditiis nemo eius dignissimos doloremque quaealiquid maiores id tempore consequatur, quod pariatur saepe.",
    image: House2,
    imageLg: House2Lg,
    country: "Canada",
    address: "798 Talbot St. Bridgewater, NJ 08807",
    bedrooms: "6",
    bathrooms: "3",
    surface: "4200 sq ft",
    year: "2016",
    price: "2500",
    date: "10",
    agent: {
      image: Agent2,
      name: "Daryl Hawker",
      phone: "0123 456 78910",
    },
  },
  {
    id: 3,
    type: "House",
    name: "House 3",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, illoat. Repudiandae ratione impedit delectus consectetur. Aspernaturvero obcaecati placeat ab distinctio unde ipsam molestias atqueratione delectus blanditiis nemo eius dignissimos doloremque quaealiquid maiores id tempore consequatur, quod pariatur saepe.",
    image: House3,
    imageLg: House3Lg,
    country: "United States",
    address: "2 Glen Creek St. Alexandria, VA 22304",
    bedrooms: "6",
    bathrooms: "3",
    surface: "4200 sq ft",
    year: "2016",
    price: "1000",
    date: "5",
    agent: {
      image: Agent3,
      name: "Amado Smith",
      phone: "0123 456 78910",
    },
  },
  {
    id: 4,
    type: "House",
    name: "House 4",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, illoat. Repudiandae ratione impedit delectus consectetur. Aspernaturvero obcaecati placeat ab distinctio unde ipsam molestias atqueratione delectus blanditiis nemo eius dignissimos doloremque quaealiquid maiores id tempore consequatur, quod pariatur saepe.",
    image: House4,
    imageLg: House4Lg,
    country: "Canada",
    address: "84 Woodland St. Cocoa, FL 32927",
    bedrooms: "6",
    bathrooms: "3",
    surface: "4200 sq ft",
    year: "2016",
    price: "3700",
    date: "15",
    agent: {
      image: Agent4,
      name: "Kaitlyn Gonzalez",
      phone: "0123 456 78910",
    },
  },
  {
    id: 5,
    type: "House",
    name: "House 5",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, illoat. Repudiandae ratione impedit delectus consectetur. Aspernaturvero obcaecati placeat ab distinctio unde ipsam molestias atqueratione delectus blanditiis nemo eius dignissimos doloremque quaealiquid maiores id tempore consequatur, quod pariatur saepe.",
    image: House5,
    imageLg: House5Lg,
    country: "United States",
    address: "28 Westport Dr. Warminster, PA 18974",
    bedrooms: "5",
    bathrooms: "3",
    surface: "4200 sq ft",
    year: "2015",
    price: "2300",
    date: "20",
    agent: {
      image: Agent5,
      name: "Grover Robinson",
      phone: "0123 456 78910",
    },
  },
  {
    id: 6,
    type: "House",
    name: "House 6",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, illoat. Repudiandae ratione impedit delectus consectetur. Aspernaturvero obcaecati placeat ab distinctio unde ipsam molestias atqueratione delectus blanditiis nemo eius dignissimos doloremque quaealiquid maiores id tempore consequatur, quod pariatur saepe.",
    image: House6,
    imageLg: House6Lg,
    country: "Canada",
    address: "32 Pawnee Street Butte, MT 59701",
    bedrooms: "6",
    bathrooms: "3",
    surface: "6200 sq ft",
    year: "2014",
    price: "1300",
    date: "5",
    agent: {
      image: Agent6,
      name: "Karen Sorensen",
      phone: "0123 456 78910",
    },
  },
  {
    id: 7,
    type: "Apartament",
    name: "Apartament 1",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, illoat. Repudiandae ratione impedit delectus consectetur. Aspernaturvero obcaecati placeat ab distinctio unde ipsam molestias atqueratione delectus blanditiis nemo eius dignissimos doloremque quaealiquid maiores id tempore consequatur, quod pariatur saepe.",
    image: Apartment1,
    imageLg: Apartment1Lg,
    country: "Canada",
    address: "32 Pawnee Street Butte, MT 59701",
    bedrooms: "2",
    bathrooms: "1",
    surface: "1200 sq ft",
    year: "2012",
    price: "2000",
    date: "10",
    agent: {
      image: Agent7,
      name: "Jawhar Shamil Naser",
      phone: "0123 456 78910",
    },
  },
  {
    id: 8,
    type: "Apartament",
    name: "Apartament 2",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, illoat. Repudiandae ratione impedit delectus consectetur. Aspernaturvero obcaecati placeat ab distinctio unde ipsam molestias atqueratione delectus blanditiis nemo eius dignissimos doloremque quaealiquid maiores id tempore consequatur, quod pariatur saepe.",
    image: Apartment2,
    imageLg: Apartment2Lg,
    country: "United States",
    address: "28 Westport Dr. Warminster, PA 18974",
    bedrooms: "3",
    bathrooms: "1",
    surface: "1000 sq ft",
    year: "2011",
    price: "3000",
    date: "15",
    agent: {
      image: Agent8,
      name: "Juana Douglass",
      phone: "0123 456 78910",
    },
  },
  {
    id: 9,
    type: "Apartament",
    name: "Apartament 3",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, illoat. Repudiandae ratione impedit delectus consectetur. Aspernaturvero obcaecati placeat ab distinctio unde ipsam molestias atqueratione delectus blanditiis nemo eius dignissimos doloremque quaealiquid maiores id tempore consequatur, quod pariatur saepe.",
    image: Apartment3,
    imageLg: Apartment3Lg,
    country: "United States",
    address: "84 Woodland St. Cocoa, FL 32927",
    bedrooms: "2",
    bathrooms: "1",
    surface: "1100 sq ft",
    year: "2011",
    price: "2700",
    date: "5",
    agent: {
      image: Agent9,
      name: "Jerry Schenck",
      phone: "0123 456 78910",
    },
  },
  {
    id: 10,
    type: "House",
    name: "House 7",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, illoat. Repudiandae ratione impedit delectus consectetur. Aspernaturvero obcaecati placeat ab distinctio unde ipsam molestias atqueratione delectus blanditiis nemo eius dignissimos doloremque quaealiquid maiores id tempore consequatur, quod pariatur saepe.",
    image: House7,
    imageLg: House7Lg,
    country: "Canada",
    address: "7240C Argyle St. Lawndale, CA 90260",
    bedrooms: "5",
    bathrooms: "3",
    surface: "3200 sq ft",
    year: "2015",
    price: "1100",
    date: "20",
    agent: {
      image: Agent10,
      name: "Vera Levesque",
      phone: "0123 456 78910",
    },
  },
  {
    id: 11,
    type: "House",
    name: "House 8",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, illoat. Repudiandae ratione impedit delectus consectetur. Aspernaturvero obcaecati placeat ab distinctio unde ipsam molestias atqueratione delectus blanditiis nemo eius dignissimos doloremque quaealiquid maiores id tempore consequatur, quod pariatur saepe.",
    image: House8,
    imageLg: House8Lg,
    country: "Canada",
    address: "798 Talbot St. Bridgewater, NJ 08807",
    bedrooms: "7",
    bathrooms: "2",
    surface: "2200 sq ft",
    year: "2019",
    price: "2000",
    date: "5",
    agent: {
      image: Agent11,
      name: "Sofia Gomes",
      phone: "0123 456 78910",
    },
  },
  {
    id: 12,
    type: "House",
    name: "House 9",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, illoat. Repudiandae ratione impedit delectus consectetur. Aspernaturvero obcaecati placeat ab distinctio unde ipsam molestias atqueratione delectus blanditiis nemo eius dignissimos doloremque quaealiquid maiores id tempore consequatur, quod pariatur saepe.",
    image: House9,
    imageLg: House9Lg,
    country: "United States",
    address: "2 Glen Creek St. Alexandria, VA 22304",
    bedrooms: "4",
    bathrooms: "4",
    surface: "4600 sq ft",
    year: "2015",
    price: "3800",
    date: "10",
    agent: {
      image: Agent12,
      name: "Raymond Hood",
      phone: "0123 456 78910",
    },
  },
  {
    id: 13,
    type: "House",
    name: "House 10",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, illoat. Repudiandae ratione impedit delectus consectetur. Aspernaturvero obcaecati placeat ab distinctio unde ipsam molestias atqueratione delectus blanditiis nemo eius dignissimos doloremque quaealiquid maiores id tempore consequatur, quod pariatur saepe.",
    image: House10,
    imageLg: House10Lg,
    country: "Canada",
    address: "84 Woodland St. Cocoa, FL 32927",
    bedrooms: "5",
    bathrooms: "2",
    surface: "5200 sq ft",
    year: "2014",
    price: "1800",
    date: "5",
    agent: {
      image: Agent1,
      name: "Patricia Tullert",
      phone: "0123 456 78910",
    },
  },
  {
    id: 14,
    type: "House",
    name: "House 11",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, illoat. Repudiandae ratione impedit delectus consectetur. Aspernaturvero obcaecati placeat ab distinctio unde ipsam molestias atqueratione delectus blanditiis nemo eius dignissimos doloremque quaealiquid maiores id tempore consequatur, quod pariatur saepe.",
    image: House11,
    imageLg: House11Lg,
    country: "United States",
    address: "28 Westport Dr. Warminster, PA 18974",
    bedrooms: "5",
    bathrooms: "2",
    surface: "3200 sq ft",
    year: "2011",
    price: "2100",
    date: "18",
    agent: {
      image: Agent2,
      name: "Daryl Hawker",
      phone: "0123 456 78910",
    },
  },
  {
    id: 15,
    type: "House",
    name: "House 12",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, illoat. Repudiandae ratione impedit delectus consectetur. Aspernaturvero obcaecati placeat ab distinctio unde ipsam molestias atqueratione delectus blanditiis nemo eius dignissimos doloremque quaealiquid maiores id tempore consequatur, quod pariatur saepe.",
    image: House12,
    imageLg: House12Lg,
    country: "Canada",
    address: "32 Pawnee Street Butte, MT 59701",
    bedrooms: "4",
    bathrooms: "3",
    surface: "5200 sq ft",
    year: "2013",
    price: "900",
    date: "30",
    agent: {
      image: Agent3,
      name: "Amado Smith",
      phone: "0123 456 78910",
    },
  },
  {
    id: 16,
    type: "Apartament",
    name: "Apartament 16",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, illoat. Repudiandae ratione impedit delectus consectetur. Aspernaturvero obcaecati placeat ab distinctio unde ipsam molestias atqueratione delectus blanditiis nemo eius dignissimos doloremque quaealiquid maiores id tempore consequatur, quod pariatur saepe.",
    image: Apartment4,
    imageLg: Apartment4Lg,
    country: "Canada",
    address: "32 Pawnee Street Butte, MT 59701",
    bedrooms: "2",
    bathrooms: "1",
    surface: "1300 sq ft",
    year: "2011",
    price: "3100",
    date: "30",
    agent: {
      image: Agent4,
      name: "Kaitlyn Gonzalez",
      phone: "0123 456 78910",
    },
  },
  {
    id: 17,
    type: "Apartament",
    name: "Apartament 17",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, illoat. Repudiandae ratione impedit delectus consectetur. Aspernaturvero obcaecati placeat ab distinctio unde ipsam molestias atqueratione delectus blanditiis nemo eius dignissimos doloremque quaealiquid maiores id tempore consequatur, quod pariatur saepe.",
    image: Apartment5,
    imageLg: Apartment5Lg,
    country: "United States",
    address: "28 Westport Dr. Warminster, PA 18974",
    bedrooms: "3",
    bathrooms: "1",
    surface: "1000 sq ft",
    year: "2012",
    price: "3200",
    date: "31",
    agent: {
      image: Agent5,
      name: "Grover Robinson",
      phone: "0123 456 78910",
    },
  },
  {
    id: 18,
    type: "Apartament",
    name: "Apartament 18",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, illoat. Repudiandae ratione impedit delectus consectetur. Aspernaturvero obcaecati placeat ab distinctio unde ipsam molestias atqueratione delectus blanditiis nemo eius dignissimos doloremque quaealiquid maiores id tempore consequatur, quod pariatur saepe.",
    image: Apartment6,
    imageLg: Apartment6Lg,
    country: "Canada",
    address: "84 Woodland St. Cocoa, FL 32927",
    bedrooms: "3",
    bathrooms: "1",
    surface: "1200 sq ft",
    year: "2010",
    price: "1500",
    date: "20",
    agent: {
      image: Agent6,
      name: "Karen Sorensen",
      phone: "0123 456 78910",
    },
  },
  {
    id: 19,
    type: "House",
    name: "House 9",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, illoat. Repudiandae ratione impedit delectus consectetur. Aspernaturvero obcaecati placeat ab distinctio unde ipsam molestias atqueratione delectus blanditiis nemo eius dignissimos doloremque quaealiquid maiores id tempore consequatur, quod pariatur saepe.",
    image: House9,
    imageLg: House9Lg,
    country: "United States",
    address: "2 Glen Creek St. Alexandria, VA 22304",
    bedrooms: "3",
    bathrooms: "2",
    surface: "5600 sq ft",
    year: "2014",
    price: "2900",
    date: "24",
    agent: {
      image: Agent12,
      name: "Raymond Hood",
      phone: "0123 456 78910",
    },
  },
  {
    id: 19,
    type: "Apartament",
    name: "Apartament 2",
    description: "Random description 1",
    image: House10,
    imageLg: House1Lg,
    country: "United States",
    address: "32 Pawnee Street Butte, MT 59701",
    bedrooms: "2",
    bathrooms: "1",
    surface: "1200 sq ft",
    year: "2011",
    price: "3200",
    date: "31",
    agent: {
      image: Agent5,
      name: "Grover Robinson",
      phone: "0123 456 78910",
    },
  },

  {
    id: 20,
    type: "Apartament",
    name: "Apartament 1",
    description: "Random description 2",
    image: House3,
    imageLg: House2Lg,
    country: "Canada",
    address: "84 Woodland St. Cocoa, FL 32927",
    bedrooms: "6",
    bathrooms: "3",
    surface: "4200 sq ft",
    year: "2016",
    price: "3700",
    date: "15",
    agent: {
      image: Agent3,
      name: "Amado Smith",
      phone: "0123 456 78910",
    },
  },

  {
    id: 21,
    type: "House",
    name: "House 6",
    description: "Random description 3",
    image: House11,
    imageLg: House3Lg,
    country: "United States",
    address: "28 Westport Dr. Warminster, PA 18974",
    bedrooms: "5",
    bathrooms: "2",
    surface: "3200 sq ft",
    year: "2011",
    price: "2100",
    date: 15,
    agent: {
      image: Agent2,
      name: "Daryl Hawker",
      phone: "0123 456 78910",
    },
  },

  {
    id: 22,
    type: "House",
    name: "House 12",
    description: "Random description 4",
    image: House4,
    imageLg: House4Lg,
    country: "Canada",
    address: "84 Woodland St. Cocoa, FL 32927",
    bedrooms: "5",
    bathrooms: "3",
    surface: "4200 sq ft",
    year: "2016",
    price: "1300",
    date: "5",
    agent: {
      image: Agent6,
      name: "Karen Sorensen",
      phone: "0123 456 78910",
    },
  },

  {
    id: 23,
    type: "Apartament",
    name: "Apartament 18",
    description: "Random description 5",
    image: House1,
    imageLg: House5Lg,
    country: "Canada",
    address: "32 Pawnee Street Butte, MT 59701",
    bedrooms: "2",
    bathrooms: "1",
    surface: "1100 sq ft",
    year: "2011",
    price: "2700",
    date: "5",
    agent: {
      image: Agent1,
      name: "Patricia Tullert",
      phone: "0123 456 78910",
    },
  },
  {
    id: 24,
    type: "House",
    name: "House 1",
    description: "Random description 6",
    image: House2,
    imageLg: House6Lg,
    country: "United States",
    address: "7240C Argyle St. Lawndale, CA 90260",
    bedrooms: "6",
    bathrooms: "3",
    surface: "4200 sq ft",
    year: "2016",
    price: "1700",
    date: "10",
    agent: {
      image: Agent8,
      name: "Juana Douglass",
      phone: "0123 456 78910",
    },
  },
  {
    id: 25,
    type: 'House',
    name: 'House 1',
    description: 'This beautiful House is located in the United States, at 7240C Argyle St. Lawndale, CA 90260. It was built in 2016 and has 6 bedrooms and 3 bathrooms. The total surface area is 4200 sq ft. The current price is $1700, and the listing date is 5 days ago. For more information, contact Patricia Tullert at 0123 456 78910.',
    image: House1,
    imageLg: House1Lg,
    country: 'United States',
    address: '7240C Argyle St. Lawndale, CA 90260',
    bedrooms: '6',
    bathrooms: '3',
    surface: '4200 sq ft',
    year: '2016',
    price: '1700',
    date: '5',
    agent: {
      image: Agent1,
      name: 'Patricia Tullert',
      phone: '0123 456 78910',
    },
  },
  {
    id: 26,
    type: 'House',
    name: 'House 2',
    description: 'This cozy House is located in Canada, at 798 Talbot St. Bridgewater, NJ 08807. It was built in 2016 and has 6 bedrooms and 3 bathrooms. The total surface area is 4200 sq ft. The current price is $2500, and the listing date is 10 days ago. For more information, contact Daryl Hawker at 0123 456 78910.',
    image: House2,
    imageLg: House2Lg,
    country: 'Canada',
    address: '798 Talbot St. Bridgewater, NJ 08807',
    bedrooms: '6',
    bathrooms: '3',
    surface: '4200 sq ft',
    year: '2016',
    price: '2500',
    date: '10',
    agent: {
      image: Agent2,
      name: 'Daryl Hawker',
      phone: '0123 456 78910',
    },
  },
  {
    id: 27,
    type: 'House',
    name: 'House 13',
    description: 'This stunning House is located in Canada, at 7240C Argyle St. Lawndale, CA 90260. It was built in 2016 and has 6 bedrooms and 3 bathrooms. The total surface area is 4200 sq ft. The current price is $3700, and the listing date is 15 days ago. For more information, contact Kaitlyn Gonzalez at 0123 456 78910.',
    image: House1,
    imageLg: House1Lg,
    country: 'Canada',
    address: '7240C Argyle St. Lawndale, CA 90260',
    bedrooms: '6',
    bathrooms: '3',
    surface: '4200 sq ft',
    year: '2016',
    price: '3700',
    date: '15',
    agent: {
      image: Agent4,
      name: 'Kaitlyn Gonzalez',
      phone: '0123 456 78910',
    },
  },
  {
    id: 28,
    type: 'House',
    name: 'House 14',
    description: 'This modern House is located in the United States, at 2 Glen Creek St. Alexandria, VA 22304. It was built in 2015 and has 5 bedrooms and 3 bathrooms. The total surface area is 4200 sq ft. The current price is $2300, and the listing date is 20 days ago. For more information, contact Grover Robinson at 0123 456 78910.',
    image: House2,
    imageLg: House2Lg,
    country: 'United States',
    address: '2 Glen Creek St. Alexandria, VA 22304',
    bedrooms: '5',
    bathrooms: '3',
    surface: '4200 sq ft',
    year: '2015',
    price: '2300',
    date: '20',
    agent: {
      image: Agent5,
      name: 'Grover Robinson',
      phone: '0123 456 78910',
    },
  },
  {
    id: 29,
    type: 'House',
    name: 'House 15',
    description: 'This spacious House is located in Canada, at 798 Talbot St. Bridgewater, NJ 08807. It was built in 2019 and has 7 bedrooms and 2 bathrooms. The total surface area is 2200 sq ft. The current price is $2000, and the listing date is 5 days ago. For more information, contact Sofia Gomes at 0123 456 78910.',
    image: House3,
    imageLg: House3Lg,
    country: 'Canada',
    address: '798 Talbot St. Bridgewater, NJ 08807',
    bedrooms: '7',
    bathrooms: '2',
    surface: '2200 sq ft',
    year: '2019',
    price: '2000',
    date: '5',
    agent: {
      image: Agent11,
      name: 'Sofia Gomes',
      phone: '0123 456 78910',
    },
  },
  {
    id: 30,
    type: 'House',
    name: 'House 16',
    description: 'This beautiful House is located in the United States, at 2 Glen Creek St. Alexandria, VA 22304. It was built in 2015 and has 4 bedrooms and 4 bathrooms. The total surface area is 4600 sq ft. The current price is $3800, and the listing date is 10 days ago. For more information, contact Raymond Hood at 0123 456 78910.',
    image: House7,
    imageLg: House7Lg,
    country: 'United States',
    address: '2 Glen Creek St. Alexandria, VA 22304',
    bedrooms: '4',
    bathrooms: '4',
    surface: '4600 sq ft',
    year: '2015',
    price: '3800',
    date: '10',
    agent: {
      image: Agent9,
      name: 'Raymond Hood',
      phone: '0123 456 78910',
    },
  },
  {
    id: 31,
    type: 'House',
    name: 'House 17',
    description: 'This charming House is located in Canada, at 84 Woodland St. Cocoa, FL 32927. It was built in 2014 and has 5 bedrooms and 2 bathrooms. The total surface area is 5200 sq ft. The current price is $1800, and the listing date is 5 days ago. For more information, contact Patricia Tullert at 0123 456 78910.',
    image: House8,
    imageLg: House8Lg,
    country: 'Canada',
    address: '84 Woodland St. Cocoa, FL 32927',
    bedrooms: '5',
    bathrooms: '2',
    surface: '5200 sq ft',
    year: '2014',
    price: '1800',
    date: '5',
    agent: {
      image: Agent1,
      name: 'Patricia Tullert',
      phone: '0123 456 78910',
    },
  },
  {
    id: 32,
    type: 'House',
    name: 'House 18',
    description: 'This modern House is located in the United States, at 28 Westport Dr. Warminster, PA 18974. It was built in 2011 and has 5 bedrooms and 2 bathrooms. The total surface area is 3200 sq ft. The current price is $2100, and the listing date is 20 days ago. For more information, contact Daryl Hawker at 0123 456 78910.',
    image: House9,
    imageLg: House9Lg,
    country: 'United States',
    address: '28 Westport Dr. Warminster, PA 18974',
    bedrooms: '5',
    bathrooms: '2',
    surface: '3200 sq ft',
    year: '2011',
    price: '2100',
    date: '20',
    agent: {
      image: Agent2,
      name: 'Daryl Hawker',
      phone: '0123 456 78910',
    },
  },
  {
    id: 33,
    type: 'House',
    name: 'House 19',
    description: 'This cozy House is located in Canada, at 32 Pawnee Street Butte, MT 59701. It was built in 2013 and has 4 bedrooms and 3 bathrooms. The total surface area is 5200 sq ft. The current price is $900, and the listing date is 30 days ago. For more information, contact Amado Smith at 0123 456 78910.',
    image: House10,
    imageLg: House10Lg,
    country: 'Canada',
    address: '32 Pawnee Street Butte, MT 59701',
    bedrooms: '4',
    bathrooms: '3',
    surface: '5200 sq ft',
    year: '2013',
    price: '900',
    date: '30',
    agent: {
      image: Agent3,
      name: 'Amado Smith',
      phone: '0123 456 78910',
    },
  },
  {
    id: 34,
    type: 'Apartament',
    name: 'Apartament 19',
    description: 'This cozy Apartment is located in Canada, at 32 Pawnee Street Butte, MT 59701. It was built in 2011 and has 2 bedrooms and 1 bathroom. The total surface area is 1300 sq ft. The current price is $3100, and the listing date is 30 days ago. For more information, contact Kaitlyn Gonzalez at 0123 456 78910.',
    image: Apartment1,
    imageLg: Apartment1Lg,
    country: 'Canada',
    address: '32 Pawnee Street Butte, MT 59701',
    bedrooms: '2',
    bathrooms: '1',
    surface: '1300 sq ft',
    year: '2011',
    price: '3100',
    date: '23',
    agent: {
      image: Agent4,
      name: 'Kaitlyn Gonzalez',
      phone: '0123 456 78910',
    },
  },
  {
    id: 35,
    type: 'Apartament',
    name: 'Apartament 21',
    description: 'This modern Apartment is located in the United States, at 28 Westport Dr. Warminster, PA 18974. It was built in 2012 and has 3 bedrooms and 1 bathroom. The total surface area is 1000 sq ft. The current price is $1500, and the listing date is 31 days ago. For more information, contact Grover Robinson at 0123 456 78910.',
    image: Apartment5,
    imageLg: Apartment5Lg,
    country: 'United States',
    address: '28 Westport Dr. Warminster, PA 18974',
    bedrooms: '3',
    bathrooms: '1',
    surface: '1000 sq ft',
    year: '2012',
    price: '1500',
    date: '31',
    agent: {
      image: Agent5,
      name: 'Grover Robinson',
      phone: '0123 456 78910',
    },
  },
  {
    id: 36,
    type: 'Apartament',
    name: 'Apartament 22',
    description: 'This cozy Apartment is located in Canada, at 32 Pawnee Street Butte, MT 59701. It was built in 2011 and has 2 bedrooms and 1 bathroom. The total surface area is 1300 sq ft. The current price is $1300, and the listing date is 30 days ago. For more information, contact Kaitlyn Gonzalez at 0123 456 78910.',
    image: Apartment6,
    imageLg: Apartment6Lg,
    country: 'Canada',
    address: '32 Pawnee Street Butte, MT 59701',
    bedrooms: '2',
    bathrooms: '1',
    surface: '1300 sq ft',
    year: '2011',
    price: '1300',
    date: '13',
    agent: {
      image: Agent4,
      name: 'Kaitlyn Gonzalez',
      phone: '0123 456 78910',
    },
  },
  // Add 8 more objects here...
  {
    id: 45,
    type: 'Apartament',
    name: 'Apartament 32',
    description: 'This spacious Apartment is located in the United States, at 798 Talbot St. Bridgewater, NJ 08807. It was built in 2019 and has 2 bedrooms and 1 bathroom. The total surface area is 1200 sq ft. The current price is $1900, and the listing date is 5 days ago. For more information, contact Jawhar Shamil Naser at 0123 456 78910.',
    image: Apartment1,
    imageLg: Apartment1Lg,
    country: 'United States',
    address: '798 Talbot St. Bridgewater, NJ 08807',
    bedrooms: '2',
    bathrooms: '1',
    surface: '1200 sq ft',
    year: '2019',
    price: '1900',
    date: '5',
    agent: {
      image: Agent7,
      name: 'Jawhar Shamil Naser',
      phone: '0123 456 78910',
    },
  },
  {
    id: 46,
    type: 'Apartament',
    name: 'Apartament 33',
    description: 'This cozy Apartment is located in Canada, at 84 Woodland St. Cocoa, FL 32927. It was built in 2010 and has 3 bedrooms and 1 bathroom. The total surface area is 1200 sq ft. The current price is $1400, and the listing date is 20 days ago. For more information, contact Karen Sorensen at 0123 456 78910.',
    image: Apartment6,
    imageLg: Apartment6Lg,
    country: 'Canada',
    address: '84 Woodland St. Cocoa, FL 32927',
    bedrooms: '3',
    bathrooms: '1',
    surface: '1200 sq ft',
    year: '2010',
    price: '1400',
    date: '20',
    agent: {
      image: Agent6,
      name: 'Karen Sorensen',
      phone: '0123 456 78910',
    },
  },
  {
    id: 47,
    type: 'Apartament',
    name: 'Apartament 34',
    description: 'This modern Apartment is located in the United States, at 28 Westport Dr. Warminster, PA 18974. It was built in 2011 and has 3 bedrooms and 1 bathroom. The total surface area is 1000 sq ft. The current price is $1800, and the listing date is 31 days ago. For more information, contact Grover Robinson at 0123 456 78910.',
    image: Apartment4,
    imageLg: Apartment4Lg,
    country: 'United States',
    address: '28 Westport Dr. Warminster, PA 18974',
    bedrooms: '3',
    bathrooms: '1',
    surface: '1000 sq ft',
    year: '2011',
    price: '1800',
    date: '31',
    agent: {
      image: Agent5,
      name: 'Grover Robinson',
      phone: '0123 456 78910',
    },
  },
  {
    id: 48,
    type: 'Apartament',
    name: 'Apartament 35',
    description: 'This cozy Apartment is located in Canada, at 32 Pawnee Street Butte, MT 59701. It was built in 2012 and has 2 bedrooms and 1 bathroom. The total surface area is 1200 sq ft. The current price is $1300, and the listing date is 30 days ago. For more information, contact Kaitlyn Gonzalez at 0123 456 78910.',
    image: Apartment5,
    imageLg: Apartment5Lg,
    country: 'Canada',
    address: '32 Pawnee Street Butte, MT 59701',
    bedrooms: '2',
    bathrooms: '1',
    surface: '1200 sq ft',
    year: '2012',
    price: '1300',
    date: '30',
    agent: {
      image: Agent4,
      name: 'Kaitlyn Gonzalez',
      phone: '0123 456 78910',
    },
  },
  {
    id: 49,
    type: 'Apartament',
    name: 'Apartament 36',
    description: 'This modern Apartment is located in the United States, at 28 Westport Dr. Warminster, PA 18974. It was built in 2012 and has 3 bedrooms and 1 bathroom. The total surface area is 1000 sq ft. The current price is $1800, and the listing date is 31 days ago. For more information, contact Grover Robinson at 0123 456 78910.',
    image: Apartment6,
    imageLg: Apartment6Lg,
    country: 'United States',
    address: '28 Westport Dr. Warminster, PA 18974',
    bedrooms: '3',
    bathrooms: '1',
    surface: '1000 sq ft',
    year: '2012',
    price: '1800',
    date: '31',
    agent: {
      image: Agent5,
      name: 'Grover Robinson',
      phone: '0123 456 78910',
    },
  },
  {
    id: 50,
    type: 'Apartament',
    name: 'Apartament 37',
    description: 'This cozy Apartment is located in Canada, at 32 Pawnee Street Butte, MT 59701. It was built in 2011 and has 2 bedrooms and 1 bathroom. The total surface area is 1300 sq ft. The current price is $1300, and the listing date is 30 days ago. For more information, contact Kaitlyn Gonzalez at 0123 456 78910.',
    image: Apartment1,
    imageLg: Apartment1Lg,
    country: 'Canada',
    address: '32 Pawnee Street Butte, MT 59701',
    bedrooms: '2',
    bathrooms: '1',
    surface: '1300 sq ft',
    year: '2011',
    price: '1300',
    date: '30',
    agent: {
      image: Agent4,
      name: 'Kaitlyn Gonzalez',
      phone: '0123 456 78910',
    },
  },
  {
    id: 51,
    type: 'Apartament',
    name: 'Apartament 38',
    description: 'This spacious Apartment is located in the United States, at 798 Talbot St. Bridgewater, NJ 08807. It was built in 2019 and has 2 bedrooms and 1 bathroom. The total surface area is 1200 sq ft. The current price is $1900, and the listing date is 5 days ago. For more information, contact Jawhar Shamil Naser at 0123 456 78910.',
    image: Apartment2,
    imageLg: Apartment2Lg,
    country: 'United States',
    address: '798 Talbot St. Bridgewater, NJ 08807',
    bedrooms: '2',
    bathrooms: '1',
    surface: '1200 sq ft',
    year: '2019',
    price: '1900',
    date: '5',
    agent: {
      image: Agent7,
      name: 'Jawhar Shamil Naser',
      phone: '0123 456 78910',
    },
  },
  {
    id: 52,
    type: 'Apartament',
    name: 'Apartament 39',
    description: 'This cozy Apartment is located in Canada, at 84 Woodland St. Cocoa, FL 32927. It was built in 2010 and has 3 bedrooms and 1 bathroom. The total surface area is 1200 sq ft. The current price is $1400, and the listing date is 20 days ago. For more information, contact Karen Sorensen at 0123 456 78910.',
    image: Apartment3,
    imageLg: Apartment3Lg,
    country: 'Canada',
    address: '84 Woodland St. Cocoa, FL 32927',
    bedrooms: '3',
    bathrooms: '1',
    surface: '1200 sq ft',
    year: '2010',
    price: '1400',
    date: '20',
    agent: {
      image: Agent6,
      name: 'Karen Sorensen',
      phone: '0123 456 78910',
    },
  },
  {
    id: 53,
    type: 'Apartament',
    name: 'Apartament 40',
    description: 'This modern Apartment is located in the United States, at 28 Westport Dr. Warminster, PA 18974. It was built in 2011 and has 3 bedrooms and 1 bathroom. The total surface area is 1000 sq ft. The current price is $1800, and the listing date is 31 days ago. For more information, contact Grover Robinson at 0123 456 78910.',
    image: Apartment4,
    imageLg: Apartment4Lg,
    country: 'United States',
    address: '28 Westport Dr. Warminster, PA 18974',
    bedrooms: '3',
    bathrooms: '1',
    surface: '1000 sq ft',
    year: '2011',
    price: '1800',
    date: '31',
    agent: {
      image: Agent5,
      name: 'Grover Robinson',
      phone: '0123 456 78910',
    },
  },
  {
    id: 54,
    type: 'Apartament',
    name: 'Apartament 41',
    description: 'This cozy Apartment is located in Canada, at 32 Pawnee Street Butte, MT 59701. It was built in 2012 and has 2 bedrooms and 1 bathroom. The total surface area is 1200 sq ft. The current price is $1300, and the listing date is 30 days ago. For more information, contact Kaitlyn Gonzalez at 0123 456 78910.',
    image: Apartment5,
    imageLg: Apartment5Lg,
    country: 'Canada',
    address: '32 Pawnee Street Butte, MT 59701',
    bedrooms: '2',
    bathrooms: '1',
    surface: '1200 sq ft',
    year: '2012',
    price: '1300',
    date: '30',
    agent: {
      image: Agent4,
      name: 'Kaitlyn Gonzalez',
      phone: '0123 456 78910',
    },
  },
  {
    id: 55,
    type: 'Apartament',
    name: 'Apartament 42',
    description: 'This modern Apartment is located in the United States, at 28 Westport Dr. Warminster, PA 18974. It was built in 2012 and has 3 bedrooms and 1 bathroom. The total surface area is 1000 sq ft. The current price is $1800, and the listing date is 31 days ago. For more information, contact Grover Robinson at 0123 456 78910.',
    image: Apartment6,
    imageLg: Apartment6Lg,
    country: 'United States',
    address: '28 Westport Dr. Warminster, PA 18974',
    bedrooms: '3',
    bathrooms: '1',
    surface: '1000 sq ft',
    year: '2012',
    price: '1800',
    date: '31',
    agent: {
      image: Agent5,
      name: 'Grover Robinson',
      phone: '0123 456 78910',
    },
  }, 

];