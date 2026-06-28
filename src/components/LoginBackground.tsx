import Oval from '../assets/Oval Copy 3.svg';
import Oval2 from '../assets/Oval Copy 2.svg';
import Oval3 from '../assets/Oval Copy.svg';
import Oval4 from '../assets/Oval.svg';


export default function LoginBackground() {
  return (
    <>
      <div className="w-[900px] h-[300px] absolute top-[-150px] left-0">
        <img src={Oval} alt="Oval" />
      </div>
      <div className="w-[800px] h-[300px] absolute top-0 right-[-200px]">
        <img src={Oval3} alt="Oval3" />
      </div>
      <div className="w-[800px] h-[300px] absolute bottom-[180px] left-0">
        <img src={Oval4} alt="Oval4" />
      </div>
      <div className="w-[800px] h-[400px] absolute bottom-[250px] right-[-230px]">
        <img src={Oval2} alt="Oval2" />
      </div>

    </>
  );
}

