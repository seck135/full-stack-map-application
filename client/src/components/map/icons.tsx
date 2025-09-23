import L from 'leaflet';
import ReactDOMServer from 'react-dom/server';
import {
  FaBicycle,
  FaCar,
  FaCoffee,
  FaHome,
  FaHospital,
  FaInfoCircle,
  FaSchool,
  FaShoppingCart,
  FaTree,
  FaUtensils
} from 'react-icons/fa';

// Red icon
export const redIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});


// Green icon
export const greenIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export const ICON_PX_SIZE = 24
// Helper function
const createCustomIcon = (icon: React.ReactElement, size = 24) => {
  return L.divIcon({
    className: 'custom-div-icon',
    html: ReactDOMServer.renderToString(icon),
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
  });
};

// If adding icon so to update the key in IconNames
export const customSymbols = {
  default: greenIcon,
  coffee: createCustomIcon(<FaCoffee className='map-react-icon' color="darkgreen" />),
  car: createCustomIcon(<FaCar className='map-react-icon' color="darkgreen" />),
  tree: createCustomIcon(<FaTree className='map-react-icon' color="darkgreen" />),
  hospital: createCustomIcon(<FaHospital className='map-react-icon' color="darkgreen" />),
  school: createCustomIcon(<FaSchool className='map-react-icon' color="darkgreen" />),
  home: createCustomIcon(<FaHome className='map-react-icon' color="darkgreen" />),
  shopping: createCustomIcon(<FaShoppingCart className='map-react-icon' color="darkgreen" />),
  restaurant: createCustomIcon(<FaUtensils className='map-react-icon' color="darkgreen" />),
  info: createCustomIcon(<FaInfoCircle className='map-react-icon' color="darkgreen" />),
  bicycle: createCustomIcon(<FaBicycle className='map-react-icon' color="darkgreen" />),
};