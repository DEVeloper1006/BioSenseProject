import React, {useEffect, useState} from "react";
import NavBar from "../pages/components/NavBar";
import Body from "../pages/components/Body"
import Head from "next/head";
import Footer from "../pages/components/Footer"

export default function index(){

  return (
    <div className="h-fit">
      <Head>
        <meta name="viewport" content="width=1.0, initial-scale=1.0" />
        <title>biosense</title>
        <meta name="Title" content="biosense" />
        <meta name="Author" content="Meet P., Dev M, Jasimraza M., Om P., and Vedant P." />
        <meta name="Description" content="A website that uses a Tentative AI model to detect pneuomonia in chest x-ray images" />
        <link rel='icon' href='/logo.png' type='image/x-icon'/>
      </Head>
      <NavBar />
      <Body />
      <Footer />
    </div>
  )
}