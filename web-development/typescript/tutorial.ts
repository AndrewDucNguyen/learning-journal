 // This is for the data we're getting from the API
 type Tour = {
    id: string;
    name: string;
    url: string
    image: string
    price: string
 }

 async function fetchData(url: string): Promise<Tour[]> {
    try{
        const response = await fetch(url)
        if(!response.ok) {
            throw new Error(`HTTP error. Status: ${response.status}`)
        }
        const data:Tour[] = await response.json();
        return data;
    } catch (e) {
        console.log('Error', e)
        return []
    }
 }