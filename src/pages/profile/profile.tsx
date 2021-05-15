import React from 'react';
import {Button, IButtonCompProps} from '../../components/button/index';
import {Input, IInputCompProps} from '../../components/input/index';
import {Menu} from '../../components/menu/menu';
import './style.css';

interface IButton extends IButtonCompProps {
	text: string
}
interface IUserInfo {
	value: string,
	name: string,
	displayName?: string
}
interface IProfile {
	isUserInfoShown: boolean,
	isEditUserInfoShown: boolean,
	isEditPasswordShown: boolean,
	inputsUserInfo: IInputCompProps[],
	inputsPassword: IInputCompProps[],
	buttonsProfile: IButton[],
	userInfo: IUserInfo[]
}
class Profile extends React.Component {
	state: Readonly<IProfile> = {
		isUserInfoShown: true,
		isEditUserInfoShown: false,
		isEditPasswordShown: false,
		inputsUserInfo: [{
			value: '',
			type: 'email',
			placeholder: 'Почта',
			name: 'email',
			validation: {
				email: true
			}
		}, {
			value: '',
			type: 'login',
			placeholder: 'Логин',
			name: 'login',
			validation: {
				required: true
			}
		}, {
			value: '',
			type: 'text',
			placeholder: 'Имя',
			name: 'first_name',
			validation: {
				required: true
			}
		}, {
			value: '',
			type: 'text',
			placeholder: 'Фамилия',
			name: 'second_name',
			validation: {
				required: true
			}
		}, {
			value: '',
			type: 'text',
			placeholder: 'Отображаемое имя',
			name: 'display_name',
			validation: {
				required: true
			}
		}, {
			value: '',
			type: 'phone',
			placeholder: 'Телефон',
			name: 'phone',
			validation: {
				required: true,
				phone: true
			}
		}],
		inputsPassword: [{
			value: '',
			type: 'password',
			placeholder: 'Старый пароль',
			name: 'oldPassword',
			validation: {
				password: true
			}
		}, {
			value: '',
			type: 'password',
			placeholder: 'Новый пароль',
			name: 'newPassword',
			validation: {
				password: true
			}
		}, {
			value: '',
			type: 'password',
			placeholder: 'Пароль (еще раз)',
			name: 'password_again',
			validation: {
				equal: () => this.state.inputsPassword.find(x => x.name === 'password')?.value
			}
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
			onClick: () => console.log('LOGOUT')
		}],
		userInfo: [{
			displayName: 'Почта',
			name: 'email',
			value: 'mymail@yandex.ru'
		}, {
			displayName: 'Логин',
			name: 'login',
			value: 'My login'
		}, {
			displayName: 'Имя',
			name: 'first_name',
			value: 'Иван'
		}, {
			displayName: 'Фамилия',
			name: 'second_name',
			value: 'Иванов'
		}, {
			displayName: 'Имя в чате',
			name: 'display_name',
			value: 'Chat Name'
		}, {
			displayName: 'Телефон',
			name: 'phone',
			value: '88005553535'
		}]
	};

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

	editUserInfoTemplate = (): JSX.Element[] => {
		const {inputsUserInfo} = this.state;
		return (
			inputsUserInfo.map((item, i) => (
				<Input
					{...item}
					onChange={this.inputUserInfoChange}
					key={i}
				/>
			))
		);
	}

	editPasswordTemplate = (): JSX.Element[] => {
		const {inputsPassword} = this.state;
		return (
			inputsPassword.map((item, i) => (
				<Input
					{...item}
					onChange={this.inputPasswordChange}
					key={i}
				/>
			))
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

	render() {
		const {isEditPasswordShown, isUserInfoShown, isEditUserInfoShown, buttonsProfile} = this.state;
		return (
			<div className="page page-profile d-flex flex-column justify-center align-center">
				<Menu />
				<div className="profile d-flex flex-column justify-center align-center">
					<div className="profile-avatar d-flex flex-column justify-center align-center">
						<div className="avatar d-flex justify-center align-center mt-1 mr-2">
							<img src="https://cdn1.iconfinder.com/data/icons/zeshio-s-fantasy-avatars/200/Fantasy_avatar_people-07-512.png" alt="avatar" draggable="false"/>
							<div className="avatar_hover d-flex justify-center align-center pointer">Поменять аватар</div>
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
		);
	}
}

export {Profile};
