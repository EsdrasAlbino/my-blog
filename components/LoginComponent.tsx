"use client";

import { FormsComponent } from "./template/FormsComponent";

export const LoginComponent = () => {
  const formsValues = {
    email: "",
    password: "",
  };

  const onSubmit = (data: typeof formsValues) => {
    console.log(data);
  };

  return (
    <FormsComponent
      FormValues={formsValues}
      buttonText="Login"
      onSubmit={onSubmit}
    />
  );
};
