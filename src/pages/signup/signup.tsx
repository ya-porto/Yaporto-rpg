import React from 'react';
import {Button, IButtonCompProps} from '../../components/button/index';
import {Input, IInputCompProps} from '../../components/input/index';
import {validationEmail, validationEmpty, validationPassword, validationPhone} from '../../utils/validator';
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
				fn: (val: string) => validationEmail(val),
				text: 'Невалидная почта'
			}
		}, {
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
			type: 'input',
			placeholder: 'Имя',
			name: 'first_name',
			validation: {
				fn: (val: string) => validationEmpty(val),
				text: 'Обязательное поле'
			}
		}, {
			value: '',
			type: 'input',
			placeholder: 'Фамилия',
			name: 'second_name',
			validation: {
				fn: (val: string) => validationEmpty(val),
				text: 'Обязательное поле'
			}
		}, {
			value: '',
			type: 'tel',
			placeholder: 'Телефон',
			name: 'phone',
			validation: {
				fn: (val: string) => validationPhone(val),
				text: 'Некорректный номер телефона. Введите от 11 до 13 цифр (без пробелов и тире).'
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
		}, {
			value: '',
			type: 'password',
			placeholder: 'Пароль (еще раз)',
			name: 'password_again',
			validation: {
				fn: (val: string): boolean => {
					const pass: IInputCompProps | undefined = this.state.inputsData.find(x => x.name === 'password');
					if (pass) {
						return validationPassword(val) && pass.value === val;
					}

					return false;
				},
				text: 'Пароли не совпадают'
			}
		}],
		signupButton: {
			text: 'Зарегистрироваться',
			className: 'primary mt-5',
			onClick: () => console.log('Валидируем и регистрируем')
		}
	};

	render() {
		const {inputsData, signupButton} = this.state;
		return (
			<div className="page page-signup d-flex flex-column justify-center align-center">
				<div className="card shadow d-flex flex-column justify-space-between align-center px-10 py-8">
					<h3 className="title mt-5">Регистрация</h3>
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
					<Button className={signupButton.className} onClick={signupButton.onClick.bind(this)}>
						{signupButton.text}
					</Button>
					<div className="buttons d-flex flex-column align-center">
						<a href="/signin" className="link mt-4">Войти</a>
					</div>
				</div>
			</div>
		);
	}
}

export {Signup};
