import React from 'react'

const HighlightText = ({ text }) => {
  return (
    <span className="bg-gradient-to-b text-center from-[#ffffff] via-[#ffffff] to-[#928d8d] text-transparent bg-clip-text text-4xl"> {text}</span>
  );
}

export default HighlightText
