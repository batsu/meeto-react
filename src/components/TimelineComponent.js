import axios from 'axios';
import React, { useEffect, useState } from 'react'






function TimelineComponent() {

    const [meetos, setMeetos] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // const token = document.cookie.split("=")[1]
        axios.get('http://localhost:4000/getmeetos')
        .then(res => {
            setMeetos(res.data)
            setIsLoading(false)
        })
        .catch(err => console.log(err))
    }, [])

    function DisplayMeetos () {
        return meetos.map(obj => {
            return <div key={obj.id}>
                <h4>{obj.name}</h4><h5>{obj.post_content}</h5>
                </div>
        })
    }

  return (
      <>
        <h3>Meetos!</h3>
        {(isLoading) ? <h4>Loading...</h4> : <DisplayMeetos />}

      </>
    
    
  )
}

export default TimelineComponent