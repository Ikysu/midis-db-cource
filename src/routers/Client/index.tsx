import { useParams } from "react-router-dom";

export function Client() {
    const { client_id } = useParams();
    
    return (
        <h1>{client_id}</h1>
    )
}

export default Client;