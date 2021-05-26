const BASE_URL = "http://localhost:3000/";

class AJAX_BODY {

  static GET_POSTS_BY_ID = {
    URL: BASE_URL + "posts/",
    TYPE: "GET",
    DATATYPE: "Json",
  };

  static SAVE_POSTS = {
    URL: BASE_URL + "posts/",
    TYPE: "POST",
    DATATYPE: "Json",
  };

  static GET_ALL_POSTS = {
    URL: BASE_URL + "posts/",
    TYPE: "GET",
    DATATYPE: "Json",
  };

  static EDIT_POST = {
    URL: BASE_URL + "posts/",
    TYPE: "PUT",
    DATATYPE: "Json",
  };

  static DELETE_POST = {
    URL: BASE_URL + "posts/",
    TYPE: "DELETE",
    DATATYPE: "Json",
  };
  
}
