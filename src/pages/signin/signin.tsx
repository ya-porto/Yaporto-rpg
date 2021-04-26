import React from 'react';
import {Button, IButtonCompProps} from '../../components/button/index';
import {IInputCompProps, Input} from '../../components/input/index';
import {validationEmpty, validationPassword} from '../../utils/validator';
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
				fn: (val: string) => validationEmpty(val),
				text: 'Логин не может быть пустой строкой'
			}
		}, {
			value: '',
			type: 'password',
			placeholder: 'Пароль',
			name: 'password',
			validation: {
				fn: (val: string) => validationPassword(val),
				text: 'Невалидный пароль'
			}
		}],
		signinButton: {
			text: 'Авторизоваться',
			className: 'primary',
			onClick: () => console.log('Валидируем и логинимся')
		}
	};

	render() {
		const {inputsData, signinButton} = this.state;
		return (
			<div className="page page-signin d-flex flex-column justify-center align-center">
				<div className="card shadow d-flex flex-column justify-space-between align-center px-10 py-8">
					<h3 className="title mt-5">Вход</h3>
					<form className="form mt-4" action="" method="post">
						{
							inputsData.map((item, i) => {
								const {value, type, placeholder, name, validation} = item;
								return <Input
									value={value}
									type={type}
									placeholder={placeholder}
									name={name}
									validation={validation}
									onChange={(v: string) => {
										item.value = v;
									}}
									key={i}
								/>;
							})
						}
					</form>
					<Button className={signinButton.className} onClick={signinButton.onClick.bind(this)}>
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
