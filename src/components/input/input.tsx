import React from 'react';
import {validationEmail, validationEmpty, validationNumber, validationPassword, validationPhone} from '../../utils/validator';
import {IInputCompProps, IInputCompState} from './input.type';
import './style.css';

class Input extends React.Component<IInputCompProps> {
	state: Readonly<IInputCompState> = {
		error: {
			isShow: false,
			text: ''
		},
		validationRules: {
			required: {
				fn: (v: string) => validationEmpty(v),
				text: 'Обязательное поле'
			},
			phone: {
				fn: (v: string) => validationPhone(v),
				text: 'Невалидный номер телефона'
			},
			email: {
				fn: (v: string) => validationEmail(v),
				text: 'Невалидная почта'
			},
			password: {
				fn: (v: string) => validationPassword(v),
				text: 'Невалидный пароль'
			},
			number: {
				fn: (v: string) => validationNumber(v),
				text: 'Должно быть числом'
			},
			equal: {
				fn: (v1: string, v2: string) => v1 === v2,
				text: 'Поля не совпадают'
			}
		}
	};

	isValid = () => {
		if (!this.props.validation) {
			return;
		}

		for (const k in this.props.validation) {
			if (Object.prototype.hasOwnProperty.call(this.props.validation, k)) {
				const validationRule = this.state.validationRules[k];
				if (!validationRule.fn(this.props.value, k === 'equal' && this.props.validation.equal ? this.props.validation.equal() : null)) {
					this.setState({
						error: {
							isShow: true,
							text: validationRule.text
						}
					});
					return;
				}
			}
		}

		this.hideError();
	}

	hideError = () => {
		this.setState({
			error: {
				isShow: false,
				text: ''
			}
		});
	}

	render() {
		const {value, type, placeholder, name, className, onChange, children} = this.props;
		const {error} = this.state;
		const fieldClassName = `field ${className ?? ''}`;
		return (
			<div className={fieldClassName}>
				<input
					className="form__field"
					type={type}
					value={value}
					placeholder={placeholder}
					name={name}
					onChange={onChange}
					onFocus={this.hideError}
					onBlur={this.isValid}
				/>
				<label htmlFor={name} className="form__label">{placeholder}</label>
				{
					error.isShow ? <span className="form__error">{error.text}</span> : null
				}
				{children}
			</div>
		);
	}
}

export {Input};
