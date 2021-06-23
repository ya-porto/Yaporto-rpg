import React, {RefObject} from 'react';
import {Dispatch} from 'redux';
import {connect} from 'react-redux';
import {Link, RouteComponentProps} from 'react-router-dom';

import {fetchUserBy} from '../../redux/userSlice';
import {RootState} from '../../redux/types';
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

interface SignupProps extends RouteComponentProps {
	user: RootState;
	dispatch: Dispatch;
}
class Signup extends React.Component<SignupProps> {
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

	getUserInfo = async () => {
		await this.props.dispatch(fetchUserBy());
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
			this.getUserInfo();
		}).catch(e => {
			console.log(e);
		});
	}

	render() {
		const {inputsData, signupButton} = this.state;
		return (
			<div className="page">
				<Menu />
				<div className="card_big">
					<div className="signup_card_inner d-flex justify-space-between">
						<div className="signup_left">
							<form className="signup_form mt-4" action="" method="post">
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
						</div>

						<div className="signup_right d-flex flex-column align-end justify-space-between">
							<h1 className="signup_header mt-5">Регистрация</h1>
							
							<div className="signup_buttons d-flex flex-column align-end mb-7">
								<Link to="/">
									<Button onClick={signupButton.onClick}>
										{signupButton.text}
									</Button>
								</Link>
									<Link className="link mt-2" to="/signin">
										Есть аккаунт
								</Link>
							</div>
						</div>
						
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state: RootState) => ({
	user: state.user
});

export default connect(mapStateToProps)(Signup);
