define([], function () {
  return {
    onSave: function () {
      console.log("external on save");
    },
    settings: async (self) => {
      let subdomain = "amotestredbox"; //Потом нужно будет либо выводить это в настройки, либо автоматом поцеплять через новую аутентификацию
      let linkPiplines = `https://${subdomain}.amocrm.ru/api/v2/pipelines`;
      let salesFunnels;
      async function getSalesF(linkPiplines) {
        let response = await fetch(linkPiplines);
        let salesFunnels = await response.json();
        salesFunnels = salesFunnels._embedded.items;
        return salesFunnels;
      }

      const pipelines = await getSalesF(linkPiplines);
      console.log(pipelines);

      for (const key in pipelines) {
        console.log(pipelines[key]);
        var data = self.render(
          { ref: "/tmpl/controls/checkbox.twig" },
          {
            note_text: pipelines[key].id,
            text: pipelines[key].name,
            value: "value",
            text_class_name: "text_class_name",
            input_class_name: "mm_chk_" + pipelines[key].id,
            id: "mm_chk_" + pipelines[key].id,
            checked: false,
            small: true,
          }
        );
        $(".widget_settings_block__descr").append("<br>" + data + "<br>");
      }

      let linkUsers = `https://${subdomain}.amocrm.ru/api/v2/account?with=users`;

      async function getUsers(linkUsers) {
        let response = await fetch(linkUsers);
        let Users = await response.json();
        Users = Users._embedded.users;
        return Users;
      }

      const users = await getUsers(linkUsers);

      for (const key in pipelines) {
        console.log(pipelines[key]);
        var data = self.render(
          { ref: "/tmpl/controls/checkbox.twig" },
          {
            note_text: pipelines[key].id,
            text: pipelines[key].name,
            value: "value",
            text_class_name: "text_class_name",
            input_class_name: "mm_chk_" + pipelines[key].id,
            id: "mm_chk_" + pipelines[key].id,
            checked: false,
            small: true,
          }
        );
        $(".widget_settings_block__descr").append("<br>" + data + "<br>");
      }

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
