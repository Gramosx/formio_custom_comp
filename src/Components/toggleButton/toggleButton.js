import Component from "formiojs/components/_classes/component/Component";
import componentEditForm from "formiojs/components/_classes/component/Component.form";
import Components from "formiojs/components/Components";

export default class ToggleButtonComponent extends Component {
  static schema(...extend) {
    return Component.schema(
      {
        label: "ToggleButton",
        key: "toggleButton",
        type: "toggleButton"
      },
      ...extend
    );
  }

  static get builderInfo() {
    return {
      title: "ToggleButton",
      group: "basic",
      icon: "toggle",
      weight: 120,
      schema: ToggleButtonComponent.schema()
    };
  }

  get defaultSchema() {
    return ToggleButtonComponent.schema();
  }

  get defaultValue() {
    return false;
  }
  getValue() {
    return this.dataValue;
  }

  get inputInfo() {
    const info = super.elementInfo();
    info.type = "input";
    info.attr.type = "text";
    return info;
  }

  render(container) {
    console.log("");
    return super.render(
      super.renderTemplate("button", {
        input: {
          type: "button",
          attr: {
            class: "btn toggle-button-custom"
          },
          content: " JS"
        }
      })
    );
  }

  attach(element) {
    this.loadRefs(element, {
      button: "single",
      buttonMessageContainer: "single",
      buttonMessage: "single"
    });

    const superAttach = super.attach(element);
    this.attachButton();

    this.addEventListener(element, "click", () => {
      this.getAction(this.component.onclick);
    });

    return superAttach;
  }

  onClick(event) {
    let btnActiveText = "JS";
    let btnActiveClass = "btn toggle-button-custom toggle-button-custom-active";
    let btnInactiveText = "JS-in";
    let btnInactiveClass =
      "btn toggle-button-custom toggle-button-custom-inactive";
    var target = event.target;
    if (target.tagName !== "BUTTON") {
      target = target.parentElement;
    }

    if (!this.dataValue) {
      target.className = btnInactiveClass;
      target.innerHTML = "";
      // target.appendChild(
      //   this.ce("i", { class: this.iconClass("chevron-left") })
      // );
      target.appendChild(this.text(btnInactiveText));
      // this.setValue(this.dataValue, true);
    } else {
      // this.dataValue = false;
      target.className = btnActiveClass;
      // target.appendChild(
      //   this.ce("i", { class: this.iconClass("chevron-left") })
      // );
      target.innerHTML = "";
      target.appendChild(this.text(btnActiveText));
      // this.setCustomValidity("customVariable", this.dataValue);
    }
    this.dataValue = !this.dataValue;
    this.setValue(this.dataValue);
    this.triggerChange();
    this.buttonLabel = this.dataValue ? "On" : "Off";
    console.log(this.compoment);

    // this.triggerChange("toggleButton", this.dataValue);
  }

  attachButton() {
    this.addEventListener(this.refs.button, "click", this.onClick.bind(this));
  }
}

// Use the table component edit form.
ToggleButtonComponent.editForm = componentEditForm;

// Register the component to the Formio.Components registry.
Components.addComponent("toggleButton1", ToggleButtonComponent);
