if (!$.cssHooks) {
  // if not, output an error message
  throw("jQuery 1.4.3 or above is required for this plugin to work");
}

$.cssHooks['x'] = {
  get: function(elem, computed, extra) {
    return ($(elem).data('tween:transform') || Transform.factory()).x;
  },
  set: function(elem, value) {
    $(elem).tween({ x: parseInt(value, 10) }, 0);
  }
};

$.cssHooks['y'] = {
  get: function(elem, computed, extra) {
    return ($(elem).data('tween:transform') || Transform.factory()).y;
  },
  set: function(elem, value) {
    $(elem).tween({ y: parseInt(value, 10) }, 0);
  }
};

$.cssHooks['z'] = {
  get: function(elem, computed, extra) {
    return ($(elem).data('tween:transform') || Transform.factory()).z;
  },
  set: function(elem, value) {
    $(elem).tween({ z: parseInt(value, 10) }, 0);
  }
};

$.cssHooks['rotate'] = {
  get: function(elem, computed, extra) {
    return ($(elem).data('tween:transform') || Transform.factory()).rotatez;
  },
  set: function(elem, value) {
    $(elem).tween({ rotatez: parseInt(value, 10) }, 0);
  }
};

$.cssHooks['rotatex'] = {
  get: function(elem, computed, extra) {
    return ($(elem).data('tween:transform') || Transform.factory()).rotatex;
  },
  set: function(elem, value) {
    $(elem).tween({ rotatex: parseInt(value, 10) }, 0);
  }
};

$.cssHooks['rotatey'] = {
  get: function(elem, computed, extra) {
    return ($(elem).data('tween:transform') || Transform.factory()).rotatey;
  },
  set: function(elem, value) {
    $(elem).tween({ rotatey: parseInt(value, 10) }, 0);
  }
};

$.cssHooks['rotatez'] = {
  get: function(elem, computed, extra) {
    return ($(elem).data('tween:transform') || Transform.factory()).rotatez;
  },
  set: function(elem, value) {
    $(elem).tween({ rotatez: parseInt(value, 10) }, 0);
  }
};

$.cssHooks['scale'] = {
  get: function(elem, computed, extra) {
    var data = ($(elem).data('tween:transform') || Transform.factory());
    return { x: data.scalex, y: data.scaley };
  },
  set: function(elem, value) {
    $(elem).tween({ scalex: parseInt(value, 10), scaley: parseInt(value, 10) }, 0);
  }
};

$.cssHooks['scalex'] = {
  get: function(elem, computed, extra) {
    return ($(elem).data('tween:transform') || Transform.factory()).scalex;
  },
  set: function(elem, value) {
    $(elem).tween({ scalex: parseInt(value, 10) }, 0);
  }
};

$.cssHooks['scaley'] = {
  get: function(elem, computed, extra) {
    return ($(elem).data('tween:transform') || Transform.factory()).scaley;
  },
  set: function(elem, value) {
    $(elem).tween({ scaley: parseInt(value, 10) }, 0);
  }
};

$.cssHooks['skew'] = {
  get: function(elem, computed, extra) {
    var data = ($(elem).data('tween:transform') || Transform.factory());
    return { x: data.skewx, y: data.skewy };
  },
  set: function(elem, value) {
    $(elem).tween({ skewx: parseInt(value, 10), skewy: parseInt(value, 10) }, 0);
  }
};

$.cssHooks['skewx'] = {
  get: function(elem, computed, extra) {
    return ($(elem).data('tween:transform') || Transform.factory()).skewx;
  },
  set: function(elem, value) {
    $(elem).tween({ skewx: parseInt(value, 10) }, 0);
  }
};

$.cssHooks['skewy'] = {
  get: function(elem, computed, extra) {
    return ($(elem).data('tween:transform') || Transform.factory()).skewy;
  },
  set: function(elem, value) {
    $(elem).tween({ skewy: parseInt(value, 10) }, 0);
  }
};
