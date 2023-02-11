import { UserService } from "../../services";
import { stateReducer } from "../slices/stateSlice";
import { AppDispatch } from "../store";

function formatPhone(phone: string) {
  const startPos = phone[0] === "+" ? 2 : 1;

  return `${phone.slice(0, startPos)}` +
  ` ${phone.slice(startPos, startPos + 3)}` +
  ` ${phone.slice(startPos + 3, startPos + 6)}` +
  ` ${phone.slice(startPos + 6, startPos + 8)}` +
  ` ${phone.slice(startPos + 8, startPos + 10)}`;

}

export function userLogin(email: string, password: string) {
  return async(dispatch: AppDispatch) => {
    try {
      const resp = await UserService.login(email, password);

      localStorage.setItem('accessToken', resp.data.accessToken);
      localStorage.setItem('refreshToken', resp.data.refreshToken);

      const users = await UserService.getUsers();

      const user = users.data.find((data: any) => data.email === email);

      dispatch(stateReducer.auth({
        ...user,
        phone: formatPhone(user.phone)
      }));

    } catch(e: any) {
      console.error(e);

      if (e.response.status === 404) {
        return false;
      }
    }
    return true;
  };
}

export function userRegister(email: string, name: string, surname: string, phone: string, password: string) {
  return async(dispatch: AppDispatch) => {
    try {
      const resp = await UserService.register(email, name, surname, phone, password);

      dispatch(stateReducer.auth(resp.data));

    } catch(e: any) {
      console.error(e);

      if (e.response.status === 409) {
        return false;
      }
    }
    return true;
  };
}

export function userLogout() {
  return async(dispatch: AppDispatch) => {

    dispatch(stateReducer.hideModal());
    
    dispatch(stateReducer.logout());

    try {

      await UserService.logout();

    } catch(e) {
      console.log(e);
    }
  };
}