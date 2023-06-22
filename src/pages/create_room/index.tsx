import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {Button, Container} from "@mui/material";
import FormikTextField from "../../components/FormikTextField";
import {useFormik} from "formik";

const CreateRoom: React.FC = () => {
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {name: "", email: "", roomName: "",},
    onSubmit: (x) => {
      console.log(x)
      navigate('/call/94959-3937-399')
    }
  })
  
  return (
    <Container>
      <form
        onSubmit={formik.handleSubmit}
        className="container flex flex-col gap-y-4 items-center mx-auto w-10/12  bg-gradient-to-r from-primary to-primary-darker rounded-md md:w-1/2 xl:w-1/3"
      >
        <div
          id="form-header"
          className="self-start mb-3 w-full divide-y divide-white"
        >
          <h3 className="my-4 mb-2 ml-4 text-lg font-bold text-white">
            Create Room
          </h3>
          <p></p>
        </div>
        
        <div className="flex flex-col w-4/5 font-bold md:w-80">
          <FormikTextField
            fieldName={"name"}
            label={"Name"}
            formik={formik}
            type={"text"}
          />
        </div>
        
        <div className="flex flex-col w-4/5 font-bold md:w-80">
          <FormikTextField
            fieldName={"email"}
            label={"Email"}
            formik={formik}
            type={"email"}
          />
        </div>
        
        <div className="flex flex-col w-4/5 font-bold md:w-80">
          <label htmlFor="roomName" className="text-sm text-white">
            Room Name
          </label>
          <FormikTextField
            fieldName={"roomName"}
            label={"Room Name"}
            placeHolder={"Ex: Design Critique"}
            formik={formik}
            type={"text"}
          
          />
        </div>
        
        <Button type={"submit"} title="Create"/>
      </form>
      
      <div className="mt-4">
        <Link className="font-bold text-white underline" to="/join-room">
          Join Room
        </Link>
      </div>
    </Container>
  )
}

export default CreateRoom