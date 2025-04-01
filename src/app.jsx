import React, { useState, useEffect } from 'react';
import './App.css';
import BanList from './BanList';
import ItemDisplay from './ItemDisplay';

const API_URL = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos';
const API_KEY = 'DEMO_KEY'; 


console.log()
function App() {
  const [data, setData] = useState([]);
  const [banList, setBanList] = useState([]);
  const [currentItem, setCurrentItem] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`${API_URL}?sol=1000&api_key=${API_KEY}`);
      if (response.status === 429) {
        const retryAfter = response.headers.get('Retry-After');
        console.error(`Rate limit exceeded. Retry after ${retryAfter} seconds.`);
        setTimeout(fetchData, retryAfter * 1000); 
      } else if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      } else {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const result = await response.json();
          const filteredResult = filterResults(result.photos);
          setData(filteredResult);
          if (filteredResult.length > 0) {
            setCurrentItem(filteredResult[Math.floor(Math.random() * filteredResult.length)]);
          }
        } else {
          throw new Error('Unexpected content type');
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const filterResults = (results) => {
    return results.filter(item => !banList.includes(item.camera.name));
  };

  const handleBanClick = (attribute) => {
    setBanList([...banList, attribute]);
    fetchData();
  };

  const handleRemoveBanClick = (attribute) => {
    setBanList(banList.filter(item => item !== attribute));
    fetchData();
  };

  return (
    <div className="App">
      <h1>Discover Mars Rover Photos!</h1>
      <button onClick={fetchData}>Discover</button>
      {currentItem && (
        <ItemDisplay item={currentItem} onBanClick={handleBanClick} />
      )}
      <BanList banList={banList} onRemoveBanClick={handleRemoveBanClick} />
    </div>
  );
}

export default App;
