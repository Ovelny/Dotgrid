function Interface()
{
  this.el = document.createElement("div");
  this.el.id = "interface";

  this.is_visible = true;
  this.zoom = false;

  this.start = function()
  {
    document.getElementById("app").appendChild(this.el);
    var html = ""
    var tools = {
      line: ["line","M60,60 L240,240",""],
      arc_c: ["arc clockwise","M60,60 A180,180 0 0,1 240,240",""],
      arc_r: ["arc reverse","M60,60 A180,180 0 0,0 240,240",""],
      bezier: ["bezier","M60,60 Q60,150 150,150 Q240,150 240,240",""],
      close: ["close","M60,60 A180,180 0 0,1 240,240  M60,60 A180,180 0 0,0 240,240",""],

      // thickness: ["thickness","M60,60 L240,240","stroke-dasharray: 30,15"],
      fill: ["fill","M60,60 L60,150 L150,150 L240,150 L240,240 Z"],
      linecap: ["linecap","M60,60 L60,60 L180,180 L240,180 L240,240 L180,240 L180,180"],
      linejoin: ["linejoin","M60,60 L120,120 L180,120  M120,180 L180,180 L240,240"],
      mirror: ["mirror","M60,60 L240,240 M180,120 L210,90 M120,180 L90,210"],

      depth: ["depth","M150,50 L50,150 L150,250 L250,150 L150,50 Z"]
    }

    for(id in tools){
      var tool = tools[id];
      html += `<svg id="${id}" ar="${id}" title="${tool[0]}" viewBox="0 0 300 300" class="icon"><path class="icon_path" d="${tool[1]}"/>${id == "depth" ? `<path class="icon_path inactive" d=""/>` : ""}<rect ar="${id}" width="300" height="300" opacity="0"><title>${id}</title></rect></svg>`
    }
    this.el.innerHTML = html
  }

  this.update = function()
  {
    var layer_path = "";

    layer_path += dotgrid.tool.index == 0 ? "M150,60 L150,60 L240,105 L150,150 L60,105 Z" : "";
    layer_path += dotgrid.tool.index == 1 ? "M150,105 L150,105 L240,150 L150,195 L60,150 Z" : "";
    layer_path += dotgrid.tool.index == 2 ? "M150,150 L150,150 L240,195 L150,240 L60,195 Z" : "";

    document.getElementById("depth").children[0].setAttribute("d",layer_path);
    document.getElementById("depth").children[1].setAttribute("d","M60,150 L60,150 L150,195 L240,150 M60,195 L60,195 L150,240 L240,195 M60,105 L60,105 L150,150 L240,105 L240,105 L150,60 L60,105");

    document.getElementById("line").className.baseVal = !dotgrid.tool.can_cast("line") ? "icon inactive" : "icon";
    document.getElementById("arc_c").className.baseVal = !dotgrid.tool.can_cast("arc_c") ? "icon inactive" : "icon";
    document.getElementById("arc_r").className.baseVal = !dotgrid.tool.can_cast("arc_r") ? "icon inactive" : "icon";
    document.getElementById("bezier").className.baseVal = !dotgrid.tool.can_cast("bezier") ? "icon inactive" : "icon";
    document.getElementById("close").className.baseVal = !dotgrid.tool.can_cast("close") ? "icon inactive" : "icon";
    
    // document.getElementById("thickness").className.baseVal = dotgrid.tool.layer().length < 1 ? "icon inactive" : "icon";
    document.getElementById("linecap").className.baseVal = dotgrid.tool.layer().length < 1 ? "icon inactive" : "icon";
    document.getElementById("linejoin").className.baseVal = dotgrid.tool.layer().length < 1 ? "icon inactive" : "icon";
    document.getElementById("mirror").className.baseVal = dotgrid.tool.layer().length < 1 ? "icon inactive" : "icon";
    document.getElementById("fill").className.baseVal = dotgrid.tool.layer().length < 1 ? "icon inactive" : "icon";

    document.getElementById("depth").className.baseVal = "icon";
  }

  this.update_size = function()
  {
    var size = this.zoom ? {width:600,height:600} : {width:300,height:300};
    dotgrid.set_size(size,this.is_visible);
  }

  this.toggle = function()
  {
    this.is_visible = this.is_visible ? false : true;
    this.el.className = this.is_visible ? "visible" : "hidden";
    this.update_size();
  }

  this.toggle_zoom = function()
  {
    this.zoom = this.zoom ? false : true;
    this.update_size();
  }
}
