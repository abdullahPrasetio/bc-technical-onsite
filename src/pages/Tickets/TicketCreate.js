import { BreadCrumb, Button, Input, Label, Layout, TextArea } from 'components'
import projectUnits from 'constants/api/projectUnits'
import tickets from 'constants/api/tickets'
import React, { useEffect, useState } from 'react'

function TicketCreate({ match, history }) {
    const id = match.params.id
    const [form, setForm] = useState({
        filePath: [],
        ticket_type_id: 1,
        user_support_id: '',
        user_support_name: '',
        title: '',
        prioritas: '',
        description: '',
        property_id: [1, 2, 3, 4, 5],
        value: [],
    })

    useEffect(() => {
        projectUnits.get(id).then((res) => {
            const result = res.data
            const values = []
            values.push(result.name)
            values.push(result.siteproject.name)
            values.push(result.siteproject.project.name)
            values.push(result.siteproject.project.customer_name)
            values.push(id)
            const newdata = { ...form }
            newdata['user_support_id'] =
                result.siteproject.project.technical_leader_id
            newdata['user_support_name'] =
                result.siteproject.project.technical_leader_name
            newdata['value'] = values
            setForm(newdata)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    const handleFileChange = (e) => {
        if (e.target.files) {
            const files = Array.from(e.target.files)
            const newdata = { ...form }
            const promises = files.map((file) => {
                return new Promise((resolve, reject) => {
                    const reader = new FileReader()
                    reader.addEventListener('load', (ev) => {
                        resolve(ev.target.result)
                    })
                    reader.addEventListener('error', reject)
                    reader.readAsDataURL(file)
                })
            })

            Promise.all(promises).then(
                (images) => {
                    newdata['filePath'] = images
                    setForm(newdata)
                },
                (error) => {
                    console.error(error)
                }
            )
        }
    }
    const handle = (e) => {
        const newdata = { ...form }
        newdata[e.target.id] = e.target.value
        setForm(newdata)
    }
    const submit = (e) => {
        e.preventDefault()
        tickets.create(form).then((res) => {
            history.push('/tickets')
        })
    }
    return (
        <Layout
            title="Ticket"
            subTitle="Open Ticket"
            breadcrumb={
                <>
                    <BreadCrumb type="first" label="Ticket" />
                </>
            }
        >
            <form onSubmit={submit}>
                <div className="mb-3">
                    <Label htmlFor="title">Title</Label>
                    <Input
                        name="title"
                        onChange={(e) => handle(e)}
                        id="title"
                        placeholder="Type title"
                    />
                </div>
                <div className="mb-3">
                    <Label htmlFor="prioritas">Prioritas</Label>
                    <select
                        value={form.prioritas}
                        name="prioritas"
                        id="prioritas"
                        className="px-3 py-2 w-full border border-gray-300 rounded focus:border-gray-400 focus:ring-2 ring-gray-200 focus:outline-none transition-colors duration-300"
                        onChange={(e) => handle(e)}
                    >
                        <option value="">Pilih</option>
                        <option value="Rendah">Rendah</option>
                        <option value="Sedang">Sedang</option>
                        <option value="Tinggi">Tinggi</option>
                        <option value="Darurat">Darurat</option>
                    </select>
                </div>
                <div className="mb-3">
                    <Label htmlFor="description">Pesan</Label>
                    <TextArea
                        name="description"
                        id="description"
                        value={form.description}
                        onChange={(e) => handle(e)}
                        placeholder="type your message"
                    />
                </div>
                <div className="mb-3">
                    <Input
                        type="file"
                        onChange={(e) => handleFileChange(e)}
                        multiple={true}
                    />
                </div>
                <div className="flex flex-row justify-end">
                    <Button>Create Ticket</Button>
                </div>
            </form>
        </Layout>
    )
}

export default TicketCreate
