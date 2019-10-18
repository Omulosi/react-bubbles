import React, { useState } from "react";
import axios from "axios";

import { axiosWithAuth } from '../utils'

const initialColor = {
  color: "",
  code: { hex: "" }
};

const api = `http://localhost:5000/api/colors/`;

const ColorList = (props) => {
  const { colors, updateColors } = props;
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    const id = colorToEdit.id;
    const url = `${api}${id}`;
    axiosWithAuth().put(url, colorToEdit)
      .then(res => {
        const newColors = colors.map(color => {
          if (parseInt(color.id) === parseInt(res.data.id)){
            return res.data;
          } else {
            return color;
          }
        })
        updateColors(newColors);
      })
      .catch(error => {
        debugger;
        console.log(error);
      })

  };

  const deleteColor = color => {
    // make a delete request to delete this color
    const id = color.id;
    const url = `${api}${id}`;

    axiosWithAuth().delete(url, {params: {id: id} })
      .then(res => {
        const updatedColors = colors.filter(color => color.id !== res.data);
        updateColors(updatedColors);
      })
      .catch(err => {
        console.log(err);
      })
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={() => deleteColor(color)}>
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;
