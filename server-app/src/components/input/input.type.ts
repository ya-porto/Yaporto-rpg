interface IInputCompProps {
  value?: string | undefined,
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
  type: string,
  placeholder?: string,
  name?: string,
  validation?: IValidationProps
  className?: string,
  error?: boolean,
}

interface IInputCompState {
  error: {
    isShow: boolean,
    text: string
  },
  validationRules: IValidationRules
}

interface IValidationProps {
  required?: boolean,
  phone?: boolean,
  password?: boolean,
  email?: boolean,
  number?: boolean,
  equal?: () => string | undefined
}
interface IValidationRules {
  required: {
    fn: (v: string) => boolean,
    text: string
  },
  phone: {
    fn: (v: string) => boolean,
    text: string
  },
  password: {
    fn: (v: string) => boolean,
    text: string
  },
  email: {
    fn: (v: string) => boolean,
    text: string
  },
  number: {
    fn: (v: string) => boolean,
    text: string
  },
  equal: {
    fn: (v1: string, v2: string) => boolean,
    text: string
  }
}

export {IInputCompProps, IInputCompState, IValidationProps, IValidationRules};
