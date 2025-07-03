import {create} from "zustand";
export const productStore = create((set)=>
({
products:[],
loading:false,
error:null,
fetchedProducts:async ()=>
{
    set({loading:true});
    try {
        const response= await fetch("https://68302f92f504aa3c70f6b7ce.mockapi.io/products");
        if(!response.ok) throw new Error("error while loading");
        const items = await response.json();
        set({products:items,loading:false})
    } catch (error) {
        set({error:error.message,loading:false})
    }
}
}))