import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../state/features/userSlice/userSlice';

export default function LoginForm() {
	let [myUsername, setUsername] = useState('');
	let [myPassword, setPassword] = useState('');
	let [isWrong, setWrong] = useState(false);

	const navigate = useNavigate();

	const user = useSelector((state) => state.user.user);

	useEffect(() => {
		if (user.username) {
			navigate('/');
		}
	}, [user]);

	const dispatch = useDispatch();

	function handleLogin() {
		fetch('http://localhost:4000/login', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ username: myUsername, password: myPassword }),
		})
			.then((res) => res.json())
			.then((result) => {
				if (result === 'wrong') {
					setWrong(true);
				} else {
					dispatch(loginUser(result));
					setWrong(false);
				}
			});
	}

	return (
		<>
			<div>
				<div>
					<input
						type='text'
						name='username'
						id='username'
						placeholder='Username or Email'
						onChange={(e) => setUsername(e.target.value)}
					/>
				</div>
				<div>
					<input
						type='password'
						name='password'
						id='password'
						placeholder='password'
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				{isWrong && <div>Wrong username or password</div>}
				<div>
					<button onClick={handleLogin}>Log in</button>
				</div>
			</div>
		</>
	);
}
