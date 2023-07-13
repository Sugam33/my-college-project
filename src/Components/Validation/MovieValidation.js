import * as yup from "yup";

const ReviewValidation = yup.object().shape({
  comment: yup
    .string()
    .required("Add Comment")
    .max(150, "Comment should be less than 50 characters"),
  rating: yup.number().required("Select your rating"),
});

export { ReviewValidation };
