import React from "react";
import {UserLayout} from "./UserLayout"
import {RegisterPage, SignInPage} from "../../pages";

export const enum Type {
  SIGN_IN = "signIn",
  REGISTER = "register"
}

interface PropsType {
  type: Type
}
export const UserLayoutContent: React.FC<PropsType> = ({type}) => {

  const ChildPage = type === Type.SIGN_IN ? <SignInPage/> : <RegisterPage/>
  return (
    <UserLayout>
      {ChildPage}
    </UserLayout>
  )
}