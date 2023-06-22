import React from 'react'
import { Link } from 'react-router-dom'
import {Button, Container} from "@mui/material";

const EndCall: React.FC = () => {
  return (
    <Container >
      <h1 className="text-xl font-bold text-white md:text-4xl">
        Call has been ended.
      </h1>
      
      <div className="row-auto mt-4">
        <Link className="font-bold text-white underline" to="/create-room">
          <Button href={"/home"} title="Go Home" type="button" />
        </Link>
      </div>
    </Container>
  )
}

export default EndCall