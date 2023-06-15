"use client" 
import axios from 'axios';
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';

export const Vsafar = createContext<any>(undefined)
export const useVsafar = () => {
    const VsafarClient = useContext(Vsafar)
    return VsafarClient
}

export  function VsafarProvider({ children }:{children:ReactNode}) {
    const [cards, setCards] = useState<any>([]);
    const [cardsByselector, setCardsByselector]= useState<any>([]);
    const [selector,setSelector] = useState<any>({categorie:"categorie",theme:"theme"})
  
    useEffect(() => {
      const getCards = async ()=> { 
        const res = await axios.get("http://localhost:3000/api/utilisateur/site") as any
        if (res.data.success ===true) setCards(res.data.data)
      } 
      getCards()
      return()=>console.log('Component unmounted, cleaning up...')
    }, [])
    useEffect(()=>{
      setCardsByselector(cards)
    },[cards])
    useEffect(() => {
      console.log({cardsByselector})
      
        setCardsByselector((current:any)=>{
          
          let filteredCards = cards;    
          console.log({selector}) 
          if (selector.categorie !== 'categorie') filteredCards = filteredCards.filter((card:any) => {console.log(card.categorie?.nom , selector.categorie,card.categorie?.nom == selector.categorie);return card.categorie?.nom == selector.categorie})
          if (selector.theme !== 'theme') filteredCards = filteredCards.filter((card:any) => {console.log(card.theme?.nom , selector.theme,card.theme?.nom == selector.theme);return card.theme?.nom == selector.theme})
          console.log("finale",filteredCards)
          return filteredCards
        })
      
    }, [selector.categorie,selector.theme]);
  
    return (
      <Vsafar.Provider value={[cards,setCards,cardsByselector,setCardsByselector,selector,setSelector]}>
        {children}
      </Vsafar.Provider>
    );
  }


  //to fix if time allows it : remove the stupid general exposation of state variables and put exposed tailored functions that work with the state variables