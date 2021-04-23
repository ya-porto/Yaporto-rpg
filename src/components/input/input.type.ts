interface IInputCompProps {
  value: string | undefined,
  onChange?: (val: string) => void,
  type: string,
  placeholder?: string,
  name?: string,
  validation?: {
      text: string,
      fn: (val: string | undefined) => boolean
  },
  className?: string,
  error?: boolean
}

export {IInputCompProps};
