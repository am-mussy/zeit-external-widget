define([], function () {
  return {
    onSave: function () {
      console.log("external on save");
    },
    settings: (self) => {
      let salesFunnels = [
        {
          name: "Первичные продажи",
          id: "00001",
        },
        {
          name: "Повторные продажи",
          id: "00002",
        },
        {
          name: "Условный отказ",
          id: "00002",
        },
        {
          name: "Холодный прозвон",
          id: "00004",
        },
      ];

      w_code = "test";
      //note_text = "705426";
      var data = self.render(
        { ref: "/tmpl/controls/checkbox.twig" },
        {
          text: "Воронка 1",
          note_text: "705426",
          value: "value",
          text_class_name: "text_class_name",
          input_class_name: "mm_chk_" + note_text,
          id: "mm_chk_" + note_text,
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
