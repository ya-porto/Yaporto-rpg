import React from 'react';
import {validationEmail, validationEmpty, validationNumber, validationPassword, validationPhone} from '../../utils/validator';
import {IInputCompProps, IInputCompState} from './input.type';
import './style.css';

class Input extends React.PureComponent<IInputCompProps> {
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

	isValid = (): boolean => {
		if (!this.props.validation) {
			return true;
		}

		for (const k in this.props.validation) {
			if (Object.prototype.hasOwnProperty.call(this.props.validation, k)) {
				const validationRule = this.state.validationRules[k];
				// Если передаваемая валидация отсутствует, то игнорим ее
				if (!validationRule) {
					continue;
				}

				// Валидация на совпадение значений
				// если true, то отправляю в функцию второе значение, которое сравниваю
				const isEqualValidation = k === 'equal' && this.props.validation.equal;
				// @ts-ignore выше проверка
				const isValid = validationRule.fn(this.props.value, isEqualValidation ? this.props.validation.equal() : null);

				if (!isValid) {
					this.setState({
						error: {
							isShow: true,
							text: validationRule.text
						}
					});
					return false;
				}
			}
		}

		this.hideError();

		return true;
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
