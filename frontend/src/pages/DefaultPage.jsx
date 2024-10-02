
import Navbar from '../Components/Navbar';


const DefaultPage = () => {
 
  return (
    <div className="min-h-screen w-full">
      <Navbar />
      <div className="flex-1 flex items-center justify-center">
        <p className="text-4xl font-bold text-[#110229]" id="element"></p>
      </div>
    </div>
  );
};

export default DefaultPage;
