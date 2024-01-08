import React, {useEffect, useState} from "react";
import { motion, useScroll } from "framer-motion";
import NavBar from "./components/NavBar";
import Body from "./components/Body"

export default function index(){

  return (
    <div className="h-fit">
      
      <NavBar />
      <Body />
    </div>
  )
}