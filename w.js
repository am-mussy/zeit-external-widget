define([], function () {
  return {
    onSave: function () {
      console.log("external on save");
    },
    settings: async (self) => {
      let subdomain = "amotestredbox"; //Потом нужно будет либо выводить это в настройки, либо автоматом поцеплять через новую аутентификацию
      let link = `https://${subdomain}.amocrm.ru/api/v2/pipelines`;
      let salesFunnels;
      async function getSalesF(link) {
        let response = await fetch(link);
        if (response.ok) {
          let salesFunnels = await response.json();
          console.log(salesFunnels._embedded.items);
        } else {
          console.log("Ошибка HTTP: " + response.status);
        }

        return salesFunnels._embedded.items;
      }

      const pipelines = await getSalesF(link);

      for (let i of pipelines) {
        var data = self.render(
          { ref: "/tmpl/controls/checkbox.twig" },
          {
            // note_text: i.id,
            // text: i.name,
            // value: "value",
            // text_class_name: "text_class_name",
            // input_class_name: "mm_chk_" + i.id,
            // id: "mm_chk_" + i.id,
            // checked: false,
            // small: true,
          }
        );
        console.log(i);
        $(".widget_settings_block__descr").append("<br>" + data + "<br>");
      }

      // var data = self.render(
      //   { ref: "/tmpl/controls/checkbox.twig" },
      //   {
      //     text: "Воронка 1",
      //     note_text: note_text,
      //     value: "value",
      //     text_class_name: "text_class_name",
      //     input_class_name: "mm_chk_" + note_text,
      //     id: "mm_chk_" + note_text,
      //     checked: false,
      //     small: true,
      //   }
      // );

      $(".widget_settings_block__descr").after(
        `
          <div class="widget_settings_block__item_field" id="users">
          <br>
          
          <p>ID Группы пользователей:</p>
          <input name="group" id="group" class="inputGroupID" type="number" placeholder="id group" />
          </div>
          `
      );
      //$(".widget_settings_block__descr").after(data);
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
