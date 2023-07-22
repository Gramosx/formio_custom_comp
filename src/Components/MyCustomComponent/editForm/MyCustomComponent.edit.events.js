const { Utils } = require("formiojs");

function getActions() {
  return [
    {
      label: "Action",
      widget: "html5",
      placeholder: "Select an action",
      tableView: true,
      data: {
        values: [
          {
            label: "Show Alert",
            value: "showAlert"
          },
          {
            label: "Excecute JS Function",
            value: "javascript"
          },
          {
            label: "Show Modal",
            value: "showModal"
          },
          {
            label: "Close Modal",
            value: "closeModal"
          },
          {
            label: "Navigate To",
            value: "navigateTo"
          },
          {
            label: "Store Value",
            value: "storeValue"
          }
        ]
      },
      key: "type",
      type: "select",
      input: true,
      clearOnHide: false
    },
    {
      type: "select",
      input: true,
      label: "Select Modal",
      key: "modal",
      dataSrc: "custom",
      valueProperty: "value",
      tableView: false,
      data: {
        custom(context) {
          return Utils.getContextComponents(context);
        }
      },
      customConditional({ row }) {
        return row.type === "showModal";
      },
      clearOnHide: false
    },
    {
      type: "textfield",
      key: "navigateUrl",
      label: "Enter a URL",
      placeholder: "http://www.google.com/",
      input: true,
      customConditional({ row }) {
        return row.type === "navigateTo";
      },
      clearOnHide: false
    },
    {
      type: "textfield",
      key: "alertMessage",
      label: "Message",
      placeholder: "Type a Alert Message !",
      input: true,
      customConditional({ row }) {
        return row.type === "showAlert";
      },
      clearOnHide: false
    },
    {
      weight: 10,
      type: "textarea",
      key: "javascript",
      rows: 5,
      editor: "ace",
      as: "javascript",
      input: true,
      tableView: false,
      placeholder: `Write a JS `,
      customConditional({ row }) {
        return row.type === "javascript";
      },
      clearOnHide: false
    },
    {
      type: "textfield",
      key: "storeKey",
      label: "Key",
      placeholder: "Key",
      input: true,
      customConditional({ row }) {
        return row.type === "storeValue";
      },
      clearOnHide: false
    },
    {
      type: "textfield",
      key: "storeValue",
      label: "value",
      placeholder: "Value",
      input: true,
      customConditional({ row }) {
        return row.type === "storeValue";
      },
      clearOnHide: false
    }
  ];
}
function getModules() {
  return [
    ...getActions(),
    // CallBacks
    {
      type: "panel",
      input: false,
      collapsible: "true",
      collapsed: true,
      label: "On Success",
      title: "On Success",
      clearOnHide: false,
      components: [
        {
          input: true,
          label: "Select an Action",
          key: "onSuccess",
          tableView: false,
          type: "container",
          clearOnHide: false,
          components: [...getActions()]
        }
      ]
    },
    {
      type: "panel",
      input: false,
      collapsible: "true",
      collapsed: true,
      label: "On Failure",
      title: "On Failure",
      clearOnHide: false,
      components: [
        {
          input: true,
          label: "Select an Action",
          key: "onFailure",
          tableView: false,
          type: "container",
          clearOnHide: false,
          components: [...getActions()]
        }
      ]
    }
  ];
}

function getComponent(parentKey) {
  return [
    {
      type: "toggleButton",
      label: "JS",
      key: "JS",
      // action: "custom",
      // custom: `
      // row.${parentKey}_enableJS = !row.${parentKey}_enableJS;
      // submission.data.${parentKey}_enableJS = row.${parentKey}_enableJS;`,
      // // customConditional: `show = !data.${parentKey}_enableJS;`,
      input: true,
      clearOnHide: false
    },
    // {
    //   type: "button",
    //   label: "JS",
    //   key: "toogleBtn1",
    //   action: "custom",
    //   customClass: "toggle-button-custom toggle-button-custom-inactive",
    //   custom: `
    //   row.${parentKey}_enableJS = !row.${parentKey}_enableJS;
    //   submission.data.${parentKey}_enableJS = row.${parentKey}_enableJS;
    //   instance.test()`,
    //   customConditional: `show = !data.${parentKey}_enableJS;`,
    //   input: true,
    //   clearOnHide: false
    // },
    // {
    //   type: "button",
    //   label: "JS",
    //   key: "toogleBtn",
    //   // action: "custom",
    //   // customClass: "toggle-button-custom toggle-button-custom-active ",
    //   // custom: `
    //   // row.${parentKey}_enableJS = !row.${parentKey}_enableJS;
    //   // submission.data.${parentKey}_enableJS = row.${parentKey}_enableJS;
    //   // `,
    //   // customConditional: `console.log('val',data.toggleButton);show = data.${parentKey}_enableJS;`,
    //   input: true,
    //   clearOnHide: false
    // },
    {
      weight: 10,
      type: "textarea",
      key: "liquidjs",
      rows: 5,
      editor: "ace",
      as: "javascript",
      customClass: "test",
      input: true,
      tableView: false,
      className: "my-custom-class",
      placeholder: `Write JS `,
      // customConditional({ row, form, instance, input }) {
      //   console.log({ row });

      //   // return row.toggleButton;
      //   return row[`${parentKey}_enableJS`];
      // },
      clearOnHide: false,
      conditional: {
        show: true,
        when: "JS",
        eq: "true",
        json: ""
      }
    },
    {
      input: true,
      label: "Actions",
      key: "actions",
      tableView: false,
      className: "my-custom-class m-2",
      templates: {
        header:
          '<div class="row"> \n  <div class="col-sm-6"><strong>{{ value.length }} {{ ctx.t("actions") }}</strong></div>\n</div>',
        row:
          '<div class="row"> \n  <div class="col-sm-6">\n    <div>{{ row.type }}</div>\n  </div>\n  <div class="col-sm-2"> \n    <div class="btn-group pull-right"> \n      <button class="btn btn-primary editRow">{{ ctx.t("Edit") }}</button> \n      <button class="btn btn-danger removeRow">{{ ctx.t("Delete") }}</button> \n    </div> \n  </div> \n</div>',
        footer: ""
      },
      type: "editgrid",
      addAnother: "Add Action",
      saveRow: "Save Action",
      components: getModules(parentKey),
      clearOnHide: false
    }
  ];
}

module.exports = [
  {
    title: "OnTextChanged",
    theme: "primary",
    collapsible: true,
    key: "ontextchanged",
    type: "panel",
    label: "Panel",
    input: true,
    tableView: false,
    customClass: "test",
    components: getComponent("ontextchanged")
  },
  {
    title: "OnClick",
    theme: "primary",
    collapsible: true,
    collapsed: true,
    key: "onclick",
    type: "panel",
    label: "Panel",
    input: true,
    customClass: "test",
    tableView: false,
    components: getComponent("onclick")
  }
];
// module.exports = [CustomDisplay];
