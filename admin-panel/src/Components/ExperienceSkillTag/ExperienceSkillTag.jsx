import React from 'react'
import './ExperienceSkillTag.scss'

const ExperienceSkillTag = ({tag,color,onDelete}) => {

    function getRandomColor(factor = 0.3) {
        const getRandomComponent = () => Math.floor(Math.random() * 256);
      
        const red = getRandomComponent();
        const green = getRandomComponent();
        const blue = getRandomComponent();
      
        const originalColor = `rgb(${red}, ${green}, ${blue})`;
      
        // Darken the color by the specified factor
        const darkenColor = (color, factor) => {
          const rgbRegex = /rgb\((\d+), (\d+), (\d+)\)/;
          const match = color.match(rgbRegex);
      
          if (match) {
            let [_, red, green, blue] = match.map(Number);
      
            red = Math.max(0, Math.floor(red - red * factor));
            green = Math.max(0, Math.floor(green - green * factor));
            blue = Math.max(0, Math.floor(blue - blue * factor));
      
            return `rgb(${red}, ${green}, ${blue})`;
          } else {
            return color;
          }
        };
      
        return darkenColor(originalColor, factor);
      }

  return (
    <div onClick={onDelete} style={{backgroundColor:`${color?color:getRandomColor()}`}} className='tag hoverable'>
      <p className='tag-text'>{tag}</p>
    </div>
  )
}

export default ExperienceSkillTag
