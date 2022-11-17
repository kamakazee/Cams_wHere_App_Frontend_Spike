import './App.css';
import './image.css';
import ImageGallery from './components/ImageGallery';
import ImageUpload from './components/ImageUpload';
import Preview from './components/Preview'

function App() {


  //fetchUsers();
  //fetchImages();
  
  return (
    <div className="App">
      <h2>Hello I am in App</h2>
      <ImageUpload />
      <ImageGallery/>
    </div>
  );
}

export default App;
