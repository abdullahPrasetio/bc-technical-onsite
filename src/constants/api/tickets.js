import axios from 'configs/axios'

const tickets = {
    getAll: (options = { params: {} }) =>
        axios.get('/tickets/v1/technical-onsite/', options),
    get: (id) => axios.get(`/tickets/v1/technical-onsite/${id}`),
    reply: (form, id) =>
        axios.post(`/tickets/v1/technical-onsite/reply/${id}`, form),
    create: (form) => axios.post(`/tickets/v1/technical-onsite`, form),
}

export default tickets
