import axios from 'axios'

const url = '/api/persons'

const createP = newP => {
    const response = axios.post(url, newP)
    return response.then(resp => resp.data)
}

export default createP
