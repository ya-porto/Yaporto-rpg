import {getOauthUrlRedirect} from '../../client/constants';
import React, {RefObject} from 'react';
import {Dispatch} from 'redux';
import {connect} from 'react-redux';
import {Link, RouteComponentProps} from 'react-router-dom';

import {fetchUserBy, getAllThemes, getUserTheme} from '../../redux/userSlice';
import {RootState} from '../../redux/types';
import {Button, IButtonCompProps} from '../../components/button';
import {IInputCompProps, Input} from '../../components/input';
import {Menu} from '../../components/menu/menu';
import {authController, ISigninData} from '../../controllers/auth';
import {Navigation} from '../../client/constants';
import './style.css';

interface IButton extends IButtonCompProps {
	text: string
}

interface IInputCompPropsWithRefs extends IInputCompProps {
	ref: RefObject<Input>
}
interface ISignin {
	inputsData: IInputCompPropsWithRefs[],
	signinButton: IButton,
}

interface SigninProps extends RouteComponentProps {
	user: RootState;
	dispatch: Dispatch;
}
class Signin extends React.Component<SigninProps> {
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

	getUserInfo = async () => {
		await this.props.dispatch(fetchUserBy())
			.then(() => this.getUserTheme())
	}

	getAllThemes =  () => {
		this.props.dispatch(getAllThemes())
	}

	getUserTheme = () => {
		this.props.dispatch(getUserTheme(this.props.user.id))
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
			this.getUserInfo()
			this.getAllThemes();
		})
		.catch(e => {
			console.log(e);
		});
	}

	yaSignin = () => {
		const redirect = window.location.origin;
		authController.getOauthId(redirect)
			.then(data => {
				const URL = getOauthUrlRedirect(data.service_id, redirect);
				document.location.href = URL;
			})
			.catch(e => {
				console.log(e);
			});
	}

	render() {
		const {inputsData, signinButton} = this.state;
		return (
			<div className={`page ${this.props.user.theme}`}>
				<Menu />
				<div className="card_big">
					<div className="card_big_inner d-flex flex-column align-center">
						<h1 className="mt-5">Вход</h1>
						<form className="signin_form mt-4" action="" method="post">
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
						<Link to={Navigation.Main}>
							<Button className={signinButton.className} onClick={signinButton.onClick}>
								{signinButton.text}
							</Button>
						</Link>
						<Button className="primary mt-5" onClick={this.yaSignin}>Войте с помощью <span style={{color: 'yellow'}}>Я</span>ндекс</Button>
						<div className="signin_buttons d-flex flex-column align-center">
							<Link to={Navigation.Signup} className="link mt-4">Нет аккаунта?</Link>
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

export default connect(mapStateToProps)(Signin);
