/* eslint-disable camelcase */
interface ISigninData {
  login: string,
  password: string
}

interface ISignupData {
  first_name: string,
  second_name: string,
  login: string,
  email: string,
  password: string,
  phone: string
}

interface IUserInfoData {
  id: number,
  first_name: string,
  second_name: string,
  display_name: string,
  login: string,
  email: string,
  phone: string,
  avatar: string
}

interface IYaOauthData {
  code: string,
  redirect_uri: string
}

export {ISigninData, ISignupData, IUserInfoData, IYaOauthData};
