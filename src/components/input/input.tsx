import React from 'react';
import {IInputCompProps} from './input.type';
import './style.css';

class Input extends React.Component<IInputCompProps> {
	state: Readonly<IInputCompProps> = {
		...this.props,
		error: false
	};

	isValid(): boolean {
		if (!this.state.validation) {
			throw Error('Валидация отсутствует');
		}

		this.setState({error: !this.state.validation.fn(this.state.value)});
		return !this.state.error;
	}

	changeValue(event: React.ChangeEvent<HTMLInputElement>) {
		const value = event.target.value;
		// Меняю локально значение
		this.setState({value});
		// Меняю значение родителю если ему это нужно
		// надеюсь, это норм для реакта
		if (this.props.onChange) {
			this.props.onChange(value);
		}
	}

	render() {
		const {value, type, placeholder, name, className, validation, error} = this.state;
		const fieldClassName = `field ${className ? className : ''}`;
		return (
			<div className={fieldClassName}>
				<input
					className="form__field"
					type={type}
					value={value}
					placeholder={placeholder}
					name={name}
					onChange={this.changeValue.bind(this)}
					onFocus={() => this.setState({error: false})}
					onBlur={() => {
						if (validation) {
							this.isValid.bind(this)();
						}
					}}
				/>
				<label htmlFor={name} className="form__label">{placeholder}</label>
				{
					error ? <span className="form__error">{validation?.text}</span> : null
				}
				{this.props.children}
			</div>
		);
	}
}

export {Input};
