if (!$.cssHooks) {
  // if not, output an error message
  throw("jQuery 1.4.3 or above is required for this plugin to work");
}
/*
$.cssHooks['x'] = {
  get: function(elem, computed, extra) {
    return elem.cache.position.x;
  },
  set: function(elem, value) {
    var m = value.match(/^([-?0-9]+)/);
    if (!m) return this;
    $(elem).animate({ x: m[1] }, 0);
  }
};

$.cssHooks['y'] = {
  get: function(elem, computed, extra) {
    return elem.cache.position.y;
  },
  set: function(elem, value) {
    var m = value.match(/^([-?0-9]+)/);
    if (!m) return this;
    $(elem).cssanimate({ y: m[1] }, 0);
  }
};

$.cssHooks['z'] = {
  get: function(elem, computed, extra) {
    return elem.cache.position.z;
  },
  set: function(elem, value) {
    var m = value.match(/^([-?0-9]+)/);
    if (!m) return this;
    $(elem).cssanimate({ z: m[1] }, 0);
  }
};

$.cssHooks['rotatex'] = {
  get: function(elem, computed, extra) {
    return elem.cache.rotation.x;
  },
  set: function(elem, value) {
    var m = value.match(/^([-?0-9]+)/);
    if (!m) return this;
    $(elem).cssanimate({ rotatex: m[1] }, 0);
  }
};

$.cssHooks['rotatey'] = {
  get: function(elem, computed, extra) {
    return elem.cache.rotation.y;
  },
  set: function(elem, value) {
    var m = value.match(/^([-?0-9]+)/);
    if (!m) return this;
    $(elem).cssanimate({ rotatey: m[1] }, 0);
  }
};

$.cssHooks['rotatez'] = {
  get: function(elem, computed, extra) {
    return elem.cache.rotation.z;
  },
  set: function(elem, value) {
    var m = value.match(/^([-?0-9]+)/);
    if (!m) return this;
    $(elem).cssanimate({ rotatez: m[1] }, 0);
  }
};

$.cssHooks['scalex'] = {
  get: function(elem, computed, extra) {
    return elem.cache.scale.x;
  },
  set: function(elem, value) {
    var m = value.match(/^([-?0-9]+)/);
    if (!m) return this;
    $(elem).cssanimate({ scalex: m[1] }, 0);
  }
};

$.cssHooks['scaley'] = {
  get: function(elem, computed, extra) {
    return elem.cache.scale.y;
  },
  set: function(elem, value) {
    var m = value.match(/^([-?0-9]+)/);
    if (!m) return this;
    $(elem).cssanimate({ scaley: m[1] }, 0);
  }
};

$.cssHooks['scalez'] = {
  get: function(elem, computed, extra) {
    return elem.cache.scale.z;
  },
  set: function(elem, value) {
    var m = value.match(/^([-?0-9]+)/);
    if (!m) return this;
    $(elem).cssanimate({ scalez: m[1] }, 0);
  }
};

$.cssHooks['skewx'] = {
  get: function(elem, computed, extra) {
    return elem.cache.skew.x;
  },
  set: function(elem, value) {
    var m = value.match(/^([-?0-9]+)/);
    if (!m) return this;
    $(elem).cssanimate({ skewx: m[1] }, 0);
  }
};

$.cssHooks['skewy'] = {
  get: function(elem, computed, extra) {
    return elem.cache.skew.y;
  },
  set: function(elem, value) {
    var m = value.match(/^([-?0-9]+)/);
    if (!m) return this;
    $(elem).cssanimate({ skewy: m[1] }, 0);
  }
};
*/