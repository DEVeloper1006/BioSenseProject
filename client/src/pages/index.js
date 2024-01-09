import React, {useEffect, useState} from "react";
import { motion, useScroll } from "framer-motion";
import NavBar from "./components/NavBar";
import Body from "./components/Body"
import Head from "next/head";

export default function index(){

  return (
    <div className="h-fit">
      <Head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=1.0, initial-scale=1.0" />
        <title>biosense</title>
        <meta name="Title" content="biosense" />
        <meta name="Author" content="Meet P., Dev M, Jasimraza M., Om P., and Vedant P." />
        <meta name="Description" content="A website that uses a Tentative AI model to detect pneuomonia in chest x-ray images" />
        <link rel='icon' href='/logo.png' type='image/x-icon'/>
      </Head>
      <NavBar />
      <Body />
    </div>
  )
}