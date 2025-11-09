import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";

export default function About() {
  return (
    <BrowserRouter>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/profile" element={<Profile />} />
    </BrowserRouter>
  );
}
