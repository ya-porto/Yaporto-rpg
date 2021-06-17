import React, {RefObject} from 'react';
import {Link, RouteComponentProps} from 'react-router-dom';
import {Button, IButtonCompProps} from '../../components/button';
import {IInputCompProps, Input} from '../../components/input';
import {Menu} from '../../components/menu/menu';
import {authController, ISigninData} from '../../controllers/auth';
import './style.css';

interface IButton extends IButtonCompProps {
	text: string
}

interface IInputCompPropsWithRefs extends IInputCompProps {
	ref: RefObject<Input>
}
interface ISignin {
	inputsData: IInputCompPropsWithRefs[],
	signinButton: IButton
}
class Signin extends React.Component<RouteComponentProps> {
	state: Readonly<ISignin> = {
		inputsData: [{
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
			type: 'password',
			placeholder: 'Пароль',
			name: 'password',
			validation: {
				required: true,
				password: true
			},
			ref: React.createRef()
		}],
		signinButton: {
			text: 'Авторизоваться',
			className: 'primary',
			onClick: () => this.signinClick()
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

	signinClick = () => {
		const inputList = this.state.inputsData;
		let data: ISigninData | {} = {};

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
		authController.signin(data).then(() => {
			this.props.history.push('/home');
		}).catch(e => {
			console.log(e);
		});
	}

	yaSignin = () => {
		const redirect = window.location.origin;
		authController.getOauthId(redirect)
			.then(data => {
				const URL = `https://oauth.yandex.ru/authorize?response_type=code&client_id=${data.service_id}&redirect_uri=${redirect}`;
				document.location.href = URL;
			})
			.catch(e => {
				console.log(e);
			});
	}

	render() {
		const {inputsData, signinButton} = this.state;
		return (
			<div className="page page-signin d-flex flex-column justify-center align-center">
				<Menu />
				<div className="card shadow d-flex flex-column justify-space-between align-center px-10 py-8">
					<h3 className="title mt-5">Вход</h3>
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
					<Button className={signinButton.className} onClick={signinButton.onClick}>
						{signinButton.text}
					</Button>
					<Button className="primary mt-5" onClick={this.yaSignin}>Войте с помощью <span style={{color: 'yellow'}}>Я</span>ндекс</Button>
					<div className="buttons d-flex flex-column align-center">
						<Link to="/signup" className="link mt-4">Нет аккаунта?</Link>
					</div>
				</div>
			</div>
		);
	}
}

export {Signin};
