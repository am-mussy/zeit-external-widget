define([], function () {
  return {
    onSave: function () {
      console.log("external on save");
    },
    settings: (self) => {
      let subdomain = "amotestredbox";
      let link = "https://amotestredbox.amocrm.ru/api/v2/pipelines";

      // let salesFunnelsTest = await fetch(link);
      // console.log(salesFunnelsTest.json);

      let response = fetch(link);

      if (response.ok) {
        // если HTTP-статус в диапазоне 200-299
        // получаем тело ответа (см. про этот метод ниже)
        let json = response.json();
        console.log(json);
      } else {
        console.log("Ошибка HTTP: " + response.status);
      }
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
          id: "00003",
        },
        {
          name: "Холодный прозвон",
          id: "00004",
        },
      ];

      for (let i of salesFunnels) {
        var data = self.render(
          { ref: "/tmpl/controls/checkbox.twig" },
          {
            text: i.name,
            note_text: i.id,
            value: "value",
            text_class_name: "text_class_name",
            input_class_name: "mm_chk_" + i.id,
            id: "mm_chk_" + i.id,
            checked: false,
            small: true,
          }
        );

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
