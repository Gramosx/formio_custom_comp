import { Components, Templates } from "formiojs";
import Component from "formiojs/components/_classes/component/Component";
import { mainFunc } from "../../App";

export default class ToggleButton extends Component {
  static schema(...extend) {
    return Component.schema({
      type: "toggleBtn",
      lable: "Toggle Button",
      key: "toggleBtnKey",
      customData: false
    });
  }

  static get builderInfo() {
    return {
      title: "Toggle Button Comp",
      icon: "home",
      group: "basic",
      weight: 0,
      schema: ToggleButton.schema()
    };
  }

  // constructor(component, options, data) {
  //   super(component, options, data);
  // }

  get inputInfo() {
    const info = super.elementInfo();
    info.type = "button";
    info.ref = this.refKey();
    info.changeEvent = "click";
    info.attr.type = this.component.inputType || "button";
    info.attr.class = "toggle-button-custom toggle-button-custom-inactive";
    if (this.component.name) {
      info.attr.name = `data[${this.component.name}]`;
    }
    info.attr.value = this.component.value ? this.component.value : 0;
    info.label = this.t(this.component.label, { _userInput: true });
    info.labelClass = this.labelClass;
    return info;
  }

  render(context) {
    return super.render(
      this.renderTemplate("mytemplate", {
        input: this.inputInfo,
        checked: this.checked,
        tooltip: this.interpolate(this.t(this.component.tooltip) || "", {
          _userInput: true
        }).replace(/(?:\r\n|\r|\n)/g, "<br />")
      })
    );
  }

  attach(element) {
    var inputId = this.refKey();
    let elementRef = { [inputId]: "single" };
    this.loadRefs(element, elementRef);

    // this.addEventListener(this.refs[inputId], "click", () => {
    //   this.setValue(!this.refs[inputId].value);
    //   console.log(this.refs[inputId].value);
    //   // this.component.customData = !this.component.customData;
    //   // this.emit("componentChange", this);
    // });
    // return super.attach(element);

    this.input = this.refs[inputId];
    // console.log({ input: this.input });

    if (this.refs[inputId]) {
      this.addEventListener(this.input, this.inputInfo.changeEvent, () => {
        console.log("VAl");

        this.setRootOutputSchemaValue("gram");
        this.setValue(!this.getValue());
      });
      this.addShortcut(this.input);
    }
    return super.attach(element);
  }

  setRootOutputSchemaValue(value) {
    // Get the parent form using this.root.
    const form = this.root;
    this.data.actions = mainFunc(this.data.liquidjs);
    console.log("test", this.data.actions);
    // WORKING
    // this.data.testing1 = "gram";

    // Update the base root level output schema with the new value.
    form.submission = form.submission || {};
    form.submission.data = form.submission.data || {};
    form.submission.data.myRootOutputValue = value;

    // Trigger a form change event to update the output JSON schema (real-time schema update).
    form.emit("change", form.schema);
  }

  refKey() {
    return `${this.component.id}-${this.component.key}`;
  }

  get key() {
    return this.component.name ? this.component.name : super.key;
  }

  get checked() {
    if (this.component.name) {
      return this.dataValue === this.component.value;
    }
    return !!this.dataValue;
  }

  getValue() {
    const value = super.getValue();
    if (this.component.name) {
      return value
        ? this.setCheckedState(value)
        : this.setCheckedState(this.dataValue);
    } else {
      return value === "" ? this.dataValue : !!value;
    }
  }

  setValue(value, flags = {}) {
    if (
      this.setCheckedState(value) !== undefined ||
      (!this.input &&
        value !== undefined &&
        (this.visible ||
          this.conditionallyVisible() ||
          !this.component.clearOnHide))
    ) {
      const changed = this.updateValue(value, flags);
      if (this.isHtmlRenderMode() && flags && flags.fromSubmission && changed) {
        this.redraw();
      }
      return changed;
    }
    return false;
  }

  setCheckedState(value) {
    if (!this.input) {
      return;
    }
    if (this.component.name) {
      this.input.value =
        value === this.component.value ? this.component.value : 0;
      this.input.checked = value === this.component.value ? 1 : 0;
    } else if (value === "on") {
      this.input.value = 1;
      this.input.checked = 1;
    } else if (value === "off") {
      this.input.value = 0;
      this.input.checked = 0;
    } else if (value) {
      this.input.value = 1;
      this.input.checked = 1;
    } else {
      this.input.value = 0;
      this.input.checked = 0;
    }
    if (this.input.checked) {
      this.input.setAttribute("checked", true);
      this.removeClass(this.input, "toggle-button-custom-inactive");
      this.addClass(this.input, "toggle-button-custom-active");
    } else {
      this.input.removeAttribute("checked");
      this.removeClass(this.input, "toggle-button-custom-active");
      this.addClass(this.input, "toggle-button-custom-inactive");
    }
    return value;
  }

  // updateValue(value, flags) {
  //   if (
  //     this.component.name &&
  //     flags.modified &&
  //     this.dataValue === this.component.value
  //   ) {
  //     this.input.checked = 0;
  //     this.input.value = 0;
  //     this.dataValue = "";
  //     this.updateOnChange(flags, true);
  //   }

  //   const changed = super.updateValue(value, flags);
  //   console.log({ changed });

  //   // Update attributes of the input element
  //   if (changed && this.input) {
  //     console.log("in");

  //     if (this.input.checked) {
  //       this.input.setAttribute("checked", "true");
  //     } else {
  //       this.input.removeAttribute("checked");
  //     }
  //   }

  //   return changed;
  // }
}

Components.addComponent("toggleButton", ToggleButton);
Templates.defaultTemplates["mytemplate"] = {
  form: (ctx) => {
    return `<div ref='${ctx.input.ref}' attr="${ctx.input.attr}" value=${ctx.input.attr.value} class="${ctx.input.attr.class}">
    ${ctx.input.label}
    </div>`;
  }
};
