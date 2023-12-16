import React from "react";
import { useState, useContext } from "react";
import { RenderContext } from "../../Context/RenderContext";
import "./EducationCard.scss";
import axios from "axios";
import { BASE_URL } from "../../url";

const EducationCard = ({ props, onDelete, onEdit }) => {
  const selectColor = () => {
    if (props.institutionType === "primary") {
      return "primary-border";
    } else if (props.institutionType === "secondary") {
      return "secondary-border";
    } else {
      return "others-border";
    }
  };

  const selectButtonColor = () => {
    if (props.institutionType === "primary") {
      return "primary-button";
    } else if (props.institutionType === "secondary") {
      return "secondary-button";
    } else {
      return "others-button";
    }
  };

  // const deleteEducation = async () => {
  //     const id = props._id;
  //     try {
  //         await axios.delete(`${BASE_URL}/education/delete?id=${id}`,{withCredentials:true})
  //         .then((res) => {
  //             console.log(res.data);
  //             // rerender();
  //     })
  //     } catch (error) {
  //         console.log(error);
  //     }
  // }

  return (
    <div className={`education-card ${selectColor()}`}>
      <div className="edu-top">
        <h1 className="institution-name flex3">{props.name}</h1>
      </div>
      <div className="education">
        <div className="education-left flex2  ">
          <div className="class-board ">
            <h2 className="flex1 ">
              {props.class} | {props.board}
            </h2>
            <span className="duration ">
              {new Date(props.startYear).getFullYear().toString()} -{" "}
              {new Date(props.endYear).getFullYear().toString()}
            </span>
          </div>
          <h3 className="score">
            {props.score} {props.scoreUnit}
          </h3>
          <div className="edu-buttons ">
            <button 
              onClick={() => onEdit()}
              className={`cardbutton hoverable flex1 ${selectButtonColor()}`}
            >
              Edit
            </button>
            <button
              onClick={() => onDelete()}
              className={`cardbutton hoverable flex1 ${selectButtonColor()}`}
            >
              Delete
            </button>
          </div>
        </div>
        <div className="education-right flex3 ">
          <h3>Description</h3>
          <p className="description flex1">{props.description}</p>
        </div>
      </div>
    </div>
  );
};

export default EducationCard;
