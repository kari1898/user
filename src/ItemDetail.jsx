import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from './supabase';
import './index.css';

function ItemDetail()
{
    // provides item ID from URL param
 const {id} = useParams()
 const [itemData, setItemData] = useState(null)

 //fetches item details
 useEffect(
    () => {
    const fetchItemDetails = async () =>
    {
    const {data, error} = await supabase.from('scp').select('*').eq('id', id).single()
    if(error){
        console.error(error)
    }
    else {
        setItemData(data)
    }
    }
    fetchItemDetails() 
    }, [id]  // re-fetches data when ID changes
 )
 
  
 return(
        <div>
            {
                itemData ? (
                <>
                <h1>{itemData.item}</h1>
                <h2>{itemData.class}</h2>
                <p><img src={`${itemData.imageFile}`} className="w-50 h-50"  alt={itemData.item}/></p>
                <h3>Description</h3>
                <p>{itemData.description}</p>
                <h3>Containment</h3>
                <p>{itemData.containment}</p>
                </>
                ) : (
                    <p>Loading....</p>// message loading
                )
            }
        </div>
    )
}
export default ItemDetail;