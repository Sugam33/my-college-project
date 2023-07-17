import * as yup from "yup";

const ReviewValidation = yup.object().shape({
  comment: yup
    .string()
    .required("Add Comment")
    .max(150, "Comment should be less than 50 characters"),
  rating: yup.number().required("Select your rating"),
});

const MovieValidation = yup.object().shape({
  name: yup.string().required("Please enter a movie name")
  .max(50, "Name of movie cant be more than 50 charaters"),
  time: yup.number().required("Enter duration"),
  language: yup.string().required("Enter language of the movie"),
  year: yup.number().required("Enter the year of movie release"),
  category: yup.string().required("Enter the category of movie"),
  desc: yup.string().required("Enter movie descripton")
  .max(300, "Desciption should be less than 300 characters"),
});

export { ReviewValidation, MovieValidation };
