import { useEffect, useState } from "react"
import { apiClient } from "../services/apiClient.js"
export const PlayRandomPage = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [text, setText] = useState("");
    useEffect(() => {
        const getRandomText = async () => {
            try{
                setLoading(true);
                setError(null);
                const response = await apiClient('/texts/random', {
                    method: 'GET'
                })
                const res = await response.json();
                if(!response.ok) throw new Error(res.msg || "Get random text failed");

                setText(res.data);
            }catch(error){
                setError(error.message);
            }finally{
                setLoading(false)
            }
        }

        getRandomText();

    }, [])

    console.log(error, loading);
    console.log(text);
    return(
        <div>
            <h1>RandomPage</h1>
        </div>
    )
}