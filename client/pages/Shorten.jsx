import { useState } from "react"
import { useNavigate } from 'react-router-dom'

export default function Shorten(){
    const [longLink, setLongLink] = useState('')
    const [shortId, setShortId] = useState(null)
    const navigate = useNavigate()

    async function handleLongLink(e){
        e.preventDefault()
        try {
            const response = await fetch('http://localhost:9090/url', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url: longLink }),
            });
            const data = await response.json()
            console.log(data)
            setShortId(data.shortId)

            if (response.ok){
                alert("Short URL created: " + data.shortId);
                navigate('/')
            }
        } catch (error) {
            console.error('Error creating short link:', error)
        }
    }

    return (
        <form onSubmit={handleLongLink}>
            <div>
                <input 
                    placeholder="Enter your long link"
                    required
                    name="longLink"
                    value={longLink}
                    onChange={(e) => setLongLink(e.target.value)}
                />
            </div>
            {longLink && <p>Original URL: {longLink}</p>}
            <button type="submit">Create shortlink</button>
            {shortId && <p>Your short ID is: {shortId}</p>}
            {shortId &&<p> You may use it as <a href='localhost:9090/{shortId}'>localhost:9090/{shortId}</a></p>}
        </form>
    )
}
