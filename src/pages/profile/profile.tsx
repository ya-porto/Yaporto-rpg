import React, {RefObject} from 'react';
import {RouteComponentProps} from 'react-router-dom';
import {Button, IButtonCompProps} from '../../components/button';
import {Input, IInputCompProps} from '../../components/input';
import {Menu} from '../../components/menu/menu';
import {Modal} from '../../components/modal';
import {authController, IUserInfoData} from '../../controllers/auth';
import {IChangePassword, IChangeUserInfo, userController} from '../../controllers/user';
import './style.css';
import {fetchUserBy, store} from '../../redux/storeUser';
import { getDocument } from 'ssr-window';
const document = getDocument();

interface IButton extends IButtonCompProps {
	text: string
}
interface IUserInfo {
	value: string,
	name: string,
	displayName?: string
}

interface IInputCompPropsWithRefs extends IInputCompProps {
	ref: RefObject<Input>
}
interface IProfile {
	isUserInfoShown: boolean,
	isEditUserInfoShown: boolean,
	isEditPasswordShown: boolean,
	isModalShown: boolean,
	inputsUserInfo: IInputCompPropsWithRefs[],
	inputsPassword: IInputCompPropsWithRefs[],
	buttonsProfile: IButton[],
	userInfo: IUserInfo[],
	userAvatar: string
}
class Profile extends React.Component<RouteComponentProps> {
	state: Readonly<IProfile> = {
		isUserInfoShown: true,
		isEditUserInfoShown: false,
		isEditPasswordShown: false,
		isModalShown: false,
		inputsUserInfo: [{
			value: '',
			type: 'email',
			placeholder: 'Почта',
			name: 'email',
			validation: {
				email: true
			},
			ref: React.createRef()
		}, {
			value: '',
			type: 'login',
			placeholder: 'Логин',
			name: 'login',
			validation: {
				required: true
			},
			ref: React.createRef()
		}, {
			value: '',
			type: 'text',
			placeholder: 'Имя',
			name: 'first_name',
			validation: {
				required: true
			},
			ref: React.createRef()
		}, {
			value: '',
			type: 'text',
			placeholder: 'Фамилия',
			name: 'second_name',
			validation: {
				required: true
			},
			ref: React.createRef()
		}, {
			value: '',
			type: 'text',
			placeholder: 'Отображаемое имя',
			name: 'display_name',
			validation: {
				required: true
			},
			ref: React.createRef()
		}, {
			value: '',
			type: 'phone',
			placeholder: 'Телефон',
			name: 'phone',
			validation: {
				required: true,
				phone: true
			},
			ref: React.createRef()
		}],
		inputsPassword: [{
			value: '',
			type: 'password',
			placeholder: 'Старый пароль',
			name: 'oldPassword',
			validation: {
				password: true
			},
			ref: React.createRef()
		}, {
			value: '',
			type: 'password',
			placeholder: 'Новый пароль',
			name: 'newPassword',
			validation: {
				password: true
			},
			ref: React.createRef()
		}, {
			value: '',
			type: 'password',
			placeholder: 'Пароль (еще раз)',
			name: 'password_again',
			validation: {
				equal: () => this.state.inputsPassword.find(x => x.name === 'newPassword')?.value
			},
			ref: React.createRef()
		}],
		buttonsProfile: [{
			text: 'Изменить данные',
			className: 'profile-buttons__item relative d-flex mt-5 pointer link',
			onClick: () => this.showEditUserInfo()
		}, {
			text: 'Изменить пароль',
			className: 'profile-buttons__item relative d-flex mt-5 pointer link',
			onClick: () => this.showEditPassword()
		}, {
			text: 'Выйти',
			className: 'profile-buttons__item relative d-flex mt-5 pointer logout',
			onClick: () => this.signoutClick()
		}],
		userInfo: [{
			displayName: 'Почта',
			name: 'email',
			value: ''
		}, {
			displayName: 'Логин',
			name: 'login',
			value: ''
		}, {
			displayName: 'Имя',
			name: 'first_name',
			value: ''
		}, {
			displayName: 'Фамилия',
			name: 'second_name',
			value: ''
		}, {
			displayName: 'Имя в чате',
			name: 'display_name',
			value: ''
		}, {
			displayName: 'Телефон',
			name: 'phone',
			value: ''
		}],
		userAvatar: '../../images/avatar-example.png'
	};

	componentDidMount() {
		this.getUserInfo();
	}

	getUserInfo = () => {
		store.dispatch(fetchUserBy());
		authController.getUserInfo().then((data: IUserInfoData) => {
			const userInfo = [...this.state.userInfo];

			userInfo.forEach(x => {
				if (data[x.name]) {
					x.value = data[x.name];
				}
			});

			this.setState({
				...this.state,
				isUserInfoShown: true,
				isEditUserInfoShown: false,
				isEditPasswordShown: false,
				isModalShown: false,
				userInfo,
				userAvatar: data.avatar ? `https://ya-praktikum.tech/api/v2/resources${data.avatar}` : this.state.userAvatar
			});
		}).catch(e => {
			console.log(e);
		});
	}

	inputChange = (data: IUserInfo, inputsArray: string) => {
		const {value, name} = data;
		const newArray = this.state[inputsArray].map((item: IInputCompProps) => {
			if (item.name === name) {
				item.value = value;
			}

			return item;
		});
		this.setState({[inputsArray]: newArray});
	}

	inputUserInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => this.inputChange({name: e.target.name, value: e.target.value}, 'inputsUserInfo')
	inputPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => this.inputChange({name: e.target.name, value: e.target.value}, 'inputsPassword')

	showEditUserInfo = () => {
		this.state.userInfo.forEach(item => this.inputChange(item, 'inputsUserInfo'));
		this.setState({
			isUserInfoShown: false,
			isEditUserInfoShown: true,
			isEditPasswordShown: false
		});
	}

	showEditPassword = () => {
		this.setState({
			isUserInfoShown: false,
			isEditUserInfoShown: false,
			isEditPasswordShown: true
		});
	}

	showUserInfo = () => {
		this.setState({
			isUserInfoShown: true,
			isEditUserInfoShown: false,
			isEditPasswordShown: false
		});
	}

	toggleModal = () => {
		this.setState({
			isModalShown: !this.state.isModalShown
		});
	}

	editUserInfoTemplate = (): JSX.Element => {
		const {inputsUserInfo} = this.state;
		return (
			<>
				{
					inputsUserInfo.map((item, i) => (
						<Input
							{...item}
							onChange={this.inputUserInfoChange}
							key={i}
						/>
					))
				}
				<Button className="button__save primary mt-5" onClick={this.changeUserInfo}>Сохранить</Button>
			</>
		);
	}

	editPasswordTemplate = (): JSX.Element => {
		const {inputsPassword} = this.state;
		return (
			<>
				{
					inputsPassword.map((item, i) => (
						<Input
							{...item}
							onChange={this.inputPasswordChange}
							key={i}
						/>
					))
				}
				<Button className="button__save primary mt-5" onClick={this.changePassword}>Сохранить</Button>
			</>
		);
	}

	userInfoTemplate = (): JSX.Element => {
		const {userInfo} = this.state;
		return (
			<ul className="profile-info d-flex flex-column mt-16">
				{
					userInfo.map(({value, displayName}, i) => (
						<li className="profile-info__item relative d-flex justify-space-between mt-5" key={i}>
							<span className="name">{displayName}</span>
							<span className="value">{value}</span>
						</li>
					))
				}
			</ul>
		);
	}

	changeUserInfo = () => {
		const inputList = this.state.inputsUserInfo;
		let data: IChangeUserInfo | {} = {};

		// Валидация и сбор данных
		for (let i = 0; i < inputList.length; i++) {
			const input = inputList[i];
			const node = input.ref.current;

			if (!node || !node.isValid()) {
				return;
			}

			if (input.name) {
				data[input.name] = input.value;
			}
		}

		// Все норм. Я валидирую
		// @ts-ignore
		userController.changeUserInfo(data).then(() => {
			this.getUserInfo();
		}).catch(e => {
			console.log(e);
		});
	}

	changePassword = () => {
		const inputList = this.state.inputsPassword;
		let data: IChangePassword | {} = {};

		// Валидация и сбор данных
		for (let i = 0; i < inputList.length; i++) {
			const input = inputList[i];
			const node = input.ref.current;

			if (!node || !node.isValid()) {
				return;
			}

			if (input.name) {
				data[input.name] = input.value;
			}
		}

		// Все норм. Я валидирую
		// @ts-ignore
		userController.changePassword(data).then(() => {
			this.getUserInfo();
		}).catch(e => {
			console.log(e);
		});
	}

	changeAvatar = () => {
		// @ts-ignore
		const changeAvatarForm: HTMLFormElement | null = document.getElementById('changeAvatarForm');
		if (changeAvatarForm) {
			const form = new FormData(changeAvatarForm);
			if (form.get('avatar')) {
				userController.changeAvatar(form).then(() => {
					this.getUserInfo();
				}).catch(e => {
					console.log(e);
				});
			}
		}
	}

	signoutClick = () => {
		authController.logout().then(() => {
			this.props.history.push('/signin');
		}).catch(e => {
			console.log(e);
		});
	}

	render() {
		const {isEditPasswordShown, isUserInfoShown, isEditUserInfoShown, isModalShown, buttonsProfile, userAvatar} = this.state;
		return (
			<>
				<Modal show={isModalShown} modalContentClassName="relative">
					<i className="fas fa-times modal_close" onClick={this.toggleModal}></i>
					<h3 className="title">Загрузите файл</h3>
					<form className="mt-5" id="changeAvatarForm">
						<label className="link" htmlFor="avatar">Выберите файл на компьютере</label>
						<input id="avatar" type="file" name="avatar" accept="image/*" />
					</form>
					<Button className="button__save primary mt-5" onClick={this.changeAvatar}>Изменить</Button>
				</Modal>

				<div className="page page-profile d-flex flex-column justify-center align-center">
					<Menu />
					<div className="profile d-flex flex-column justify-center align-center">
						<div className="profile-avatar d-flex flex-column justify-center align-center">
							<div className="avatar d-flex justify-center align-center mt-1 mr-2">
								<img src={userAvatar} alt="avatar" draggable="false"/>
								<div className="avatar_hover d-flex justify-center align-center pointer" onClick={this.toggleModal}>Поменять аватар</div>
							</div>
						</div>
						{isUserInfoShown ? this.userInfoTemplate() : null}
						{isEditPasswordShown ? this.editPasswordTemplate() : null}
						{isEditUserInfoShown ? this.editUserInfoTemplate() : null}
						<div className="profile-buttons d-flex flex-column mt-10">
							{
								isUserInfoShown ? buttonsProfile.map((item, i) => <Button {...item} key={i}>{item.text}</Button>) : null
							}
						</div>
					</div>
				</div>
			</>
		);
	}
}

export {Profile};
