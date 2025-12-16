import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiClient } from "../services/apiClient";

export const TextStatsPage = () => {
    const { textId } = useParams();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [metrics, setMetrics] = useState({});
    useEffect(() => {
        const getTextMetrics = async() => {
            try{
                setLoading(true);
                setError(null);
                const response = await apiClient(`/texts/${textId}/metrics`, {
                    method: "GET"
                });

                const res = await response.json();
                if(!response.ok) throw new Error(res.msg || "Failed getting the stats of the text");

                setMetrics(res.data);
            }catch(error){
                setError(error.message)
            }finally{
                setLoading(false);
            }
        }
        getTextMetrics();
    }, [textId])
    console.log(error, loading)
    console.log(metrics)
  return (
    <div>
        <h1>Text stats page {textId}</h1>
    </div>
  )
}