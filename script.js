//ცვლადების აღწერა

let mainWrapperDiv = document.getElementById("wrapper-posts");
let overlay = document.getElementById("overlay");
let content = document.getElementById("content");
let closeIcon = document.getElementById("close");

//მთავარი ფუნქცია

function postsAjax(url, callback) {
  let requestPost = new XMLHttpRequest();
  requestPost.open("GET", url);

  requestPost.addEventListener("load", function () {
    // let response = requestPost.responseText;
    // let responseData = JSON.parse(response);

    let data = JSON.parse(requestPost.responseText);
    // console.log(data);

    callback(data);
  });
  requestPost.send();
}

//მთავარი ფუნქციის გამოძახება

postsAjax("https://jsonplaceholder.typicode.com/posts", function (data) {
  data.forEach((element) => {
    //   console.log(element);

    createPostDiv(element); //calback - იძახებ ზემოთ

    // ვიძახებ თითოეული ობიექტისთვის ფუქციას, პარამეტრად გადავცემ ობიექტს
  });
});

//ასი პოსტის შესაქმნელი ფუნქცია

function createPostDiv(item) {
  let divWrapper = document.createElement("div");
  divWrapper.classList.add("posts");
  divWrapper.setAttribute("data-id", `${item.id}`);

  let h4Element = document.createElement("h4");
  h4Element.innerText = `${item.id}`;

  let h2Element = document.createElement("h2");
  h2Element.innerText = `${item.title}`;

  divWrapper.appendChild(h4Element);
  divWrapper.appendChild(h2Element);

  //დატა ატრიბუტის ამოღება და ცვლადში შენახვა- დივის ქლიქ ივენთი

  divWrapper.addEventListener("click", function (event) {
    console.log(event.target);
    let divId = event.target.getAttribute("data-id");
    console.log(divId);

    overlay.classList.add("overlayActive");
    let newUrl = `https://jsonplaceholder.typicode.com/posts/${divId}`;

    // მთავარი ფუნქციის გამოძახება ახალი url მისამართით

    postsAjax(newUrl, function (newData) {
      console.log(newData);
      overlayDescription(newData);
    });
    console.log(newUrl);
  });

  mainWrapperDiv.appendChild(divWrapper);

  console.log(mainWrapperDiv);
}

//კონტენტის დამატება
function overlayDescription(x) {
  let description = document.createElement("p");
  description.innerText = `${x.body}`;
  content.appendChild(description);
}

//პოპაპის დახურვა

closeIcon.addEventListener("click", function () {
  overlay.classList.remove("overlayActive");
  content.innerHTML = " ";
});
