define([], function () {
  return {
    onSave: function () {
      console.log("external on save");
    },
    settings: (self) => {
      w_code = "test";

      var data = self.render(
        { ref: "/tmpl/controls/checkbox.twig" },
        {
          class_name: "subs_w",
          id: w_code + "_list",
          value: "value",
          text_class_name: "text_class_name",
          text: "text",
        },
        { ref: "/tmpl/controls/checkbox.twig" },
        {
          class_name: "subs_w",
          id: w_code + "_list",
          value: "value2",
          text_class_name: "text_class_name2",
          text: "text2",
        }
      );

      $(".widget_settings_block__descr").after(
        `
          <div class="widget_settings_block__item_field" id="users">
          <br>
          
          <p>ID Группы пользователей:</p>
          <input name="group" id="group" class="inputGroupID" type="number" placeholder="id group" />
          </div>
          `
      );
      $(".widget_settings_block__descr").after(data);
      $(".inputGroupID").val($("input[name = idgroup]").val());

      let inputGroupID;
      $(".inputGroupID").change(function () {
        console.log("change");
        inputGroupID = $(".inputGroupID").val();
        inputGroupID = Number.parseInt(inputGroupID);
        $("input[name = idgroup]").val(inputGroupID);
      });

      //$(".inputGroupID").val($("input[name = idgroup]").val());
      $('input[name="group"]').trigger("change");
    },
  };
});
