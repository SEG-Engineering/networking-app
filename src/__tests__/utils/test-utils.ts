// Helper function for API calls with error handling
export async function apiCall(url: string, options: RequestInit = {}) {
    try {
        const response = await fetch(url, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
        })

        const data = await response.json()

        if (!response.ok) {
            console.error('API Error:', {
                status: response.status,
                data,
                url,
                method: options.method || 'GET'
            })
            throw new Error(data.error || 'API call failed')
        }

        return { response, data }
    } catch (error) {
        console.error('Request failed:', {
            url,
            method: options.method || 'GET',
            error
        })
        throw error
    }
}