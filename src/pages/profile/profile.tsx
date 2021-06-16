import React, {RefObject} from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {RouteComponentProps, Link} from 'react-router-dom';
import {getDocument} from 'ssr-window';

import {Button} from '../../components/button';
import {Input, IInputCompProps} from '../../components/input';
import {RootState} from '../../redux/types';
import {Menu} from '../../components/menu/menu';
import {Modal} from '../../components/modal';
import {authController} from '../../controllers/auth';
import {IChangePassword, IChangeUserInfo, userController} from '../../controllers/user';
import {fetchUserBy, resetUserData} from '../../redux/userSlice';
import './style.css';

const document = getDocument();
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
	userInfo: IUserInfo[],
	userAvatar: string
}

interface ProfileProps extends RouteComponentProps {
	user: RootState;
	dispatch: Dispatch;
}
class Profile extends React.Component<ProfileProps> {
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
		userInfo: [{
			displayName: 'Почта',
			name: 'email',
			value: this.props.user.email
		}, {
			displayName: 'Логин',
			name: 'login',
			value: this.props.user.login
		}, {
			displayName: 'Имя',
			name: 'first_name',
			value: this.props.user.first_name
		}, {
			displayName: 'Фамилия',
			name: 'second_name',
			value: this.props.user.second_name
		}, {
			displayName: 'Имя в чате',
			name: 'display_name',
			value: this.props.user.display_name
		}, {
			displayName: 'Телефон',
			name: 'phone',
			value: this.props.user.phone
		}],
		userAvatar: this.props.user.avatar ? 'https://ya-praktikum.tech/api/v2/resources' + this.props.user.avatar : '../../images/avatar-example.png'
	};

	componentDidUpdate(prevProps: ProfileProps) {
		if (this.props.user !== prevProps.user) {
			const {userInfo} = this.state;
			userInfo.map((item)=> {
				this.props.user.hasOwnProperty(item['name']) ? item['value'] = this.props.user[item['name']] : false
			})
			this.setState({userInfo: userInfo})
			this.setState({userAvatar: this.props.user.avatar ? 'https://ya-praktikum.tech/api/v2/resources' + this.props.user.avatar : '../../images/avatar-example.png'})
		}
	}


	getUserInfo = async () => {
		await this.props.dispatch(fetchUserBy())	
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
			this.getUserInfo()
		})
		.then(()=> {
			this.showUserInfo()
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
			this.getUserInfo().then(()=> this.showUserInfo())
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
		authController.logout().then(()=> {
			this.props.dispatch(resetUserData())
		})
		.catch(e => {
			console.log(e);
		});
	}

	showProfileButtons = () => {
		return (
			<>
				<Button onClick={this.showEditUserInfo} className='profile-buttons__item relative d-flex mt-5 pointer link'>Изменить данные</Button>
				<Button onClick={this.showEditPassword} className='profile-buttons__item relative d-flex mt-5 pointer link'>Изменить пароль</Button>
				<Link to='/'><Button onClick={this.signoutClick} className='profile-buttons__item relative d-flex mt-5 pointer logout'>Выйти</Button></Link>
			</>
		)
	}

	render() {

		const {isEditPasswordShown, isUserInfoShown, isEditUserInfoShown, isModalShown, userAvatar} = this.state;
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
								isUserInfoShown ? this.showProfileButtons() : null
							}
						</div>
					</div>
				</div>
			</>
		);
	}
}

const mapStateToProps = (state: RootState) => ({
	user: state.user
  });
  
export default connect(mapStateToProps)(Profile);

