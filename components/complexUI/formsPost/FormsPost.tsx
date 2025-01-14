"use client"
import { FormsComponent } from "@/components/template/FormsComponent";

export const FormsPost = ({
  titlePage,
  buttonText,
}: {
  titlePage: string;
  buttonText: string;
}) => {
    
  const formsValues = {
    title: "",
    content: "",
    images: "",
    published: "",
    authorId: "",
  };

  async function onSubmit(data: typeof formsValues) {
    console.log(data);
  }

  return (
    <>
      <FormsComponent
        FormValues={formsValues}
        onSubmit={onSubmit}
        buttonText={buttonText}
        title={titlePage}
      />
      <></>
    </>
  );
};
