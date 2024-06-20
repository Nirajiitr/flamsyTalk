
import Navbar from '../Components/Navbar';


const DefaultPage = () => {
 
  return (
    <div className="h-screen bg-custom-image m-0 p-0 flex flex-col sm:w-full sm:h-full">
      <Navbar />
      <div className="flex-1 flex items-center justify-center">
        <p className="text-4xl font-bold text-[#110229]" id="element"></p>
      </div>
    </div>
  );
};

export default DefaultPage;
