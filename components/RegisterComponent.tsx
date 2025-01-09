"use client";

import { FormsComponent } from "./template/FormsComponent";

export const RegisterComponent = () => {
  const formsValues = {
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: "",
  };

  const onSubmit = (data: typeof formsValues) => {
    console.log(data);
  };

  return (
    <FormsComponent
      FormValues={formsValues}
      buttonText="Register"
      onSubmit={onSubmit}
    />
  );
};
