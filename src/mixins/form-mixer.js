export const formMixer = {  
  methods: {
    updateFormStatus(obj){
      this.$store.dispatch("UPDATE_FORM", obj)
    },
    whichFormToUpdate(key, form, statusForm){
      if (statusForm.hasOwnProperty(key)) {
        let updateForm = form.filter(item => {
          return item.form_name == statusForm.form_name
        })            
        var keys = Object.keys(statusForm[key])
        keys.forEach(item => {
          updateForm[0].content.forEach(element => {
            if (item == element.name) {
              if (key == "plan") {
                if (element.name == "room_m2") {
                  element.model = this.defaultSep(statusForm[key][item])
                } else {
                  element.model = statusForm[key][item]
                }
              } else if (key == "unit") {
                if (element.name == "room_m2" || element.name == "price") {
                  element.model = this.defaultSep(statusForm[key][item])
                } else {
                  element.model = statusForm[key][item]
                }
              } else {
                element.model = statusForm[key][item]
              }            
            }
          });
        })
        return updateForm
      } else {
        form.forEach(item => {
          item.content.forEach(el => {
            if (el.name == "file" || el.name == "file") {
              el.model = null
            } else {
              el.model = ""
            }
          })
        })
        return form.filter(item => {
          return item.form_name == statusForm.form_name
        }) 
      }
    },
    removeFormData(dispatch, obj){
      this.$store.dispatch(dispatch, obj)
    }
  },
  data(){
    return {
      form: [
        {
          form_name: "new_project",
          title: "新規プロジェクト",
          dispatch: "CREATE_NEW_PROJECT",
          content: [
            {kind:"text", label:"プロジェクト名", name:"project_name", model:"", selects:[], holder:"入力", col:"12", span:"12"},
            {kind:"text", label: "プロジェクトPATH", name:"project_path", model:"", selects:[], holder:"入力", col:"12", span:"12"},
            {kind:"text", label:"住所", name:"address", model:"", selects:[], holder:"入力", col:"12", span:"12"},
            {kind:"text", label:"フロア", name:"floor", model:"", selects:[], holder:"入力", col:"12", span:"6"},
            {kind:"text", label:"フロアスパン", name:"wide_floor", model:"",  selects:[], holder:"入力", col:"12", span:"6"},
            {kind:"text", label:"会社名", name:"organization",  model:"", selects:[], holder:"入力", col:"12", span:""},
          ]
        },
        {
          form_name: "update_project",
          title: "プロジェクト更新",
          dispatch: "UPDATE_PROJECT_CONTENT",
          content: [
            {kind:"text", label:"プロジェクト名", name:"project_name", model:"", selects:[], col:"12", span:"12"},
            {kind:"text", label: "プロジェクトPATH", name:"project_path", model:"", selects:[], col:"12", span:"12"},
            {kind:"text", label:"住所", name:"address", model:"", selects:[], col:"12", span:"12"},
            {kind:"hidden", label:"フロア", name:"floor", model:"", selects:[], col:"12", span:"6"},
            {kind:"hidden", label:"フロアスパン", name:"wide_floor", model:"", selects:[], col:"12", span:"6"},
            {kind:"hidden", label:"会社名", name:"organization",  model:"", selects:[], col:"12", span:""},
          ]
        },
        {
          form_name: "update_project_avatar",
          title: "画像更新",
          dispatch: "UPDATE_PROJECT_AVATAR",
          content: [
            {kind:"file", label:"画像", name:"file", model:null, selects:[], col:"12", span:"12", hint:"700KB以下で jpg, png, bmp"},
          ]
        },
        {
          form_name: "update_slideshow",
          title: "画像更新/登録",
          dispatch: "NEW_PROJECT_SLIDESHOW",
          content: [
            {kind:"file", label:"画像", name:"file", model:null, selects:[], col:"12", span:"12", hint:"700KB以下で jpg, png, bmp"},
          ]
        },
        {
          form_name: "update_landplan",
          title: "画像更新/登録",
          dispatch: "NEW_PROJECT_LANDPLAN",
          content: [
            {kind:"file", label:"画像", name:"file", model:null, selects:[], col:"12", span:"12", hint:"700KB以下で SVG only"},
          ]
        },
        {
          form_name: "update_elevation",
          title: "画像更新/登録",
          dispatch: "NEW_PROJECT_ELEVATION",
          content: [
            {kind:"file", label:"画像", name:"file", model:null, selects:[], col:"12", span:"12", hint:"700KB以下で SVG only"},
          ]
        },
        {
          form_name: "update_floorplan",
          title: "画像更新/登録",
          dispatch: "NEW_PROJECT_FLOORPLAN",
          content: [
            {kind:"file", label:"画像", name:"file", model:null, selects:[], col:"12", span:"12", hint:"700KB以下で SVG only"},
          ]
        },
        {
          form_name: "crud_plan",
          title: "間取り登録/更新",
          dispatch: "NEW_OR_UPDATE_PROJECT_PLAN",
          delete: "DELETE_PROJECT_PLAN",
          content: [
            {kind:"select", label:"タイプ", name:"type", model:"", selects:['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'], holder:"", col:"12", span:"3"},
            {kind:"select", label: "メニュー", name:"menu", model:"", selects:['基本', 'MENU1', 'MENU2', 'MENU3'], holder:"", col:"12", span:"3"},
            {kind:"select", label:"間取り", name:"room_plan", model:"", selects:['2LDK', '3LDK'], holder:"", col:"12", span:"3"},
            {kind:"text", label:"専有面積", name:"room_m2", model:"", selects:[], holder:"例: 72.80", col:"12", span:"3"},
          ]
        },
        {
          form_name: "update_plan_image",
          title: "画像更新/登録",
          dispatch: "UPDATE_PROJECT_PLAN_IMAGE",
          content: [
            {kind:"file", label:"画像", name:"file", model:null, selects:[], col:"12", span:"12", hint:"700KB以下で SVG only"},
          ]
        },
        {
          form_name: "crud_vista",
          title: "眺望登録/更新",
          dispatch: "NEW_OR_UPDATE_PROJECT_VISTA",
          delete: "DELETE_PROJECT_VISTA",
          content: [
            {kind:"select", label:"眺望内容", name:"time", model:"", selects:['DAY','NIGHT'], holder:"", col:"12", span:"9"},
            {kind:"text", label:"フロア", name:"floor", model:"", selects:[], holder:"", col:"12", span:"3"},
          ]
        },
        {
          form_name: "update_vista_image",
          title: "画像登録/更新",
          dispatch: "UPDATE_PROJECT_VISTA_IMAGE",
          content: [
            {kind:"file", label:"画像", name:"file", model:null, selects:[], col:"12", span:"12", hint:"700KB以下で JPEG only"},
          ]
        },
        {
          form_name: "crud_coord",
          title: "地図マーカー",
          dispatch: "NEW_OR_UPDATE_PROJECT_COORD",
          delete: "DELETE_COORD",
          content: [
            {kind:"text", label:"場所", name:"place", model:"", selects:[], col:"12", span:"12"},
            {kind:"text", label: "ネーム", name:"name", model:"", selects:[], col:"12", span:"12"},
            {kind:"text", label:"住所", name:"address", model:"", selects:[], col:"12", span:"12"},
          ]
        }, 
        {
          form_name: "update_gallery_image",
          title: "画像登録/更新",
          dispatch: "NEW_PROJECT_GALLERY",
          content: [
            {kind:"file", label:"画像", name:"file", model:null, selects:[], col:"12", span:"12", hint:"700KB以下で JPEG only"},
          ]
        },     
        {
          form_name: "crud_doc",
          title: "PDFファイル",
          dispatch: "NEW_OR_UPDATE_PROJECT_DOCUMENT",
          delete: "DELETE_DOCUMENT",
          content: [
            {kind:"text", label:"ネーム", name:"name", model:"", selects:[], col:"12", span:"12"},
          ]
        },
        {
          form_name: "update_doc_pdf",
          title: "画像登録/更新",
          dispatch: "UPDATE_DOCUMENT_PDF",
          content: [
            {kind:"pdf", label:"PDF", name:"file", model:null, selects:[], col:"12", span:"12", hint:"4MB以下で PDF only"},
          ]
        }, 
        {
          form_name: "update_doc_image",
          title: "画像登録/更新",
          dispatch: "UPDATE_DOCUMENT_IMAGE",
          content: [
            {kind:"file", label:"画像", name:"file", model:null, selects:[], col:"12", span:"12", hint:"700KB以下で JPEG only"},
          ]
        },  
        {
          form_name: "crud_unit",
          title: "住戸表登録",
          dispatch: "UPDATE_PROJECT_UNIT",
          content: [
            {kind:"select", label:"共用部の場合", name:"sub_floor", model:"", selects:[{txt:'いいえ',val:false}, {txt:'はい',val:true}], holder:"", col:"12", span:"6"},
            {kind:"text", label:"共用部名称", name:"sub_floor_content", model:"", selects:[], holder:"エントランスホール", col:"12", span:"6", hint:"共用部の場合は'はい'の場合"},
            {kind:"select", label:"ステータス", name:"status", model:"", selects:['販売中', '商談中', '次期分譲', '成約済'], holder:"", col:"12", span:"6"},
            {kind:"text", label:"号室", name:"room_number", model:"", selects:[], holder:"例: 201", col:"12", span:"6"},
            {kind:"select", label:"タイプ", name:"type", model:"", selects:['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'], holder:"", col:"12", span:"6"},
            {kind:"select", label: "メニュー", name:"menu", model:"", selects:['基本', 'MENU1', 'MENU2', 'MENU3'], holder:"", col:"12", span:"6"},
            {kind:"select", label:"間取り", name:"room_plan", model:"", selects:['2LDK', '3LDK'], holder:"", col:"12", span:"4"},
            {kind:"text", label:"専有面積", name:"room_m2", model:"", selects:[], holder:"例: 72.80", col:"12", span:"4"},
            {kind:"text", label:"物件価格", name:"price", model:"", selects:[], holder:"例: 40,000,000", col:"12", span:"4"},
          ]
        },
      ] 
    }
  },
}