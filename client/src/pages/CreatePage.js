import React, { useState, useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/AuthContext'


export const CreatePage = () => {
	const history = useHistory()
	const auth = useContext(AuthContext)
	const { req } = useHttp()
	const [link, setLink] = useState('')

	const pressHandler = async event => {
		if (event.key === 'Enter') {
			try {
				const data = await req('http://localhost:5000/api/link/generate', 'POST', { from: link }, {
					Authorization: `Bearer ${auth.token}`
				})
				return history.push(`/detail/${data.link._id}`)
			} catch (e) { }
		}
	}

	useEffect(() => window.M.updateTextFields(), [])

	return (
		<div className="row">
			<div className="col s8 offset-s2" style={{ paddingTop: '2rem' }}>
				<div className="input-field">
					<input
						placeholder="Вставьте ссылку"
						id="link"
						type="text"
						value={link}
						onChange={e => setLink(e.target.value)}
						onKeyPress={pressHandler}
					/>
					<label htmlFor="link">Введите ссылку</label>
				</div>
			</div>
		</div>
	)
}