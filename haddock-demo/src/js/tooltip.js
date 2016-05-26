// module tooltip
//
// tooltip_display(text, elt)
// tooltip_remove()
// create_tooltip(event, content)
// add_tip(posX, posY, content)
// remove_tips()

function tooltip_display(content, elt) {
  // update tooltip_xy
  if (elt) {
    tooltip_xy = elt_offset(elt)
  }

  var tip_elt = document.getElementsByClassName("tooltip-container")[0];

  if (!tip_elt) {
    // create a new tooltip node

    var frag = document.createDocumentFragment(),
        xpos = tooltip_xy.left + tooltip_xy.width + 20 // assume this is set
        ypos = tooltip_xy.top - tooltip_xy.height - 20

        tooltipContainer = document.createElement('div');

    var bodyNode = document.getElementsByTagName("body")[0];
    frag.appendChild(tooltipContainer);
    tooltipContainer.className = "tooltip-container"
    tooltipContainer.style.cssText = 'left:'+xpos+'px;top:'+ypos+'px;';
    tooltipContainer.innerHTML = content

    bodyNode.appendChild(frag);

    console.log("added tooltip at x:", xpos, "y:", ypos)

  } else {
    tip_elt.innerHTML = content
  }
}

function tooltip_remove() {
  tip_elt = document.getElementsByClassName("tooltip-container")[0];
  if (tip_elt) {
    var bodyNode = document.getElementsByTagName("body")[0];
    bodyNode.removeChild(tip_elt)
  }
}

function create_tooltip(event, content) {
  // add a new node to the body
  var frag = document.createDocumentFragment(),
      tooltipContainer = document.createElement('div'),
      tooltipPosX = event.pageX,
      tooltipPosY = event.pageY;

  var bodyNode = document.getElementsByTagName("body")[0];

  frag.appendChild(tooltipContainer);
  tooltipContainer.className = "tooltip-container"
  tooltipContainer.style.cssText = 'left:'+tooltipPosX+'px;top:'+tooltipPosY+'px;';
  tooltipContainer.innerHTML = content;

 //  this.addEventListener('mouseout', hideTooltip);

  bodyNode.appendChild(frag);
}

function add_tip(posX, posY, content) {
  var frag = document.createDocumentFragment(),
      tooltipContainer = document.createElement('div'),
      tooltipPosX = posX
      tooltipPosY = posY

  var bodyNode = document.getElementsByTagName("body")[0];

  frag.appendChild(tooltipContainer);
  tooltipContainer.className = "tooltip-container"
  tooltipContainer.style.cssText = 'left:'+posX+'px;top:'+posY+'px;';
  tooltipContainer.innerHTML = content;

  bodyNode.appendChild(frag);
}

function remove_tips() {
  var tips = document.getElementsByClassName('tooltip-container')
  while (tips[0]) {
    tips[0].parentNode.removeChild(tips[0])
  }
}

