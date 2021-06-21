/* eslint-disable no-useless-escape */
import { SignForm } from '../../redux/modules/sign';

const mailRegexp =
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const isEmail = (value: string): boolean => {
  return value.match(mailRegexp) !== null;
};

export const isSignFormInvalid = (value: SignForm): boolean => {
  return value.email.trim() === '' || value.password.trim() === '' || !isEmail(value.email);
};
