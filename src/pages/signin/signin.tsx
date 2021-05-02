import React from 'react';
import {Button, IButtonCompProps} from '../../components/button/index';
import {IInputCompProps, Input} from '../../components/input/index';
import './style.css';

interface IButton extends IButtonCompProps {
	text: string
}
interface ISignin {
	inputsData: IInputCompProps[],
	signinButton: IButton
}
class Signin extends React.Component {
	state: Readonly<ISignin> = {
		inputsData: [{
			value: '',
			type: 'input',
			placeholder: 'Логин',
			name: 'login',
			validation: {
				required: true
			}
		}, {
			value: '',
			type: 'password',
			placeholder: 'Пароль',
			name: 'password',
			validation: {
				required: true,
				password: true
			}
		}],
		signinButton: {
			text: 'Авторизоваться',
			className: 'primary',
			onClick: () => console.log('Валидируем и логинимся')
		}
	};

	inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const {name, value} = e.target;
		const newArray = this.state.inputsData.map(item => {
			if (item.name === name) {
				item.value = value;
			}

			return item;
		});
		this.setState({inputsData: newArray});
	}

	render() {
		const {inputsData, signinButton} = this.state;
		return (
			<div className="page page-signin d-flex flex-column justify-center align-center">
				<div className="card shadow d-flex flex-column justify-space-between align-center px-10 py-8">
					<h3 className="title mt-5">Вход</h3>
					<form className="form mt-4" action="" method="post">
						{
							inputsData.map(({value, type, placeholder, name, validation}, i) => (
								<Input
									value={value}
									type={type}
									placeholder={placeholder}
									name={name}
									validation={validation}
									onChange={this.inputChange}
									key={i}
								/>
							))
						}
					</form>
					<Button className={signinButton.className} onClick={signinButton.onClick}>
						{signinButton.text}
					</Button>
					<div className="buttons d-flex flex-column align-center">
						<a href="/signup" className="link mt-4">Нет аккаунта?</a>
					</div>
				</div>
			</div>
		);
	}
}

export {Signin};
