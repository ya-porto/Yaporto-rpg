import React, {RefObject} from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {RouteComponentProps, Link} from 'react-router-dom';
import {CSSTransition} from 'react-transition-group'
import {getDocument} from 'ssr-window';

import {Button} from '../../components/button';
import {Input, IInputCompProps} from '../../components/input';
import {RootState} from '../../redux/types';
import {Menu} from '../../components/menu/menu';
import {Modal} from '../../components/modal';
import {authController} from '../../controllers/auth';
import {IChangePassword, IChangeUserInfo, userController} from '../../controllers/user';
import {fetchUserBy, resetUserData, updateTheme} from '../../redux/userSlice';
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
	userAvatar: string,

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
		if (this.props.user.userInfo !== prevProps.user.userInfo) {
			const {userInfo} = this.state;
			userInfo.map(item => {
				this.props.user.hasOwnProperty(item.name) ? item.value = this.props.user[item.name] : false;
			});
			this.setState({userInfo: userInfo});
			this.setState({userAvatar: this.props.user.avatar ? 'https://ya-praktikum.tech/api/v2/resources' + this.props.user.avatar : '../../images/avatar-example.png'});
		}
	}

	getUserInfo = async () => {
		this.props.dispatch(fetchUserBy());
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

	changeTheme = (theme_id: string) => {
		const data = {
			user_id: this.props.user.id,
			theme_id: theme_id
		}

		userController.changeTheme(data)
		.then(() => {
			this.props.dispatch(updateTheme(theme_id))})
		.catch(err => console.error(err))
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
		})
		.then(() => this.showUserInfo()).catch(e => {
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
		authController.logout().then(() => {
			this.props.dispatch(resetUserData());
		})
		.catch(e => {
			console.log(e);
		});
	}

	showChangeThemeOption =( ) => {
		if (this.props.user.themes?.length > 0) {
			return (
				<div className="mt-5">
					<p>Выберите тему</p>
					{this.props.user.themes?.map((theme: {[key in string]: string}, id: number) => {
						return (
							<Button className="mr-3" key={id} onClick={() => this.changeTheme(theme.theme_id)}>{theme.theme_name}</Button>
						)
					})}
				</div>
			)
		} else {
			return null
		}
	}

	userInfoTemplate = (): JSX.Element => {
		const {userInfo} = this.state;

		return (
			<div className='card_big_inner d-flex justify-space-between'>
				<ul className="profile-info d-flex flex-column mt-4">
					{
						userInfo.map(({value, displayName}, i) => (
							<li className="profile-info__item relative d-flex justify-space-between mt-5" key={i}>
								<span className="name">{displayName}</span>
								<span className="value">{value}</span>
							</li>
						))
					}
				</ul>
				<div className="profile-buttons d-flex flex-column justify-start align-end mt-4">
					<Button onClick={this.showEditUserInfo} className="mt-5">Изменить данные</Button>
					<Button onClick={this.showEditPassword} className="mt-5">Изменить пароль</Button>
					<Link to="/"><Button onClick={this.signoutClick} className="mt-5">Выйти</Button></Link>
					{this.showChangeThemeOption()}
					
				</div>
			</div>
		);
	}

	editUserInfoTemplate = (): JSX.Element => {
		const {inputsUserInfo} = this.state;
		return (
			<div className='card_big_inner d-flex justify-space-between'>
				<div className='profile-info d-flex flex-column mt-4'>
				{
					inputsUserInfo.map((item, i) => (
						<Input
							{...item}
							onChange={this.inputUserInfoChange}
							key={i}
						/>
					))
				}
				</div>`
				<div className='profile-buttons d-flex flex-column justify-start align-end mt-4'>
					<Button className="mt-3" onClick={this.changeUserInfo}>Сохранить</Button>
					<Button className="mt-3	" onClick={this.showUserInfo}>Назад</Button>
				</div>
			</div>
		);
	}

	editPasswordTemplate = (): JSX.Element => {
		const {inputsPassword} = this.state;
		return (
			<div className='card_big_inner d-flex justify-space-between'>
				<div className='profile-info d-flex flex-column mt-4'>
				{
					inputsPassword.map((item, i) => (
						<Input
							{...item}
							onChange={this.inputPasswordChange}
							key={i}
						/>
					))
				}
				</div>
				<div className='profile-buttons d-flex flex-column justify-start align-end mt-6'>
				<Button className="mt-3" onClick={this.changePassword}>Сохранить</Button>
				<Button className="primary mt-3" onClick={this.showUserInfo}>Назад</Button>
				</div>
			</div>
		);
	}

	render() {
		const {isEditPasswordShown, isUserInfoShown, isEditUserInfoShown, isModalShown, userAvatar} = this.state;
		return (
			<>
				<CSSTransition in={this.state.isModalShown} timeout={1000} classNames="show-modal">
					<Modal onClick={this.toggleModal} show={isModalShown}>
						<div className="relative pt-7 text-center">
							<h3>Загрузите файл</h3>
							<form className="mt-5" id="changeAvatarForm">
								<label className="link" htmlFor="avatar">Выберите файл на компьютере</label>
								<input id="avatar" type="file" name="avatar" accept="image/*" />
							</form>
							<Button className="button__save primary mt-5" onClick={this.changeAvatar}>Изменить</Button>
						</div>
					</Modal>
				</CSSTransition>

				<div className={`page ${this.props.user.theme}`}>
					<Menu />
					<div className="card_big">
						<div className="profile-avatar d-flex absolute flex-column justify-center align-center">
							<div className="avatar d-flex justify-center align-center">
								<img src={userAvatar} alt="avatar" draggable="false"/>
								<div className="avatar_hover d-flex justify-center align-center pointer" onClick={this.toggleModal}>Поменять аватар</div>
							</div>
						</div>
						{isUserInfoShown ? this.userInfoTemplate() : null}
						{isEditPasswordShown ? this.editPasswordTemplate() : null}
						{isEditUserInfoShown ? this.editUserInfoTemplate() : null}
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

