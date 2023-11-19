import { useEffect, useState } from 'react';
import { MagnifyingGlass } from '@phosphor-icons/react'; 
import './App.css';
import axios from 'axios';

function App() {
  //setPokemns salva os dados, 
  //olhar em que formato o state salva os dados
  const [pokemons, setPokemons] = useState({})
  //buscar
  const [busca, setBusca] = useState('');

  const getPokemons =  async (id) => {
    try{
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
      setPokemons((PrevPokemon) => ({...PrevPokemon, [id]: response.data})); 
        // .then(response => {
        //os dados estão sendo atualizados na setPokemons pela pokemon
        // const pokemons = response.data;
         //pega sempre o ultimo poker
        
    }catch(error){
      console.log(error);
    }
    

    

  
  }

  const arrayPokemons = () => Array(150).fill().map((_, index) => getPokemons(index +1));
    //cria um array de pokemons de 150 pokemons filtrando e mapeia pelo index, na API só existe pokemons 1 em diante
  
 
    //busca pokemons
    const buscarPoker = Object.values(pokemons).filter(
      //forma de busaca nome e id
      (pokemon) => pokemon.name.toLocaleLowerCase().includes(busca.toLocaleLowerCase())
        || pokemon.id === parseInt(busca)
      )
  

   useEffect(() => {
    arrayPokemons()
    

  }, [])
 
//mostrando os pokes na tela
  return (
 
   <div className='container'>
  
    <h1>Pokedex</h1> 
  
    <div className='busca-container'>
    <MagnifyingGlass size={40} color='white'/>
      <input 
      className='busca'
      type='seaceh'
      placeholder='Pesquisar Poker'
      value={busca}
      onChange = {({target}) => setBusca(target.value)}
      />
    </div>

    <ul className='pokemons'>
      {buscarPoker.map(({id, name, types}) => 
      <li className='card'>
          
      <img className='card-img' src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}  all= {name} />

        <h2>{id}. {name}</h2>
  
        <p className='type'>{types.map(item => item.type.name).join(" || ")}</p>

      </li>)}
    </ul>
   </div>
  );
}

export default App;
