import React, {RefObject} from 'react';
import {Link, RouteComponentProps} from 'react-router-dom';
import {Button, IButtonCompProps} from '../../components/button';
import {Input, IInputCompProps} from '../../components/input';
import {Menu} from '../../components/menu/menu';
import {authController, ISignupData} from '../../controllers/auth';
import './style.css';

interface IButton extends IButtonCompProps {
	text: string
}
interface IInputCompPropsWithRefs extends IInputCompProps {
	ref: RefObject<Input>
}
interface ISignup {
	inputsData: IInputCompPropsWithRefs[],
	signupButton: IButton
}
class Signup extends React.Component<RouteComponentProps> {
	state: Readonly<ISignup> = {
		inputsData: [{
			value: '',
			type: 'email',
			placeholder: 'Почта',
			name: 'email',
			validation: {
				required: true,
				email: true
			},
			ref: React.createRef()
		}, {
			value: '',
			type: 'input',
			placeholder: 'Логин',
			name: 'login',
			validation: {
				required: true
			},
			ref: React.createRef()
		}, {
			value: '',
			type: 'input',
			placeholder: 'Имя',
			name: 'first_name',
			validation: {
				required: true
			},
			ref: React.createRef()
		}, {
			value: '',
			type: 'input',
			placeholder: 'Фамилия',
			name: 'second_name',
			validation: {
				required: true
			},
			ref: React.createRef()
		}, {
			value: '',
			type: 'tel',
			placeholder: 'Телефон',
			name: 'phone',
			validation: {
				required: true,
				phone: true
			},
			ref: React.createRef()
		}, {
			value: '',
			type: 'password',
			placeholder: 'Пароль',
			name: 'password',
			validation: {
				required: true,
				password: true
			},
			ref: React.createRef()
		}, {
			value: '',
			type: 'password',
			placeholder: 'Пароль (еще раз)',
			name: 'password_again',
			validation: {
				equal: () => this.state.inputsData.find(x => x.name === 'password')?.value
			},
			ref: React.createRef()
		}],
		signupButton: {
			text: 'Зарегистрироваться',
			className: 'primary mt-5',
			onClick: () => this.signupClick()
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

	signupClick = () => {
		const inputList = this.state.inputsData;
		let data: ISignupData | {} = {};

		// Валидация и сбор данных
		inputList.forEach(input => {
			const node = input.ref.current;

			if (!node || !node.isValid()) {
				return;
			}

			if (input.name) {
				data[input.name] = input.value;
			}
		});

		// Все норм. Я валидирую
		// @ts-ignore
		authController.signup(data).then(() => {
			this.props.history.push('/');
		}).catch(e => {
			console.log(e);
		});
	}

	render() {
		const {inputsData, signupButton} = this.state;
		return (
			<div className="page page-signup d-flex flex-column justify-center align-center">
				<Menu />
				<div className="card shadow d-flex flex-column justify-space-between align-center px-10 py-8">
					<h3 className="title mt-5">Регистрация</h3>
					<form className="form mt-4" action="" method="post">
						{
							inputsData.map(({value, type, placeholder, name, validation, ref}, i) => (
								<Input
									value={value}
									type={type}
									placeholder={placeholder}
									name={name}
									validation={validation}
									onChange={this.inputChange}
									key={i}
									ref={ref}
								/>
							))
						}
					</form>
					<Button className={signupButton.className} onClick={signupButton.onClick}>
						{signupButton.text}
					</Button>
					<div className="buttons d-flex flex-column align-center">
						<Link className="link mt-4" to="/signin">
							Войти
						</Link>
					</div>
				</div>
			</div>
		);
	}
}

export {Signup};
