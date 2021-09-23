import axios from 'configs/axios'
const projectSites = {
    getAll: (options = { params: {} }) =>
        axios.get('/project/sites/v1/user/technical-onsite/', options),
    get: (id) => axios.get(`/project/sites/v1/user/technical-onsite/${id}`),
    // update: (form) => axios.put(`/project/sites/v1/user/pic-pusat/${form.id}`, form),
    // create: (form) => axios.post(`/project/sites/v1/user/pic-pusat/`, form),
    // delete: (id) => axios.delete(`/project/sites/v1/user/pic-pusat/${id}`),
    // updateStatus: (form) =>
    // axios.post(`project/sites/v1/user/pic-pusat/change-status`, form),
}
export default projectSites
