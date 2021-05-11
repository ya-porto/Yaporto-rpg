import React from 'react';
import {Link} from 'react-router-dom';
import {Button, IButtonCompProps} from '../../components/button/index';
import {Input, IInputCompProps} from '../../components/input/index';
import {ErrorBoundary} from '../../components/errorBoundary/errorBoundary';
import './style.css';

interface IButton extends IButtonCompProps {
	text: string
}
interface ISignup {
	inputsData: IInputCompProps[],
	signupButton: IButton
}
class Signup extends React.Component {
	state: Readonly<ISignup> = {
		inputsData: [{
			value: '',
			type: 'email',
			placeholder: 'Почта',
			name: 'email',
			validation: {
				required: true,
				email: true
			}
		}, {
			value: '',
			type: 'input',
			placeholder: 'Логин',
			name: 'login',
			validation: {
				required: true
			}
		}, {
			value: '',
			type: 'input',
			placeholder: 'Имя',
			name: 'first_name',
			validation: {
				required: true
			}
		}, {
			value: '',
			type: 'input',
			placeholder: 'Фамилия',
			name: 'second_name',
			validation: {
				required: true
			}
		}, {
			value: '',
			type: 'tel',
			placeholder: 'Телефон',
			name: 'phone',
			validation: {
				required: true,
				phone: true
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
		}, {
			value: '',
			type: 'password',
			placeholder: 'Пароль (еще раз)',
			name: 'password_again',
			validation: {
				equal: () => this.state.inputsData.find(x => x.name === 'password')?.value
			}
		}],
		signupButton: {
			text: 'Зарегистрироваться',
			className: 'primary mt-5',
			onClick: () => console.log('Валидируем и регистрируем')
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
		const {inputsData, signupButton} = this.state;
		return (
			<div className="page page-signup d-flex flex-column justify-center align-center">
				<ErrorBoundary>
				<div className="card shadow d-flex flex-column justify-space-between align-center px-10 py-8">
					<h3 className="title mt-5">Регистрация</h3>
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
					<Link to="/home">
						<Button className={signupButton.className} onClick={signupButton.onClick}>
							{signupButton.text}
						</Button>
					</Link>
					<div className="buttons d-flex flex-column align-center">
						<Link className="link mt-4" to="/signin">
							Войти
						</Link>
					</div>
				</div>
				</ErrorBoundary>
			</div>
		);
	}
}

export {Signup};
