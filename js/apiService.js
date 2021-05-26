class ApiService {

    constructor(){}
   
    //***************** GET BY ID *********************
    getById(id,successCallBack){
        $.ajax({
            url: AJAX_BODY.GET_POSTS_BY_ID.URL + id,
            global: false,
            type: AJAX_BODY.GET_POSTS_BY_ID.TYPE,       
            success:successCallBack
          });
    }


    //*************** DELETE BY ID **********************
    deleteById(id,successCallBack){
        $.ajax({
            url: AJAX_BODY.DELETE_POST.URL + id,
            type: AJAX_BODY.DELETE_POST.TYPE,       
            success:successCallBack
          });
    }

    //*************** UPDATE BY ID **********************
    updateById(id,data,successCallBack){
        $.ajax({
            url: AJAX_BODY.EDIT_POST.URL + id,
            type: AJAX_BODY.EDIT_POST.TYPE,
            data: data,        
            success:successCallBack
          });
    }

    //*************** SAVE DATA **********************
    postData(data,successCallBack){
        $.ajax({
            url: AJAX_BODY.SAVE_POSTS.URL,
            type: AJAX_BODY.SAVE_POSTS.TYPE,
            data: data,        
            success:successCallBack
          });
    }


    //*************** GET ALL DATA **********************
    getAllData(successCallBack){
        $.ajax({
            url: AJAX_BODY.GET_ALL_POSTS.URL,
            type: AJAX_BODY.GET_ALL_POSTS.TYPE,        
            success:successCallBack
          });
    }
}

