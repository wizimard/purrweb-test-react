import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import UserType from "../../types/User";

type StateType = {
  isAuth: boolean;
  user: UserType | null;
  isShowModal: boolean;
}
// {
//   id: '12121',
//   name: 'Анастасия',
//   surname: 'Филатовна',
//   email: 'nastie203@mail.ru',
//   phone: '+7 908 555 35 35'
// }
const initialState: StateType = {
  isAuth: false,
  user: null,
  isShowModal: false
};

const stateSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    auth(state, action: PayloadAction<UserType>) {
      state.user = action.payload;
      state.isAuth = true;
    },
    logout(state) {
      state.user = null;
      state.isAuth = false;
    },
    showModal(state) {
      state.isShowModal = true;
    },
    hideModal(state) {
      state.isShowModal = false;
    }
  }
});

export const stateReducer = stateSlice.actions;

export default stateSlice.reducer;