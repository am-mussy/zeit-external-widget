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
          text: "Воронка 1",
          note_text: "705426",
          value: "value",
          text_class_name: "text_class_name",
          input_class_name: "mm_chk_",
          id: "mm_chk_",
          checked: false,
          small: true,
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
