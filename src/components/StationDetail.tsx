import React from 'react'
import { useParams } from 'react-router-dom';
import { stations } from '../data';


function StationDetail() {
    const { id } = useParams();
    const station = stations.find((s) => s.id === Number(id));

    return (
        <div>
            <h2>{station?.name}</h2>
            <p>{station?.location}</p>
            <iframe
                src={`https://www.google.com/maps?q=${station?.latitude},${station?.longitude}&output=embed`}
                width="100%"
                height="400"
                style={{ border: 0 }}
            ></iframe>
        </div>
    )
}

export default StationDetail;