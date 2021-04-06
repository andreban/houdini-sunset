/*
 * Copyright 2021 Google Inc. All Rights Reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

const PROPERTY_GRID_SIZE = '--sunset-grid-size';
const PROPERTY_LINE_COLOR = '--sunset-line-color';
const PROPERTY_GRADIENT_START = '--sunset-gradient-start';
const PROPERTY_GRADIENT_END = '--sunset-gradient-end';

class Sunset {
  static get inputProperties() {
    return [
      PROPERTY_GRID_SIZE,
      PROPERTY_LINE_COLOR,
      PROPERTY_GRADIENT_START,
      PROPERTY_GRADIENT_END
    ];
  }
  
  paint(ctx, geom, properties) {
    const lineColor = properties.get(PROPERTY_LINE_COLOR).toString().trim();
    const gradientStartColor = properties.get(PROPERTY_GRADIENT_START).toString().trim();
    const gradientEndColor = properties.get(PROPERTY_GRADIENT_END).toString().trim();
    const size = parseInt(properties.get(PROPERTY_GRID_SIZE));

    const half_height = geom.height / 6;
  
    const gradient = ctx.createLinearGradient(0, 0, 0, geom.height);
    gradient.addColorStop(0, gradientStartColor);
    gradient.addColorStop(half_height / geom.height, gradientEndColor);
    gradient.addColorStop(1, gradientStartColor);
    ctx.fillStyle = gradient;    
    ctx.fillRect(0, 0, geom.width, geom.height);
    
    // Draw Grid
    ctx.fillStyle = lineColor;
    ctx.beginPath();
    const num_x = geom.width / size;
    const num_y = geom.height / size;
    const middle_x = Math.round(num_x / 2);
    const middle_y = Math.round(num_y / 6);    
    for(let y = 0; y < num_y; y++) {
      for(let x = 0; x < num_x; x++) {
        if ((((x-middle_x) * 64) % (y-middle_y)) === 0) {          
          ctx.rect(x * size, y * size, size, size);
        } 
      }
    }
    ctx.fill();
  }
}
registerPaint('sunset', Sunset);
