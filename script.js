import data from "./data.js";
const userContainer = document.querySelector(".user-container");

document.querySelectorAll(".send-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    let value = document.querySelector("#new-comment");
    currentUserComment(value.value, "just now");
    value.value = ''

    plusBtn();
    minusBtn();
    delComm();
    edit();
  });
});
data.comments.map((v) => {
  const comment = `
          <div class="user">
            <div class="comment_div">
              <div class="desktop-votes">
                <span class="plus cursor-pointer">
                  <img src="images/icon-plus.svg" alt="" />
                </span>
                <span class="vote-num"> ${v.score} </span>
                <span class="minus cursor-pointer">
                  <img src="images/icon-minus.svg" alt="" />
                </span>
              </div>
              <div>
                <div class="profile-div">
                  <div>
                    <span class="user-pic">
                      <img src=${v.user.image.png} alt="" />
                    </span>
                    <span class="user-name"> ${v.user.username} </span>
                    <span class="post-date"> ${v.createdAt} </span>
                  </div>
                  <div class="desktop-reply-btn cursor-pointer">
                    <span>
                      <img src="images/icon-reply.svg" alt="" />
                      Reply
                    </span>
                  </div>
                </div>
                <div class="user-comment">
                  <p>
                    ${v.content}
                  </p>
                </div>
                <div class="mobile-stats">
                  <div class="mobile-votes">
                    <span class="plus cursor-pointer">
                      <img src="images/icon-plus.svg" alt="" />
                    </span>
                    <span class="vote-num"> ${v.score} </span>
                    <span class="minus cursor-pointer">
                      <img src="images/icon-minus.svg" alt="" />
                    </span>
                  </div>
                  <span class="mobile-reply-btn cursor-pointer">
                    <img src="images/icon-reply.svg" alt="" /> Reply</span
                  >
                </div>
              </div>
            </div>

            ${v.replies
              .map((rep) => {
                return `
                <div class="comment_div reply">
            <div class="desktop-votes">
              <span class="plus cursor-pointer">
                <img src="images/icon-plus.svg" alt="" />
              </span>
              <span class="vote-num"> ${rep.score} </span>
              <span class="minus cursor-pointer">
                <img src="images/icon-minus.svg" alt="" />
              </span>
            </div>
            <div>
              <div class="profile-div">
                <div>
                  <span class="user-pic">
                    <img src=${rep.user.image.png} alt="" />
                  </span>
                  <span class="user-name"> ${rep.user.username} </span>
                  <span class="you ${
                    rep.user.username == "juliusomo" ? "" : "none"
                  }">you</span>
                  <span class="post-date"> ${rep.createdAt} </span>
                </div>
                <div class="del-update ${
                  rep.user.username == "juliusomo" ? "" : "none"
                }">
              <span class=" cursor-pointer delete">
                <img src="images/icon-delete.svg" alt="">
                Delete
              </span>
              <span class=" cursor-pointer edit">
                <img src="images/icon-edit.svg" alt="">
                Edit
              </span>
            </div>
                <div class="desktop-reply-btn cursor-pointer ${
                  rep.user.username == "juliusomo" ? "none" : ""
                }">
                  <span>
                    <img src='images/icon-reply.svg' alt="" />
                    Reply
                  </span>
            </div>
          </div>
              <div class="user-comment">
                <span class="reply-to">@${rep.replyingTo}</span>
                <p class=''>
                  ${rep.content}
                </p>
                ${
                  rep.user.username == "juliusomo"
                    ? `<textarea class='none'> ${rep.content}</textarea>`
                    : ""
                }
              </div>
              <div class="mobile-stats">
                <div class="mobile-votes">
                  <span class="plus cursor-pointer ">
                    <img src="images/icon-plus.svg" alt="" />
                  </span>
                  <span class="vote-num"> ${rep.score} </span>
                  <span class="minus cursor-pointer">
                    <img src="images/icon-minus.svg" alt="" />
                  </span>
                </div>
                <span class='mobile-reply-btn cursor-pointer ${
                  rep.user.username == "juliusomo" ? "none" : ""
                }'>
                  <img src="images/icon-reply.svg" alt="" /> Reply</span
                >
                <div class="del-update ${
                  rep.user.username == "juliusomo" ? "" : "none"
                }">
                    <span class="delete">
                      <img src="images/icon-delete.svg" alt="">
                      Delete
                    </span>
                    <span class="edit">
                      <img src="images/icon-edit.svg" alt="">
                        Edit
                    </span>
                  </div>
              </div>
            </div>
          </div>`;
              })
              .join("")}

        </div>`;

  userContainer.insertAdjacentHTML("beforeend", comment);
});
function plusBtn() {
  document.querySelectorAll(".plus").forEach((element) => {
    element.addEventListener("click", () => {
      let vote = Number(element.nextElementSibling.innerHTML);
      vote++;
      element.nextElementSibling.innerHTML = vote;
    });
  });
}
function minusBtn() {
  document.querySelectorAll(".minus").forEach((element) => {
    element.addEventListener("click", () => {
      let vote = Number(element.previousElementSibling.innerHTML);
      vote--;
      element.previousElementSibling.innerHTML = vote;
    });
  });
}

function edit() {
  const editBtn = document.querySelectorAll(".edit");
  editBtn.forEach((editBtn) => {
    editBtn.addEventListener("click", () => {
      let textarea =
        editBtn.parentElement.parentElement.previousElementSibling.querySelector("textarea");
      let paraGraph =
        editBtn.parentElement.parentElement.previousElementSibling.querySelector("p");
      textarea.classList.toggle("none");
      paraGraph.classList.toggle("none");
      textarea.addEventListener("change", (e) => {
        paraGraph.innerHTML = e.target.value;
      });
    });
  });
}

function currentUserComment(content, createdAt, score = 0) {
  const newComment = `
  <div class="user">
  <div class="comment_div">
    <div class="desktop-votes">
      <span class="plus cursor-pointer">
        <img src="images/icon-plus.svg" alt="" />
      </span>
      <span class="vote-num"> ${score} </span>
      <span class="minus cursor-pointer">
        <img src="images/icon-minus.svg" alt="" />
      </span>
    </div>
    <div>
      <div class="profile-div">
        <div>
          <span class="user-pic">
            <img src="./images/avatars/image-juliusomo.png" alt="" />
          </span>
          <span class="user-name"> juliusomo </span>
          <span class="post-date"> ${createdAt} </span>
        </div>
        <div class="del-update">
            <span class="delete cursor-pointer">
              <img src="images/icon-delete.svg" alt="">
              Delete
            </span>
            <span class="edit cursor-pointer">
              <img src="images/icon-edit.svg" alt="">
                Edit
            </span>
          </div>
      </div>
      <div class="user-comment">
        <p>
          ${content}
        </p>
        <textarea class='none'>${content}</textarea>
      </div>
      <div class="mobile-stats">
        <div class="mobile-votes">
          <span class="plus cursor-pointer">
            <img src="images/icon-plus.svg" alt="" />
          </span>
          <span class="vote-num"> ${score} </span>
          <span class="minus cursor-pointer">
            <img src="images/icon-minus.svg" alt="" />
          </span>
        </div>
        <div class="del-update">
            <span class="delete cursor-pointer">
              <img src="images/icon-delete.svg" alt="">
              Delete
            </span>
            <span class="edit cursor-pointer">
              <img src="images/icon-edit.svg" alt="">
                Edit
            </span>
          </div>
      </div>
    </div>
  </div>
  </div>
  `;
  userContainer.insertAdjacentHTML("beforeend", newComment);
}

function currentUserReply(content, replyingTo, createdAt, score = 0) {
  const reply = `
  <div class="comment_div reply">
  <div class="desktop-votes">
    <span class="plus cursor-pointer">
      <img src="images/icon-plus.svg" alt="" />
    </span>
    <span class="vote-num"> ${score} </span>
    <span class="minus cursor-pointer">
      <img src="images/icon-minus.svg" alt="" />
    </span>
  </div>
  <div>
    <div class="profile-div">
      <div>
        <span class="user-pic">
          <img src="./images/avatars/image-juliusomo.png" alt="" />
        </span>
        <span class="user-name"> juliusomo </span>
        <span class="you">you</span>
        <span class="post-date"> ${createdAt} </span>
      </div>
      <div class="desktop-reply-btn cursor-pointer">
        <div class="del-update">
      <span class="delete">
        <img src="images/icon-delete.svg" alt="">
        Delete
      </span><span class="edit">
        <img src="images/icon-edit.svg" alt="">
        Edit
      </span>
    </div>
  </div>
</div>
    <div class="user-comment">
      <span class="reply-to">@${replyingTo}</span>
      <p>
        ${content}
      </p>
    </div>
    <div class="mobile-stats">
      <div class="mobile-votes">
        <span class="plus cursor-pointer ">
          <img src="images/icon-plus.svg" alt="" />
        </span>
        <span class="vote-num"> ${score} </span>
        <span class="minus cursor-pointer">
          <img src="images/icon-minus.svg" alt="" />
        </span>
      </div>
      <div class="del-update">
          <span class="delete">
            <img src="images/icon-delete.svg" alt="">
            Delete
          </span>
          <span class="edit">
            <img src="images/icon-edit.svg" alt="">
              Edit
          </span>
        </div>
    </div>
  </div>
</div>
  `;
}
document.querySelectorAll(".mobile-reply-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    currentUserReply();
  });
});
function delComm() {
  const delBtn = document.querySelectorAll(".delete");
  delBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      btn.parentElement.parentElement.parentElement.parentElement.remove();
    });
  });
}
delComm();
edit();
plusBtn();
minusBtn();
