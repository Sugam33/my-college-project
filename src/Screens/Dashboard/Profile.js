import React, { useState } from "react";
import Uploder from "../../Components/Uploder";
import { Input } from "../../Components/UsedInputs";
import SideBar from "./SideBar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ProfileValidation } from "../../Components/Validation/UserValidation";
import { useEffect } from "react";
import { InlineError } from "../../Components/Notifications/Error";
import { Imagepreview } from "../../Components/Imagepreview";
import { updateProfileAction } from "../../Redux/Actions/userActions";

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.userLogin);
  const [imageUrl, setImageUrl] = useState(userInfo ? userInfo.image : "");
  const { isLoading, isError, isSuccess } = useSelector(
    (state) => state.userUpdateProfile
  );


  // validate user
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ProfileValidation),
  });

  // on submit
  const onSubmit = (data) => {
    console.log({...data,image:imageUrl});
  };

  // useEffect
  useEffect(() => {
    if (userInfo) {
      setValue("fullName", userInfo?.fullName);
      setValue("email", userInfo?.email);
    }
  }, [userInfo, setValue]);
  return (
    <SideBar>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <h2 className="text-xl font-bold">Profile</h2>
        <div className="w-full grid lg:grid-cols-12 gap-6">
          <div className="col-span-10">
            <Uploder />
          </div>
          {/* image preview */}
          <div className="col-span-2">
            <Imagepreview 
                image={imageUrl}
              name={userInfo ? userInfo.fullName : "Enter Full Name"}
            />
          </div>
        </div>

        <div className="w-full">
          <Input
            label="fullName"
            placeholder="Enter Full Name"
            type="text"
            name="fullName"
            register={register("fullName")}
            bg={true}
          />
          {errors.fullName && <InlineError text={errors.fullName.message} />}
        </div>
        <div className="w-full">
          <Input
            label="Email"
            placeholder="Enter your email"
            type="email"
            name="email"
            register={register("email")}
            bg={true}
          />
          {errors.email && <InlineError text={errors.email.message} />}
        </div>
        <div className="flex gap-2 flex-wrap flex-col-reverse sm:flex-row justify-between items-center my-4">
          <button className="bg-subMain font-medium transitions hover:bg-main border border-subMain text-white py-3 px-6 rounded w-full sm:w-auto">
            Delete Account
          </button>
          <button className="bg-main font-medium transitions hover:bg-subMain border border-subMain text-white py-3 px-6 rounded w-full sm:w-auto">
            Update Profile
          </button>
        </div>
      </form>
    </SideBar>
  );
}

export default Profile;
