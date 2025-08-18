import { useState, useEffect } from 'react';
import './App.css';
import Remote from './components/Remote';
import SplashScreen from './components/SplashScreen';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2 seconds
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="App">
      {isLoading ? <SplashScreen /> : <Remote />}
    </div>
  );
}

export default App;
