const ud = undefined;
const roots = document.querySelector(":root");

var all_link = document.getElementsByTagName('a')
for (let i = 0; i< all_link.length; i++) {
  all_link[i].removeAttribute('target')
}

//hide the overlay IF it exists else do nothing
document.getElementsByClassName("background-overlay")[0]
  ? document.getElementsByClassName("background-overlay")[0].remove()
  : "ud";

screens_array = [
  document.getElementsByClassName("portal-background")[0],
  document.getElementsByClassName("custom")[0],
  document.getElementsByClassName("default")[0],
];

chromeless = document.getElementsByClassName("chromeless")[0];
var screen_type;

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

if (chromeless == ud) {
  for (let i = 0; i < screens_array.length; i++) {
    if (screens_array[i] != ud) {
      if (i == 0) {
        screen_type = document.getElementsByClassName("full-screen-bg")[0];
        screens_array[i].remove();
      } else {
        screen_type = screens_array[i];
      }

      chrome.storage.local.get(["bg"]).then((result) => {
        if (result.bg != ud) {
          if (i == 0) {
            document.getElementsByClassName("portal-background")[0].src =
              result.bg;
          } else {
            screens_array[i].setAttribute("style",`background-image: url(${result.bg}) !important;     background-size: cover !important; background-attachment: fixed !important; background-repeat: no-repeat !important;`);
          }
        }
        let store = result.bg;
        chrome.storage.local.get(["chosenFile"]).then((result) => {
          if (result.chosenFile != ud) {
            if (result.chosenFile != true) {
              bi.value = store;
            } else {
              chrome.storage.local.get(["fileName"]).then((result) => {
                if (result.fileName != ud) {
                  bi.value = result.fileName;
                }
              });
            }
          }
        });
        if (i == 2) {
          screens_array[i].style.backgroundAttachment = "fixed";
          screens_array[i].style.backgroundSize = "cover";
        }
      });
    }
  }

  const element_types = [
    "p",
    "div",
    "input",
    "img",
    "select",
    "option",
    "label",
    "button",
    "ul",
    "li",
    "h1",
    "h2",
    "span",
  ];
  const selectors = ["id", "class"];

  const create_element = function (
    types,
    attribute_type,
    attribute,
    inner_html,
    insert,
    position,
    input_type,
    input_checked,
    input_value,
    input_min,
    input_max
  ) {
    let new_element = document.createElement(types);
    if (attribute_type != ud && attribute != ud) {
      new_element.setAttribute(attribute_type, attribute);
    }
    if (inner_html != ud) {
      new_element.innerHTML = inner_html;
    }
    if (insert != ud) {
      insert.appendChild(new_element);
      if (position != ud) {
        for (let i = 0; i < position; i++) {
          new_element.parentNode.insertBefore(
            new_element,
            new_element.previousElementSibling
          );
        }
      }
    }
    if (input_type != ud) {
      new_element.type = input_type;
    }
    if (input_checked != ud) {
      new_element.checked = input_checked;
    }
    if (input_value != ud) {
      new_element.value = input_value;
    }
    if (input_min != ud) {
      new_element.min = input_min;
    }
    if (input_max != ud) {
      new_element.max = input_max;
    }
    return new_element;
  };

  npb = create_element(
    element_types[3],
    selectors[1],
    "portal-background",
    ud,
    screen_type,
    ud
  );
  nppb = create_element(
    element_types[1],
    selectors[0],
    "portal-background-blur",
    ud,
    screen_type,
    ud
  );

  if (screen_type != ud) {
    var appendAt;
    if (screen_type == screens_array[1] || screen_type == screens_array[2]) {
      appendAt = screen_type.childElementCount;
    } else {
      appendAt = screen_type.childElementCount-1;
    }

    time = create_element(
      element_types[0],
      selectors[0],
      "time",
      ud,
      screen_type,
      appendAt
    );
    date = create_element(
      element_types[0],
      selectors[0],
      "date",
      ud,
      screen_type,
      appendAt
    );

    if (appendAt == 5) {
      date.style.marginBottom = "40px";
    }

    chrome.storage.local.get(["mtime"]).then((result) => {
      if (result.mtime != ud) {
        if (result.mtime == true) {
          mto = true;
        } else {
          mto = false;
        }
        document.getElementById("militaryTimeInput").checked = result.mtime;
        updateTime();
      }
    });

    function updateTime() {
      let dt = new Date(),
        h = dt.getHours(),
        m = dt.getMinutes(),
        day = dt.getDay(),
        month = dt.getMonth(),
        dat = dt.getDate();

      day = days[day];
      month = months[month];

      if (mto == false) {
        if (h > 12) {
          h = h - 12;
        } else if (h == 0) {
          h = 12;
        }
      }
      if (m < 10) {
        m = "0" + m;
      }

      if (time.innerHTML != h + ":" + m) {
        time.innerHTML = h + ":" + m;
      }
      if (
        document.getElementById("date").innerHTML !=
        day + ", " + month + " " + dat
      ) {
        document.getElementById("date").innerHTML =
          day + ", " + month + " " + dat;
      }
    }
    window.addEventListener("load", (event) => {
      updateTime();
      setInterval(() => {
        updateTime();
      }, 100);
    });
  }

  var cog = create_element(
    element_types[3],
    selectors[0],
    "settings",
    ud,
    screen_type
  );
  if (cog != ud) {
    cog.src =
      "https://www.iconarchive.com/download/i103373/paomedia/small-n-flat/cog.1024.png";
  }
  var sc = create_element(
    element_types[1],
    selectors[0],
    "settingsScreen",
    ud,
    screen_type
  );

  var settingsOpen = false;
  const changeScreen = function () {
    if (settingsOpen == false) {
      sc.style.transform = "translate(0%)";
      settingsOpen = true;
      document.body.style.width =
        String(((screen.width - 350) / screen.width) * 100) + "%";
    } else {
      sc.style.transform = "translate(110%)";
      settingsOpen = false;
      document.body.style.width = "100%";
    }
  };

  document.addEventListener("keydown", (evt) => {
    if (evt.key === "Escape") {
      changeScreen();
    } else if (evt.key === "Enter") {
      if (document.activeElement == toDoInput) {
        toDoListSecondFunction();
      }
    }
  });

  cog.addEventListener("click", changeScreen);

  //create elements
  var sT = create_element(
    element_types[0],
    selectors[0],
    "settingsText",
    "BACKGROUND",
    sc
  );
  var bd = create_element(
    element_types[1],
    selectors[0],
    "backgroundDiv",
    ud,
    sc
  );
  var bdtwo = create_element(
    element_types[1],
    selectors[1],
    "displayflex",
    ud,
    bd
  );
  var bcl = create_element(
    element_types[0],
    selectors[0],
    "backgroundChangeLabel",
    "Image Url",
    bdtwo
  );
  var bi = create_element(
    element_types[2],
    selectors[0],
    "backgroundInput",
    "Add Url Here!",
    bdtwo
  );
  bi.placeholder = "Enter Url Here!";
  var lb = create_element(element_types[1], selectors[0], "lineBreak", ud, bd);
  var bdthree = create_element(
    element_types[1],
    selectors[1],
    "displayflex",
    ud,
    bd
  );
  var bb = create_element(
    element_types[0],
    selectors[0],
    "backgroundChangeLabel",
    "Blur Intesity",
    bdthree
  );
  var bs = create_element(
    element_types[2],
    selectors[0],
    "blurSlider",
    ud,
    bdthree,
    ud,
    "range",
    ud,
    "0",
    "0",
    "50"
  );
  var lb = create_element(element_types[1], selectors[0], "lineBreak", ud, bd);
  var bdfour = create_element(
    element_types[1],
    selectors[1],
    "displayflex",
    ud,
    bd
  );
  var upil = create_element(
    element_types[6],
    selectors[0],
    "imageUploaderLabel",
    "Drag and Drop or Click Here to Upload Image",
    bdfour
  );
  upil.setAttribute("for", "imageUploader");
  var upii = create_element(
    element_types[2],
    selectors[0],
    "imageUploader",
    ud,
    bdfour
  );
  upii.type = "file";
  var tt = create_element(
    element_types[0],
    selectors[0],
    "settingsText",
    "TIME AND DATE",
    sc
  );
  var td = create_element(element_types[1], selectors[0], "timeDiv", ud, sc);
  var tdtwo = create_element(
    element_types[1],
    selectors[1],
    "displayflex",
    ud,
    td
  );
  var tid = create_element(
    element_types[0],
    selectors[0],
    "backgroundChangeLabel",
    "Display Time",
    tdtwo
  );
  var tdi = create_element(
    element_types[2],
    selectors[0],
    "displayTimeInput",
    ud,
    tdtwo
  );
  tdi.type = "checkbox";
  tdi.checked = true;
  var lb = create_element(element_types[1], selectors[0], "lineBreak", ud, td);
  var tdthree = create_element(
    element_types[1],
    selectors[1],
    "displayflex",
    ud,
    td
  );
  var dd = create_element(
    element_types[0],
    selectors[0],
    "backgroundChangeLabel",
    "Display Date",
    tdthree
  );
  var ddi = create_element(
    element_types[2],
    selectors[0],
    "displayDateInput",
    ud,
    tdthree
  );
  ddi.type = "checkbox";
  ddi.checked = true;
  var lb = create_element(element_types[1], selectors[0], "lineBreak", ud, td);
  var tdfour = create_element(
    element_types[1],
    selectors[1],
    "displayflex",
    ud,
    td
  );
  var mtt = create_element(
    element_types[0],
    selectors[0],
    "backgroundChangeLabel",
    "24 Hour Format",
    tdfour
  );
  var mti = create_element(
    element_types[2],
    selectors[0],
    "militaryTimeInput",
    ud,
    tdfour
  );
  mti.type = "checkbox";
  var nt = create_element(
    element_types[0],
    selectors[0],
    "settingsText",
    "CUSTOMIZE",
    sc
  );
  var basicsettings = create_element(element_types[1], selectors[0], "timeDiv", ud, sc);
  var basic_settings_div = create_element(
    element_types[1],
    selectors[1],
    "displayflex",
    ud,
    basicsettings
  );
  var basic_settings_color = create_element(
    element_types[0],
    selectors[0],
    "backgroundChangeLabel",
    "Text Color",
    basic_settings_div
  );
  var basic_text_color_container = create_element(
    element_types[1],
    selectors[1],
    "colorContainers",
    ud,
    basic_settings_div
  );

  var basic_text_color = create_element(
    element_types[2],
    selectors[0],
    "backgroundChangeLabelInput",
    ud,
    basic_text_color_container
  );
  basic_text_color.type = "color";
  basic_text_color.setAttribute("class", "colorSelectors");
  basic_text_color.value = "#FFFFFF";
  var lb = create_element(element_types[1], selectors[0], "lineBreak", ud, basicsettings);
  var basic_settings_div_two = create_element(
    element_types[1],
    selectors[1],
    "displayflex",
    ud,
    basicsettings
  );
  var basic_main_color = create_element(
    element_types[0],
    selectors[0],
    "backgroundChangeLabel",
    "Theme Color",
    basic_settings_div_two
  );
  var basic_text_color_container = create_element(
    element_types[1],
    selectors[1],
    "colorContainers",
    ud,
    basic_settings_div_two
  );

  var basic_main_color = create_element(
    element_types[2],
    selectors[0],
    "backgroundChangeLabelInput",
    ud,
    basic_text_color_container
  );
  basic_main_color.type = "color";
  basic_main_color.setAttribute("class", "colorSelectors");
  basic_main_color.value = "#FFFFFF";
  var lb = create_element(element_types[1], selectors[0], "lineBreak", ud, basicsettings);
  var txtdfour = create_element(
    element_types[1],
    selectors[1],
    "displayflex",
    ud,
    basicsettings
  );
  var oc = create_element(
    element_types[0],
    selectors[0],
    "backgroundChangeLabel",
    "Opacity",
    txtdfour
  );
  var oci = create_element(
    element_types[2],
    selectors[0],
    "blurSlider",
    ud,
    txtdfour
  );
  oci.type = "range";
  oci.value = "100";
  oci.min = "0";
  oci.max = "100";
  var lb = create_element(element_types[1], selectors[0], "lineBreak", ud, basicsettings);
  var txtdfive = create_element(
    element_types[1],
    selectors[1],
    "displayflex",
    ud,
    basicsettings
  );
  var oc = create_element(
    element_types[0],
    selectors[0],
    "backgroundChangeLabel",
    "Font",
    txtdfive
  );
  var fi = create_element(
    element_types[4],
    selectors[0],
    "fontInput",
    ud,
    txtdfive
  );
  var fione = create_element(
    element_types[5],
    selectors[0],
    "fontOption",
    ud,
    fi
  );
  fione.innerHTML = "SF PRO";
  var fitwo = create_element(
    element_types[5],
    selectors[0],
    "fontOption",
    ud,
    fi
  );
  fitwo.innerHTML = "TIMES NEW ROMAN";
  var fithree = create_element(
    element_types[5],
    selectors[0],
    "fontOption",
    ud,
    fi
  );
  fithree.innerHTML = "ROCKWELL";

  var eft = create_element(
    element_types[0],
    selectors[0],
    "settingsText",
    "EFFECTS",
    sc
  );

  var lb = create_element(element_types[1], selectors[0], "lineBreak", ud, basicsettings);

  var bsfive = create_element(
    element_types[1],
    selectors[1],
    "displayflex",
    ud,
    basicsettings
  );
  var color_coded_label = create_element(
    element_types[0],
    selectors[0],
    "backgroundChangeLabel",
    "Colored Grades",
    bsfive
  );
  var color_coded_input = create_element(
    element_types[2],
    selectors[0],
    "color-coded-input",
    ud,
    bsfive
  );
  color_coded_input.type = "checkbox"

  var efd = create_element(
    element_types[1],
    selectors[0],
    "EFFECTDIV",
    ud,
    sc
  );

  var efdtwo = create_element(
    element_types[1],
    selectors[1],
    "displayflex",
    ud,
    efd
  );
  var snl = create_element(
    element_types[0],
    selectors[0],
    "backgroundChangeLabel",
    "Snow",
    efdtwo
  );
  var sni = create_element(
    element_types[2],
    selectors[0],
    "snowInput",
    ud,
    efdtwo
  );
  sni.type = "checkbox"
  var vpt = create_element(
    element_types[0],
    selectors[0],
    "settingsText",
    "VERAPLUS",
    sc
  );
  var vpd = create_element(
    element_types[1],
    selectors[0],
    "VeraPlusDiv",
    ud,
    sc
  );
  var vpdtwo = create_element(
    element_types[1],
    selectors[1],
    "displayflex",
    ud,
    vpd
  );
  var vpdm = create_element(
    element_types[0],
    selectors[0],
    "backgroundChangeLabel",
    "Dark Mode",
    vpdtwo
  );
  var vpdmi = create_element(
    element_types[2],
    selectors[0],
    "VeraPlusModeInput",
    ud,
    vpdtwo
  );
  vpdmi.type = "checkbox";
  vpdmi.checked = true;
  var txtdisplayflex = create_element(
    element_types[1],
    selectors[1],
    "displayflexadvanced",
    ud,
    sc
  );

  var txtadvanced = create_element(
    element_types[0],
    selectors[0],
    "settingsTextAdvanced",
    "ADVANCED SETTINGS",
    txtdisplayflex
  );
  var advancedArrow = create_element(
    element_types[0],
    selectors[0],
    "advancedArrow",
    "▲",
    txtdisplayflex
  );
  var txtd = create_element(element_types[1], selectors[0], "textDiv", ud, sc);
  var txtdtwo = create_element(
    element_types[1],
    selectors[1],
    "displayflex",
    ud,
    txtd
  );
  var btc = create_element(
    element_types[0],
    selectors[0],
    "backgroundChangeLabel",
    "Body Text Color",
    txtdtwo
  );
  var basic_text_color_container = create_element(
    element_types[1],
    selectors[1],
    "colorContainers",
    ud,
    txtdtwo
  );
  var btci = create_element(
    element_types[2],
    selectors[0],
    "backgroundChangeLabelInput",
    ud,
    basic_text_color_container
  );
  btci.type = "color";
  btci.setAttribute("class", "colorSelectors");
  btci.value = "#FFFFFF";
  var lb = create_element(element_types[1], selectors[0], "lineBreak", ud, txtd);
  var ndthree = create_element(
    element_types[1],
    selectors[1],
    "displayflex",
    ud,
    txtd
  );

  var ntc = create_element(
    element_types[0],
    selectors[0],
    "backgroundChangeLabel",
    "Navigation Text Color",
    ndthree
  );
  var basic_text_color_container = create_element(
    element_types[1],
    selectors[1],
    "colorContainers",
    ud,
    ndthree
  );
  var ntci = create_element(
    element_types[2],
    selectors[0],
    "navTextChangeInput",
    ud,
    basic_text_color_container
  );
  ntci.type = "color";
  ntci.setAttribute("class", "colorSelectors");
  ntci.value = "#FFFFFF";
  var lb = create_element(
    element_types[1],
    selectors[0],
    "lineBreak",
    ud,
    txtd
  );
  var txtdthree = create_element(
    element_types[1],
    selectors[1],
    "displayflex",
    ud,
    txtd
  );
  var bc = create_element(
    element_types[0],
    selectors[0],
    "backgroundChangeLabel",
    "Body Color",
    txtdthree
  );
  var basic_text_color_container = create_element(
    element_types[1],
    selectors[1],
    "colorContainers",
    ud,
    txtdthree
  );
  var bci = create_element(
    element_types[2],
    selectors[0],
    "backgroundChangeLabelInput",
    ud,
    basic_text_color_container
  );
  var lb = create_element(
    element_types[1],
    selectors[0],
    "lineBreak",
    ud,
    txtd
  );
  var ndtwo = create_element(
    element_types[1],
    selectors[1],
    "displayflex",
    ud,
    txtd
  );
  var nct = create_element(
    element_types[0],
    selectors[0],
    "backgroundChangeLabel",
    "Navigation Color",
    ndtwo
  );
  var basic_text_color_container = create_element(
    element_types[1],
    selectors[1],
    "colorContainers",
    ud,
    ndtwo
  );
  var nci = create_element(
    element_types[2],
    selectors[0],
    "navChangeInput",
    ud,
    basic_text_color_container
  );
  nci.type = "color";
  nci.setAttribute("class", "colorSelectors");
  nci.value = "#FFFFFF";
  
  var lb = create_element(
    element_types[1],
    selectors[0],
    "lineBreak",
    ud,
    txtd
  );
  var budtwo = create_element(
    element_types[1],
    selectors[1],
    "displayflex",
    ud,
    txtd
  );
  var butc = create_element(
    element_types[0],
    selectors[0],
    "backgroundChangeLabel",
    "Button Color",
    budtwo
  );
  var basic_text_color_container = create_element(
    element_types[1],
    selectors[1],
    "colorContainers",
    ud,
    budtwo
  );
  var butci = create_element(
    element_types[2],
    selectors[0],
    "buttonTextChangeInput",
    ud,
    basic_text_color_container
  );
  butci.type = "color";
  butci.setAttribute("class", "colorSelectors");
  butci.value = "#FFFFFF";

  var lb = create_element(
    element_types[1],
    selectors[0],
    "lineBreak",
    ud,
    txtd
  );

  var txtdsix = create_element(
    element_types[1],
    selectors[1],
    "displayflex",
    ud,
    txtd
  );
  var bbs = create_element(
    element_types[0],
    selectors[0],
    "backgroundChangeLabel",
    "Body Shadow",
    txtdsix
  );
  var bbsi = create_element(
    element_types[2],
    selectors[0],
    "BodyShadowImput",
    ud,
    txtdsix
  );
  bbsi.type = "checkbox";
  bbsi.checked = true;
  bci.type = "color";
  bci.setAttribute("class", "colorSelectors");
  bci.value = "#FFFFFF";

  //Change background and add to local storage
  var changeBackground = function () {
    chrome.storage.local.set({ bg: bi.value }).then(() => {
      document.getElementsByClassName("portal-background")[0].src = bi.value;
    });
    chrome.storage.local.set({ chosenFile: false }).then(() => {
      chosenFile = false;
    });
  };

  //inefficent system for getting and saving data
  bi.addEventListener("input", changeBackground);

  var changeBlur = function () {
    chrome.storage.local.set({ bgb: bs.value + "px" }).then(() => {
      roots.style.setProperty("--BACKGROUNDBLUR", bs.value + "px");
    });
  };

  //Load blur from chrome extension storage.
  chrome.storage.local.get(["bgb"]).then((result) => {
    if (result.bgb != ud) {
      roots.style.setProperty("--BACKGROUNDBLUR", result.bgb);
      bluramount = result.bgb.replace("px", "");
      bs.value = bluramount;
    }
  });

  bs.addEventListener("input", changeBlur);

  var startSnow = function () {
    if (sni.checked == false) {
      document.getElementById("snow-wrap").remove()
      chrome.storage.local.set({ snow: false }).then(() => {});
    } else {
      var snow_wrap = create_element(
        element_types[1],
        selectors[0],
        "snow-wrap",
        ud,
        screen_type
      );
      var snow = create_element(
        element_types[1],
        selectors[0],
        "snow",
        ud,
        snow_wrap
      );
      chrome.storage.local.set({ snow: true }).then(() => {});
    }
  };

  //Load blur from chrome extension storage.
  chrome.storage.local.get(["snow"]).then((result) => {
    if (result.snow != ud) {
      if (result.snow == true) {
        var snow_wrap = create_element(
          element_types[1],
          selectors[0],
          "snow-wrap",
          ud,
          screen_type
        );
        var snow = create_element(
          element_types[1],
          selectors[0],
          "snow",
          ud,
          snow_wrap
        );
        sni.checked = true
      }
    }
  });

  sni.addEventListener("input", startSnow);

    function color_coded_function() {
      if (color_coded_input.checked == true) {
        chrome.storage.local.set({ colorCoded: true }).then(() => {});
        var grades = document.getElementsByClassName('letter-grade')
        var grades_numeric = document.getElementsByClassName('numeric-grade')
        var grades_array = Array.from(grades)
        var grades_numeric_array = Array.from(grades_numeric)
        for (let i = 0; i < grades_array.length; i++) {
          var current_grade = parseFloat(grades_numeric_array[i].innerHTML.replace('%',''))
          if (current_grade >= 90.00) {
            grades_array[i].setAttribute("style", "color: #31D92B !important;")
            grades_numeric_array[i].setAttribute("style", "color: #31D92B !important;")
          } else if (current_grade < 90.00 && current_grade >= 80.00) {
            grades_array[i].setAttribute("style", "color: #8EFF8F !important;")
            grades_numeric_array[i].setAttribute("style", "color: #8EFF8F !important;")
          } else if (current_grade < 80.00 && current_grade >= 70.00) {
            grades_array[i].setAttribute("style", "color: yellow !important;")
            grades_numeric_array[i].setAttribute("style", "color: yellow !important;")
          } else if (current_grade < 70.00 && current_grade >= 60.00) {
            grades_array[i].setAttribute("style", "color: #ff8b00 !important;")
            grades_numeric_array[i].setAttribute("style", "color: #ff8b00 !important;")
          } else if (current_grade < 60.00) {
            grades_array[i].setAttribute("style", "color: #B32927 !important;")
            grades_numeric_array[i].setAttribute("style", "color: #B32927 !important;")
          }
        }
      } else {
        chrome.storage.local.set({ colorCoded: false }).then(() => {});
        var grades = document.getElementsByClassName('letter-grade')
        var grades_numeric = document.getElementsByClassName('numeric-grade')
        var grades_array = Array.from(grades)
        var grades_numeric_array = Array.from(grades_numeric)
        for (let i = 0; i < grades_array.length; i++) {
          grades_array[i].removeAttribute("style")
          grades_numeric_array[i].removeAttribute("style")
        }
      }
  }

  color_coded_input.addEventListener("input", color_coded_function);

  var displayTimeInputFunc = function () {
    if (document.getElementById("displayTimeInput").checked == true) {
      chrome.storage.local.set({ time: true }).then(() => {});
      document.getElementById("time").style.display = "block";
      document.getElementById("date").style.marginTop = "0px";
    } else {
      chrome.storage.local.set({ time: false }).then(() => {});
      document.getElementById("time").style.display = "none";
      document.getElementById("date").style.marginTop = "40px";
    }
  };

  chrome.storage.local.get(["time"]).then((result) => {
    if (result.time != ud) {
      if (result.time == true) {
        document.getElementById("time").style.display = "block";
        document.getElementById("date").style.marginTop = "0px";
      } else {
        document.getElementById("time").style.display = "none";
        document.getElementById("date").style.marginTop = "40px";
      }
      document.getElementById("displayTimeInput").checked = result.time;
    }
  });

  displayTimeInput.addEventListener("input", displayTimeInputFunc);

  var displayDateInputFunc = function () {
    if (document.getElementById("displayDateInput").checked == true) {
      chrome.storage.local.set({ date: true }).then(() => {});
      document.getElementById("date").style.display = "block";
    } else {
      chrome.storage.local.set({ date: false }).then(() => {});
      document.getElementById("date").style.display = "none";
    }
  };

  ddi.addEventListener("input", displayDateInputFunc);

  chrome.storage.local.get(["date"]).then((result) => {
    if (result.date != ud) {
      if (result.date == true) {
        document.getElementById("date").style.display = "block";
      } else {
        document.getElementById("date").style.display = "none";
      }
      document.getElementById("displayDateInput").checked = result.date;
    }
  });

  var mto = false;

  var militaryTimeInputFunc = function () {
    if (document.getElementById("militaryTimeInput").checked == true) {
      chrome.storage.local.set({ mtime: true }).then(() => {});
      mto = true;
      updateTime();
    } else {
      chrome.storage.local.set({ mtime: false }).then(() => {});
      mto = false;
      updateTime();
    }
  };

  mti.addEventListener("input", militaryTimeInputFunc);

  var navChangeFunc = function () {
    chrome.storage.local.set({ navColor: nci.value }).then(() => {});
    roots.style.setProperty("--NAVAGATIONBARCOLOR", nci.value);
  };

  nci.addEventListener("input", navChangeFunc);

  chrome.storage.local.get(["navColor"]).then((result) => {
    if (result.navColor != ud) {
      roots.style.setProperty("--NAVAGATIONBARCOLOR", result.navColor);
      nci.value = result.navColor;
    }
  });

  var navTextChangeInputFunc = function () {
    chrome.storage.local.set({ navTextColor: ntci.value }).then(() => {});
    roots.style.setProperty("--NAVAGATIONTEXTCOLOR", ntci.value);
  };

  ntci.addEventListener("input", navTextChangeInputFunc);

  chrome.storage.local.get(["navTextColor"]).then((result) => {
    if (result.navTextColor != ud) {
      roots.style.setProperty("--NAVAGATIONTEXTCOLOR", result.navTextColor);
      ntci.value = result.navTextColor;
    }
  });

  var bodyTextChangeInputFunc = function () {
    chrome.storage.local.set({ bodyTextColor: btci.value }).then(() => {});
    roots.style.setProperty("--BODYTEXTCOLOR", btci.value);
  };

  var basicTextChangeInputFunc = function () {
    chrome.storage.local.set({ bodyTextColor: basic_text_color.value }).then(() => {});
    roots.style.setProperty("--BODYTEXTCOLOR", basic_text_color.value);
    chrome.storage.local.set({ navTextColor: basic_text_color.value }).then(() => {});
    roots.style.setProperty("--NAVAGATIONTEXTCOLOR", basic_text_color.value);
    ntci.value = basic_text_color.value
    btci.value = basic_text_color.value
    chrome.storage.local.set({ basicTextColor: basic_text_color.value }).then(() => {});
  };

  basic_text_color.addEventListener("input", basicTextChangeInputFunc);
  btci.addEventListener("input", bodyTextChangeInputFunc);

  chrome.storage.local.get(["basicTextColor"]).then((result) => {
    if (result.basicTextColor != ud) {
      basic_text_color.value = result.basicTextColor;
    }
  });

  chrome.storage.local.get(["bodyTextColor"]).then((result) => {
    if (result.bodyTextColor != ud) {
      roots.style.setProperty("--BODYTEXTCOLOR", result.bodyTextColor);
      btci.value = result.bodyTextColor;
    }
  });

  var bodyChangeInputFunc = function () {
    hex = hex2rgb(bci.value);
    var rgba;
    rgba =
      "rgba(" + hex.r + "," + hex.g + "," + hex.b + "," + oci.value / 100 + ")";
    chrome.storage.local.set({ bodyColor: rgba }).then(() => {});
    chrome.storage.local.set({ opacitySlider: oci.value }).then(() => {});
    roots.style.setProperty("--BACKGROUNDCOLOR", String(rgba));
  };

  bci.addEventListener("input", bodyChangeInputFunc);

  /*THANK YOU https://learnersbucket.com/examples/interview/convert-hex-color-to-rgb-in-javascript/ 
    FOR THE HEX TO RGB CONVERTER!*/

  const hex2rgb = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    // return {r, g, b}
    return { r, g, b };
  };

  chrome.storage.local.get(["bodyColor"]).then((result) => {
    if (result.bodyColor != ud) {
      var gg;
      gg = result.bodyColor.replace("rgba(", "");
      gg = gg.replace(")", "");

      const obj = [];
      let sobj = "";
      for (let i = 0; i < gg.length; i++) {
        if (gg[i] != ",") {
          sobj = sobj + gg[i];
        } else {
          obj.push(sobj);
          sobj = "";
        }
      }

      /*THANK YOU TO https://learnersbucket.com/examples/interview/convert-rgb-to-hex-color-in-javascript/ 
            FOR THE RGB TO HEX CONVERTER */

      const componentToHex = (c) => {
        const hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
      };

      const rgbToHex = (r, g, b) => {
        return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
      };

      gg = rgbToHex(parseInt(obj[0]), parseInt(obj[1]), parseInt(obj[2]));
      roots.style.setProperty("--BACKGROUNDCOLOR", result.bodyColor);
      bci.value = gg;
    }
  });

  oci.addEventListener("input", bodyChangeInputFunc);

  chrome.storage.local.get(["opacitySlider"]).then((result) => {
    if (result.opacitySlider != ud) {
      oci.value = result.opacitySlider;
    }
  });

  const buttonTextChangeFunc = function () {
    chrome.storage.local.set({ buttonTextChange: butci.value }).then(() => {});
    roots.style.setProperty("--SCREENBUTTONCOLOR", String(butci.value));
  };

  butci.addEventListener("input", buttonTextChangeFunc);

  chrome.storage.local.get(["buttonTextChange"]).then((result) => {
    if (result.buttonTextChange != ud) {
      butci.value = result.buttonTextChange;
      roots.style.setProperty("--SCREENBUTTONCOLOR", String(butci.value));
    }
  });

  var fontInput = document.getElementById("fontInput");

  const updateFont = function () {
    if (fontInput.value == "SF PRO") {
      roots.style.setProperty(
        "--FONT",
        '-apple-system, system-ui, Ubuntu, Roboto, "Open Sans", "Segoe UI", "Helvetica Neue'
      );
      chrome.storage.local.set({ font: "SF PRO" }).then(() => {});
    } else if (fontInput.value == "TIMES NEW ROMAN") {
      roots.style.setProperty("--FONT", '"Times New Roman", Times, serif');
      chrome.storage.local.set({ font: "TIMES NEW ROMAN" }).then(() => {});
    } else if (fontInput.value == "ROCKWELL") {
      roots.style.setProperty(
        "--FONT",
        'Rockwell, "Courier Bold", Courier, Georgia, Times, "Times New Roman", serif'
      );
      chrome.storage.local.set({ font: "ROCKWELL" }).then(() => {});
    }
  };

  fontInput.onchange = function () {
    updateFont();
  };

  var changeBackgroundShadow = function () {
    if (bbsi.checked == true) {
      chrome.storage.local
        .set({ backgroundShadow: "0px 0px 25px 0px rgba(0, 0, 0, 0.5)" })
        .then(() => {});
      roots.style.setProperty(
        "--BODYSHADOW",
        "0px 0px 25px 0px rgba(0, 0, 0, 0.5)"
      );
    } else {
      chrome.storage.local
        .set({ backgroundShadow: "0px 0px 0px 0px rgba(0, 0, 0, 0.5)" })
        .then(() => {});
      roots.style.setProperty(
        "--BODYSHADOW",
        "0px 0px 0px 0px rgba(0, 0, 0, 0.5)"
      );
    }
  };

  bbsi.addEventListener("input", changeBackgroundShadow);

  chrome.storage.local.get(["backgroundShadow"]).then((result) => {
    if (result.backgroundShadow != ud) {
      roots.style.setProperty("--BODYSHADOW", result.backgroundShadow);
      if (result.backgroundShadow == "0px 0px 25px 0px rgba(0, 0, 0, 0.5)") {
        bbsi.checked = true;
      } else {
        bbsi.checked = false;
      }
    }
  });

  chrome.storage.local.get(["font"]).then((result) => {
    if (result.font != ud) {
      fontInput.value = result.font;
      if (result.font == "SF PRO") {
        roots.style.setProperty(
          "--FONT",
          '-apple-system, system-ui, Ubuntu, Roboto, "Open Sans", "Segoe UI", "Helvetica Neue'
        );
      } else if (result.font == "TIMES NEW ROMAN") {
        roots.style.setProperty("--FONT", '"Times New Roman", Times, serif');
      } else if (result.font == "ROCKWELL") {
        roots.style.setProperty(
          "--FONT",
          'Rockwell, "Courier Bold", Courier, Georgia, Times, "Times New Roman", serif'
        );
      }
    }
  });

  function advancedArrowFunction() {
    if (this.innerHTML == "▼") {
      this.innerHTML = "▲"
      txtd.style.display = "none"
      txtadvanced.style.marginBottom = "20px"
      advancedArrow.style.marginBottom = "20px"
    } else {
      this.innerHTML = "▼"
      txtd.style.display = "block"      
      txtadvanced.style.marginBottom = "10px"
      advancedArrow.style.marginBottom = "10px"
    }
  }
  advancedArrow.addEventListener('click', advancedArrowFunction)

  function basicMainColorFunc() {
    hex = hex2rgb(basic_main_color.value);
    var rgba;
    const componentToHex = (c) => {
      const hex = c.toString(16);
      return hex.length == 1 ? "0" + hex : hex;
    };

    const rgbToHex = (r, g, b) => {
      return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
    };
    rgba = "rgba(" + hex.r + "," + hex.g + "," + hex.b + "," + oci.value / 100 + ")";
    bci.value  = rgbToHex(hex.r,hex.g,hex.b)
    var r2, b2, g2
    if (hex.r-50 < 0) {r2 = 0} else {r2 = hex.r-50}
    if (hex.g-50 < 0) {g2 = 0} else {g2 = hex.g-50}
    if (hex.b-50 < 0) {b2 = 0} else {b2 = hex.b-50}
    rgba2 = "rgb(" + r2 + "," + g2 + "," + b2 + ")";
    butci.value = rgbToHex(r2,g2,b2)
    var r3, b3, g3
    if (hex.r-80 < 0) {r3 = 0} else {r3 = hex.r-80}
    if (hex.g-80 < 0) {g3 = 0} else {g3 = hex.g-80}
    if (hex.b-80 < 0) {b3 = 0} else {b3 = hex.b-80}
    rgba3 = "rgb(" + r3 + "," + g3 + "," + b3 + ")";
    nci.value = rgbToHex(r3,g3,b3)
    chrome.storage.local.set({ bodyColor: rgbToHex(hex.r,hex.g,hex.b) }).then(() => {});
    chrome.storage.local.set({ opacitySlider: oci.value }).then(() => {});
    chrome.storage.local.set({ navColor: rgbToHex((r3),(g3),(b3)) }).then(() => {});
    roots.style.setProperty("--NAVAGATIONBARCOLOR", rgba3);
    chrome.storage.local.set({ buttonTextChange: rgbToHex(r2,g2,b2) }).then(() => {});
    chrome.storage.local.set({ bodyColor: String(rgba) }).then(() => {});
    roots.style.setProperty("--BACKGROUNDCOLOR", String(rgba));
    roots.style.setProperty("--SCREENBUTTONCOLOR", String(rgba2));
    chrome.storage.local.set({ basicMainColor: basic_main_color.value}).then(() => {});
  }

  basic_main_color.addEventListener("input", basicMainColorFunc);

  chrome.storage.local.get(["basicMainColor"]).then((result) => {
    if (result.basicMainColor != ud) {
      basic_main_color.value = result.basicMainColor
    }
  })
  function uploadImage() {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      chrome.storage.local.set({ bg: reader.result }).then(() => {
        document.getElementsByClassName("portal-background")[0].src =
          reader.result;
      });
      chrome.storage.local.set({ chosenFile: true }).then(() => {
        chosenFile = true;
      });
      chrome.storage.local.set({ fileName: upii.files[0].name }).then(() => {
        bi.value = upii.files[0].name;
      });
    });
    reader.readAsDataURL(upii.files[0]);
  }

  upii.addEventListener("change", uploadImage);
  upil.addEventListener("dragover", function (fileOne) {
    fileOne.preventDefault();
  });

  upil.addEventListener("drop", function (fileOne) {
    fileOne.preventDefault();
    upii.files = fileOne.dataTransfer.files;
    uploadImage();
  });

  var changeMenuMode = function () {
    chrome.storage.local.set({ menuMode: vpdmi.checked }).then(() => {
      if (vpdmi.checked == false) {
        roots.style.setProperty("--MENUBACKGROUND", "#f1f4f5");
        roots.style.setProperty("--MENUBORDER", "#dbdbdb");
        roots.style.setProperty("--MENUDIVBACKGROUND", "white");
        roots.style.setProperty("--MENUTEXT", "rgb(100, 100, 100)");
        roots.style.setProperty("--LINEBREAK", "rgb(236 236 236)");
        roots.style.setProperty("--MENUHEADER", "rgb(80, 80, 80)");
        roots.style.setProperty("--MENUCOLORINPUTBORDER", "none");
        roots.style.setProperty("--MENUOTHERBACKGROUNDS", "white");
        roots.style.setProperty("--MENUCHECKBOXCOLOR", "white");
        roots.style.setProperty("--MENUCHECKBOXCOLORTWO", "rgb(200, 200, 200)");
        roots.style.setProperty("--TODOLISTBORDER", "rgb(200, 200, 200)");
        roots.style.setProperty("--TODOBUTTON", "rgb(242, 242, 242)");
        roots.style.setProperty("--OTHERMENUDIVBORDER", "#d7d7d7");
        roots.style.setProperty("--SPECIALCELL", "rgb(240, 240, 240)");
        roots.style.setProperty("--ASSIGNMENTINPUTS", "rgb(240, 240, 240)");
        roots.style.setProperty("--ASSIGNMENTBOX", "rgb(230, 230, 230)");
      } else {
        roots.style.setProperty("--MENUBACKGROUND", "#0f0f10");
        roots.style.setProperty("--MENUBORDER", "rgb(78,78,78)");
        roots.style.setProperty("--MENUDIVBACKGROUND", "#1c1c1e");
        roots.style.setProperty("--MENUTEXT", "rgb(195, 194, 194)");
        roots.style.setProperty("--LINEBREAK", "#2f2f2f");
        roots.style.setProperty("--MENUHEADER", "rgb(128, 128, 128)");
        roots.style.setProperty("--MENUCOLORINPUTBORDER", "white");
        roots.style.setProperty("--MENUOTHERBACKGROUNDS", "gray");
        roots.style.setProperty("--MENUCHECKBOXCOLOR", "white");
        roots.style.setProperty("--MENUCHECKBOXCOLORTWO", "#555555");
        roots.style.setProperty("--TODOLISTBORDER", "#2f2f2f");
        roots.style.setProperty("--TODOBUTTON", "rgb(50, 50, 50)");
        roots.style.setProperty("--OTHERMENUDIVBORDER", "#2f2f2f");
        roots.style.setProperty("--SPECIALCELL", "rgb(23, 23, 23)");
        roots.style.setProperty("--ASSIGNMENTINPUTS", "rgb(32,32,32)");
        roots.style.setProperty("--ASSIGNMENTBOX", "#0f0f10");
      }
    });
  };

  chrome.storage.local.get(["menuMode"]).then((result) => {
    if (result.menuMode != ud) {
      if (result.menuMode == false) {
        roots.style.setProperty("--MENUBACKGROUND", "#f1f4f5");
        roots.style.setProperty("--MENUBORDER", "#dbdbdb");
        roots.style.setProperty("--MENUDIVBACKGROUND", "white");
        roots.style.setProperty("--MENUTEXT", "rgb(100, 100, 100)");
        roots.style.setProperty("--LINEBREAK", "rgb(236 236 236)");
        roots.style.setProperty("--MENUHEADER", "rgb(80, 80, 80)");
        roots.style.setProperty("--MENUCOLORINPUTBORDER", "none");
        roots.style.setProperty("--MENUOTHERBACKGROUNDS", "white");
        roots.style.setProperty("--MENUCHECKBOXCOLOR", "white");
        roots.style.setProperty("--MENUCHECKBOXCOLORTWO", "rgb(200, 200, 200)");
        roots.style.setProperty("--TODOLISTBORDER", "rgb(200, 200, 200)");
        roots.style.setProperty("--TODOBUTTON", "rgb(242, 242, 242)");
        roots.style.setProperty("--OTHERMENUDIVBORDER", "#d7d7d7");
        roots.style.setProperty("--SPECIALCELL", "rgb(240, 240, 240)");
        roots.style.setProperty("--ASSIGNMENTINPUTS", "rgb(240, 240, 240)");
        roots.style.setProperty("--ASSIGNMENTBOX", "rgb(230, 230, 230)");
      } else {
        roots.style.setProperty("--MENUBACKGROUND", "#0f0f10");
        roots.style.setProperty("--MENUBORDER", "rgb(78,78,78)");
        roots.style.setProperty("--MENUDIVBACKGROUND", "#1c1c1e");
        roots.style.setProperty("--MENUTEXT", "rgb(195, 194, 194)");
        roots.style.setProperty("--LINEBREAK", "#2f2f2f");
        roots.style.setProperty("--MENUHEADER", "rgb(128 128 128)");
        roots.style.setProperty("--MENUCOLORINPUTBORDER", "white");
        roots.style.setProperty("--MENUOTHERBACKGROUNDS", "gray");
        roots.style.setProperty("--MENUCHECKBOXCOLOR", "white");
        roots.style.setProperty("--MENUCHECKBOXCOLORTWO", "#555555");
        roots.style.setProperty("--TODOLISTBORDER", "#2f2f2f");
        roots.style.setProperty("--TODOBUTTON", "rgb(50, 50, 50)");
        roots.style.setProperty("--OTHERMENUDIVBORDER", "#2f2f2f");
        roots.style.setProperty("--SPECIALCELL", "rgb(23, 23, 23)");
        roots.style.setProperty("--ASSIGNMENTINPUTS", "rgb(32, 32, 32)");
        roots.style.setProperty("--ASSIGNMENTBOX", "#0f0f10");
      }
      vpdmi.checked = result.menuMode;
    }
  });

  vpdmi.addEventListener("input", changeMenuMode);

  var calenderButton = create_element(
    element_types[3],
    selectors[0],
    "calenderButton",
    ud,
    screen_type
  );
  calenderButton.src =
    "https://www.iconarchive.com/download/i103365/paomedia/small-n-flat/calendar.1024.png";

  var calenderScreenVar = create_element(
    element_types[1],
    selectors[0],
    "calenderScreen",
    ud,
    screen_type
  );

  var calenderOpen = false;

  const changeCalender = function () {
    if (calenderOpen == false) {
      calenderScreenVar.style.transform = "translate(0%)";
      calenderOpen = true;
      settingsOpen = false
      sc.style.transform = "translate(110%)";
      document.body.style.width = "100%"
    } else {
      calenderScreenVar.style.transform = "translate(-110%)";
      calenderOpen = false;
      var assignments_array = document.getElementsByClassName("new-assignment");
      if (assignments_array.length != 0) {
        for (let i = 0; i < assignments_array.length; i++) {
          assignments_array[i].remove();
        }
      }
      var assignments_array_two = document.getElementsByClassName(
        "new-assignment-overlay"
      );
      if (assignments_array_two.length != 0) {
        assignments_array_two[0].remove();
      }
      let delete_assigment = document.getElementsByClassName("new-pop-up-assignment");
      for (let i = 0; i < delete_assigment.length; i++) {
        delete_assigment[i].remove();
      }
    }
  };

  // THANK YOU TO https://www.youtube.com/watch?v=G0jO8kUrg-I FOR THE TO DO LIST TUTORIAL

  calenderButton.addEventListener("click", changeCalender);
  var toDoApp = create_element(
    element_types[1],
    selectors[0],
    "toDoApp",
    ud,
    calenderScreenVar
  );
  var assignmentApp = create_element(
    element_types[1],
    selectors[0],
    "calenderApp",
    ud,
    calenderScreenVar
  );
  var toDoLabel = create_element(
    element_types[11],
    selectors[0],
    "toDoLabel",
    "To-Do List",
    toDoApp
  );
  var toDoInputDiv = create_element(
    element_types[1],
    selectors[0],
    "toDoInputDiv",
    ud,
    toDoApp
  );
  var toDoInput = create_element(
    element_types[2],
    selectors[0],
    "toDoInput",
    ud,
    toDoInputDiv
  );
  toDoInput.type = "text";
  toDoInput.placeholder = "Add Item Here!";
  var toDoButton = create_element(
    element_types[7],
    selectors[0],
    "toDoButton",
    "Add",
    toDoInputDiv
  );
  var toDoList = create_element(
    element_types[8],
    selectors[0],
    "toDoList",
    ud,
    toDoApp
  );

  // THANK YOU TO https://stackoverflow.com/questions/43008354/get-all-days-of-the-week-given-a-day FOR SAVING THE ASSIGNMENT PLANNER

  var date_array;
  var current_date;
  function dates(current) {
    var week= new Array(); 
    // Starting Monday not Sunday
    current.setDate((current.getDate() - current.getDay() +1));

    for (var i = 0; i < 5; i++) {
        week.push(
            [new Date(current).getMonth(), new Date(current).getDate(), new Date(current).getFullYear()]
        ); 
        current.setDate(current.getDate() +1);
    }
    date_array = week
  }
  current_date = new Date()
  dates(current_date)

  let assignment_date = new Date(),
  dat_month = assignment_date.getMonth(),
  dat_year = assignment_date.getFullYear();

  var assignmentLabel = create_element(
    element_types[11],
    selectors[0],
    "toDoLabel",
    "Assignment Planner - " +
      months[dat_month] +
      " " +
      String(dat_year),
    assignmentApp
  );
  var assignmentDaysDiv = create_element(
    element_types[1],
    selectors[0],
    "assignmentDaysDiv",
    ud,
    assignmentApp
  );
  var assignmentDaysClass = create_element(
    element_types[1],
    selectors[1],
    "assignmentDaysText",
    "Class",
    assignmentDaysDiv
  );
  var assignmentDaysMon = create_element(
    element_types[1],
    selectors[1],
    "assignmentDaysText",
    "Monday \n" + date_array[0][1],
    assignmentDaysDiv
  );
  var assignmentDaysTue = create_element(
    element_types[1],
    selectors[1],
    "assignmentDaysText",
    "Tuesday \n" + date_array[1][1],
    assignmentDaysDiv
  );
  var assignmentDaysWed = create_element(
    element_types[1],
    selectors[1],
    "assignmentDaysText",
    "Wednesday \n" + date_array[2][1],
    assignmentDaysDiv
  );
  var assignmentDaysThu = create_element(
    element_types[1],
    selectors[1],
    "assignmentDaysText",
    "Thursday \n" + date_array[3][1],
    assignmentDaysDiv
  );
  var assignmentDaysFri = create_element(
    element_types[1],
    selectors[1],
    "assignmentDaysText",
    "Friday \n" + date_array[4][1],
    assignmentDaysDiv
  );
  var assignmentCellDiv = create_element(
    element_types[1],
    selectors[0],
    "assignmentCellDiv",
    ud,
    assignmentApp
  );

  var assignmentArrowDiv = create_element(
    element_types[1],
    selectors[0],
    "assignmentArrowDiv",
    ud,
    assignmentApp
  );
  var assignmentBackArrow = create_element(
    element_types[1],
    selectors[0],
    "assignmentBackArrow",
    "<",
    assignmentArrowDiv
  );
  var assignmentFrontArrow = create_element(
    element_types[1],
    selectors[0],
    "assignmentFrontArrow",
    ">",
    assignmentArrowDiv
  );

  const updateAp = function() {
    assignmentLabel.innerHTML = "Assignment Planner - " + months[dat_month] + " " + String(dat_year)
    for (let i = 0; i < Object.keys(all_assignments).length; i++) {
      let is_true = false;
      for (let k = 0; k < date_array.length; k++) {
        if (all_assignments[Object.keys(all_assignments)[i]][1] == date_array[k][0] &&  date_array[k][1] == all_assignments[Object.keys(all_assignments)[i]][2] && all_assignments[Object.keys(all_assignments)[i]][3] == date_array[k][2]) {
          is_true = true
        }
      }
      if (is_true) { 
        var create_new_assignment_box = create_element(
          element_types[1],
          selectors[1],
          "create_new_assignment_box",
          all_assignments[Object.keys(all_assignments)[i]][6],
          Array.from(document.getElementById("assignmentCellDiv").children)[((all_assignments[Object.keys(all_assignments)[i]][4]-1)*6)+all_assignments[Object.keys(all_assignments)[i]][5]]
        );
        create_new_assignment_box.addEventListener('click', function(stop_others) {
          stop_others.stopPropagation();
          var this_box = this
          var create_new_assignment_overlay = create_element(
            element_types[1],
            selectors[1],
            "new-assignment-overlay",
            ud,
            calenderScreenVar
          );
          var create_new_assignment = create_element(
            element_types[1],
            selectors[1],
            "new-pop-up-assignment",
            ud,
            calenderScreenVar
          );
          var new_assignment_label = create_element(
            element_types[11],
            selectors[1],
            "assignment-pop-up-label",
            this.innerHTML,
            create_new_assignment 
          );
          var look_for_assignment_parent = this.parentElement;
          var look_for_assignment_pos = Array.from(look_for_assignment_parent.parentElement.children).indexOf(look_for_assignment_parent)
          if (look_for_assignment_pos == 1 || look_for_assignment_pos == 7 || look_for_assignment_pos == 13 || look_for_assignment_pos == 19 || look_for_assignment_pos == 25 || look_for_assignment_pos == 32 || look_for_assignment_pos == 37) {
            var look_for_assignment_column = 0
          } else if (look_for_assignment_pos == 2 || look_for_assignment_pos == 8 || look_for_assignment_pos == 14 || look_for_assignment_pos == 20 || look_for_assignment_pos == 26 || look_for_assignment_pos == 33 || look_for_assignment_pos == 38) {
            var look_for_assignment_column = 1
          } else if (look_for_assignment_pos == 3 || look_for_assignment_pos == 9 || look_for_assignment_pos == 15 || look_for_assignment_pos == 21 || look_for_assignment_pos == 27 || look_for_assignment_pos == 34 || look_for_assignment_pos == 39) {
            var look_for_assignment_column = 2
          } else if (look_for_assignment_pos == 4 || look_for_assignment_pos == 10 || look_for_assignment_pos == 16 || look_for_assignment_pos == 22 || look_for_assignment_pos == 28 || look_for_assignment_pos == 35 || look_for_assignment_pos == 40) {
            var look_for_assignment_column = 3
          } else if (look_for_assignment_pos == 5 || look_for_assignment_pos == 11 || look_for_assignment_pos == 17 || look_for_assignment_pos == 23 || look_for_assignment_pos == 29 || look_for_assignment_pos == 36 || look_for_assignment_pos == 41) {
            var look_for_assignment_column = 4
          }
          var look_for_assignment_description;
          var repeat_name;
          for (let i = 0; i < Array.from(this.parentElement.children).length; i++)  {
            if (Array.from(this.parentElement.children)[i].innerHTML == this.innerHTML) {
              if (Array.from(this.parentElement.children)[i] == this) {
                repeat_name = i
              }
            }
          }
          var check_for_duplicates = -1;
          for (let i = 0; i < Object.keys(all_assignments).length; i++) {
            if (all_assignments[i+1][6] == this.innerHTML && look_for_assignment_pos == all_assignments[i+1][7] && date_array[look_for_assignment_column][1] == all_assignments[i+1][2])  {
              check_for_duplicates++ 
              if (repeat_name == check_for_duplicates) {
                look_for_assignment_description = all_assignments[i+1][0]
                break
              }
            }
          }
          var lb = create_element(element_types[1], selectors[0], "lineBreakAssigment", ud, create_new_assignment );
          var new_assignment_description = create_element(
            element_types[11],
            selectors[1],
            "assignment-pop-up-description",
            look_for_assignment_description,
            create_new_assignment 
          );
          var delete_new_assignment = create_element(
            element_types[7],
            selectors[1],
            "assignment-pop-up-delete",
            "Delete",
            create_new_assignment 
          );
          delete_new_assignment.addEventListener('click', () => { 
            var look_for_assignment_parent = this_box.parentElement;
            var look_for_assignment_pos = Array.from(look_for_assignment_parent.parentElement.children).indexOf(look_for_assignment_parent)
            if (look_for_assignment_pos == 1 || look_for_assignment_pos == 7 || look_for_assignment_pos == 13 || look_for_assignment_pos == 19 || look_for_assignment_pos == 25 || look_for_assignment_pos == 32 || look_for_assignment_pos == 37) {
              var look_for_assignment_column = 0
            } else if (look_for_assignment_pos == 2 || look_for_assignment_pos == 8 || look_for_assignment_pos == 14 || look_for_assignment_pos == 20 || look_for_assignment_pos == 26 || look_for_assignment_pos == 33 || look_for_assignment_pos == 38) {
              var look_for_assignment_column = 1
            } else if (look_for_assignment_pos == 3 || look_for_assignment_pos == 9 || look_for_assignment_pos == 15 || look_for_assignment_pos == 21 || look_for_assignment_pos == 27 || look_for_assignment_pos == 34 || look_for_assignment_pos == 39) {
              var look_for_assignment_column = 2
            } else if (look_for_assignment_pos == 4 || look_for_assignment_pos == 10 || look_for_assignment_pos == 16 || look_for_assignment_pos == 22 || look_for_assignment_pos == 28 || look_for_assignment_pos == 35 || look_for_assignment_pos == 40) {
              var look_for_assignment_column = 3
            } else if (look_for_assignment_pos == 5 || look_for_assignment_pos == 11 || look_for_assignment_pos == 17 || look_for_assignment_pos == 23 || look_for_assignment_pos == 29 || look_for_assignment_pos == 36 || look_for_assignment_pos == 41) {
              var look_for_assignment_column = 4
            }
            var repeat_name;
            for (let i = 0; i < Array.from(this.parentElement.children).length; i++)  {
              if (Array.from(this.parentElement.children)[i].innerHTML == this.innerHTML) {
                if (Array.from(this.parentElement.children)[i] == this) {
                  repeat_name = i
                }
              }
            }
            var check_for_duplicates = -1;
            for (let i = 0; i < Object.keys(all_assignments).length; i++) {
              if (all_assignments[i+1][6] == this.innerHTML && look_for_assignment_pos == all_assignments[i+1][7] && date_array[look_for_assignment_column][1] == all_assignments[i+1][2])  {
                check_for_duplicates++
                if (repeat_name == check_for_duplicates)  {
                this_box.remove()
                delete all_assignments[i+1] 
                for (let a = 1; a < Object.keys(all_assignments).length+1; a++) {
                  if (a > i) {
                    all_assignments[a] = all_assignments[a+1];
                    delete all_assignments[a+1];
                  }
                }
                }
              }
            chrome.storage.local.set({'ASSIGNEMNTSSTORAGES': all_assignments}).then(() => {});
            let delete_assigment = document.getElementsByClassName("new-pop-up-assignment");
            for (let i = 0; i < delete_assigment.length; i++) {
              delete_assigment[i].remove();
            }
            delete_assigment = Array.from(document.getElementsByClassName("new-assignment-overlay"));
            if (delete_assigment.length != 0) {
              delete_assigment[0].remove();
            }
          }
        })
          var close_new_assignment = create_element(
            element_types[7],
            selectors[1],
            "assignment-pop-up-button",
            "\u00d7",
            create_new_assignment 
          );
          var determine_height = document.getElementsByClassName("new-pop-up-assignment")[0].offsetHeight
          close_new_assignment.style.transform = "translate(250px,-"+String(determine_height-15)+"px)"
          close_new_assignment.addEventListener('click', () => {
            let delete_assigment = document.getElementsByClassName("new-pop-up-assignment");
            for (let i = 0; i < delete_assigment.length; i++) {
              delete_assigment[i].remove();
            }
            delete_assigment = document.getElementsByClassName(
              "new-assignment-overlay"
            );
            delete_assigment[0].remove();
          })
        })
      }
    }
  }
  let all_assignments =  {}
  chrome.storage.local.get(["ASSIGNEMNTSSTORAGES"]).then((result) => { 
    if (result.ASSIGNEMNTSSTORAGES != ud) {
      all_assignments = result.ASSIGNEMNTSSTORAGES
      updateAp()
    }
  })
  
  assignmentFrontArrow.addEventListener("click", () => {
    current_date = new Date(current_date.getTime() + 7 * 24 * 60 * 60 * 1000)
    dates(current_date)  
    dat_month = current_date.getMonth()
    dat_year = current_date.getFullYear()
    assignmentDaysMon.innerHTML = "Monday \n" + date_array[0][1];
    assignmentDaysTue.innerHTML = "Tuesday \n" + date_array[1][1];
    assignmentDaysWed.innerHTML = "Wednesday \n" + date_array[2][1];
    assignmentDaysThu.innerHTML = "Thursday \n" + date_array[3][1];
    assignmentDaysFri.innerHTML = "Friday \n" + date_array[4][1];
    let delete_assignment_boxes = Array.from(document.getElementsByClassName("create_new_assignment_box"))
    for (let i = 0; i < delete_assignment_boxes.length; i++) {
      delete_assignment_boxes[i].remove()
    }
    updateAp()
  });

  assignmentBackArrow.addEventListener("click", () => {
    current_date = new Date(current_date.getTime() - 7 * 24 * 60 * 60 * 1000)
    dates(current_date)  
    dat_month = current_date.getMonth()
    dat_year = current_date.getFullYear()
    assignmentDaysMon.innerHTML = "Monday \n" + date_array[0][1];
    assignmentDaysTue.innerHTML = "Tuesday \n" + date_array[1][1];
    assignmentDaysWed.innerHTML = "Wednesday \n" + date_array[2][1];
    assignmentDaysThu.innerHTML = "Thursday \n" + date_array[3][1];
    assignmentDaysFri.innerHTML = "Friday \n" + date_array[4][1];
    let delete_assignment_boxes = Array.from(document.getElementsByClassName("create_new_assignment_box"))
    for (let i = 0; i < delete_assignment_boxes.length; i++) {
      delete_assignment_boxes[i].remove()
    }
    updateAp()
  });

  const create_new_box = function () {
    var assignments_array = document.getElementsByClassName("new-assignment");
    if (assignments_array.length != 0) {
      for (let i = 0; i < assignments_array.length; i++) {
        assignments_array[i].remove();
      }
    } else {
      var create_new_assignment_overlay = create_element(
        element_types[1],
        selectors[1],
        "new-assignment-overlay",
        ud,
        calenderScreenVar
      );
      create_new_assignment_overlay.addEventListener("click", () => {
        let delete_assigment =
          document.getElementsByClassName("new-assignment");
        for (let i = 0; i < delete_assigment.length; i++) {
          delete_assigment[i].remove();
        }
        delete_assigment = document.getElementsByClassName(
          "new-assignment-overlay"
        );
        delete_assigment[0].remove();
      });
      var create_new_assignment = create_element(
        element_types[1],
        selectors[1],
        "new-assignment",
        ud,
        calenderScreenVar
      );
      var create_new_assignment_title = create_element(
        element_types[2],
        selectors[0],
        "create_new_assignment_title",
        ud,
        create_new_assignment
      );
      create_new_assignment_title.type = "text";
      create_new_assignment_title.placeholder = "Add Title Here!";
      var create_new_assignment_description = create_element(
        element_types[2],
        selectors[0],
        "create_new_assignment_description",
        ud,
        create_new_assignment
      );
      create_new_assignment_description.type = "text";
      create_new_assignment_description.placeholder = "Add Description Here!";
      var create_new_assignment_button_div = create_element(
        element_types[1],
        selectors[0],
        "create_new_assignment_button_div",
        ud,
        create_new_assignment
      );

      var create_new_assignment_button = create_element(
        element_types[7],
        selectors[0],
        "create_new_assignment_button",
        "Add",
        create_new_assignment_button_div
      );

      create_new_assignment_button.addEventListener("click", () => {
        if (create_new_assignment_title.value.replace(/\s/g, "").length) {
          var create_new_assignment_box = create_element(
            element_types[1],
            selectors[1],
            "create_new_assignment_box",
            create_new_assignment_title.value,
            this
          );
          let assignment_row, assignment_column;
          let assignment_index =  Array.from(this.parentNode.children).indexOf(this)
  
          if (0 <= assignment_index && assignment_index < 6) {
            assignment_row = 1
          } else if (6 <= assignment_index && assignment_index < 12) {
            assignment_row = 2
          } else if (12 <= assignment_index && assignment_index < 18) {
            assignment_row = 3
          } else if (18 <= assignment_index && assignment_index < 24) {
            assignment_row = 4
          } else if (24 <= assignment_index && assignment_index < 30) {
            assignment_row = 5
          } else if (30 <= assignment_index && assignment_index < 36) {
            assignment_row = 6
          } else if (36 <= assignment_index && assignment_index < 42) {
            assignment_row = 7
          }


          if (assignment_index == 1 || assignment_index == 7 || assignment_index == 13 || assignment_index == 19 || assignment_index == 25 || assignment_index == 32 || assignment_index == 37) {
            assignment_column = 1
          } else if (assignment_index == 2 || assignment_index == 8 || assignment_index == 14 || assignment_index == 20 || assignment_index == 26 || assignment_index == 33 || assignment_index == 38) {
            assignment_column = 2
          } else if (assignment_index == 3 || assignment_index == 9 || assignment_index == 15 || assignment_index == 21 || assignment_index == 27 || assignment_index == 34 || assignment_index == 39) {
            assignment_column = 3
          } else if (assignment_index == 4 || assignment_index == 10 || assignment_index == 16 || assignment_index == 22 || assignment_index == 28 || assignment_index == 35 || assignment_index == 40) {
            assignment_column = 4
          } else if (assignment_index == 5 || assignment_index == 11 || assignment_index == 17 || assignment_index == 23 || assignment_index == 29 || assignment_index == 36 || assignment_index == 41) {
            assignment_column = 5
          }

          all_assignments[Object.keys(all_assignments).length + 1] = [create_new_assignment_description.value, date_array[assignment_column-1][0], date_array[assignment_column-1][1], date_array[assignment_column-1][2], assignment_row, assignment_column, create_new_assignment_title.value, assignment_index]
          chrome.storage.local.set({'ASSIGNEMNTSSTORAGES': all_assignments}).then(() => {});
          let delete_assigment = document.getElementsByClassName("new-assignment");
          for (let i = 0; i < delete_assigment.length; i++) {
            delete_assigment[i].remove();
          }
          delete_assigment = document.getElementsByClassName(
            "new-assignment-overlay"
          );
          delete_assigment[0].remove();
          }
          create_new_assignment_box.addEventListener('click', function(stop_others) {
            stop_others.stopPropagation();
            var this_box = this
            var create_new_assignment_overlay = create_element(
              element_types[1],
              selectors[1],
              "new-assignment-overlay",
              ud,
              calenderScreenVar
            );
            var create_new_assignment = create_element(
              element_types[1],
              selectors[1],
              "new-pop-up-assignment",
              ud,
              calenderScreenVar
            );
            var new_assignment_label = create_element(
              element_types[11],
              selectors[1],
              "assignment-pop-up-label",
              this.innerHTML,
              create_new_assignment 
            );
            
            var look_for_assignment = Array.from(document.getElementsByClassName("create_new_assignment_box"));
            var look_for_assignment_parent = this.parentElement;
            var look_for_assignment_pos = Array.from(look_for_assignment_parent.parentElement.children).indexOf(look_for_assignment_parent)
            if (look_for_assignment_pos == 1 || look_for_assignment_pos == 7 || look_for_assignment_pos == 13 || look_for_assignment_pos == 19 || look_for_assignment_pos == 25 || look_for_assignment_pos == 32 || look_for_assignment_pos == 37) {
              var look_for_assignment_column = 0
            } else if (look_for_assignment_pos == 2 || look_for_assignment_pos == 8 || look_for_assignment_pos == 14 || look_for_assignment_pos == 20 || look_for_assignment_pos == 26 || look_for_assignment_pos == 33 || look_for_assignment_pos == 38) {
              var look_for_assignment_column = 1
            } else if (look_for_assignment_pos == 3 || look_for_assignment_pos == 9 || look_for_assignment_pos == 15 || look_for_assignment_pos == 21 || look_for_assignment_pos == 27 || look_for_assignment_pos == 34 || look_for_assignment_pos == 39) {
              var look_for_assignment_column = 2
            } else if (look_for_assignment_pos == 4 || look_for_assignment_pos == 10 || look_for_assignment_pos == 16 || look_for_assignment_pos == 22 || look_for_assignment_pos == 28 || look_for_assignment_pos == 35 || look_for_assignment_pos == 40) {
              var look_for_assignment_column = 3
            } else if (look_for_assignment_pos == 5 || look_for_assignment_pos == 11 || look_for_assignment_pos == 17 || look_for_assignment_pos == 23 || look_for_assignment_pos == 29 || look_for_assignment_pos == 36 || look_for_assignment_pos == 41) {
              var look_for_assignment_column = 4
            }
            var look_for_assignment_description;
            var repeat_name;
            for (let i = 0; i < Array.from(this.parentElement.children).length; i++)  {
              if (Array.from(this.parentElement.children)[i].innerHTML == this.innerHTML) {
                if (Array.from(this.parentElement.children)[i] == this) {
                  repeat_name = i
                }
              }
            }
            var check_for_duplicates = -1;
            for (let i = 0; i < Object.keys(all_assignments).length; i++) {
              if (all_assignments[i+1][6] == this.innerHTML && look_for_assignment_pos == all_assignments[i+1][7] && date_array[look_for_assignment_column][1] == all_assignments[i+1][2])  {
                check_for_duplicates++ 
                if (repeat_name == check_for_duplicates) {
                  look_for_assignment_description = all_assignments[i+1][0]
                  break
                }
              }
            }
            var lb = create_element(element_types[1], selectors[0], "lineBreakAssigment", ud, create_new_assignment );
            var new_assignment_description = create_element(
              element_types[11],
              selectors[1],
              "assignment-pop-up-description",
              look_for_assignment_description,
              create_new_assignment 
            );
            var delete_new_assignment = create_element(
              element_types[7],
              selectors[1],
              "assignment-pop-up-delete",
              "Delete",
              create_new_assignment 
            );
            delete_new_assignment.addEventListener('click', () => { 
              var look_for_assignment_parent = this_box.parentElement;
              var look_for_assignment_pos = Array.from(look_for_assignment_parent.parentElement.children).indexOf(look_for_assignment_parent)
              if (look_for_assignment_pos == 1 || look_for_assignment_pos == 7 || look_for_assignment_pos == 13 || look_for_assignment_pos == 19 || look_for_assignment_pos == 25 || look_for_assignment_pos == 32 || look_for_assignment_pos == 37) {
                var look_for_assignment_column = 0
              } else if (look_for_assignment_pos == 2 || look_for_assignment_pos == 8 || look_for_assignment_pos == 14 || look_for_assignment_pos == 20 || look_for_assignment_pos == 26 || look_for_assignment_pos == 33 || look_for_assignment_pos == 38) {
                var look_for_assignment_column = 1
              } else if (look_for_assignment_pos == 3 || look_for_assignment_pos == 9 || look_for_assignment_pos == 15 || look_for_assignment_pos == 21 || look_for_assignment_pos == 27 || look_for_assignment_pos == 34 || look_for_assignment_pos == 39) {
                var look_for_assignment_column = 2
              } else if (look_for_assignment_pos == 4 || look_for_assignment_pos == 10 || look_for_assignment_pos == 16 || look_for_assignment_pos == 22 || look_for_assignment_pos == 28 || look_for_assignment_pos == 35 || look_for_assignment_pos == 40) {
                var look_for_assignment_column = 3
              } else if (look_for_assignment_pos == 5 || look_for_assignment_pos == 11 || look_for_assignment_pos == 17 || look_for_assignment_pos == 23 || look_for_assignment_pos == 29 || look_for_assignment_pos == 36 || look_for_assignment_pos == 41) {
                var look_for_assignment_column = 4
              }
              var repeat_name;
              for (let i = 0; i < Array.from(this.parentElement.children).length; i++)  {
                if (Array.from(this.parentElement.children)[i].innerHTML == this.innerHTML) {
                  if (Array.from(this.parentElement.children)[i] == this) {
                    repeat_name = i
                  }
                }
              }
              var check_for_duplicates = -1;
              for (let i = 0; i < Object.keys(all_assignments).length; i++) {
                if (all_assignments[i+1][6] == this.innerHTML && look_for_assignment_pos == all_assignments[i+1][7] && date_array[look_for_assignment_column][1] == all_assignments[i+1][2])  {
                  check_for_duplicates++ 
                  if (repeat_name == check_for_duplicates) {
                    this_box.remove()
                    delete all_assignments[i+1] 
                    for (let a = 1; a < Object.keys(all_assignments).length+1; a++) {
                      if (a > i) {
                        all_assignments[a] = all_assignments[a+1];
                        delete all_assignments[a+1];
                      }
                    }
                  }
                }
              chrome.storage.local.set({'ASSIGNEMNTSSTORAGES': all_assignments}).then(() => {});
              let delete_assigment = document.getElementsByClassName("new-pop-up-assignment");
              for (let i = 0; i < delete_assigment.length; i++) {
                delete_assigment[i].remove();
              }
              delete_assigment = Array.from(document.getElementsByClassName("new-assignment-overlay"));
              if (delete_assigment.length != 0) {
                delete_assigment[0].remove();
              }
            }
          })
            var close_new_assignment = create_element(
              element_types[7],
              selectors[1],
              "assignment-pop-up-button",
              "\u00d7",
              create_new_assignment 
            );
            var determine_height = document.getElementsByClassName("new-pop-up-assignment")[0].offsetHeight
            close_new_assignment.style.transform = "translate(250px,-"+String(determine_height-15)+"px)"
            close_new_assignment.addEventListener('click', () => {
              let delete_assigment = document.getElementsByClassName("new-pop-up-assignment");
              for (let i = 0; i < delete_assigment.length; i++) {
                delete_assigment[i].remove();
              }
              delete_assigment = document.getElementsByClassName(
                "new-assignment-overlay"
              );
              delete_assigment[0].remove();
            })
          })
      });
      var create_new_assignment_button_two = create_element(
        element_types[7],
        selectors[0],
        "create_new_assignment_button_two",
        "Cancel",
        create_new_assignment_button_div
      );
      create_new_assignment_button_two.addEventListener("click", () => {
        let delete_assigment =
          document.getElementsByClassName("new-assignment");
        for (let i = 0; i < delete_assigment.length; i++) {
          delete_assigment[i].remove();
        }
        delete_assigment = document.getElementsByClassName(
          "new-assignment-overlay"
        );
        delete_assigment[0].remove();
      });
    }
  };

  for (let y = 0; y < 42; y++) {
    switch (y) {
      case 0:
        var assignmentCell = create_element(
          element_types[1],
          selectors[1],
          "assignmentCellSpecial",
          "English",
          assignmentCellDiv
        );
        break;
      case 6:
        var assignmentCell = create_element(
          element_types[1],
          selectors[1],
          "assignmentCellSpecial",
          "Science",
          assignmentCellDiv
        );
        break;
      case 12:
        var assignmentCell = create_element(
          element_types[1],
          selectors[1],
          "assignmentCellSpecial",
          "Math",
          assignmentCellDiv
        );
        break;
      case 18:
        var assignmentCell = create_element(
          element_types[1],
          selectors[1],
          "assignmentCellSpecial",
          "History",
          assignmentCellDiv
        );
        break;
      case 24:
        var assignmentCell = create_element(
          element_types[1],
          selectors[1],
          "assignmentCellSpecial",
          "Language",
          assignmentCellDiv
        );
        break;
      case 30:
        var assignmentCell = create_element(
          element_types[1],
          selectors[1],
          "assignmentCellSpecial",
          "Electives",
          assignmentCellDiv
        );
        break;
      case 36:
        var assignmentCell = create_element(
          element_types[1],
          selectors[1],
          "assignmentCellSpecial",
          "Others",
          assignmentCellDiv
        );
        break;
      default:
        var assignmentCell = create_element(
          element_types[1],
          selectors[1],
          "assignmentCell",
          ud,
          assignmentCellDiv
        );
        assignmentCell.addEventListener("click", create_new_box);
        break;
    }
  }

  var saveList = [];
  var checkList = [];

  chrome.storage.local.get(["saveList"]).then((result) => {
    if (result.saveList != ud) {
      saveList = result.saveList;
      for (var z = 0; z < saveList.length; z++) {
        var newListItem = create_element(
          element_types[9],
          selectors[1],
          "listItem",
          ud,
          toDoList
        );
        newListItem.innerHTML = saveList[z];
        var span = create_element(
          element_types[12],
          selectors[1],
          "close",
          ud,
          newListItem
        );
        span.innerHTML = "\u00d7";
        newListItem.setAttribute("draggable","true")
        newListItem.classList.add("draggable")
      }
    }
  });
  chrome.storage.local.get(["checkList"]).then((result) => {
    if (result.checkList != ud) {
      checkList = result.checkList;
      for (var z = 0; z < checkList.length; z++) {
        toDoList.children[checkList[z]].classList.add("checked");
      }
    }
  });

  var toDoListSecondFunction = function () {
    if (toDoInput.value.replace(/\s/g, "").length) {
      var newListItem = create_element(
        element_types[9],
        selectors[1],
        "listItem",
        ud,
        toDoList
      );
      newListItem.innerHTML = toDoInput.value;
      newListItem.setAttribute("draggable","true")
      newListItem.classList.add("draggable")
      saveList.push(toDoInput.value);
      toDoInput.value = "";
      var span = create_element(
        element_types[12],
        selectors[1],
        "close",
        ud,
        newListItem
      );
      span.innerHTML = "\u00d7";
      chrome.storage.local.set({ saveList: saveList }).then(() => {});
      if (vpdmi.checked != true) {
        roots.style.setProperty("--TODOBUTTON", "#f2f2f2");
      } else {
        roots.style.setProperty("--TODOBUTTON", "rgb(50, 50, 50)");
      }
    }
  };

  toDoButton.onclick = function () {
    toDoListSecondFunction();
  };

  toDoList.onclick = function (e) {
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("checked");
      if (e.target.className === "listItem draggable checked") {
        checkList.push(
          Array.from(e.target.parentNode.children).indexOf(e.target)
        );
      } else {
        checkList.splice(
          checkList.indexOf(
            Array.from(e.target.parentNode.children).indexOf(e.target)
          ),
          1
        );
      }
      chrome.storage.local.set({ 'checkList': checkList }).then(() => {});
    } else if (e.target.tagName === "SPAN") {
      checkList = [];
      saveCheckAmount = e.target.parentNode.parentNode.children.length;
      var saveChildrenAmount = e.target.parentNode.parentNode.children;
      e.target.parentElement.remove();
      for (var x = 0; x < saveCheckAmount - 1; x++) {
        if (saveChildrenAmount[x].className === "listItem draggable checked") {
          checkList.push(
            Array.from(saveChildrenAmount).indexOf(saveChildrenAmount[x])
          );
        }
      }
      e.target.parentElement.remove();
      chrome.storage.local.set({ 'checkList': checkList }).then(() => {});
      var indexNum = saveList.indexOf(
        e.target.parentElement.innerHTML.replace(
          '<span class="close">×</span>',
          ""
        )
      );
      saveList.splice(indexNum, 1);
      chrome.storage.local.set({ saveList: saveList }).then(() => {});
    }
  };

  toDoInput.addEventListener("input", function () {
    if (toDoInput.value.replace(/\s/g, "").length) {
      if (vpdmi.checked != true) {
        roots.style.setProperty("--TODOBUTTON", "rgb(220, 220, 220)");
      } else {
        roots.style.setProperty("--TODOBUTTON", "rgb(40, 40, 40)");
      }
    } else {
      if (vpdmi.checked != true) {
        roots.style.setProperty("--TODOBUTTON", "#f2f2f2");
      } else {
        roots.style.setProperty("--TODOBUTTON", "rgb(50, 50, 50)");
      }
    }
  });
} else {
  //storage name, root, and default
  const chromeless_roots = {
    0: ["bodyTextColor", "--BODYTEXTCOLOR", "white"],
    1: ["bodyColor", "--BACKGROUNDCOLOR", "white"],
    2: ["buttonTextChange", "--SCREENBUTTONCOLOR", "white"],
    3: ["navColor", "--NAVAGATIONBARCOLOR", "white"],
    4: [
      "font",
      "--FONT",
      '-apple-system, system-ui, Ubuntu, Roboto, "Open Sans", "Segoe UI", "Helvetica Neue"',
    ],
  };
  const chromeless_function = function (
    chromless_stored,
    chromeless_root,
    chromless_defualt
  ) {
    chrome.storage.local.get(chromless_stored).then((result) => {
      if (result[chromless_stored] != ud) {
        roots.style.setProperty(chromeless_root, result[chromless_stored]);
      } else {
        chrome.storage.local
          .set({ [chromeless_root]: chromless_defualt })
          .then(() => {});
      }
    });
  };
  for (let i = 0; i < Object.keys(chromeless_roots).length; i++) {
    chromeless_function(
      chromeless_roots[i][0],
      chromeless_roots[i][1],
      chromeless_roots[i][2]
    );
  }
}
//target styles that have the !important tag
window.addEventListener("load", (event) => {
  //class lists
  const target_object = {
    0: [
      "DirectoryEntrySearchForm_SelectFilter",
      "color: var(--BODYTEXTCOLOR) !important",
    ],
    1: [
      "fc-day-header",
      "background-color: var(--NAVAGATIONBARCOLOR) !important",
    ],
    2: ["fc-time", "color: var(--BODYTEXTCOLOR) !important"],
    3: ["count", "color: var(--TEXTCOLOR) !important"],
  };
  const target_important = function (target_class, target_style) {
    if (target_class != ud) {
      for (let i = 0; i < target_class.length; i++) {
        target_class[i].setAttribute("style", target_style);
      }
    }
  };
  for (let i = 0; i < Object.keys(target_object).length; i++) {
    target_important(
      document.getElementsByClassName(target_object[i][0]),
      target_object[i][1]
    );
  }
  chrome.storage.local.get(["colorCoded"]).then((result) => {
    if (result.colorCoded != ud) {
      if (document.getElementById("color-coded-input") != ud) {
        document.getElementById("color-coded-input").checked = result.colorCoded
        color_coded_function()
      }
    }
  })
})
