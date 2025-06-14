import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
    const [shortid, setShortid] = useState('')

    const handleShortidInput = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch(`http://localhost:9090/${shortid}`, {
                method: 'POST'
            })

            const data = await response.json()

            if (response.ok && data.redirectURL) {
                // Redirect to the original URL
                window.location.href = data.redirectURL
            } else {
                alert("Short ID not found!")
            }
        } catch (error) {
            console.error('Error redirecting:', error)
            alert("An error occurred")
        }
    }

    return (
        <>
            <form onSubmit={handleShortidInput}>
                <div>
                    <label>Short ID</label>
                    <br />
                    <input
                        placeholder='Enter your short id here'
                        type='text'
                        required
                        value={shortid}
                        name='shortid'
                        onChange={(e) => setShortid(e.target.value)}
                    />
                </div>
                <div>
                    <button type="submit">Enter</button>
                </div>
            </form>

            <div>
                <Link to='/login'>
                    <button>Go to login page</button>
                </Link>
            </div>
        </>
    )
}
