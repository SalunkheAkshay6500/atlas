import { useState } from 'react';
import './App.css';
import axios from 'axios';


function App() {

  const [search,setSearch] = useState('');
  const [answer,setAnswer]=useState([]);

  const handleSearch = (e) =>{
    
    e.preventDefault();

    let requestUrl =`https://restcountries.com/v3.1/name/${search}?fullText=true`;

    axios.get(requestUrl)
      .then(
        (response)=>
        {
           setAnswer(response.data); 
        }
      )
      .catch(
        (error)=>
        {
           console.log("error")
        }
      )
  }

  return(
    <div>
    <h1 className='  p-2 text-center border font-bold  text-2xl border-black'>Country Search Engine</h1>
    <div className="mt-10 bg-center md:max-w-[300px]  shadow-xl min-h-[200px] mx-auto p-3">
   
   
     
      <div className='border-black mt-3 text-center '>

      <form onSubmit={handleSearch}>
      <input className=' border border-black mt-1 text-left p-3 rounded-xl' placeholder="Write Country Name" onChange={(e)=>setSearch(e.target.value)}/>
      </form> 
      </div>

      <div className='output-box mt-5'>
       

        {
          
          search.length === 2
            ? <div className='text-5xl text-red-500 mt-5 text-center font-bold'>loading...</div>
            : 
          
          
          
          answer && (
          answer.map((data)=>(

            <li className='' key={1} style={{ listStyle:'none' }}>
              <img src={data.flags.svg} className='flag-image shadow' style={{ alignSelf:'center' }} wclassNameth={200} height={120} alt='flag'/>
              <p className='mt-5'><h1 className='text-center font-bold'>{data.name.official}
              </h1></p>
             
              <p className='mt-2'>{`Capital: ${data.capital[0]}`}</p>
              <p className='mt-2'>{`population: ${data.population}`}</p>
              
              
              <p className='mt-2'>{`Languages : ${Object.values(data.languages).map((language)=>language)}`}</p>
              <p className='mt-2'>{data.subregion? `Subregion: ${data.subregion}` : `Region: ${data.region}`}</p>
           
            </li>
          ))
        )}
        
      </div>

    </div>
    </div>
  );
}

export default App;
